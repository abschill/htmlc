export type Loader = {
    template: Function
}

export type LoaderOptions = {
    pathRoot?: string,
    templates?: string,
    partials?: string
    partialInput?: object,
    templateInput?: object,
    watch?: boolean,
    debug?: boolean
}

export type StaticLoaderOptions = {
    load_options: LoaderOptions,
    static_options: {
        cleanup: boolean,
        outPath: string,
        loaderFile: string | string[]
    }
}