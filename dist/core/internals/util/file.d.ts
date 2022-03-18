import { core } from '../../';
import { internals } from '..';
export declare class fsUtil {
    static __WIN__: string;
    static __BSD__: string;
    static readDir(dir: string): string[];
    static toStringF(filePath: string): internals.fileUTF8;
    static toJSONF(filePath: string): internals.fileJSON;
    static mapData(filePath: string): internals.FileInputMeta;
    static resolveTemplates(conf: core.Options): internals.FileInputMeta[] | void;
    static resolvePartials(conf: core.Options): internals.FileInputMeta[] | void;
}
