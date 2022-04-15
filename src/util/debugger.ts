import {
	GlobalOptions,
	SSROptions,
	SSGOptions,
	LogStrategy,
	LogMode,
	DebugEventType,
	DebugEventSignature,
	DebugConfig,
	UDebugConfig,
	AnyLoadConfig
} from '../types';
import {
	join,
	resolve
} from 'path';
import {
	writeFileSync,
	appendFileSync,
	existsSync
} from 'fs';
import { 
	SSR_DEFAULTS, 
	FG_COLOR_ESCAPES, 
	HCL_EVENT_MAP, 
	DEBUG_DEFAULTS 
} from '.';
const c = console;
import { checkDebug } from '../core/config';
export function createDebugger( 
	options: SSROptions | SSGOptions
) {
	if( !options.debug ) {
		return;
	}
	const config = checkDebug( options.debug );

	if( config.logMode === 'silent' ) {
		return;
	}
	c.log( FG_COLOR_ESCAPES.green, 'html-chunk-loader: config loaded\n' );
	c.log( FG_COLOR_ESCAPES.green, config );
	
	function log ( 
		event_signature: DebugEventSignature, 
		data: unknown 
	) {
		c.log( FG_COLOR_ESCAPES.blue, `html-chunk-loader: ${event_signature}` );
		c.log( <string>data );
	}

	return { log };
}