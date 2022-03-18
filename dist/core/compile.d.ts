import { FileInputMeta, RenderMap, Args, RTemplate, UINSERT_MAP, Resolved } from './internals/types';
export default class Compiler {
    static scanTemplate(args: Args): string;
    static __renderMap(content: string): RenderMap;
    static compile(args: Args): RTemplate;
    static resolve(file: string, renderMap: RenderMap, insertionMap: UINSERT_MAP, debug?: boolean): Resolved<RenderMap>;
    static resolveDeclaredPartials(renMap: RenderMap, declaredPartials: FileInputMeta[], insertMap: UINSERT_MAP, rootCopy: string): string;
    static resolveDeclaredKeys(renMap: RenderMap, insertMap: UINSERT_MAP, rootCopy: string): string;
    static resolveDeclaredLoops(renMap: RenderMap, insertMap: UINSERT_MAP, rootCopy: string): string;
}
