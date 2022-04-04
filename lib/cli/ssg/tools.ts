import { 
    writeFileSync, 
    existsSync, 
    mkdirSync 
} from 'fs';
import path from 'path';
import { __BSD__, __WIN__ } from '../../core/internals/util/fs';
import { 
    HTMLChunk
} from '../../core/types';

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