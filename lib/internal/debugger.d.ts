import { toLoadOptions, SSROptions, LogStrategy, LogMode, DebugEventSignature, RuntimeEvent, RT_EVENT_DATA } from '../types';
export declare const FG_COLOR_ESCAPES: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
};
export declare const BG_COLOR_ESCAPES: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
};
export declare class Debugger {
    runtimeOptions: SSROptions;
    logMode: LogMode;
    logStrategy: LogStrategy;
    logFile?: string;
    silent: boolean;
    constructor(conf: toLoadOptions);
    get_logpath(): string;
    success(e: RuntimeEvent): void;
    std_init_success(): void;
    std_load_template(event_data: RT_EVENT_DATA): void;
    status(e: RuntimeEvent | string, isEvent?: boolean): void;
    append_line(__path: string, s?: string): void;
    event_to_file(e: RuntimeEvent): void;
    init(): void;
    handleEvent(sig: DebugEventSignature, data?: any): RuntimeEvent;
    logEventNormal(e: RuntimeEvent | string): void;
    logEventFile(e: RuntimeEvent): void;
    event(name: DebugEventSignature, data: any): void;
}
export default function createDebugger(options: toLoadOptions): Debugger;
