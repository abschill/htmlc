import { coreEvent, compiler } from ".";
export default class Debugger {
    static _registerEvent(...args: coreEvent.Args<coreEvent.Name>): void;
    static raise(m: any): void;
    static stamp(msg: object | string, label: string): void;
    static _registerMap(rmap: compiler.RenderMap, imap: compiler.UINSERT_MAP): void;
    static _finalize(args: {
        raw: string;
        render: string;
    }): void;
}
