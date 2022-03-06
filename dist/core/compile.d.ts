import { core } from '../loader';
import { compiler, internals } from './internals';
export default function compile(args: compiler.Args): core.template;
export declare function __renderMap(content: string): compiler.RenderMap;
export declare function resolve(file: string, renderMap: compiler.RenderMap, insertionMap: compiler.UINSERT_MAP, debug?: boolean): internals.Resolved<compiler.RenderMap>;
