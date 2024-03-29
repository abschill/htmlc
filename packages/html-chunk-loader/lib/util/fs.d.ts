import { ChunkableSplitData, HTMLChunk, HTMLChunkType, SSROptions } from 'htmlc-types';
export declare const __WIN__ = "\\";
export declare const __BSD__ = "/";
export declare const ALLOWED_EXTENSIONS: string[];
export declare const hasValidExtension: (filename: string, isExperimental: boolean) => boolean;
export declare function validFileList(dir: string, isExp: boolean): string[];
export declare function mapPath(splitter: string[], basename: string, sysSplit: string): ChunkableSplitData;
export declare function fileMap(path: string, splitter: string[], basename: string, type: HTMLChunkType): HTMLChunk;
export declare function createFileMap(filepath: string, basepath: string, type: HTMLChunkType): HTMLChunk;
export declare function readValidFSTree(dir: string): string[];
export declare const mapPathList: (paths: string[], base: string, type: HTMLChunkType) => HTMLChunk[];
export declare function usePartials({ partials, pathRoot, discoverPaths, experimentalExtensions, }: SSROptions): HTMLChunk[] | null;
export declare function useTemplates({ templates, pathRoot, discoverPaths, experimentalExtensions, }: SSROptions): HTMLChunk[] | null;
