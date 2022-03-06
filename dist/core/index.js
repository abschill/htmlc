"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanHTML_1 = require("../util/cleanHTML");
const internals_1 = require("./internals");
const parser_1 = __importDefault(require("./parser"));
const compile_1 = require("./compile");
function resolve(file, renderMap, insertionMap, debug) {
    let copy = file;
    const outVal = [];
    const outObj = [];
    internals_1.Debugger._registerMap(renderMap, insertionMap);
    Object.entries(renderMap).forEach((itemlist) => {
        if (itemlist[1]) {
            itemlist[1].forEach(r => {
                switch (itemlist[0]) {
                    case 'todo_keys':
                        const name = r.split('render=')[1].split('-->')[0];
                        const globals = insertionMap;
                        let replaceVal = insertionMap[name];
                        if (!replaceVal) {
                            try {
                                replaceVal = globals[name];
                            }
                            catch (e) {
                                internals_1.Debugger.raise(`Failed to find ${name} to insert into ${file}`);
                                replaceVal = '';
                            }
                        }
                        copy = copy.replace(r, replaceVal);
                        break;
                    case 'todo_loops':
                        const loopName = r.split('(')[1].split(')')[0];
                        let toInsert = insertionMap[loopName];
                        let elChild = r.replace(parser_1.default.FOR_H(loopName), '').replace(parser_1.default.FOR_T(), '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                            if (typeof (insertion) === 'string') {
                                outVal.push({ replacer: r, insertion: parser_1.default.replaceAnonLoopBuf({ target: elChild, key: insertion }) });
                            }
                            else if (typeof (insertion) === 'object') {
                                const entries = Object.entries(insertion);
                                if (entries.length > 0)
                                    outObj.push({ replacer: r, insertion: parser_1.default.replacedNamedLoopBuf(elChild, entries) });
                            }
                            else {
                                internals_1.Debugger.raise(`warning: insertion ${loopName} has an unrecognized value of`);
                                internals_1.Debugger.raise(insertion);
                            }
                        });
                        break;
                    case 'todo_partials':
                        break;
                    default:
                        break;
                }
            });
        }
        else {
            internals_1.Debugger.raise(`Warning: key ${itemlist} is missing a value to insert`);
        }
    });
    if (debug) {
    }
    const valStr = outVal.map((val) => val.insertion).join('');
    const objStr = outObj.map((obj) => obj.insertion).join('');
    outVal.forEach((_out) => copy = copy.replace(_out.replacer, valStr));
    outObj.forEach((_out) => copy = copy.replace(_out.replacer, objStr));
    if (debug) {
    }
    return { raw: file, renderMap, insertionMap, render: copy };
}
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
                    const resolved = resolve(partial.rawFile, renderMap, insertion, debug);
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
            const resolved = resolve(rootCopy, renderMap, insertMap);
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
            rootCopy = resolve(rootCopy, renderMap, insertMap).render;
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