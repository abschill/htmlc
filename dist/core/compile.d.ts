import { core } from '.';
import { compiler, internals } from './internals';
export default class Compiler {
    static scanTemplate(args: compiler.Args): string;
    static __renderMap(content: string): compiler.RenderMap;
    static compile(args: compiler.Args): core.template;
    static resolve(file: string, renderMap: compiler.RenderMap, insertionMap: compiler.UINSERT_MAP, debug?: boolean): internals.Resolved<compiler.RenderMap>;
}
