import { CompilerArgs, LoaderContext } from 'htmlc-types';
export declare function render(chunk: string, input: object, intlCode?: string): string;
export declare function useRenderContext(ctx: LoaderContext, data: object, chunk: string): string;
export declare function compile(args: CompilerArgs): string;
