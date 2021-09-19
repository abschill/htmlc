export default interface partialObject {
    name: string,
    path: string,
    args: Object[],
    raw: string,
    parsed: string | null
}