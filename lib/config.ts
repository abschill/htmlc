import { resolve } from 'path';
import { HCL_DEFAULTS } from './core/internals';

function tryBest() {
    try {
        const { ssr_config } = require( resolve( process.cwd(), 'hcl-config.js' ) );
        if( !ssr_config ) return tryPackage();
        return ssr_config;
    }
    catch( e ) {
        return tryPackage();
    }
}

function tryPackage() {
    try {
        const { hcl_config } = require( resolve( process.cwd(), 'package.json' ) );
        if( !hcl_config.ssr_config ) {
            return HCL_DEFAULTS;
        }
        return hcl_config.ssr_config;
    }
    catch( e ) {
        return HCL_DEFAULTS;
    }
}

export default function findConfig() {
    return tryBest();
}