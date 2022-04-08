import { HTMLChunk, toNarrowOptions, LoaderContext } from '../../types';
export declare const hydrateConfig: (config: toNarrowOptions) => LoaderContext;
export declare const hydrateChunks: (ctx: LoaderContext, chunks: HTMLChunk[]) => LoaderContext;
