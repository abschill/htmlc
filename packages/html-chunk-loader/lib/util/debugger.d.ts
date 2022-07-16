import { SSROptions, SSGOptions, DebugEventSignature } from 'htmlc-types';
export declare function createDebugger(options: SSROptions | SSGOptions): {
    log: (event_signature: DebugEventSignature, data: object | string) => void;
    err: (event_signature: DebugEventSignature, data: object | string) => void;
};
