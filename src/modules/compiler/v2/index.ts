import {
    CompilerArgs,
    AST_MAP, LoaderContext
} from '../../../types';
import * as ParserV2 from './parser';

function hasSymbols(
    chunk: string
): boolean {
    return ( chunk.includes( '@render' ) || chunk.includes( '@loop' ) || chunk.includes( '@partial' ) || chunk.includes( '@pgroup' ) );
}

function handleTokenMap(
    tokens: AST_MAP,
    ctx: LoaderContext,
    data: object,
    chunk: string
): string {
    const { config, chunks } = ctx;
    const input = { ...config.partialInput, ...config.templateInput, ...data };

    const partials = chunks.filter( chunk => chunk.type === 'partial' );

    const todoPartials = tokens.todo_partials.map( data => {
        return {
            ...data,
            registryMatch: partials.filter( partial => partial.name === data.name ).shift()
        };
    } );
    todoPartials.forEach( ( curr ) => chunk = chunk.replace( curr.raw, curr.registryMatch.renderedChunk ?? curr.registryMatch.rawFile ) );
    const newTokens = ParserV2.tokenize( chunk );

    newTokens.todo_keys.forEach( key => {
        const { name = '', raw = '' } = key;
        chunk = chunk.replace( raw, input[name] );
    } );

    newTokens.todo_loops.forEach( loop => {
        const { name = '', raw = '' } = loop;
        const matcher = input[name];
        console.log( matcher );
        console.log( raw );
    } );

    return chunk;
}

export function compile (
    args: CompilerArgs
): string {
    const registry = args.caller_ctx.chunks;
    const match = registry.filter( chunk => chunk.name === args.template_name ).shift();
    const toParse = hasSymbols( match.rawFile );
    // nothing to compile
    if( !toParse ) return match.rawFile;
    const tokens = ParserV2.tokenize( match.rawFile );
    return handleTokenMap( tokens, args.caller_ctx, args.caller_data, match.rawFile );
}
