import { HTMLChunk } from '../../types';
export declare function ensureOutPath(outPath: string): void;
export declare function pathify(template: HTMLChunk, contextPath: string): string;
export declare function __write(args: {
    toName: string;
    toWrite: string;
}): number;
