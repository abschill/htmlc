import { RenderMap, Args, RTemplate, UINSERT_MAP, Resolved } from './internals/types';
export default class Compiler {
    static scanTemplate(args: Args): string;
    static __renderMap(content: string): RenderMap;
    static compile(args: Args): RTemplate;
    static resolve(file: string, renderMap: RenderMap, insertionMap: UINSERT_MAP, debug?: boolean): Resolved<RenderMap>;
}
