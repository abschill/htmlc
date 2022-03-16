/**
 *
 * @param { Runtime.Options } config configuration file for engine
 * @returns context for engine
 */
import { core } from '../../';
import { fsUtil } from './file';
import { _DEFAULTS } from "..";

export default ( config: core.Options ):
	core.Context => {
		const hydrated = __clean( config );
		return  {
		config: hydrated,
		partials: fsUtil.resolvePartials( config ),
		templates: fsUtil.resolveTemplates( config )
	}
}

const __clean = ( config: core.Options ):
	core.ROptions =>
	Object.keys( config ) === Object.keys( _DEFAULTS ) ?
		config as core.ROptions:
		{ ..._DEFAULTS, ...config  } as core.ROptions;
