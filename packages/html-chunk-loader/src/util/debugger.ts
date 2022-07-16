import { color } from 'terminal-color';
import { useDebug } from '../config';
import {
	SSROptions,
	SSGOptions,
	DebugEventSignature,
} from 'htmlc-types';

const _ = console.log;
export function createDebugger (
	options: SSROptions | SSGOptions
) {
	if(!options.debug) {
		return;
	}
	const config = useDebug(options.debug);

	if(config.logMode === 'silent' || config.logMode === 'considerate') {
		return;
	}
	_(color.fg.blue('html-chunk-loader:'));
	_(color.fg.green('debug enabled'));
	function log (
		event_signature: DebugEventSignature,
		data: object | string,
	) {
		_(color.fg.blue('htmlc::event_signature: '), event_signature);
		_(data);
	}

	function err (
		event_signature: DebugEventSignature,
		data: object | string
	) {
		_(color.fg.red('htmlc::event_signature: '), event_signature);

		_(data);
	}

	return { log, err };
}
