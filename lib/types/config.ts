export interface ConfigOptions {
    _internals: {
        delimiter: string
    },
    rootDir: string,
    templateDir: string,
    partialDir: string,
    staticGeneration: boolean,
    staticOutput?: string,
    staticPaths?: string,
}
