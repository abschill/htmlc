import {
	SSROptions,
	SSGOptions,
	DebugEventSignature,
} from '../types';
import { 
	FG_COLOR_ESCAPES, 
} from '.';
import { checkDebug } from '../core/config';
const c = console.log;
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
	c( '\x1b[42m%s\x1b[37m', 'html-chunk-loader: ', '\x1b[47m', 'debug enabled\n' );
	
	function log ( 
		event_signature: DebugEventSignature, 
		data: object | string,
	) {
		c( FG_COLOR_ESCAPES.blue, 'html-chunk-loader:', '\x1b[37m', event_signature );
		c( data );
	}

	return { log };
}