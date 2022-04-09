import {
    CompilerArgs, 
    Token,
    LoaderContext,
} from '../../../types';
import * as ParserV2 from './parser';
import { cleanHTML } from '../../../internal/util/html';

function replaceIteratorKey(
    chunk: string,
    loop: Token,
    input: object
): string {
    const rawContext = loop.raw;
    const outStack = [];
    input[loop.name].forEach( ( entry: string | object ) => {
        const mask = rawContext.split( `<!--@loop(${loop.name}){` ).pop().split( '}-->' ).shift().trim();
        if( mask.includes( '{_}' ) ) {
            outStack.push( mask.replace( '{_}', <string>entry ) );
        }
        else {
            // if the array iterator has {foo} and {bar}, the input will be { foo: 'foo', bar: 'bar' }
           outStack.push( ParserV2.mask( mask, <object>entry ) );
        }
    } );
    return chunk.replace( loop.raw, outStack.join( '' ) );
}

function replaceKeyValue(
    chunk: string,
    key: Token,
    input: object
): string {
    if( !key.name.includes( '.' ) ) {
        chunk = chunk.replace( key.raw, input[key.name] );
        return chunk;
    }
    const splitterBase = key.name.split( '.' );
    const rootAncestor = splitterBase.shift();
    const matchedInput = Object.entries( input ).filter( ( i: [ string, object ] ) => i[0] === rootAncestor ).shift();
    return chunk.replace( key.raw, matchedInput[1][splitterBase.shift()] );
}


function resolveTokenMap(
    ctx: LoaderContext,
    data: object,
    chunk: string
): string {
    const { config, chunks } = ctx;
    const input = { ...config.partialInput, ...config.templateInput, ...data };
    const partials = chunks.filter( chunk => chunk.type === 'partial' );
    for( const p of partials ) {
        const signature = `<!--@partial=${p.name}-->`;
        if( chunk.includes( signature ) ) {
            chunk = chunk.replace( signature, p.renderedChunk ?? p.rawFile );
        }
    }

    const newTokens = ParserV2.tokenize( chunk );
    newTokens.keys.forEach( key => chunk = replaceKeyValue( chunk, key, input ) );
    newTokens.loops.forEach( loop => chunk = replaceIteratorKey( chunk, loop, input ) );
    return cleanHTML( chunk, ctx.config.intlCode );
}

export function compile (
    args: CompilerArgs
): string {
    const registry = args.caller_ctx.chunks;
    const match = registry.filter( chunk => chunk.name === args.template_name ).shift();
    const toParse = ParserV2.hasSymbols( match.rawFile );
    // nothing to compile
    if( !toParse ) return match.rawFile;
    const resolved = resolveTokenMap( args.caller_ctx, args.caller_data, match.rawFile );
    return resolved;
}
