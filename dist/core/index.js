"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanHTML_1 = require("./internals/util/cleanHTML");
const debugger_1 = __importDefault(require("./internals/debugger"));
const compile_1 = __importDefault(require("./compile"));
const hydrateKeys = (copy, insertMap) => compile_1.default.resolveDeclaredKeys(compile_1.default.__renderMap(copy), insertMap, copy);
const hydratePartials = (copy, declaredPartials, insertMap) => compile_1.default.resolveDeclaredPartials(compile_1.default.__renderMap(copy), declaredPartials, insertMap, copy);
const hydrateLoops = (copy, insertMap) => compile_1.default.resolveDeclaredLoops(compile_1.default.__renderMap(copy), insertMap, copy);
function render(declaredPartials, rawFile, insertMap) {
    let rootCopy = rawFile;
    const renMap = compile_1.default.__renderMap(rootCopy);
    try {
        if (renMap.todo_partials && renMap.todo_partials.length > 0) {
            rootCopy = hydratePartials(rootCopy, declaredPartials, insertMap);
        }
        if (renMap.todo_keys && renMap.todo_keys.length > 0) {
            rootCopy = hydrateKeys(rootCopy, insertMap);
        }
        if (renMap.todo_loops && renMap.todo_loops.length > 0) {
            rootCopy = hydrateLoops(rootCopy, insertMap);
        }
        return cleanHTML_1.cleanHTML(rootCopy);
    }
    catch (e) {
        debugger_1.default.raise('Failed in Runtime');
        debugger_1.default.raise(e);
        return rootCopy;
    }
}
exports.default = render;
//# sourceMappingURL=index.js.map