"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanHTML_1 = require("../util/cleanHTML");
const internals_1 = require("./internals");
const compile_1 = require("./compile");
const render = (declaredPartials, rawFile, insertMap, debug) => {
    let rootCopy = rawFile;
    const renMap = (0, compile_1.__renderMap)(rootCopy);
    if (debug)
        internals_1.Debugger._registerMap(renMap, insertMap);
    if (renMap.todo_partials && renMap.todo_partials.length > 0) {
        renMap.todo_partials.forEach((partialSeg) => {
            const p_name = partialSeg.split('@partial=')[1].split('-->')[0];
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    var _a;
                    const renderMap = (0, compile_1.__renderMap)(partial.rawFile);
                    const scoped_insertion = (_a = insertMap['partialInput']) !== null && _a !== void 0 ? _a : {};
                    const insertion = Object.assign(Object.assign({}, insertMap), scoped_insertion);
                    const resolved = (0, compile_1.resolve)(partial.rawFile, renderMap, insertion, debug);
                    if (debug)
                        internals_1.Debugger._registerMap(renderMap, insertMap);
                    rootCopy = rootCopy.replace(partialSeg, resolved.render);
                });
            }
        });
    }
    if (renMap.todo_keys && renMap.todo_keys.length > 0) {
        renMap.todo_keys.forEach(_ => {
            const renderMap = (0, compile_1.__renderMap)(rootCopy);
            const resolved = (0, compile_1.resolve)(rootCopy, renderMap, insertMap);
            if (debug)
                internals_1.Debugger._registerMap(renderMap, insertMap);
            rootCopy = resolved.render;
        });
    }
    if (renMap.todo_loops && renMap.todo_loops.length > 0) {
        renMap.todo_loops.forEach(_ => {
            const renderMap = (0, compile_1.__renderMap)(rootCopy);
            if (debug)
                internals_1.Debugger._registerMap(renderMap, insertMap);
            rootCopy = (0, compile_1.resolve)(rootCopy, renderMap, insertMap).render;
        });
    }
    try {
        return (0, cleanHTML_1.cleanHTML)(rootCopy);
    }
    catch (e) {
        internals_1.Debugger.raise('Failed to Clean HTML');
        internals_1.Debugger.raise(e);
        return rootCopy;
    }
};
exports.default = render;
//# sourceMappingURL=index.js.map