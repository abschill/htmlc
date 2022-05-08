import {
	SSROptions,
	SSGOptions,
	DebugEventSignature,
} from '../types';
import {
	FG_COLOR_ESCAPES,
} from '.';
import { getDebug } from '../config';
const _ = console.log;
export function createDebugger (
	options: SSROptions | SSGOptions
) {
	if( !options.debug ) {
		return;
	}
	const config = getDebug( options.debug );

	if( config.logMode === 'silent' || config.logMode === 'considerate' ) {
		return;
	}
	_( FG_COLOR_ESCAPES.blue, 'html-chunk-loader:' );
	_( FG_COLOR_ESCAPES.green, 'debug enabled' );
	function log (
		event_signature: DebugEventSignature,
		data: object | string,
	) {
		_( FG_COLOR_ESCAPES.blue, 'hcl_debug::event_signature: ', FG_COLOR_ESCAPES.white.replace( '%s', '' ), event_signature );
		_( data );
	}

	function err (
		event_signature: DebugEventSignature,
		data: object | string
	) {
		_( FG_COLOR_ESCAPES.red, 'hcl_debug::event_signature: ', FG_COLOR_ESCAPES.white.replace( '%s', '' ), event_signature );

		_( data );
	}

	return { log, err };
}
