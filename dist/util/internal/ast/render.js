"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const words_1 = __importDefault(require("./words"));
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
const resolveRender = (file, renderMap, insertionMap) => {
    let copy = file;
    Object.entries(renderMap).forEach((render, itr) => {
        if (render[1]) {
            console.log(render[1]);
            console.log({ key: render[0], value: render[1] });
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