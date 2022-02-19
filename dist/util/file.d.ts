import { Runtime } from '../loader';
import { hclFS } from '../render/internals';
export declare const _files: (dir: string) => string[];
export declare const resolvePartials: (conf: Runtime.Options) => hclFS.FileInputMeta[];
export declare const resolveTemplates: (conf: Runtime.Options) => hclFS.FileInputMeta[];
export declare const mapFileData: (filePath: string) => hclFS.FileInputMeta;
