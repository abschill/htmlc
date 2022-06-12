import {
    CompilerArgs,
    Token,
    LoaderContext,
    HTMLChunk,
    Locale
} from '../types';
import {
	mask as ParserMask,
	tokenize,
	Util,
	hasSymbols,
	Constants
} from './parser';
import { cleanHTML } from '../util/html';
import { useInlineScope } from './parser/util';
const { useLoopOpenScope } = Util;

function replaceIteratorKey(
    chunk: string,
    loop: Token,
    input: object
): string {
    const raw = loop.raw;
    const outStack = [];
    const matcher = input[loop.name];
    matcher.forEach((entry: string | object) => {
        const mask = raw.split(useLoopOpenScope(loop.name)).pop().split(Constants.AST_CLOSE_LOOP_SCOPE).shift().trim();
        if(mask.includes(Constants.AST_KEYSELF)) return outStack.push(mask.replace(Constants.AST_KEYSELF, <string>entry));
        // if the array iterator has {foo} and {bar}, the input will be { foo: 'foo', bar: 'bar' }
        outStack.push(ParserMask(mask, <object>entry));
    });
    return chunk.replace(loop.raw, outStack.join(''));
}

function matchWithSubkey(
    input: object,
    splitKeyName: string[]
) {
    if(splitKeyName.length === 2) {
        const rootAncestor = splitKeyName[0];
        const tailValue = splitKeyName[splitKeyName.length-1];
        const childValue = input[rootAncestor][tailValue];
        return childValue;
    }
    if(splitKeyName.length > 2) {
        return splitKeyName.reduce((o,i)=> o[i], input);
    }
    return null;
}

function replaceKeyValue(
    chunk: string,
    key: Token,
    input: object
): string {
    if(!key.name.includes('.')) {
		const value = input[key.name];
        return chunk.replace(key.raw, value);
    }
    const splitterBase = key.name.split('.');
    const matcher = matchWithSubkey(input, splitterBase);
    if(!matcher) return chunk.replace(key.raw, '');
    return chunk.replace(key.raw, matcher);
}

function render(
    ctx: LoaderContext,
    data: object,
    chunk: string
): string {
    const { config, chunks } = ctx;
    const input = { ...config.partialInput, ...config.templateInput, ...data };
    const partials = chunks.filter(chunk => chunk.type === 'partial');
    for(const p of partials) {
        const signature = useInlineScope(`${Constants.AST_PARTIAL_SIGNATURE}=${p.name}`);
        if(chunk.includes(signature)) {
            chunk = chunk.replace(signature, p.renderedChunk ?? p.rawFile);
        }
    }
    const newTokens = tokenize(chunk);
    newTokens.keys.forEach(key => chunk = replaceKeyValue(chunk, key, input));
    newTokens.loops.forEach(loop => chunk = replaceIteratorKey(chunk, loop, input));
    return cleanHTML(chunk, ctx.config.intlCode ?? Locale.en_US);
}

const useRegistryChunk = (
    registry: HTMLChunk[],
    name: string
): HTMLChunk => registry.filter(chunk => chunk.name === name).shift();

// call render process with given debug arrangements & latest parser version
export function compile(
    args: CompilerArgs
): string {
    const { chunks = [] } = args.ctx;
    const match = useRegistryChunk(chunks, args.templateName);
    const toParse = hasSymbols(match.rawFile);
    // nothing to compile
    if(!toParse) return match.rawFile;
    return render(args.ctx, args.callData, match.rawFile);
}
