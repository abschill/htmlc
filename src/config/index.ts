interface UnderpinOptions{
    templateDirectory: string,
    staticGeneration: boolean,
    staticOutput?: string,
    staticEndpointPath?: string
}
interface UnderpinConfig {
    root: string,
    options:UnderpinOptions
}