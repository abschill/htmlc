"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanHTML_1 = require("./internals/util/cleanHTML");
const debugger_1 = __importDefault(require("./internals/debugger"));
const compile_1 = __importDefault(require("./compile"));
const render = (declaredPartials, rawFile, insertMap, debug) => {
    let rootCopy = rawFile;
    const renMap = compile_1.default.__renderMap(rootCopy);
    if (renMap.todo_partials && renMap.todo_partials.length > 0)
        rootCopy = compile_1.default.resolveDeclaredPartials(renMap, declaredPartials, insertMap, rootCopy);
    if (renMap.todo_keys && renMap.todo_keys.length > 0) {
        const renderMap = compile_1.default.__renderMap(rootCopy);
        rootCopy = compile_1.default.resolveDeclaredKeys(renderMap, insertMap, rootCopy);
    }
    if (renMap.todo_loops && renMap.todo_loops.length > 0) {
        const renderMap = compile_1.default.__renderMap(rootCopy);
        rootCopy = compile_1.default.resolveDeclaredLoops(renderMap, insertMap, rootCopy);
    }
    try {
        return cleanHTML_1.cleanHTML(rootCopy);
    }
    catch (e) {
        debugger_1.default.raise('Failed to Clean HTML');
        debugger_1.default.raise(e);
        return rootCopy;
    }
};
exports.default = render;
//# sourceMappingURL=index.js.map