"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const words_1 = __importDefault(require("./ast/words"));
const template = (rawFile, insertMap) => {
    let rootCopy = rawFile;
    let todo_partials;
    let todo_keys;
    let todo_loops;
    Object.entries(words_1.default).forEach(token => {
        switch (token[0]) {
            case '@render':
                todo_keys = token[1].array(rootCopy);
                break;
            case '@for':
                todo_loops = token[1].array(rootCopy);
                break;
            case '@render-partial':
                todo_partials = token[1].array(rootCopy);
                break;
            default:
                console.log(token[0]);
                console.log(token[1].array(rootCopy));
        }
    });
    console.log(todo_partials);
    const keys = Object.keys(insertMap);
    const values = Object.values(insertMap);
};
exports.default = template;
//# sourceMappingURL=template.js.map