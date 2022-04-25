import {
    AST_OPEN_SCOPE,
    AST_CLOSE_SCOPE,
    AST_LOOP_SIGNATURE,
	AST_TNO,
	AST_KNO,
	AST_KNC

} from './constants';
export const genInlineScope = ( input: string ): string => `${AST_OPEN_SCOPE}${input}${AST_CLOSE_SCOPE}`;
export const genLoopOpenScope = ( name: string ): string =>  `${AST_OPEN_SCOPE}${AST_LOOP_SIGNATURE}${AST_KNO}${name}${AST_KNC}${AST_TNO}`;
