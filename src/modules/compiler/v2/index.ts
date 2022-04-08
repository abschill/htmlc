import {
    CompilerArgs,
    AST_MAP, SSROptions
} from '../../../types';
import * as ParserV2 from './parser';

function hasSymbols(
    chunk: string
): boolean {
    return ( chunk.includes( '@render' ) || chunk.includes( '@loop' ) || chunk.includes( '@partial' ) || chunk.includes( '@pgroup' ) );
}

function handleTokenMap(
    tokens: AST_MAP,
    config: SSROptions,
    data: object
) {
    const input = { ...config.partialInput, ...config.templateInput, ...data };
    console.log( tokens );
    console.log( input );
}

export function compile (
    args: CompilerArgs
): string {
    const registry = args.caller_ctx.chunks;
    const match = registry.filter( chunk => chunk.name === args.template_name )?.shift();
    const toParse = hasSymbols( match.rawFile );
    // nothing to compile
    if( !toParse ) return match.rawFile;
    const tokens = ParserV2.tokenize( match.rawFile );
    handleTokenMap( tokens, args.caller_ctx.config, args.caller_data );

    return '';
}
