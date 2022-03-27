import { CoreOptions } from './config';
import { Template, DirtyMap } from './map';
import { FG_COLOR_ESCAPES, FileInputMeta, LIST_OR_VALUE } from './util';
import { HCL_EVENT } from './event';
import Debugger from '../debugger';

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

export interface CompilerArgs {
    template_name: string;
    template_ctx: CoreContext;
    template_data ?: DirtyMap;
    _debugger: Debugger;
}

export type TargetDirectoryTree = {
    path: string;
    files: string[];
}


export type fileUTF8 = string;

export type fileJSON = object;

export type WriteLogFileArgs = {
    style: LIST_OR_VALUE<FG_COLOR_ESCAPES>;
    e: HCL_EVENT
}

export * from './config';
export * from './map';
export * from './event';
export * from './util';