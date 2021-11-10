/**
 * 
 * @module file internal file handling
 * 
 */
import { LoaderOptions } from '../options';
import defaults from '../default';
import fs from 'fs';
import path from 'path';
import { FileInputMeta } from '../internals';
/**
 * 
 * @param {string} dir Directory (path) to grab files from  
 * @returns array of files in directory
 */
 export const _files = ( dir: string ) =>fs.readdirSync( dir )
 .filter(x => fs.lstatSync( path.join(dir, x )).isFile() )
 .map( x => path.resolve( dir, x ) );
/**
 * @function resolvePartials
 * @description Resolves List of Partials from Loader Options
 * @param {LoaderConfig} conf Configuration to read paths from  
 * @returns {FileInputMeta} Metadata about Partials
 */
 export const resolvePartials = ( conf: LoaderOptions ): FileInputMeta[] => {
     const { partials = defaults.partials,
             pathRoot = defaults.pathRoot } = conf;
     const _path = path.join( process.cwd(), pathRoot, partials );
     if( _path ) {
         try {
             const __files = _files( _path );
             const files = __files.map( mapFileData );
             return files;
         }
         catch( e ) {
             throw e;
         }
     }
     else {
         throw new Error( 'Partial Directory Resolution Failed - Partial Directory not Found' );
     } 
 }
 /**
  * @function resolveTemplates
  * @description Resolves List of Templates from Loader Options
  * @param {LoaderConfig} conf Configuration to read paths from  
  * @returns {FileInputMeta} Metadata about Templates
  */
 export const resolveTemplates = ( conf: LoaderOptions ): FileInputMeta[] => {
     const { templates = defaults.templates,
         pathRoot = defaults.pathRoot } = conf;
     const _path = path.join( process.cwd(), pathRoot, templates );
     if( _path ) {
         try {
             const __files = _files( _path );
             const files = __files.map( mapFileData );
             return files;
         }
         catch( e ) {
             throw e;
         } 
     }
     else {
         throw new Error( 'Template Directory Resolution Failed - Template Directory not found' );
     }
 }
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
 * @param _path 
 * @returns path of file to load utf8
 */
const loadFileUTF = ( _path: string ) => fs.readFileSync( _path ).toString( 'utf-8' );