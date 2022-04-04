import { resolve } from 'path';
import { HCL_DEFAULTS } from './internals';
import { SSROptions, USSROptions } from './types';

export function tryJS() {
    try {
        const { ssr_config } = require( resolve( process.cwd(), 'hcl-config.js' ) );
        if( !ssr_config ) return tryPackage();
        return createConfig( ssr_config );
    }
    catch( e ) {
        return tryPackage();
    }
}

export function tryPackage() {
    try {
        const { hcl_config } = require( resolve( process.cwd(), 'package.json' ) );
        if( !hcl_config.ssr_config ) {
            return HCL_DEFAULTS;
        }
        return createConfig( hcl_config.ssr_config );
    }
    catch( e ) {
        return HCL_DEFAULTS;
    }
}

export function findConfig() {
    return tryJS();
}

export function createConfig( conf: USSROptions ): 
SSROptions {
    if( !conf ) return findConfig();
    if( Object.keys( conf ) === Object.keys( HCL_DEFAULTS ) ) return <SSROptions>conf;
    return <SSROptions>{ ...HCL_DEFAULTS, ...conf };
}