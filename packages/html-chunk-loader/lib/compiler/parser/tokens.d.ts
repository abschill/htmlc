import { ABT_Binding } from 'htmlc-types';
declare const ABT: ParsableToken[];
export default ABT;
export declare type ParsableToken = {
    signature: string;
    exists: ABT_Binding<boolean>;
    asList: ABT_Binding<string[]>;
};
