"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abt_1 = __importDefault(require("./abt"));
const cleanHTML_1 = require("../util/cleanHTML");
const internals_1 = require("./internals");
const ast_1 = require("./ast");
const rmap = (content) => {
    const _map = {
        todo_keys: [],
        todo_loops: [],
        todo_partials: []
    };
    abt_1.default.forEach(token => {
        const keymap = token.array(content);
        switch (token.key) {
            case '@render':
                keymap ? _map.todo_keys = keymap : _map.todo_keys = [];
                break;
            case '@for':
                keymap ? _map.todo_loops = keymap : _map.todo_loops = [];
                break;
            case '@partial':
                keymap ? _map.todo_partials = keymap : _map.todo_partials = [];
                break;
            default:
                break;
        }
    });
    return _map;
};
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
                        let elChild = r.replace(ast_1.Parser.FOR_H(loopName), '').replace(ast_1.Parser.FOR_T(), '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                            if (typeof (insertion) === 'string') {
                                outVal.push({ replacer: r, insertion: ast_1.Parser.replaceAnonLoopBuf({ target: elChild, key: insertion }) });
                            }
                            else if (typeof (insertion) === 'object') {
                                const entries = Object.entries(insertion);
                                if (entries.length > 0)
                                    outObj.push({ replacer: r, insertion: ast_1.Parser.replacedNamedLoopBuf(elChild, entries) });
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
    const renMap = rmap(rootCopy);
    if (debug)
        internals_1.Debugger._registerMap(renMap, insertMap);
    if (renMap.todo_partials && renMap.todo_partials.length > 0) {
        renMap.todo_partials.forEach((partialSeg) => {
            const p_name = partialSeg.split('@partial=')[1].split('-->')[0];
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    var _a;
                    const renderMap = rmap(partial.rawFile);
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
            const renderMap = rmap(rootCopy);
            const resolved = resolve(rootCopy, renderMap, insertMap);
            if (debug)
                internals_1.Debugger._registerMap(renderMap, insertMap);
            rootCopy = resolved.render;
        });
    }
    if (renMap.todo_loops && renMap.todo_loops.length > 0) {
        renMap.todo_loops.forEach(_ => {
            const renderMap = rmap(rootCopy);
            const resolved = resolve(rootCopy, renderMap, insertMap);
            if (debug)
                internals_1.Debugger._registerMap(renderMap, insertMap);
            rootCopy = resolved.render;
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