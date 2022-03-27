import { DirtyMap } from './map';
import { Entity } from './util';

// the log level
export type LogMode = 'silent' | 'verbose';

// the method by which the debugger will process logging
export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';

// boolean to set true for defaults, leaving it blank in FF / constructor will just have the same effect as false
export type DebugConfig = boolean | {
    logFile ?: string;
    logMode ?: LogMode;
    logStrategy ?: LogStrategy;
};

// ssg cli options
export type SOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    debug ?: DebugConfig;
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
}

// cleaned ssg cli optoins
export type SSGOptions = Entity<SOptions>;


// determines if the optoins have been cleaned or still unclead from the function arguments
export type LoaderOptions = CoreOptions | LoadOptions;

// optional arguments for the factory function itself
export type LoadOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    watch ?: boolean;
    debug ?: DebugConfig;
};

// cleaned arguments submitted to constructor, defaulted if nonexistent
export type CoreOptions = Entity<LoadOptions>;
