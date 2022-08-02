import { AST_MAP } from 'htmlc-types';
export declare type HTMLCLoaderOptions = {
    chunks?: string;
    partials?: string;
    pages?: string;
    preloads?: object;
};
export declare type PreparedHTMLChunkData = {
    name: string;
    path: string;
    raw: string;
    _tokens: AST_MAP;
};
export declare type RenderedHTMLChunkData = PreparedHTMLChunkData & {
    render: string;
};
export declare const DefaultConfig: Required<HTMLCLoaderOptions>;
export declare function useConfig(root: string, options: HTMLCLoaderOptions): Required<HTMLCLoaderOptions>;
export declare function prepareChunks(raw: string[]): PreparedHTMLChunkData[];
export declare function useLoader(options?: HTMLCLoaderOptions): {
    config: Required<HTMLCLoaderOptions>;
    _basePath: string;
    _chunkData: {
        pages: PreparedHTMLChunkData[];
        partials: PreparedHTMLChunkData[];
    };
    _rawChunks: string[];
    _rawPartials: string[];
    _rawPages: string[];
    _ffOptions: HTMLCLoaderOptions;
};
