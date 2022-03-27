
export * from './config';
export * from './map';
export * from './event';

import { CoreOptions, FileInputMeta } from './config';
import { Template } from './map';



export type CoreContext = {
    config: CoreOptions;
    partials: FileInputMeta[];
    templates: FileInputMeta[];
};

export interface HCL_Runtime {
    ctx: CoreContext;
    template: ( name: string, data ?: object ) => Template;
}

export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}
