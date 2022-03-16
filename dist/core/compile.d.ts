import { core } from '.';
import { compiler, internals } from './internals';
export declare class Compiler {
    static scanTemplate(name: string, args: compiler.Args): string;
    static __renderMap(content: string): compiler.RenderMap;
    static compile(args: compiler.Args): core.template;
    static resolve(file: string, renderMap: compiler.RenderMap, insertionMap: compiler.UINSERT_MAP, debug?: boolean): internals.Resolved<compiler.RenderMap>;
}
