declare const ABT: ParsableToken[];
export default ABT;
export declare type ParsableToken = {
    signature: string;
    exists: (chunk: string) => boolean;
    asList: (chunk: string) => string[];
};
