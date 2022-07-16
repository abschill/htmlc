/**
 *
 * @module ABT
 * Abstract binding tree for template directives with typed callbacks
 */
import {
    AST_CLOSE_SCOPE,
    AST_RENDER_SIGNATURE,
    AST_PARTIAL_SIGNATURE,
    AST_LOOP_SIGNATURE,
    AST_RENDER_REGGIE,
    AST_PARTIAL_REGGIE,
    AST_LOOP_OPEN_REGGIE,
} from './constants';
import { ABT_Binding } from 'htmlc-types';

const hasLoop = (
    chunk: string
): boolean => chunk.includes(AST_LOOP_SIGNATURE);

const hasPartial = (
    chunk: string
) => chunk.includes(AST_PARTIAL_SIGNATURE);

const hasKey = (
    chunk: string
): boolean => chunk.includes(AST_RENDER_SIGNATURE);

function matchKeys (
    chunk: string
): string[] {
    return chunk.match(AST_RENDER_REGGIE) ?? [];
}

function matchPartial (
    chunk: string
): string[] {
    return chunk.match(AST_PARTIAL_REGGIE) ?? [];
}

function matchLoops (
    chunk: string
): string[] {
    const out: Array<string> = [];
    const _opener = AST_LOOP_OPEN_REGGIE;
    const opener = chunk.match(_opener);
    if(opener && opener?.length > 0) {
        opener.forEach((match: string) => {
            const chopBottom = chunk.slice(chunk.indexOf(match), chunk.length);
            if(chopBottom) {
                const ret = chopBottom?.slice(0, chopBottom.indexOf(AST_CLOSE_SCOPE) + 4);
                if (ret) out.push(ret);
            }
        });
    }
    return out;
}

const ABT: ParsableToken[] = [
    {
        signature: AST_PARTIAL_SIGNATURE,
        exists: hasPartial,
        asList: matchPartial
    },
    {
        signature: AST_RENDER_SIGNATURE,
        exists: hasKey,
        asList: matchKeys
    },
    {
        signature: AST_LOOP_SIGNATURE,
        exists: hasLoop,
        asList: matchLoops
    },
];

export default ABT;
export type ParsableToken = {
    signature: string;
    exists: ABT_Binding<boolean>
    asList: ABT_Binding<string[]>;
}
