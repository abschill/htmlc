import fs from 'fs';
import path from 'path';
import { FileInputMeta } from '../../../../';
/**
 * 
 * @param {string} filePath Full system-specific path of target file
 * @returns Name of the html file in the given target path, x-platform
 */
export const mapFileData = ( filePath: string ): FileInputMeta => {
    const n = filePath.split( '.html' );
    if( process.platform === 'win32' ) {
        const na = n[0].split( '\\' );
        const name = na[ na.length - 1 ];
        const rawFile = loadFileUTF( filePath );
        return { path: filePath, name, rawFile };
    }
    else {
        const na = n[0].split( '/' );
        const name = na[ na.length - 1 ];
        const rawFile = loadFileUTF( filePath );
        return { path: filePath, name, rawFile };
    }
}
/**
 * 
 * @param {string} dir Directory to grab files from  
 * @returns 
 */
export const _files = ( dir: string ) =>fs.readdirSync( dir )
.filter(x => fs.lstatSync( path.join(dir, x )).isFile() )
.map( x => path.resolve( dir, x ) );

export const loadFileUTF = ( _path ) => {
    try{ 
        return fs.readFileSync( _path ).toString( 'utf-8' );
    }
    catch( e ) {
        throw e;
    }
    
}