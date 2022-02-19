"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abt_1 = __importDefault(require("./abt"));
const ast_1 = require("./ast");
const cleanHTML_1 = require("../util/cleanHTML");
const stamp_1 = require("../util/stamp");
const { warn } = console;
const genRenderMap = (_content) => {
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
const handle1DIterable = (clone, insert) => clone.replace('{_}', insert);
const handleXDIterable = (clone, insert) => {
    let copy = clone;
    insert.forEach((insertion) => {
        copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
    });
    return copy;
};
const resolveRender = (file, renderMap, insertionMap, debug) => {
    let copy = file;
    const outVal = [];
    const outObj = [];
    if (debug)
        (0, stamp_1.stampLog)(renderMap, 'rendermap', true);
    Object.entries(renderMap).forEach((render) => {
        if (debug)
            (0, stamp_1.stampLog)(render, 'rendermap::entry');
        if (render[1]) {
            render[1].forEach(r => {
                switch (render[0]) {
                    case 'todo_keys':
                        const name = r.split('render=')[1].split('-->')[0];
                        const globalVals = insertionMap['*'];
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
                            if (insertion) {
                                if (typeof (insertion) === 'string') {
                                    outVal.push({ replacer: r, insertion: handle1DIterable(elChild, insertion) });
                                }
                                else {
                                    const entries = Object.entries(insertion);
                                    if (entries.length > 0)
                                        outObj.push({ replacer: r, insertion: handleXDIterable(elChild, Object.entries(insertion)) });
                                }
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
            warn(`Warning: key ${render[0]} is missing a value to insert`);
            if (debug)
                (0, stamp_1.stampLog)(render, 'rendermap::error');
        }
    });
    if (debug) {
        (0, stamp_1.stampLog)(outVal, 'outval::prejoin');
        (0, stamp_1.stampLog)(outObj, 'outobj::prejoin');
    }
    const valStr = outVal.map((val) => val.insertion).join('');
    const objStr = outObj.map((obj) => obj.insertion).join('');
    outVal.forEach((_out) => copy = copy.replace(_out.replacer, valStr));
    outObj.forEach((_out) => copy = copy.replace(_out.replacer, objStr));
    if (debug) {
        (0, stamp_1.stampLog)(valStr, 'valstr::postjoin');
        (0, stamp_1.stampLog)(objStr, 'objstr::postjoin');
    }
    return { raw: file, renderMap, insertionMap, render: copy };
};
const render = (declaredPartials, rawFile, insertMap, debug) => {
    let rootCopy = rawFile;
    const renMap = genRenderMap(rootCopy);
    if (debug)
        (0, stamp_1.stampLog)(renMap, 'render::map');
    if (renMap.todo_partials && renMap.todo_partials.length > 0) {
        renMap.todo_partials.forEach((partialSeg) => {
            const p_name = partialSeg.split('@render-partial=')[1].split('-->')[0];
            if (debug)
                (0, stamp_1.stampLog)(p_name, 'partial::name');
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    var _a, _b, _c;
                    const renderMap = genRenderMap(partial.rawFile);
                    const global_insertion = Object.assign(Object.assign({}, (_a = insertMap === null || insertMap === void 0 ? void 0 : insertMap['partialInput']) === null || _a === void 0 ? void 0 : _a['*']), insertMap['*']);
                    const named_insertion = (_c = (_b = insertMap === null || insertMap === void 0 ? void 0 : insertMap['partialInput']) === null || _b === void 0 ? void 0 : _b[p_name]) !== null && _c !== void 0 ? _c : {};
                    const insertion = Object.assign(Object.assign({}, global_insertion), named_insertion);
                    const resolved = resolveRender(partial.rawFile, renderMap, insertion, debug);
                    if (debug)
                        (0, stamp_1.stampLog)(resolved, 'resolved::partial');
                    rootCopy = rootCopy.replace(partialSeg, resolved.render);
                });
            }
        });
    }
    if (renMap.todo_keys && renMap.todo_keys.length > 0) {
        renMap.todo_keys.forEach(_ => {
            const renderMap = genRenderMap(rootCopy);
            const resolved = resolveRender(rootCopy, renderMap, insertMap);
            if (debug)
                (0, stamp_1.stampLog)(resolved, 'resolved::key');
            rootCopy = resolved.render;
        });
    }
    if (renMap.todo_loops && renMap.todo_loops.length > 0) {
        renMap.todo_loops.forEach(_ => {
            const renderMap = genRenderMap(rootCopy);
            const resolved = resolveRender(rootCopy, renderMap, insertMap);
            if (debug)
                (0, stamp_1.stampLog)(resolved, 'resolved::loop');
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