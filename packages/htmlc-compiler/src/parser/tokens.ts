/**
 *
 * @module ABT
 * Abstract binding tree for template directives with typed callbacks
 */
import { HTMLCParserConstants } from './constants';
import { ABT_Binding } from 'htmlc-types';

const hasLoop = (chunk: string): boolean =>
	chunk.includes(HTMLCParserConstants.LOOP_SIGNATURE);
const hasPartial = (chunk: string) =>
	chunk.includes(HTMLCParserConstants.PARTIAL_SIGNATURE);
const hasKey = (chunk: string): boolean =>
	chunk.includes(HTMLCParserConstants.KEY_SIGNATURE);

function matchKeys(chunk: string): string[] {
	return chunk.match(HTMLCParserConstants.KEY_REGGIE) ?? [];
}

function matchPartial(chunk: string): string[] {
	return chunk.match(HTMLCParserConstants.PARTIAL_REGGIE) ?? [];
}

function matchLoops(chunk: string): string[] {
	const out: Array<string> = [];
	const _opener = HTMLCParserConstants.LOOP_OPEN_REGGIE; //AST_LOOP_OPEN_REGGIE;
	const opener = chunk.match(_opener);
	if (opener && opener?.length > 0) {
		opener.forEach((match: string) => {
			const chopBottom = chunk.slice(chunk.indexOf(match), chunk.length);
			if (chopBottom) {
				const ret = chopBottom?.slice(
					0,
					chopBottom.indexOf(
						HTMLCParserConstants.HTML_COMMENT_CLOSE
					) + 4
				);
				if (ret) out.push(ret);
			}
		});
	}
	return out;
}

const ABT: ParsableToken[] = [
	{
		signature: HTMLCParserConstants.PARTIAL_SIGNATURE,
		exists: hasPartial,
		asList: matchPartial,
	},
	{
		signature: HTMLCParserConstants.KEY_SIGNATURE,
		exists: hasKey,
		asList: matchKeys,
	},
	{
		signature: HTMLCParserConstants.LOOP_SIGNATURE,
		exists: hasLoop,
		asList: matchLoops,
	},
];

export default ABT;
export type ParsableToken = {
	signature: string;
	exists: ABT_Binding<boolean>;
	asList: ABT_Binding<string[]>;
};
