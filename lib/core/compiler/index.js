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
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const ParserV2 = __importStar(require("./parser"));
const html_1 = require("../../util/html");
function replaceIteratorKey(chunk, loop, input) {
    const rawContext = loop.raw;
    const outStack = [];
    input[loop.name].forEach((entry) => {
        const mask = rawContext.split(`<!--@loop(${loop.name}){`).pop().split('}-->').shift().trim();
        if (mask.includes('{_}')) {
            outStack.push(mask.replace('{_}', entry));
        }
        else {
            outStack.push(ParserV2.mask(mask, entry));
        }
    });
    return chunk.replace(loop.raw, outStack.join(''));
}
function matchInputWithSubkey(input, splitKeyName) {
    if (splitKeyName.length === 2) {
        const rootAncestor = splitKeyName[0];
        const tailValue = splitKeyName[splitKeyName.length - 1];
        const childValue = input[rootAncestor][tailValue];
        return childValue;
    }
    if (splitKeyName.length > 2) {
        const t = splitKeyName.reduce((o, i) => o[i], input);
        return t;
    }
    return null;
}
function replaceKeyValue(chunk, key, input) {
    if (!key.name.includes('.')) {
        chunk = chunk.replace(key.raw, input[key.name]);
        return chunk;
    }
    const splitterBase = key.name.split('.');
    const matcher = matchInputWithSubkey(input, splitterBase);
    if (!matcher)
        return chunk.replace(key.raw, '');
    return chunk.replace(key.raw, matcher);
}
function resolveTokenMap(ctx, data, chunk) {
    var _a;
    const { config, chunks } = ctx;
    const input = Object.assign(Object.assign(Object.assign({}, config.partialInput), config.templateInput), data);
    const partials = chunks.filter(chunk => chunk.type === 'partial');
    for (const p of partials) {
        const signature = `<!--@partial=${p.name}-->`;
        if (chunk.includes(signature)) {
            chunk = chunk.replace(signature, (_a = p.renderedChunk) !== null && _a !== void 0 ? _a : p.rawFile);
        }
    }
    const newTokens = ParserV2.tokenize(chunk);
    newTokens.keys.forEach(key => chunk = replaceKeyValue(chunk, key, input));
    newTokens.loops.forEach(loop => chunk = replaceIteratorKey(chunk, loop, input));
    return (0, html_1.cleanHTML)(chunk, ctx.config.intlCode);
}
function filterRegistryChunk(registry, name) {
    return registry.filter(chunk => chunk.name === name).shift();
}
function compile(args) {
    const { chunks = [] } = args.caller_ctx;
    const match = filterRegistryChunk(chunks, args.template_name);
    const toParse = ParserV2.hasSymbols(match.rawFile);
    if (!toParse)
        return match.rawFile;
    const resolved = resolveTokenMap(args.caller_ctx, args.caller_data, match.rawFile);
    return resolved;
}
exports.compile = compile;
//# sourceMappingURL=index.js.map