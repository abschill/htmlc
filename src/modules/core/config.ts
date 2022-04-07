import { resolve } from 'path';
import { existsSync } from 'fs';
import {
	HCL_DEFAULTS,
	STATIC_DEFAULTS
} from '../../internal';
import {
	SSROptions,
	USSROptions,
	USSGOptions,
	SSGOptions,
	ConfigType,
	ConfigArgType
} from '../../types';

export function genTypedFallbacks(
	type: ConfigType,
	args: ConfigArgType
): ConfigArgType {
	if( type === 'ssg' ) {
		return {...STATIC_DEFAULTS, ...args };
	}
	return {...HCL_DEFAULTS, ...args };
}

export function findConfig(
	type: ConfigType
): ConfigArgType {
    try {
		return tryHCL( type );
    }
    catch( e ) {
        return tryPackage( type );
    }
}

export function tryHCL(
	type: ConfigType
): ConfigArgType {
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

export function tryPackage(
	type: ConfigType
): ConfigArgType {
    try {
        const { hcl_config } = require( resolve( process.cwd(), 'package.json' ) );
        if( !hcl_config.ssr_config ) {
            return HCL_DEFAULTS;
        }
        return type === 'ssr' ? createSSRConfig( hcl_config.ssr_config ): createSSGConfig( hcl_config.ssg_config );
    }
    catch( e ) {
        return type === 'ssr' ? HCL_DEFAULTS : STATIC_DEFAULTS;
    }
}

export function createSSRConfig( conf ?: USSROptions ):
SSROptions {
    if( !conf ) return <SSROptions>findConfig( 'ssr' );
    if( Object.keys( conf ) === Object.keys( HCL_DEFAULTS ) ) return <SSROptions>conf;
    return <SSROptions>{ ...HCL_DEFAULTS, ...conf };
}

export function createSSGConfig( conf ?: USSGOptions ) :
SSGOptions {
	if( !conf ) return <SSGOptions>findConfig( 'ssg' );
	if( Object.keys( conf ) === Object.keys( STATIC_DEFAULTS ) ) return <SSGOptions>conf;
	return <SSGOptions>{...STATIC_DEFAULTS, ...conf};
}
