import {
    ABT_OPEN_SCOPE,
    ABT_CLOSE_SCOPE,
    ABT_DT,
    ABT_LOOP_SIGNATURE
} from './constants';

export function genInlineScope (
    input: string
): string {
    return `${ABT_OPEN_SCOPE}${input}${ABT_CLOSE_SCOPE}`;
}

export function genLoopOpenScope(
    name: string
): string {
    return `${ABT_OPEN_SCOPE}${ABT_LOOP_SIGNATURE}(${name}){`;
}