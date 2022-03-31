import { 
    readFileSync, 
    writeFileSync, 
    existsSync, 
    mkdirSync 
} from 'fs';
import path from 'path';
import { fsUtil } from '../core/internals/util/file';
import { __DEFAULTS } from '../core/internals';
import { 
    ResolvedFile
} from '../core/internals/types';

export function findConfig() {
    const o = JSON.parse( readFileSync( path.resolve( process.cwd(), 'package.json' ) ).toString( 'utf-8' ) )?.static_config ?? __DEFAULTS.static_config;
    return Object.keys( o ) === Object.keys( __DEFAULTS.static_config ) ? 
    o : {...__DEFAULTS.static_config, ...o};
}

export function ensureOutPath( 
    outPath: string 
): void {
    return existsSync( outPath ) ? 
    null : mkdirSync( outPath );
}

export function readNameData( 
    filePath: string 
): string {
    const nameSplit0 = filePath.split( '.html' );
    const nameSplit1 = nameSplit0[nameSplit0.length-2];
    const nameSplit2 = process.platform === 'win32' ? 
    nameSplit1.split( fsUtil.__WIN__ ) : nameSplit1.split( fsUtil.__BSD__ );
    return nameSplit2[nameSplit2.length - 1];
}

export function getModuleFromBase( 
    filePath: string 
): object {
    return require( path.resolve( process.cwd(), filePath ) ) as object;
}

export function pathify( 
    template: ResolvedFile,
    contextPath: string
): string {
    const toName = `${template.name}.html`;
    return path.resolve( path.resolve( process.cwd(), contextPath ), toName );
}

export function __write(
    args: {
        toName: string,
        toWrite: string
    }
): number {
    writeFileSync( args.toName, args.toWrite );
    return 0;
}