import { resolve } from 'path';
import { existsSync } from 'fs';
import {
	SSR_DEFAULTS,
	SSG_DEFAULTS,
	wrap
} from '../../util';
import {
	SSROptions,
	USSROptions,
	USSGOptions,
	SSGOptions,
	ConfigStringType,
	ConfigType
} from '../../types';

export function genTypedFallbacks (
	type: ConfigStringType,
	args: ConfigType
): ConfigType {
	if( type === 'ssg' ) {
		return {...SSG_DEFAULTS, ...args};
	}
	return {...SSR_DEFAULTS, ...args};
}

export function findConfig (
	type: ConfigStringType
): ConfigType {
	return wrap( () => tryHCL( type ), () => tryPackage( type ) );
}

export function tryHCL (
	type: ConfigStringType
): ConfigType {
	const sig = `${type}_config`;
	const jsPath = resolve( process.cwd(), 'hcl-config.js' );
	if( existsSync( jsPath ) ) {
		return genTypedFallbacks( type, require( jsPath )[`${sig}`] );
	}
	else {
		const jsonPath = resolve( process.cwd(), 'hcl-config.json' );
		if( existsSync( jsonPath ) ) {
			return genTypedFallbacks( type, require( jsonPath )[`${sig}`] );
		}
		else {
			throw new Error( 'Config Path Error' );
		}
	}
}

export function tryPackage (
	type: ConfigStringType
): ConfigType {
    try {
        const { hcl_config } = require( resolve( process.cwd(), 'package.json' ) );
        if( !hcl_config.ssr_config ) {
            return SSR_DEFAULTS;
        }
        return type === 'ssr' ? createSSRConfig( hcl_config.ssr_config ): createSSGConfig( hcl_config.ssg_config );
    }
    catch( e ) {
        return type === 'ssr' ? SSR_DEFAULTS : SSR_DEFAULTS;
    }
}

export function createSSRConfig ( 
	conf ?: USSROptions 
): SSROptions {
    if( !conf ) return <SSROptions>findConfig( 'ssr' );
    if( Object.keys( conf ) === Object.keys( SSR_DEFAULTS ) ) return <SSROptions>conf;
    return <SSROptions>{...SSR_DEFAULTS, ...conf};
}

export function createSSGConfig ( 
	conf ?: USSGOptions 
): SSGOptions {
	if( !conf ) return <SSGOptions>findConfig( 'ssg' );
	if( Object.keys( conf ) === Object.keys( SSG_DEFAULTS ) ) return <SSGOptions>conf;
	return <SSGOptions>{...SSG_DEFAULTS, ...conf};
}

export * from './hydrate';