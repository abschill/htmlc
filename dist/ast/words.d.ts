export declare const FOR_H: (key: any) => string;
export declare const FOR_T: () => string;
declare const RESERVED_WORDS: {
    '@for': {
        boolean: (target: string, arr: string) => boolean;
        array: (target: string) => string[] | undefined[];
    };
    '@render': {
        boolean: (target: string, key: string) => boolean;
        array: (target: string) => RegExpMatchArray;
    };
    '@render-partial': {
        boolean: (target: string, key: string) => boolean;
        array: (target: string) => RegExpMatchArray;
    };
};
export default RESERVED_WORDS;
