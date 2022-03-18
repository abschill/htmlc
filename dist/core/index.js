"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanHTML_1 = require("./internals/util/cleanHTML");
const debugger_1 = __importDefault(require("./internals/debugger"));
const compile_1 = __importDefault(require("./compile"));
const parser_1 = __importDefault(require("./parser"));
const render = (declaredPartials, rawFile, insertMap, debug) => {
    let rootCopy = rawFile;
    const renMap = compile_1.default.__renderMap(rootCopy);
    if (debug)
        debugger_1.default._registerMap(renMap, insertMap);
    if (renMap.todo_partials && renMap.todo_partials.length > 0) {
        renMap.todo_partials.forEach((partialSeg) => {
            const p_name = partialSeg.split(`${parser_1.default.__partialKey__}=`)[1].split(parser_1.default.__CLOSE__)[0];
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    var _a;
                    const renderMap = compile_1.default.__renderMap(partial.rawFile);
                    const scoped_insertion = (_a = insertMap['partialInput']) !== null && _a !== void 0 ? _a : {};
                    const insertion = Object.assign(Object.assign({}, insertMap), scoped_insertion);
                    const resolved = compile_1.default.resolve(partial.rawFile, renderMap, insertion, debug);
                    if (debug)
                        debugger_1.default._registerMap(renderMap, insertMap);
                    rootCopy = rootCopy.replace(partialSeg, resolved.render);
                });
            }
        });
    }
    if (renMap.todo_keys && renMap.todo_keys.length > 0) {
        renMap.todo_keys.forEach(_ => {
            const renderMap = compile_1.default.__renderMap(rootCopy);
            const resolved = compile_1.default.resolve(rootCopy, renderMap, insertMap);
            if (debug)
                debugger_1.default._registerMap(renderMap, insertMap);
            rootCopy = resolved.render;
        });
    }
    if (renMap.todo_loops && renMap.todo_loops.length > 0) {
        renMap.todo_loops.forEach(_ => {
            const renderMap = compile_1.default.__renderMap(rootCopy);
            if (debug)
                debugger_1.default._registerMap(renderMap, insertMap);
            rootCopy = compile_1.default.resolve(rootCopy, renderMap, insertMap).render;
        });
    }
    try {
        const render = cleanHTML_1.cleanHTML(rootCopy);
        if (debug)
            debugger_1.default._finalize({ raw: rawFile, render });
        return render;
    }
    catch (e) {
        debugger_1.default.raise('Failed to Clean HTML');
        debugger_1.default.raise(e);
        return rootCopy;
    }
};
exports.default = render;
//# sourceMappingURL=index.js.map