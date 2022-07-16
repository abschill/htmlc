/**
 * @module Config configuration tools for ssr/ssg
 *
 */
import { resolve } from 'path';
import { existsSync } from 'fs';
import { color } from 'terminal-color';
import {
	SSROptions,
	USSROptions,
	USSGOptions,
	SSGOptions,
	ConfigStringType,
	ConfigType,
	LoaderContext,
	UUDebugConfig,
	DebugConfig
} from 'htmlc-types';
import {
	usePartials,
	useTemplates,
	__DEFAULTS__,
	DEBUG_BOOLTRUE,
	DEBUG_DEFAULTS,
	SSR_DEFAULTS,
	SSG_DEFAULTS,
	wrap
} from '../util';

export function genTypedFallbacks (
	type: ConfigStringType,
	args: ConfigType
): ConfigType {
	return type === 'ssg' ? {...SSG_DEFAULTS, ...args} : {...SSR_DEFAULTS, ...args};
}

export function useConfig (
	type: ConfigStringType
): ConfigType {
	return wrap(() => tryHCL(type), () => tryPackage(type));
}

export function tryHCL (
	type: ConfigStringType
): ConfigType {
	const sig = `${type}_config`;
	const jsPath = resolve(process.cwd(), 'hcl-config.js');
	if(existsSync(jsPath)) {
		return genTypedFallbacks(type, require(jsPath)[`${sig}`]);
	}
	else {
		const jsonPath = resolve(process.cwd(), 'hcl-config.json');
		if(existsSync(jsonPath)) {
			return genTypedFallbacks(type, require(jsonPath)[`${sig}`]);
		}
		else {
			console.error(color.fg.red('path root doesnt exist: '), `${process.cwd()}/${jsonPath} or ${process.cwd()}/${jsPath}`);
			process.exit(1);
		}
	}
}

export function tryPackage (
	type: ConfigStringType
): ConfigType {
    try {
        const { hcl_config } = require(resolve(process.cwd(), 'package.json'));
        if(!hcl_config.ssr_config) {
            return SSR_DEFAULTS;
        }
        return type === 'ssr' ? useSSRConfig(hcl_config.ssr_config): useSSGConfig(hcl_config.ssg_config);
    }
    catch(e) {
        return type === 'ssr' ? SSR_DEFAULTS : SSR_DEFAULTS;
    }
}

export function useSSRConfig (
	conf ?: USSROptions
): SSROptions {
    if(!conf) return <SSROptions>useConfig('ssr');
    if(Object.keys(conf) === Object.keys(SSR_DEFAULTS)) return <SSROptions>conf;
    return <SSROptions>{...SSR_DEFAULTS, ...conf};
}

export function useSSGConfig (
	conf ?: USSGOptions
): SSGOptions {
	if(!conf) return <SSGOptions>useConfig('ssg');
	if(Object.keys(conf) === Object.keys(SSG_DEFAULTS)) return <SSGOptions>conf;
	return <SSGOptions>{...SSG_DEFAULTS, ...conf};
}

/**
 * @function hydrateConfig
 * @description Hydrate loader context with chunks + config
 * @param config SSROptions | USSROptions
 */
 export function hydrateRuntimeConfig (
    config: SSROptions | USSROptions
): LoaderContext {
    const hydrated = useSSRConfig(config);
    const partials = usePartials(hydrated);
    const templates = useTemplates(hydrated);
    return (partials && templates) ? {
        config: hydrated,
        chunks: [...partials, ...templates]
    } : {
        config: hydrated,
        chunks: []
    };
}

export function useDebug (
    opt: UUDebugConfig
): DebugConfig {
    if(typeof opt === 'boolean')  return opt === true ? DEBUG_BOOLTRUE: DEBUG_DEFAULTS;
	return {...DEBUG_DEFAULTS, ...opt};
}

