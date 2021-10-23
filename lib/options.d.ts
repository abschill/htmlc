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

