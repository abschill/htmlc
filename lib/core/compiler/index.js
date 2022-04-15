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
const types_1 = require("../../types");
const ParserV2 = __importStar(require("./parser"));
const html_1 = require("../../util/html");
const util_1 = require("./parser/util");
const check_debug_1 = require("../config/check-debug");
const { warn } = console;
const { Util, hasSymbols, Constants } = ParserV2;
function replaceIteratorKey(chunk, loop, input) {
    const raw = loop.raw;
    const outStack = [];
    const matcher = input[loop.name];
    if (!matcher) {
        return chunk.replace(loop.raw, '');
    }
    matcher.forEach((entry) => {
        const mask = raw.split(Util.genLoopOpenScope(loop.name)).pop().split(Constants.ABT_CLOSE_LOOP_SCOPE).shift().trim();
        if (mask.includes('{_}')) {
            return outStack.push(mask.replace('{_}', entry));
        }
        outStack.push(ParserV2.mask(mask, entry));
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
    const matcher = matchWithSubkey(input, splitterBase);
    if (!matcher)
        return chunk.replace(key.raw, '');
    return chunk.replace(key.raw, matcher);
}
function tokenMap(ctx, data, chunk, debug) {
    var _a, _b;
    if (debug.logMode === 'verbose') {
        debug.debugger.log('parser:tokenize:config', ctx.config);
        debug.debugger.log('parser:tokenize:raw', chunk);
        debug.debugger.log('parser:tokenize:begin', '\n');
    }
    const { config, chunks } = ctx;
    const input = Object.assign(Object.assign(Object.assign({}, config.partialInput), config.templateInput), data);
    if (debug.logMode === 'verbose')
        debug.debugger.log('parser:tokenize:scope-args', input);
    const partials = chunks.filter(chunk => chunk.type === 'partial');
    for (const p of partials) {
        const signature = (0, util_1.genInlineScope)(`${Constants.ABT_PARTIAL_SIGNATURE}=${p.name}`);
        if (chunk.includes(signature)) {
            if (debug.logMode === 'verbose')
                debug.debugger.log('parser:tokenize:match-partial_signature', signature);
            chunk = chunk.replace(signature, (_a = p.renderedChunk) !== null && _a !== void 0 ? _a : p.rawFile);
        }
    }
    const newTokens = ParserV2.tokenize(chunk);
    if (debug.logMode === 'verbose') {
        debug.debugger.log('parser:tokenize:hydrated-partialdata', newTokens);
        debug.debugger.log('parser:tokenize:processing-tempalte', chunk);
    }
    newTokens.keys.forEach(key => chunk = replaceKeyValue(chunk, key, input));
    if (newTokens.keys.length > 0 && debug.logMode === 'verbose') {
        debug.debugger.log('parser:tokenize:hydrated-keydata', chunk);
        debug.debugger.log('parser:tokenize:processing-tempalte', chunk);
    }
    newTokens.loops.forEach(loop => chunk = replaceIteratorKey(chunk, loop, input));
    if (newTokens.loops.length > 0 && debug.logMode === 'verbose') {
        debug.debugger.log('parser:tokenize:hydrated-loopdata', chunk);
        debug.debugger.log('parser:tokenize:processing-tempalte', chunk);
    }
    return (0, html_1.cleanHTML)(chunk, (_b = ctx.config.intlCode) !== null && _b !== void 0 ? _b : types_1.Locale.en_US);
}
function filterRegistryChunk(registry, name) {
    return registry.filter(chunk => chunk.name === name).shift();
}
function compile(args) {
    var _a, _b;
    const debugConfig = (0, check_debug_1.checkDebug)(args.ctx.config.debug);
    if (debugConfig.logMode === 'verbose')
        args.debugger.log('compiler:resolutions', `Compiling Template ${args.templateName}`);
    const { chunks = [] } = args.ctx;
    const match = filterRegistryChunk(chunks, args.templateName);
    const toParse = hasSymbols(match.rawFile);
    if (!toParse)
        return match.rawFile;
    const { errorSuppression } = args.ctx.config;
    const resolved = tokenMap(args.ctx, args.callData, match.rawFile, {
        errorSuppression,
        logMode: (_a = debugConfig.logMode) !== null && _a !== void 0 ? _a : 'silent',
        logStrategy: (_b = debugConfig.logStrategy) !== null && _b !== void 0 ? _b : 'none',
        debugger: args.debugger
    });
    return resolved;
}
exports.compile = compile;
//# sourceMappingURL=index.js.map