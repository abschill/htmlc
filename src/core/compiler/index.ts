import {
    CompilerArgs, 
    Token,
    LoaderContext,
    HTMLChunk,
    DebugConfig
} from '../../types';
import * as ParserV2 from './parser';
import { cleanHTML } from '../../util/html';

function replaceIteratorKey (
    chunk: string,
    loop: Token,
    input: object
): string {
    const rawContext = loop.raw;
    const outStack = [];
    input[loop.name]?.forEach( ( entry: string | object ) => {
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

function matchInputWithSubkey (
    input: object,
    splitKeyName: string[]
) {
    if( splitKeyName.length === 2 ) {
        const rootAncestor = splitKeyName[0];
        const tailValue = splitKeyName[splitKeyName.length-1];
        const childValue = input[rootAncestor][tailValue];
        return childValue;
    }
    if( splitKeyName.length > 2 ) {
        const t = splitKeyName.reduce( ( o,i )=> o[i], input );
        return t;
    }
    return null;
}

function replaceKeyValue (
    chunk: string,
    key: Token,
    input: object
): string {
    if( !key.name.includes( '.' ) ) {
        chunk = chunk.replace( key.raw, input[key.name] );
        return chunk;
    }
    const splitterBase = key.name.split( '.' );
    const matcher = matchInputWithSubkey( input, splitterBase );
    if( !matcher ) return chunk.replace( key.raw, '' );
    return chunk.replace( key.raw, matcher );
}


function resolveTokenMap (
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

function filterRegistryChunk(
    registry: HTMLChunk[],
    name: string
): HTMLChunk {
    return registry.filter( chunk => chunk.name === name ).shift();
}

export function compile (
    args: CompilerArgs
): string {
    const debugOpts = <DebugConfig>args.caller_ctx.config.debug; 
    const { debug } = args;
    const toWrite = debugOpts.logMode === 'verbose';
    if( toWrite ) debug.log( 'compiler:resolutions', `Compiling Template ${args.template_name}` );
    const { chunks = [] } = args.caller_ctx;
    const match = filterRegistryChunk( chunks, args.template_name );
    const toParse = ParserV2.hasSymbols( match.rawFile );
    // nothing to compile
    if( !toParse ) return match.rawFile;
    const resolved = resolveTokenMap( args.caller_ctx, args.caller_data, match.rawFile );
    return resolved;
}
