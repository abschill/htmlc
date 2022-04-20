#!/usr/bin/env node
/**
 * @module ssg
*/
import {
    ensureOutPath,
    pathify,
    __write
} from './tools';
import { SSGOptions } from '../../types';
import { createLoader } from '../../loader';
import { createSSGConfig } from '../../config';

/**
 * @function ssg
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader ssg```
*/
export function ssg():
void {
    const static_config: SSGOptions = createSSGConfig();
    ensureOutPath( static_config.outPath );
    try {
        const ctx = createLoader( static_config );
        ctx.ctx.chunks.filter( chunk => chunk.type === 'template' ).forEach( template => {
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
