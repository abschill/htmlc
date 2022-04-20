import {
    CompilerArgs,
    Token,
    LoaderContext,
    HTMLChunk,
    CallerDebugArgs,
    Locale
} from '../types';
import * as ParserV2 from './parser';
import { cleanHTML } from '../util/html';
import { genInlineScope } from './parser/util';
import { checkDebug } from '../config/check-debug';
const { Util, hasSymbols, Constants }  = ParserV2;

function replaceIteratorKey (
    chunk: string,
    loop: Token,
    input: object,
	debug : CallerDebugArgs
): string {
    const raw = loop.raw;
    const outStack = [];
    const matcher = input[loop.name];
    if( !matcher && !debug.errorSuppression ) {
        // handle if err suppression is off
        throw `Error: ${matcher} was not resolvable in ${input}. Aborted`;
    }
	if( !matcher && debug.errorSuppression ) return chunk.replace( loop.raw, '' );
    matcher.forEach( ( entry: string | object ) => {
        const mask = raw.split( Util.genLoopOpenScope( loop.name ) ).pop().split( Constants.ABT_CLOSE_LOOP_SCOPE ).shift().trim();
        if( mask.includes( '{_}' ) ) {
            return outStack.push( mask.replace( '{_}', <string>entry ) );
        }
        // if the array iterator has {foo} and {bar}, the input will be { foo: 'foo', bar: 'bar' }
        outStack.push( ParserV2.mask( mask, <object>entry ) );
    } );
    return chunk.replace( loop.raw, outStack.join( '' ) );
}

function matchWithSubkey (
    input: object,
    splitKeyName: string[],
	debug : CallerDebugArgs
) {
    if( splitKeyName.length === 2 ) {
        const rootAncestor = splitKeyName[0];
        const tailValue = splitKeyName[splitKeyName.length-1];

		if( !tailValue && !debug.errorSuppression ) {
			throw 'Error: tail matcher failed to resolve. Aborted';
		}

        const childValue = input[rootAncestor][tailValue];
		if( !childValue && !debug.errorSuppression ) {
			throw `Error: ${rootAncestor} could not be found, render failed. Please enable error suppression to ignore this error. `;
		}
        return childValue;
    }
    if( splitKeyName.length > 2 ) {
        return splitKeyName.reduce( ( o,i )=> o[i], input );
    }
    return null;
}

function replaceKeyValue (
    chunk: string,
    key: Token,
    input: object,
	debug : CallerDebugArgs
): string {
    if( !key.name.includes( '.' ) ) {
		const value = input[key.name];
		if( !value && !debug.errorSuppression ) {
			throw `Error: Key ${key.name} was not found, render failed. Please enable error suppression to ignore this.`;
		}
        chunk = chunk.replace( key.raw, value );
        return chunk;
    }
    const splitterBase = key.name.split( '.' );
    const matcher = matchWithSubkey( input, splitterBase, debug );

	if( !matcher && !debug.errorSuppression ) {
		throw `Error: Key ${key.name} was not resolvable, render failed. Please enable error suppression to hide this error.`;
	}

    if( !matcher ) return chunk.replace( key.raw, '' );
    return chunk.replace( key.raw, matcher );
}

function tokenMap (
    ctx: LoaderContext,
    data: object,
    chunk: string,
    debug : CallerDebugArgs
): string {
    if( debug.logMode === 'verbose' ) {
        debug.debugger.log( 'parser:tokenize:config', ctx.config );
        debug.debugger.log( 'parser:tokenize:raw', chunk );
        debug.debugger.log( 'parser:tokenize:begin', '\n' );
    }
    const { config, chunks } = ctx;
    const input = { ...config.partialInput, ...config.templateInput, ...data };
    if( debug.logMode === 'verbose' ) debug.debugger.log( 'parser:tokenize:scope-args', input );
    const partials = chunks.filter( chunk => chunk.type === 'partial' );
    for( const p of partials ) {
        const signature = genInlineScope( `${Constants.ABT_PARTIAL_SIGNATURE}=${p.name}` );
        if( chunk.includes( signature ) ) {
            if( debug.logMode === 'verbose' ) debug.debugger.log( 'parser:tokenize:match-partial_signature', signature );
            chunk = chunk.replace( signature, p.renderedChunk ?? p.rawFile );
        }
    }

    const newTokens = ParserV2.tokenize( chunk );
    if( debug.logMode === 'verbose' ) {
        debug.debugger.log( 'parser:tokenize:hydrated-partialdata', newTokens );
        debug.debugger.log( 'parser:tokenize:processing-tempalte', chunk );
    }

    newTokens.keys.forEach( key => chunk = replaceKeyValue( chunk, key, input, debug ) );
    if( newTokens.keys.length > 0 && debug.logMode === 'verbose' ) {
        debug.debugger.log( 'parser:tokenize:hydrated-keydata', chunk );
        debug.debugger.log( 'parser:tokenize:processing-tempalte', chunk );
    }
    newTokens.loops.forEach( loop => chunk = replaceIteratorKey( chunk, loop, input, debug ) );
    if( newTokens.loops.length > 0 && debug.logMode === 'verbose' ) {
        debug.debugger.log( 'parser:tokenize:hydrated-loopdata', chunk );
        debug.debugger.log( 'parser:tokenize:processing-tempalte', chunk );
    }

    return cleanHTML( chunk, ctx.config.intlCode ?? Locale.en_US );
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
    const debugConfig = checkDebug( args.ctx.config.debug );
    if( debugConfig.logMode === 'verbose' || debugConfig.logMode === 'considerate' ) args.debugger.log( 'compiler:resolutions', `Compiling Template ${args.templateName}` );
    const { chunks = [] } = args.ctx;
    const match = filterRegistryChunk( chunks, args.templateName );
    const toParse = hasSymbols( match.rawFile );
    // nothing to compile
    if( !toParse ) return match.rawFile;
    const { errorSuppression } = args.ctx.config;
    return tokenMap( args.ctx, args.callData, match.rawFile, {
        errorSuppression,
        logMode: debugConfig.logMode ?? 'silent',
        logStrategy: debugConfig.logStrategy ?? 'none',
        debugger: args.debugger
    } );
}
