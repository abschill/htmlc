"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abt_1 = __importDefault(require("./abt"));
const ast_1 = require("./ast");
const cleanHTML_1 = require("./util/cleanHTML");
const { log, warn } = console;
const genRenderMap = (rawFile) => {
    let todo_partials = null;
    let todo_keys = null;
    let todo_loops = null;
    abt_1.default.forEach(token => {
        switch (token.key) {
            case '@render':
                todo_keys = token.array(rawFile);
                break;
            case '@for':
                todo_loops = token.array(rawFile);
                break;
            case '@render-partial':
                todo_partials = token.array(rawFile);
                break;
            default:
                break;
        }
    });
    return { todo_partials, todo_keys, todo_loops };
};
const handle1DIterable = (clone, insert) => clone.replace('{_}', insert);
const handleXDIterable = (clone, insert) => {
    let copy = clone;
    insert.forEach((insertion) => {
        copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
    });
    return copy;
};
const resolveRender = (file, renderMap, insertionMap) => {
    let copy = file;
    const outVal = [];
    const outObj = [];
    Object.entries(renderMap).forEach((render) => {
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
    });
    const valStr = outVal.map((val) => val.insertion).join('');
    const objStr = outObj.map((obj) => obj.insertion).join('');
    outVal.forEach((_out) => copy = copy.replace(_out.replacer, valStr));
    outObj.forEach((_out) => copy = copy.replace(_out.replacer, objStr));
    return { raw: file, renderMap, insertionMap, render: copy };
};
const template = (declaredPartials, rawFile, insertMap, debug) => {
    let rootCopy = rawFile;
    const { todo_partials, todo_keys, todo_loops } = genRenderMap(rootCopy);
    if (debug) {
        log('Render Map:');
        log(todo_partials);
        log(todo_keys);
        log(todo_loops);
    }
    if (todo_partials && todo_partials.length > 0) {
        todo_partials.forEach(partialSeg => {
            const p_name = partialSeg.split('@render-partial=')[1].split('-->')[0];
            const matchPartials = declaredPartials.filter(n => n.name === p_name);
            if (matchPartials.length > 0) {
                matchPartials.forEach(partial => {
                    const renderMap = genRenderMap(partial.rawFile);
                    const global_insertion = Object.assign(Object.assign({}, insertMap['partialInput']['*']), insertMap['*']);
                    const named_insertion = insertMap['partialInput'][p_name];
                    const insertion = Object.assign(Object.assign({}, global_insertion), named_insertion);
                    const resolved = resolveRender(partial.rawFile, renderMap, insertion);
                    if (debug) {
                        log('Resolved Partial:');
                        log(resolved);
                    }
                    rootCopy = rootCopy.replace(partialSeg, resolved.render);
                });
            }
        });
    }
    if (todo_keys && todo_keys.length > 0) {
        todo_keys.forEach(_ => {
            const renderMap = genRenderMap(rootCopy);
            const resolved = resolveRender(rootCopy, renderMap, insertMap);
            if (debug) {
                log('Resolved Key:');
                log(resolved);
            }
            rootCopy = resolved.render;
        });
    }
    if (todo_loops && todo_loops.length > 0) {
        todo_loops.forEach(_ => {
            const renderMap = genRenderMap(rootCopy);
            const resolved = resolveRender(rootCopy, renderMap, insertMap);
            if (debug) {
                log('Resolved Loop:');
                log(resolved);
            }
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
exports.default = template;
//# sourceMappingURL=render.js.map