import { RenderMap, UINSERT_MAP, coreEventArgs, coreEventName } from './types';
export default class Debugger {
    static _registerEvent(...args: coreEventArgs<coreEventName>): void;
    static raise(m: any): void;
    static stamp(msg: object | string, label: string): void;
    static _registerMap(rmap: RenderMap, imap: UINSERT_MAP): void;
    static _finalize(args: {
        raw: string;
        render: string;
    }): void;
}
