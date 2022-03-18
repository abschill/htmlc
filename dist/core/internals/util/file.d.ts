import { fileUTF8, fileJSON, FileInputMeta, Options } from '../types';
export declare class fsUtil {
    static __WIN__: string;
    static __BSD__: string;
    static readDir(dir: string): string[];
    static toStringF(filePath: string): fileUTF8;
    static toJSONF(filePath: string): fileJSON;
    static mapData(filePath: string): FileInputMeta;
    static resolveTemplates(conf: Options): FileInputMeta[] | void;
    static resolvePartials(conf: Options): FileInputMeta[] | void;
}
