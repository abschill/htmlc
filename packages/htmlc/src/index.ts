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
import { readValidFSTree } from './util';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { compile, render } from 'htmlc-compiler';
import { AST_MAP } from 'htmlc-types';

export type HTMLCLoaderOptions = {
	chunks?: string; // directory to look for relative to process.cwd() default: views
	partials?: string;
	pages?: string;
	preloads?: object; // constructor fallback for partial variables - default {}
};

export type PreparedHTMLChunkData = {
	name: string;
	path: string;
	raw: string;
};

export type RenderedHTMLChunkData = PreparedHTMLChunkData & {
	render: string;
};

export const DefaultConfig: Required<HTMLCLoaderOptions> = {
	chunks: 'views',
	partials: 'partials',
	pages: 'pages',
	preloads: {},
};

export function useConfig(
	root: string,
	options: HTMLCLoaderOptions
): Required<HTMLCLoaderOptions> {
	const match = readdirSync(root).filter((file) => file === 'htmlc.json');
	if (match.length === 0) return { ...DefaultConfig, ...options };
	const file = readFileSync(resolve(root, match[0]));
	const config = JSON.parse(file.toString());
	return <Required<HTMLCLoaderOptions>>{
		...DefaultConfig,
		...config,
		...options,
	};
}

export function prepareChunks(raw: string[]): PreparedHTMLChunkData[] {
	const prepared: PreparedHTMLChunkData[] = [];
	for (const page of raw) {
		const content = readFileSync(page).toString();
		const name = page.split('/').pop().split('.').shift();
		prepared.push({
			name,
			path: page,
			raw: content
		});
	}
	return prepared;
}

/**
 * @function useLoader factory function for Loader
 * Rendering Context for templates
 * @returns Loader from config options
 */
export function useLoader(options?: HTMLCLoaderOptions) {
	const cwd = process.cwd();
	const config = useConfig(cwd, options ?? {});
	const rawChunks = readValidFSTree(config.chunks);
	const rawPartials = readValidFSTree(join(config.chunks, config.partials));
	const rawPages = readValidFSTree(join(config.chunks, config.pages));

	const chunkData = {
		pages: prepareChunks(rawPages),
		partials: prepareChunks(rawPartials),
	};
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
	// function template(name: string, data?: object): HTMLPage {
	// 	try {
	// 		return compile({
	// 			templateName: name,
	// 			ctx: ctx,
	// 			callData: data,
	// 		});
	// 	} catch (e) {
	// 		return `HTMLC Render Error: ${JSON.stringify(e)}`;
	// 	}
	// }

	return {
		config,
		_basePath: cwd,
		_chunkData: chunkData,
		_rawChunks: rawChunks,
		_rawPartials: rawPartials,
		_rawPages: rawPages,
		_ffOptions: options,
	};
}
