/**
 *
 * @param { Runtime.Options } config configuration file for engine
 * @returns context for engine
 */
import { core } from '../loader';
import { resolvePartials, resolveTemplates } from './file';
import { _DEFAULTS } from "../core/internals";

export default ( config: core.Options ):
	core.Context => {
		const hydrated = __clean( config );
		return  {
		config: hydrated,
		partials: resolvePartials( config ),
		templates: resolveTemplates( config )
	}
}

const __clean = ( config: core.Options ):
	core.ROptions =>
	Object.keys( config ) === Object.keys( _DEFAULTS ) ?
		config as core.ROptions:
		{ ..._DEFAULTS, ...config  } as core.ROptions;
