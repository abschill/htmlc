import { HTMLCParserConstants, AST_TNO, AST_KNO, AST_KNC } from './constants';

export const useInlineScope = (input: string): string =>
	`${HTMLCParserConstants.HTML_COMMENT_OPEN}${input}${HTMLCParserConstants.HTML_COMMENT_CLOSE}`;

export const useLoopOpenScope = (name: string): string =>
	`${HTMLCParserConstants.HTML_COMMENT_OPEN}${HTMLCParserConstants.LOOP_SIGNATURE}${AST_KNO}${name}${AST_KNC}${AST_TNO}`;
