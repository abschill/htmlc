import { DirtyMap } from './map';
import { Entity } from './util';

// the log level
export type LogMode = 'silent' | 'verbose';

// the method by which the debugger will process logging
export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';

// boolean to set true for defaults, leaving it blank in FF / constructor will just have the same effect as false
export type UserDebugConfig = boolean | DebugConfig;

export interface DebugConfig {
    logFile ?: string;
    logMode ?: LogMode;
    logStrategy ?: LogStrategy;
}
export type E_DebugConfig = Entity<DebugConfig>;

// ssg cli options
export type UserSSGOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    debug ?: UserDebugConfig;
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
}
// cleaned ssg cli optoins
export type E_SSGOptions = Entity<UserSSGOptions>;

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
    debug ?: UserDebugConfig;
};

// cleaned arguments submitted to constructor, defaulted if nonexistent
// only used the E_ENTITYNAME convention for internals, this one will be exposed to the public api
export type CoreOptions = Entity<LoadOptions>;
