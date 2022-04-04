#!/usr/bin/env node
/**
 * @module ssg-cli
 */
 import { 
    ensureOutPath,
    pathify,
    __write
} from './tools';
import { resolve } from 'path';
import { STATIC_DEFAULTS } from '../../core/internals';
import { SSGOptions, USSGOptions } from '../../core/types';
import { createLoader } from '../../loader';
export function tryJS(): SSGOptions {
    try {
        const { ssg_config } = require( resolve( process.cwd(), 'hcl-config.js' ) );
        if( !ssg_config ) return tryPackage();
        return createConfig( ssg_config );
    }
    catch( e ) {
        return tryPackage();
    }
}

export function tryPackage(): SSGOptions {
    try {
        const { hcl_config } = require( resolve( process.cwd(), 'package.json' ) );
        if( !hcl_config.ssg_config ) {
            return STATIC_DEFAULTS;
        }
        return createConfig( hcl_config.ssg_config );
    }
    catch( e ) {
        return STATIC_DEFAULTS;
    }
}

export function findConfig(): SSGOptions {
    return tryJS();
}

export function createConfig( conf: USSGOptions ): 
SSGOptions {
    if( !conf ) return findConfig();
    if( Object.keys( conf ) === Object.keys( STATIC_DEFAULTS ) ) return <SSGOptions>conf;
    return <SSGOptions>{ ...STATIC_DEFAULTS, ...conf };
}
/** 
 * @function ssg 
 * @description command line interface for ssg templates
 * @example 
 * ```npx html-chunk-loader ssg```
*/
export function ssg():
void {
    const static_config: SSGOptions = findConfig();
    ensureOutPath( static_config.outPath );
    try {
        const ctx = createLoader( static_config );
        ctx.ctx.chunks.filter( chunk => chunk.type === 'template' ).forEach( template => {
            const fileData = {
                toName: pathify( template, static_config.outPath ),
                toWrite: ctx.template( template.name )
            };
            __write( fileData );
            return;
        } );
    }
    catch( e ) {
        console.warn( e );
    }
}

ssg();
