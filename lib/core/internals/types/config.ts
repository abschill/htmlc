import { DirtyMap } from './map';
import { CoreContext } from '.';
import Debugger from '../debugger';
import { LIST_OR_VALUE } from './util';
import { Entity, FG_COLOR_ESCAPES } from './util';
import { HCL_EVENT } from './event';

export type LogMode = 'silent' | 'verbose';

export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';

export type Options = CoreOptions | LoadOptions;

export type DebugOptions = boolean | {
    logFile ?: string;
    logMode ?: LogMode;
    logStrategy ?: LogStrategy;
};

export type SOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    debug ?: DebugOptions;
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
}

export type SSGOptions = Entity<SOptions>;

export type LoadOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    watch ?: boolean;
    debug ?: DebugOptions;
};

export type RenderTemplateArgs = {
    _toInsert: Object;
    raw: string;
    conf: CoreOptions;
}
export type CoreOptions = Entity<LoadOptions>;

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

export type FileInputMeta = {
    path: string;
    name: string;
    rawFile: string;
}

export type fileUTF8 = string;

export type fileJSON = object;



export type WriteLogFileArgs = {
    style: LIST_OR_VALUE<FG_COLOR_ESCAPES>;
    e: HCL_EVENT
}