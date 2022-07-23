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
	UUDebugConfig,
	DebugConfig,
	LogMode,
    LogStrategy,
    GlobalOptions,
    toLocale
} from 'htmlc-types';

export function wrap<T>(
	t: () => T,
	c: () => T
): T {
	try { return t(); }
	catch(_) { return c(); }
}

export const DEBUG_DEFAULTS:
DebugConfig = {
    logMode: <LogMode>'silent',
    logStrategy: <LogStrategy>'silent',
    logFile: null
};

export const DEBUG_BOOLTRUE:
DebugConfig = {
    logMode: <LogMode>'verbose',
    logStrategy: <LogStrategy>'stdout',
    logFile: null
};

export const __DEFAULTS__:
GlobalOptions = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    discoverPaths: true,
    intlCode: toLocale('en'),
    errorSuppression: false,
	experimentalExtensions: false,
    debug: <DebugConfig>DEBUG_DEFAULTS
};

export const SSR_DEFAULTS:
SSROptions = {
    ...<GlobalOptions>__DEFAULTS__,
    watch: false
};

export const SSG_DEFAULTS:
SSGOptions = {
	...<GlobalOptions>__DEFAULTS__,
    outPath: 'public',
    loaderFile: 'hcl-config.js',
    cleanup: true
};

export const FULL_DEFAULTS = {
    ssr_config: SSR_DEFAULTS,
    ssg_config: SSG_DEFAULTS,
    fallbacks: {}
};
export function genTypedFallbacks(
	type: ConfigStringType,
	args: ConfigType
): ConfigType {
	return type === 'ssg'
		? { ...SSG_DEFAULTS, ...args }
		: { ...SSR_DEFAULTS, ...args };
}

export function useConfig(type: ConfigStringType): ConfigType {
	return wrap(
		() => tryHCL(type),
		() => tryPackage(type)
	);
}

export function tryPath(sig: string, type: ConfigStringType, pt: string) {
	const p = resolve(process.cwd(), pt);
	if(existsSync(p)) return genTypedFallbacks(type, require(p)[sig]);
	return null;
}

export function tryHCL(type: ConfigStringType): ConfigType {
	const sig = `${type}_config`;
	const jsPath0 = tryPath(sig, type, 'hcl-config.js');
	if(jsPath0) return jsPath0;
	const jsonPath = tryPath(sig, type, 'hcl-config.json');
	if(jsonPath) return jsonPath;
	const jsPath1 = tryPath(sig, type, 'hcl_config.js');
	if(jsPath1) return jsPath1;

	console.error(
		color.fg.red('path root doesnt exist: '),
		`${process.cwd()}/${jsonPath} or ${process.cwd()}/${jsPath0} or ${process.cwd()}/${jsPath1}`
	);
	process.exit(1);
}

export function tryPackage(type: ConfigStringType): ConfigType {
	try {
		const { hcl_config } = require(resolve(process.cwd(), 'package.json'));
		if (!hcl_config.ssr_config) {
			return SSR_DEFAULTS;
		}
		return type === 'ssr'
			? useSSRConfig(hcl_config.ssr_config)
			: useSSGConfig(hcl_config.ssg_config);
	} catch (e) {
		return type === 'ssr' ? SSR_DEFAULTS : SSR_DEFAULTS;
	}
}

export function useSSRConfig(conf?: USSROptions): SSROptions {
	if (!conf) return <SSROptions>useConfig('ssr');
	if (Object.keys(conf) === Object.keys(SSR_DEFAULTS))
		return <SSROptions>conf;
	return <SSROptions>{ ...SSR_DEFAULTS, ...conf };
}

export function useSSGConfig(conf?: USSGOptions): SSGOptions {
	if (!conf) return <SSGOptions>useConfig('ssg');
	if (Object.keys(conf) === Object.keys(SSG_DEFAULTS))
		return <SSGOptions>conf;
	return <SSGOptions>{ ...SSG_DEFAULTS, ...conf };
}


export function useDebug(opt: UUDebugConfig): DebugConfig {
	if (typeof opt === 'boolean')
		return opt === true ? DEBUG_BOOLTRUE : DEBUG_DEFAULTS;
	return { ...DEBUG_DEFAULTS, ...opt };
}
