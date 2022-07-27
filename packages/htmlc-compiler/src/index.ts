import {
	CompilerArgs,
	Token,
	LoaderContext,
	HTMLChunk,
	Locale,
} from 'htmlc-types';
import { mask as ParserMask, tokenize, hasSymbols, Constants } from './parser';
import { useInlineScope, useLoopOpenScope } from './parser/util';

const DOCTYPE = '<!DOCTYPE html>';
const OPEN_HTML = '<html';
const CLOSE_HTML = '</html>';
const HEAD_OPEN = '<head>';
const HEAD_CLOSE = '</head>';
const BODY_OPEN = '<body';
const BODY_OPEN_BLANK = '<body>';
const BODY_CLOSE = '</body>';

export const cleanHTML = (copy: string, lang?: string): string => {
	if (!lang) lang = 'en';
	const intl_sig = `${OPEN_HTML} lang="${lang}">`;
	if (!copy.includes(BODY_OPEN)) {
		if (copy.includes(HEAD_OPEN)) {
			const headCache = copy.substring(
				0,
				copy.indexOf(HEAD_CLOSE) + HEAD_CLOSE.length
			);
			const bodyCache = copy.split(headCache).pop();
			copy = headCache + BODY_OPEN_BLANK + bodyCache + BODY_CLOSE;
		} else {
			copy = HEAD_OPEN + HEAD_CLOSE + BODY_OPEN_BLANK + copy + BODY_CLOSE;
		}
	}
	if (!copy.includes(OPEN_HTML)) copy = intl_sig + copy;
	if (!copy.includes(CLOSE_HTML)) copy = copy + CLOSE_HTML;
	if (!copy.includes(DOCTYPE)) copy = DOCTYPE + copy;
	return copy;
};
function replaceIteratorKey(chunk: string, loop: Token, input: object): string {
	const raw = loop.raw;
	const out = [];
	const matcher = input[loop.name];
	matcher.forEach((entry: string | object) => {
		const mask = raw
			.split(useLoopOpenScope(loop.name))
			.pop()
			.split(`}${Constants.HTMLCParserConstants.HTML_COMMENT_CLOSE}`)
			.shift()
			.trim();
		if (mask.includes(Constants.AST_KEYSELF))
			return out.push(mask.replace(Constants.AST_KEYSELF, <string>entry));
		// if the array iterator has {foo} and {bar}, the input will be { foo: 'foo', bar: 'bar' }
		out.push(ParserMask(mask, <object>entry));
	});
	return chunk.replace(loop.raw, out.join(''));
}

function matchWithSubkey(input: object, splitKeyName: string[]) {
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

function replaceKeyValue(chunk: string, key: Token, input: object): string {
	if (!key.name.includes('.')) {
		const value = input[key.name];
		return chunk.replace(key.raw, value);
	}
	const splitter = key.name.split('.');
	const matcher = matchWithSubkey(input, splitter);
	if (!matcher) return chunk.replace(key.raw, '');
	return chunk.replace(key.raw, matcher);
}

export function render(
	chunk: string,
	input: object,
	intlCode?: string
): string {
	const nTokens = tokenize(chunk);
	nTokens.keys.forEach((key) => (chunk = replaceKeyValue(chunk, key, input)));
	nTokens.loops.forEach(
		(loop) => (chunk = replaceIteratorKey(chunk, loop, input))
	);
	return cleanHTML(chunk, intlCode ?? Locale.en_US);
}

export function useRenderContext(
	ctx: LoaderContext,
	data: object,
	chunk: string
): string {
	const { config, chunks } = ctx;
	const input = { ...config.partialInput, ...config.templateInput, ...data };
	const partials = chunks.filter((chunk) => chunk.type === 'partial');
	for (const p of partials) {
		const signature = useInlineScope(
			`${Constants.HTMLCParserConstants.PARTIAL_SIGNATURE}=${p.name}`
		);
		if (chunk.includes(signature)) {
			chunk = chunk.replace(signature, p.renderedChunk ?? p.rawFile);
		}
	}
	return render(chunk, input, ctx.config.intlCode);
}

const useRegistryChunk = (registry: HTMLChunk[], name: string): HTMLChunk =>
	registry.filter((chunk) => chunk.name === name).shift();

// call render process with given debug arrangements & latest parser version
export function compile(args: CompilerArgs): string {
	const { chunks = [] } = args.ctx;
	const match = useRegistryChunk(chunks, args.templateName);
	const toParse = hasSymbols(match.rawFile);
	// nothing to compile
	if (!toParse) return match.rawFile;
	return useRenderContext(args.ctx, args.callData, match.rawFile);
}
