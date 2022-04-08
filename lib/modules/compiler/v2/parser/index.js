"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.tokenizeMatch = exports.EMPTY_MAP = void 0;
const abt_1 = __importDefault(require("./abt"));
exports.EMPTY_MAP = {
    todo_keys: [],
    todo_loops: [],
    todo_partials: []
};
function tokenizeMatch(token) {
    if (token.includes('loop')) {
        const name = token.split('(').pop().split(')').shift();
        return {
            name,
            raw: token
        };
    }
    const name = token.split('=').pop().split('-->').shift();
    return {
        name,
        raw: token
    };
}
exports.tokenizeMatch = tokenizeMatch;
function tokenize(input) {
    return abt_1.default.reduce((acc, curr) => {
        const matches = curr.asList(input);
        if (!matches || matches.length === 0) {
            return acc;
        }
        switch (curr.signature) {
            case '@partial':
                return Object.assign(Object.assign({}, acc), { todo_partials: matches.map(tokenizeMatch) });
            case '@render':
                return Object.assign(Object.assign({}, acc), { todo_keys: matches.map(tokenizeMatch) });
            case '@loop':
                return Object.assign(Object.assign({}, acc), { todo_loops: matches.map(tokenizeMatch) });
            default:
                return acc;
        }
    }, exports.EMPTY_MAP);
}
exports.tokenize = tokenize;
//# sourceMappingURL=index.js.map