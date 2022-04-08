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
function hasSymbols(chunk) {
    return (chunk.includes('@render') || chunk.includes('@loop') || chunk.includes('@partial') || chunk.includes('@pgroup'));
}
function handleTokenMap(tokens, ctx, data) {
    const { config, chunks } = ctx;
    const input = Object.assign(Object.assign(Object.assign({}, config.partialInput), config.templateInput), data);
    const partials = chunks.filter(chunk => chunk.type === 'partial');
    const todoPartials = tokens.todo_partials.map(data => {
        return Object.assign(Object.assign({}, data), { registryMatch: partials.filter(partial => partial.name === data.name).shift() });
    });
    console.log(todoPartials);
}
function compile(args) {
    const registry = args.caller_ctx.chunks;
    const match = registry.filter(chunk => chunk.name === args.template_name).shift();
    const toParse = hasSymbols(match.rawFile);
    if (!toParse)
        return match.rawFile;
    const tokens = ParserV2.tokenize(match.rawFile);
    handleTokenMap(tokens, args.caller_ctx, args.caller_data);
    return '';
}
exports.compile = compile;
//# sourceMappingURL=index.js.map