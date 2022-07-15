export interface ProcessCacheConfig {
    ttl: number;
}
export interface ProcessCache {
    config: ProcessCacheConfig;
    timeStamp: Date;
    isClean?: boolean;
}
