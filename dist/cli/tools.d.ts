import { internals } from '../core/internals';
export declare function findConfig(): any;
export declare function ensureOutPath(outPath: string): void;
export declare function readNameData(filePath: string): string;
export declare function getModuleFromBase(filePath: string): object;
export declare function pathify(template: internals.FileInputMeta, contextPath: string): string;
export declare function __write(args: {
    toName: string;
    toWrite: string;
}): number;
