import { resolve } from 'path';
import { HCL_DEFAULTS } from './core/internals';

export default function findConfig() {
    try {
        const low_prio = require( resolve( process.cwd(), 'package.json' ) );
        const high_prio = require( resolve( process.cwd(), 'hcl-config.js' ) );
        if( ( !high_prio || !high_prio?.ssr_config ) && low_prio?.hcl_config?.ssr_config ) return {...HCL_DEFAULTS, ...low_prio.hcl_config.ssr_config };
        if( ( high_prio && high_prio?.ssr_config ) ) return {...HCL_DEFAULTS, ...high_prio.ssr_config};
        return HCL_DEFAULTS;
    }
    catch( e ) {
        return HCL_DEFAULTS;
    }
}