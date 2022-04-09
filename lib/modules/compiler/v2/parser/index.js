"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.tokenizeMatch = exports.parseKeys = exports.unmaskKey = exports.mask = exports.hasSymbols = exports.EMPTY_MAP = void 0;
const abt_1 = __importDefault(require("./abt"));
exports.EMPTY_MAP = {
    todo_keys: [],
    todo_loops: [],
    todo_partials: []
};
function hasSymbols(chunk) {
    return (chunk.includes('@render') || chunk.includes('@loop') || chunk.includes('@partial') || chunk.includes('@pgroup'));
}
exports.hasSymbols = hasSymbols;
function mask(mask, input) {
    const resolvedKeys = parseKeys(mask);
    resolvedKeys.forEach(key => {
        mask = mask.replace(key.token, input[key.key]);
    });
    return mask;
}
exports.mask = mask;
function unmaskKey(key) {
    return key.replace('{', '').replace('}', '');
}
exports.unmaskKey = unmaskKey;
function parseKeys(chunk) {
    const reggie = /{\w+[\w}\d]*}/gi;
    return chunk.match(reggie).map(matcher => ({ token: matcher, key: unmaskKey(matcher) }));
}
exports.parseKeys = parseKeys;
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