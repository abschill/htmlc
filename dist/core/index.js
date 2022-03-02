"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abt_1 = __importDefault(require("./abt"));
const ast_1 = require("./ast");
const cleanHTML_1 = require("../util/cleanHTML");
const internals_1 = require("./internals");
const { warn } = console;
const rmap = (_content) => {
    const _map = {
        todo_keys: [],
        todo_loops: [],
        todo_partials: []
    };
    abt_1.default.forEach(token => {
        const keymap = token.array(_content);
        switch (token.key) {
            case '@render':
                keymap ? _map.todo_keys = keymap : _map.todo_keys = [];
                break;
            case '@for':
                keymap ? _map.todo_loops = keymap : _map.todo_loops = [];
                break;
            case '@render-partial':
                keymap ? _map.todo_partials = keymap : _map.todo_partials = [];
                break;
            default:
                break;
        }
    });
    return _map;
};
const r1d_iterable = (clone, insert) => clone.replace('{_}', insert);
const rxd_iterable = (clone, insert) => {
    let copy = clone;
    insert.forEach((insertion) => {
        copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
    });
    return copy;
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
                        const globalVals = insertionMap;
                        let replaceVal = insertionMap[name];
                        if (!replaceVal) {
                            try {
                                replaceVal = globalVals[name];
                            }
                            catch (e) {
                                warn(`Failed to find ${name} to insert into ${file}`);
                                replaceVal = '';
                            }
                        }
                        copy = copy.replace(r, replaceVal);
                        break;
                    case 'todo_loops':
                        const loopName = r.split('(')[1].split(')')[0];
                        let toInsert = insertionMap[loopName];
                        let elChild = r.replace((0, ast_1.FOR_H)(loopName), '').replace((0, ast_1.FOR_T)(), '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                            if (typeof (insertion) === 'string') {
                                outVal.push({ replacer: r, insertion: r1d_iterable(elChild, insertion) });
                            }
                            else if (typeof (insertion) === 'object') {
                                const entries = Object.entries(insertion);
                                if (entries.length > 0)
                                    outObj.push({ replacer: r, insertion: rxd_iterable(elChild, entries) });
                            }
                            else {
                                warn(`warning: insertion ${loopName} has an unrecognized value of`);
                                warn(insertion);
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
            warn(`Warning: key ${itemlist} is missing a value to insert`);
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
            const p_name = partialSeg.split('@render-partial=')[1].split('-->')[0];
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
        warn('Failed to Clean HTML');
        warn(e);
        return rootCopy;
    }
};
exports.default = render;
//# sourceMappingURL=index.js.map