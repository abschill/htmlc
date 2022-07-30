/**
 * @module Config configuration tools for ssr/ssg
 *
 */
import { useSSRConfig } from 'htmlc-config';
import { SSROptions, USSROptions, LoaderContext } from 'htmlc-types';
import { usePartials, useTemplates } from '../util';
/**
 * @function hydrateConfig
 * @description Hydrate loader context with chunks + config
 * @param config SSROptions | USSROptions
 */
export function hydrateRuntimeConfig(
	config: SSROptions | USSROptions
): LoaderContext {
	const hydrated = useSSRConfig(config);
	const partials = usePartials(hydrated);
	const templates = useTemplates(hydrated);
	return partials && templates
		? {
				config: hydrated,
				chunks: [...partials, ...templates],
		  }
		: {
				config: hydrated,
				chunks: [],
		  };
}

export * from 'htmlc-config';
