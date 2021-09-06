interface ConfigOptions{
    templateDirectory: string,
    staticGeneration: boolean,
    staticOutput?: string,
    staticPaths?: string
}
interface Config {
    ctx: string,
    options: ConfigOptions
}