"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.useRenderContext = exports.render = void 0;
const htmlc_types_1 = require("htmlc-types");
const parser_1 = require("./parser");
const util_1 = require("./parser/util");
const html_1 = require("../util/html");
function replaceIteratorKey(chunk, loop, input) {
    const raw = loop.raw;
    const out = [];
    const matcher = input[loop.name];
    matcher.forEach((entry) => {
        const mask = raw.split((0, util_1.useLoopOpenScope)(loop.name)).pop().split(parser_1.Constants.AST_CLOSE_LOOP_SCOPE).shift().trim();
        if (mask.includes(parser_1.Constants.AST_KEYSELF))
            return out.push(mask.replace(parser_1.Constants.AST_KEYSELF, entry));
        out.push((0, parser_1.mask)(mask, entry));
    });
    return chunk.replace(loop.raw, out.join(''));
}
function matchWithSubkey(input, splitKeyName) {
    if (splitKeyName.length === 2) {
        const root = splitKeyName[0];
        const tail = splitKeyName[splitKeyName.length - 1];
        const child = input[root][tail];
        return child;
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
    const splitter = key.name.split('.');
    const matcher = matchWithSubkey(input, splitter);
    if (!matcher)
        return chunk.replace(key.raw, '');
    return chunk.replace(key.raw, matcher);
}
function render(chunk, input, intlCode) {
    const nTokens = (0, parser_1.tokenize)(chunk);
    nTokens.keys.forEach(key => chunk = replaceKeyValue(chunk, key, input));
    nTokens.loops.forEach(loop => chunk = replaceIteratorKey(chunk, loop, input));
    return (0, html_1.cleanHTML)(chunk, intlCode !== null && intlCode !== void 0 ? intlCode : htmlc_types_1.Locale.en_US);
}
exports.render = render;
function useRenderContext(ctx, data, chunk) {
    var _a;
    const { config, chunks } = ctx;
    const input = Object.assign(Object.assign(Object.assign({}, config.partialInput), config.templateInput), data);
    const partials = chunks.filter(chunk => chunk.type === 'partial');
    for (const p of partials) {
        const signature = (0, util_1.useInlineScope)(`${parser_1.Constants.AST_PARTIAL_SIGNATURE}=${p.name}`);
        if (chunk.includes(signature)) {
            chunk = chunk.replace(signature, (_a = p.renderedChunk) !== null && _a !== void 0 ? _a : p.rawFile);
        }
    }
    return render(chunk, input, ctx.config.intlCode);
}
exports.useRenderContext = useRenderContext;
const useRegistryChunk = (registry, name) => registry.filter(chunk => chunk.name === name).shift();
function compile(args) {
    const { chunks = [] } = args.ctx;
    const match = useRegistryChunk(chunks, args.templateName);
    const toParse = (0, parser_1.hasSymbols)(match.rawFile);
    if (!toParse)
        return match.rawFile;
    return useRenderContext(args.ctx, args.callData, match.rawFile);
}
exports.compile = compile;
//# sourceMappingURL=index.js.map