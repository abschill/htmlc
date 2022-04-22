import { Token, AST_MAP } from '../../types';
export declare const EMPTY_MAP: AST_MAP;
export declare function hasSymbols(chunk: string): boolean;
export declare function mask(mask: string, input: object): string;
export declare function unmask(key: string): string;
export declare function parseKeys(chunk: string): {
    token: string;
    key: string;
}[];
export declare function tokenizeMatch(token: string): Token;
export declare function tokenize(chunk: string): AST_MAP;
export * as ABT from './abt';
export * as Constants from './constants';
export * as Util from './util';
