interface ConfigOptions{
    templateDirectory: string,
    staticGeneration: boolean,
    staticOutput?: string,
    staticEndpointPath?: string
}
interface Config {
    root: string,
    options: ConfigOptions
}