"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const types_1 = require("../types");
const parser_1 = require("./parser");
const html_1 = require("../util/html");
const util_1 = require("./parser/util");
const { useLoopOpenScope } = parser_1.Util;
function replaceIteratorKey(chunk, loop, input) {
    const raw = loop.raw;
    const outStack = [];
    const matcher = input[loop.name];
    matcher.forEach((entry) => {
        const mask = raw.split(useLoopOpenScope(loop.name)).pop().split(parser_1.Constants.AST_CLOSE_LOOP_SCOPE).shift().trim();
        if (mask.includes(parser_1.Constants.AST_KEYSELF))
            return outStack.push(mask.replace(parser_1.Constants.AST_KEYSELF, entry));
        outStack.push((0, parser_1.mask)(mask, entry));
    });
    return chunk.replace(loop.raw, outStack.join(''));
}
function matchWithSubkey(input, splitKeyName) {
    if (splitKeyName.length === 2) {
        const rootAncestor = splitKeyName[0];
        const tailValue = splitKeyName[splitKeyName.length - 1];
        const childValue = input[rootAncestor][tailValue];
        return childValue;
    }
    if (splitKeyName.length > 2) {
        return splitKeyName.reduce((o, i) => o[i], input);
    }
    return null;
}
function replaceKeyValue(chunk, key, input) {
    if (!key.name.includes('.')) {
        const value = input[key.name];
        return chunk.replace(key.raw, value);
    }
    const splitterBase = key.name.split('.');
    const matcher = matchWithSubkey(input, splitterBase);
    if (!matcher)
        return chunk.replace(key.raw, '');
    return chunk.replace(key.raw, matcher);
}
function render(ctx, data, chunk) {
    var _a, _b;
    const { config, chunks } = ctx;
    const input = Object.assign(Object.assign(Object.assign({}, config.partialInput), config.templateInput), data);
    const partials = chunks.filter(chunk => chunk.type === 'partial');
    for (const p of partials) {
        const signature = (0, util_1.useInlineScope)(`${parser_1.Constants.AST_PARTIAL_SIGNATURE}=${p.name}`);
        if (chunk.includes(signature)) {
            chunk = chunk.replace(signature, (_a = p.renderedChunk) !== null && _a !== void 0 ? _a : p.rawFile);
        }
    }
    const newTokens = (0, parser_1.tokenize)(chunk);
    newTokens.keys.forEach(key => chunk = replaceKeyValue(chunk, key, input));
    newTokens.loops.forEach(loop => chunk = replaceIteratorKey(chunk, loop, input));
    return (0, html_1.cleanHTML)(chunk, (_b = ctx.config.intlCode) !== null && _b !== void 0 ? _b : types_1.Locale.en_US);
}
const useRegistryChunk = (registry, name) => registry.filter(chunk => chunk.name === name).shift();
function compile(args) {
    const { chunks = [] } = args.ctx;
    const match = useRegistryChunk(chunks, args.templateName);
    const toParse = (0, parser_1.hasSymbols)(match.rawFile);
    if (!toParse)
        return match.rawFile;
    return render(args.ctx, args.callData, match.rawFile);
}
exports.compile = compile;
//# sourceMappingURL=index.js.map