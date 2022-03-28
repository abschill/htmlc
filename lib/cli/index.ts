#!/usr/bin/env node
/**
 * @module ssg-cli
 */
import { 
    findConfig, 
    ensureOutPath,
    getModuleFromBase,
    pathify,
    __write
} from './tools';
import { Loader } from '../loader';
import { UserSSGOptions } from '../core/internals/types';

/** 
 * @function ssg 
 * @description command line interface for ssg templates
 * @example 
 * ```npx html-chunk-loader ssg```
*/
export function ssg():
void {
    const static_config: UserSSGOptions = findConfig();
    ensureOutPath( static_config.outPath );
    
    try {
        const data = getModuleFromBase( static_config.loaderFile );
        const ctx = Loader( {
            ...static_config,
            //@ts-ignore
            templateInput: data.templateInput,
            //@ts-ignore
            partialInput: data.partialInput,
        } );
        ctx.ctx.templates.forEach( template => {
            const fileData = {
                toName: pathify( template, static_config.outPath ),
                toWrite: ctx.template( template.name )
            };
            __write( fileData );
            return;
        } );
    }
    catch( e ) {
        console.warn( e );
    }
}

ssg();
