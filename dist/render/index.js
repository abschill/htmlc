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
        (0, stamp_1.stampLog)(renderMap, 'rendermap::map|render/index.ts#L78');
    Object.entries(renderMap).forEach((itemlist) => {
        if (debug)
            (0, stamp_1.stampLog)(itemlist, 'rendermap::itemlist|render/index.ts#L81');
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
                        if (debug)
                            (0, stamp_1.stampLog)(toInsert, 'toInsert::frommap');
                        let elChild = r.replace((0, ast_1.FOR_H)(loopName), '').replace((0, ast_1.FOR_T)(), '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                            if (typeof (insertion) === 'string') {
                                outVal.push({ replacer: r, insertion: handle1DIterable(elChild, insertion) });
                            }
                            else if (typeof (insertion) === 'object') {
                                const entries = Object.entries(insertion);
                                if (entries.length > 0)
                                    outObj.push({ replacer: r, insertion: handleXDIterable(elChild, entries) });
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
            if (debug)
                (0, stamp_1.stampLog)(itemlist, 'rendermap::error|render/index.ts#L131');
        }
    });
    if (debug) {
        (0, stamp_1.stampLog)(outVal, 'outval::prejoin|render/index.ts#L136');
        (0, stamp_1.stampLog)(outObj, 'outobj::prejoin|render/index.ts#L137');
    }
    const valStr = outVal.map((val) => val.insertion).join('');
    const objStr = outObj.map((obj) => obj.insertion).join('');
    outVal.forEach((_out) => copy = copy.replace(_out.replacer, valStr));
    outObj.forEach((_out) => copy = copy.replace(_out.replacer, objStr));
    if (debug) {
        (0, stamp_1.stampLog)(valStr, 'valstr::postjoin|render/index.ts#L146');
        (0, stamp_1.stampLog)(objStr, 'objstr::postjoin|render/index.ts#L147');
    }
    return { raw: file, renderMap, insertionMap, render: copy };
};
const render = (declaredPartials, rawFile, insertMap, debug) => {
    let rootCopy = rawFile;
    const renMap = genRenderMap(rootCopy);
    if (debug)
        (0, stamp_1.stampLog)(renMap, 'render::map|render/index.ts#L166');
    if (renMap.todo_partials && renMap.todo_partials.length > 0) {
        renMap.todo_partials.forEach((partialSeg) => {
            const p_name = partialSeg.split('@render-partial=')[1].split('-->')[0];
            if (debug)
                (0, stamp_1.stampLog)(p_name, 'partial::name');
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    var _a;
                    const renderMap = genRenderMap(partial.rawFile);
                    const scoped_insertion = (_a = insertMap['partialInput']) !== null && _a !== void 0 ? _a : {};
                    const insertion = Object.assign(Object.assign({}, insertMap), scoped_insertion);
                    if (debug)
                        (0, stamp_1.stampLog)(insertion, 'inserted::partialdata|render/index.ts#L183');
                    const resolved = resolveRender(partial.rawFile, renderMap, insertion, debug);
                    if (debug)
                        (0, stamp_1.stampLog)(resolved, 'resolved::partial|render/index.ts#L185');
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