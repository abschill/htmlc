/**
 *
 * @param { LoaderContext } config configuration file for loader
 * @returns runtime context for loader
 */
 import { findPartials, findTemplates } from '../../internal/util/fs';
 import { HCL_DEFAULTS } from '../../internal';
 import {
    HTMLChunk,
    toNarrowOptions,
    LoaderContext,
    SSROptions
} from '../../types';

const clean = ( config: toNarrowOptions ):
SSROptions =>
    Object.keys( config ) === Object.keys( HCL_DEFAULTS ) ?
        <SSROptions>config:
        <SSROptions>{...HCL_DEFAULTS, ...config};

export const hydrateConfig = ( config: toNarrowOptions ):
LoaderContext => {
    const hydrated = clean( config );
    const partials = findPartials( hydrated );
    const templates = findTemplates( hydrated );
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
    return <LoaderContext>{...ctx, ...chunks};
};
