import { SSROptions, SSGOptions, DebugEventSignature } from '../types';
export declare function createDebugger(options: SSROptions | SSGOptions): {
    log: (event_signature: DebugEventSignature, data: object | string) => void;
};
