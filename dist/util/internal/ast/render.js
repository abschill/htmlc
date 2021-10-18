"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const words_1 = __importDefault(require("./words"));
const words_2 = require("./words");
const genRenderMap = (rawFile) => {
    let todo_partials;
    let todo_keys;
    let todo_loops;
    Object.entries(words_1.default).forEach(token => {
        switch (token[0]) {
            case '@render':
                todo_keys = token[1].array(rawFile);
                break;
            case '@for':
                todo_loops = token[1].array(rawFile);
                break;
            case '@render-partial':
                todo_partials = token[1].array(rawFile);
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
    insert.forEach(insertion => {
        copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
    });
    return copy;
};
const resolveRender = (file, renderMap, insertionMap) => {
    let copy = file;
    const outVal = [];
    const outObj = [];
    Object.entries(renderMap).forEach((render, itr) => {
        if (render[1]) {
            render[1].forEach(r => {
                switch (render[0]) {
                    case 'todo_keys':
                        const name = r.split('render=')[1].split('-->')[0];
                        const replaceVal = insertionMap[name];
                        copy = copy.replace(r, replaceVal);
                        break;
                    case 'todo_loops':
                        const loopName = r.split('(')[1].split(')')[0];
                        const toInsert = insertionMap[loopName];
                        let elChild = r;
                        elChild = elChild.replace((0, words_2.FOR_H)(loopName), '').replace((0, words_2.FOR_T)(), '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert.forEach(insertion => {
                            if (typeof (insertion) === 'string') {
                                outVal.push(handle1DIterable(elChild, insertion));
                            }
                            else if (typeof (insertion) === 'object') {
                                outObj.push(handleXDIterable(elChild, Object.entries(insertion)));
                            }
                        });
                        break;
                    case 'todo_partials':
                        break;
                    default:
                        break;
                }
            });
            console.log('~~~~~~~~~~~~~~~~~');
            console.log(outVal);
            console.log(outObj);
        }
    });
    return { raw: file, renderMap, insertionMap, render: copy };
};
const template = (declaredPartials, rawFile, insertMap) => {
    let rootCopy = rawFile;
    const { todo_partials, todo_keys, todo_loops } = genRenderMap(rootCopy);
    todo_partials.forEach(partialSeg => {
        const p_name = partialSeg.split('=')[1].split('-->')[0];
        const matchPartials = declaredPartials.filter(n => n.name === p_name);
        if (matchPartials.length > 0) {
            matchPartials.forEach(partial => {
                const renderMap = genRenderMap(partial.rawFile);
                const resolved = resolveRender(partial.rawFile, renderMap, insertMap['partialInput'][p_name]);
            });
        }
    });
    const keys = Object.keys(insertMap);
    const values = Object.values(insertMap);
};
exports.default = template;
//# sourceMappingURL=render.js.map