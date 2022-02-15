import { Runtime } from '../loader';
import { FileInputMeta } from '../internals';
export declare const _files: (dir: string) => string[];
export declare const resolvePartials: (conf: Runtime.Options) => FileInputMeta[];
export declare const resolveTemplates: (conf: Runtime.Options) => FileInputMeta[];
export declare const mapFileData: (filePath: string) => FileInputMeta;
