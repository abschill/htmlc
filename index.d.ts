export type Loader = {
    template: Function
}
export type LoaderOptions = {
    pathRoot?: string,
    templates?: string,
    partials?: string
    partialInput: object,
    templateInput: object,
    debug: boolean
}

export type LoaderContext = {
    partials: any
    templates: any
}
export type LoaderEngine = { 
    ctx: LoaderContext,
    options: LoaderOptions
}

export type RenderTemplateArgs = {
    _toInsert: Object,
    raw: string,
    conf: LoaderOptions
}

export type Template = {
    path: string,
    args: RenderTemplateArgs,
    valueOf: string
}
export type TargetDirectoryTree = { path: string, files: string[] }
export type FileInputMeta = {
    path: string,
    name: string,
    rawFile: string
}

export type RenderMap = {
    todo_partials: string[],
    todo_keys: string[],
    todo_loops: string[]
}