/**
 * @internal tokens and such for the abstract xing tree modules
 */
export const AST_DT = '@';
export const AST_EQ = '=';
export const SELF = '_';
export const AST_KNO = '(';
export const AST_KNC = ')';
export const AST_TNO = '{';
export const AST_TNC = '}';
export const AST_KEYSELF = `${AST_TNO}${SELF}${AST_TNC}`;
export const AST_LOOP_OPEN_REGGIE = /<!--@loop\(\w+\){/gi;
export const HTMLCParserConstants = {
	DIRECTIVE_TOKEN: '@',
	ASSIGN_TOKEN: '=',
	THIS_TOKEN: '_',
	KEY_SIGNATURE: '@render',
	KEY_REGGIE: /<!--@render=\w+.?[\w|\d|.]+-->/gi,
	HTML_COMMENT_OPEN: '<!--',
	HTML_COMMENT_CLOSE: '-->',
	NESTED_KEY_REGGIE: /{\w+.?[\w|\d]*}/gi,
	PARTIAL_SIGNATURE: '@partial',
	PARTIAL_REGGIE: /<!--@partial=\w+[\w|\d|/\\]*-->/gi,
	LOOP_SIGNATURE: '@loop',
	LOOP_OPEN_REGGIE: /<!--@loop\(\w+\){/gi,
};
