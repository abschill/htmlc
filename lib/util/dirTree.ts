import path from 'path';
import { FileInputMeta } from '../internals';
import { LoaderOptions } from '../options';
import { mapFileData, _files } from './file';
import defaults from '../default';
/**
 * 
 * @module dirTree internal file handling
 * 
 */
/**
 * 
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
 * 
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