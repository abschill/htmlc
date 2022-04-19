// reserved for later user
export interface ProcessCacheConfig {
    ttl : number; //default 0
}
// reserved for later user
export interface ProcessCache {
    config: ProcessCacheConfig;
    timeStamp : Date; //calculated at runtime
    isClean ?: boolean; //default null
}
