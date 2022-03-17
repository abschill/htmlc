import { core } from '../../';
import { internals } from '..';
export declare class fsUtil {
    static readDir(dir: string): string[];
    static loadUTF8(filePath: string): internals.fileUTF8;
    static mapData(filePath: string): internals.FileInputMeta;
    static resolveTemplates(conf: core.Options): internals.FileInputMeta[] | void;
    static resolvePartials(conf: core.Options): internals.FileInputMeta[] | void;
}
