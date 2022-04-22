import {
    AST_OPEN_SCOPE,
    AST_CLOSE_SCOPE,
    AST_LOOP_SIGNATURE
} from './constants';

export function genInlineScope (
    input: string
): string {
    return `${AST_OPEN_SCOPE}${input}${AST_CLOSE_SCOPE}`;
}

export function genLoopOpenScope (
    name: string
): string {
    return `${AST_OPEN_SCOPE}${AST_LOOP_SIGNATURE}(${name}){`;
}
