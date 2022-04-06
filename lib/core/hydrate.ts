/**
 *
 * @param { LoaderContext } config configuration file for loader
 * @returns runtime context for loader
 */
 import { findPartials, findTemplates } from './internals/util/fs';
 import { HCL_DEFAULTS } from './internals';
 import {
    HTMLChunk,
    toNarrowOptions,
    LoaderContext,
    SSROptions
} from './types';

const clean = ( config: toNarrowOptions ):
SSROptions =>
    Object.keys( config ) === Object.keys( HCL_DEFAULTS ) ?
        config as SSROptions:
        {...HCL_DEFAULTS, ...config} as SSROptions;

export const hydrateConfig = ( config: toNarrowOptions ):
LoaderContext => {
    const hydrated = clean( config );
    const partials = findPartials( config as SSROptions );
    const templates = findTemplates( config as SSROptions );
    return ( partials && templates ) ? {
        config: hydrated,
        chunks: [...partials, ...templates]
    } : {
        config: hydrated,
        chunks: []
    };
};

export const hydrateChunks = ( ctx: LoaderContext, chunks: HTMLChunk[] ):
LoaderContext => {
    return { ...ctx, ...chunks };
};
