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
) {
    const { config, chunks } = ctx;
    const input = { ...config.partialInput, ...config.templateInput, ...data };

    const partials = chunks.filter( chunk => chunk.type === 'partial' );

    const todoPartials = tokens.todo_partials.map( data => {
        return {
            ...data,
            registryMatch: partials.filter( partial => partial.name === data.name ).shift()
        };
    } );
    todoPartials.forEach( ( curr ) => {
        chunk = chunk.replace( curr.raw, curr.registryMatch.rawFile );
    } );

    console.log( chunk );
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
    handleTokenMap( tokens, args.caller_ctx, args.caller_data, match.rawFile );

    return '';
}
