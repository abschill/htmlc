import { HTMLChunk, RenderMap, CompilerArgs, ResolvedMap, LoaderContext } from '../../types';
export default class Compiler {
    static scanTemplateV1(args: CompilerArgs): string;
    static compileTemplateV1(args: CompilerArgs): string;
    static renderV1(declaredPartials: HTMLChunk[], rawFile: string, insertMap: object, lang?: string): string;
    static resolveV1(file: string, renderMap: RenderMap, insertionMap: object): ResolvedMap;
    static renderPartialV5(chunkData: HTMLChunk, insertMap: object): string;
    static preloadChunksV5(ctx: LoaderContext): HTMLChunk[];
    static resolvePartialsV1(renMap: RenderMap, declaredPartials: HTMLChunk[], insertMap: object, rootCopy: string): string;
    static resolveKeysV1(renMap: RenderMap, insertMap: object, rootCopy: string): string;
    static resolveLoopsV1(renMap: RenderMap, insertMap: object, rootCopy: string): string;
    static shimKeysV1: (copy: string, insertMap: object) => string;
    static shimPartialsV1: (copy: string, declaredPartials: HTMLChunk[], insertMap: object) => string;
    static shimLoopsV1: (copy: string, insertMap: object) => string;
}
