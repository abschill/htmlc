"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function iterator(txt) {
    const _reggie = /<!--@for\(\w+\){([\s|\w|<|=|"|:|/|\.({})>]+)-->/gi;
    return txt.match(_reggie);
}
exports.default = iterator;
//# sourceMappingURL=iterator.js.map