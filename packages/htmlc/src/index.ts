/**
 * @module Loader
 *  @example Calling the imported Loader module factory function
 * ```javascript
 * import { useLoader } from '@htmlc/core'
 * const myLoader = useLoader();
 * ```
 * @example Render templates by name from the loader, and optionally apply / override data from the constructor
 * ```javascript
 * myLoader.template('home', { ...homeData } );
 * ```
 */
import {
	HTMLChunkLoader,
	USSROptions,
	LoaderContext,
	SSROptions,
	HTMLPage,
	Debugger,
} from 'htmlc-types';
import { hydrateRuntimeConfig, useSSRConfig } from './config';
import { watch } from 'fs';
import { createDebugger } from './util/debugger';
import { compile } from 'htmlc-compiler';
import { DEBUG_DEFAULTS, DEBUG_BOOLTRUE } from 'htmlc-config';
/**
 * @function useLoader factory function for Loader
 * @description Rendering Context for templates
 * @returns Loader from config options
 * @param config user config options
 */
export function useLoader(config?: USSROptions): HTMLChunkLoader {
	const hcl_config: SSROptions = useSSRConfig(config);
	let dbg: Debugger = null;

	//i think next y version we will either fix this or remove the boolean option bc its getting annoying lol
	if (typeof hcl_config.debug === 'boolean' && hcl_config.debug === true) {
		const o = { ...hcl_config, debug: DEBUG_BOOLTRUE };
		dbg = createDebugger(o);
	} else if (!hcl_config.debug || typeof hcl_config.debug === 'object') {
		dbg = createDebugger({ debug: DEBUG_DEFAULTS, ...hcl_config });
	}

	let ctx: LoaderContext = hydrateRuntimeConfig(hcl_config);
	if (ctx.config.watch) {
		ctx.chunks.forEach((file) => {
			watch(file.path, (eventType, filename) => {
				if (eventType === 'change') {
					if (
						ctx.config.debug === true ||
						(ctx.config.debug &&
							typeof ctx.config.debug !== 'boolean' &&
							ctx.config.debug.logMode !== 'silent')
					)
						dbg.log('file:change', `Chunk Updated at: ${filename}`);
					ctx = hydrateRuntimeConfig(hcl_config);
				}
			});
		});
	}

	/**
	 * @function template
	 * Name of Template to Load
	 * data to override fallback data for given template
	 * @returns {HTMLPage} the template's rendered content
	 * @example
	 * ```javascript
	 * Loader.template( 'home', {...homeData} );
	 * ```
	 * @param name
	 * @param data
	 */
	function template(name: string, data?: object): HTMLPage {
		try {
			return compile({
				templateName: name,
				ctx: ctx,
				callData: data,
				debugger: dbg,
			});
		} catch (e) {
			return `HTMLC Render Error: ${JSON.stringify(e)}`;
		}
	}

	return { ctx, template };
}

/**
 * @internal
 * @private
 * @deprecated
 * @description old name of entry point
 */
export function createLoader(u_config?: USSROptions): HTMLChunkLoader {
	return useLoader(u_config);
}
