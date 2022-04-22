"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Constants = exports.ABT = exports.tokenize = exports.tokenizeMatch = exports.parseKeys = exports.unmask = exports.mask = exports.hasSymbols = exports.EMPTY_MAP = void 0;
const abt_1 = __importDefault(require("./abt"));
const constants_1 = require("./constants");
exports.EMPTY_MAP = {
    keys: [],
    loops: [],
    partials: []
};
function hasSymbols(chunk) {
    return (chunk.includes(constants_1.AST_RENDER_SIGNATURE) || chunk.includes(constants_1.AST_LOOP_SIGNATURE) || chunk.includes(constants_1.AST_PARTIAL_SIGNATURE));
}
exports.hasSymbols = hasSymbols;
function mask(mask, input) {
    const resolvedKeys = parseKeys(mask);
    resolvedKeys === null || resolvedKeys === void 0 ? void 0 : resolvedKeys.forEach(key => mask = mask.replace(key.token, input[key.key]));
    return mask;
}
exports.mask = mask;
function unmask(key) {
    return key.replace(constants_1.AST_TNO, '').replace(constants_1.AST_TNC, '');
}
exports.unmask = unmask;
function parseKeys(chunk) {
    const matches = chunk.match(constants_1.AST_NESTED_KEYPARSE);
    if (!matches)
        return [];
    return matches.map(matcher => ({ token: matcher, key: unmask(matcher) }));
}
exports.parseKeys = parseKeys;
function tokenizeMatch(token) {
    if (token.includes(constants_1.AST_LOOP_SIGNATURE)) {
        const name = token.split(constants_1.AST_KNO).pop().split(constants_1.AST_KNC).shift();
        return {
            name,
            raw: token
        };
    }
    const name = token.split(constants_1.AST_EQ).pop().split(constants_1.AST_CLOSE_SCOPE).shift();
    return {
        name,
        raw: token
    };
}
exports.tokenizeMatch = tokenizeMatch;
function tokenize(chunk) {
    return abt_1.default.reduce((acc, curr) => {
        const matches = curr.asList(chunk);
        if (!matches || matches.length === 0)
            return acc;
        switch (curr.signature) {
            case constants_1.AST_PARTIAL_SIGNATURE:
                return Object.assign(Object.assign({}, acc), { partials: [...acc.partials, ...matches.map(tokenizeMatch)] });
            case constants_1.AST_RENDER_SIGNATURE:
                return Object.assign(Object.assign({}, acc), { keys: matches.map(tokenizeMatch) });
            case constants_1.AST_LOOP_SIGNATURE:
                return Object.assign(Object.assign({}, acc), { loops: matches.map(tokenizeMatch) });
            default:
                return acc;
        }
    }, exports.EMPTY_MAP);
}
exports.tokenize = tokenize;
exports.ABT = __importStar(require("./abt"));
exports.Constants = __importStar(require("./constants"));
exports.Util = __importStar(require("./util"));
//# sourceMappingURL=index.js.map