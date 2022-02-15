export declare const hasLoop: (target: string, arr: string) => boolean;
export declare const loopIndex: (target: string, arr: string) => {
    head: number;
    tail: number;
};
export declare const matchLoop: (target: string) => string[] | undefined[];
export declare const hasKey: (target: string, key: string) => boolean;
export declare const keyIndex: (target: string, key: string) => number;
export declare const translateKeyName: (templated_key: string) => string;
export declare const replaceKey: (target: string, key: string, value: string) => string;
export declare const matchKey: (target: string) => RegExpMatchArray | null;
export declare const hasPartial: (target: string, key: string) => boolean;
export declare const partialIndex: (target: string, key: string) => number;
export declare const replacePartial: (target: string, key: string, value: string) => string;
export declare const matchPartial: (target: string) => RegExpMatchArray | null;
