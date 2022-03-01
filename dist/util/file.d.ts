import { core } from '../loader';
import { internals } from '../core/internals';
export declare const _files: (dir: string) => string[];
export declare const resolvePartials: (conf: core.Options) => internals.FileInputMeta[];
export declare const resolveTemplates: (conf: core.Options) => internals.FileInputMeta[];
export declare const mapFileData: (filePath: string) => internals.FileInputMeta;
