import { SSROptions, SSGOptions } from '../types';
export declare function createDebugger(options: SSROptions | SSGOptions): {
    log: (event: any, msg: any) => void;
};
