import { 
    readFileSync, 
    writeFileSync, 
    existsSync, 
    mkdirSync 
} from 'fs';
import path from 'path';
import { __BSD__, __WIN__ } from '../core/internals/util/fs';
import { STATIC_DEFAULTS } from '../core/internals';
import { 
    HTMLChunk
} from '../core/internals/types';

export function findConfig() {
    const o = JSON.parse( readFileSync( path.resolve( process.cwd(), 'package.json' ) ).toString( 'utf-8' ) )?.static_config ?? STATIC_DEFAULTS;
    return Object.keys( o ) === Object.keys( STATIC_DEFAULTS ) ? 
    o : {...STATIC_DEFAULTS, ...o};
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
    nameSplit1.split( __WIN__ ) : nameSplit1.split( __BSD__ );
    return nameSplit2[nameSplit2.length - 1];
}

export function getModuleFromBase( 
    filePath: string 
): object {
    return require( path.resolve( process.cwd(), filePath ) ) as object;
}

export function pathify( 
    template: HTMLChunk,
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