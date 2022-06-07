#!/usr/bin/env node
import {
    ensureOutPath,
    pathify,
    __write
} from './tools';
import { SSGOptions } from '@htmlc/types';
import { createLoader } from '@htmlc/core';
import { findSSGConfig } from '@htmlc/core/config';
import util from 'util';

const { log, warn } = console;
/**
 * @function ssg
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader ssg```
*/
export function ssg():
void {
    const static_config: SSGOptions = findSSGConfig();
	process.stdout.write( util.format( '\x1b[32mOutpath found: %s ✓ \x1b[0m\n', static_config.outPath ) + '\n' );
    ensureOutPath( static_config.outPath );
    try {
        const ctx = createLoader( static_config );
        ctx.ctx.chunks.filter( chunk => chunk.type === 'template' ).forEach( template => {
            const fileData = {
                toName: pathify( template, static_config.outPath ),
                toWrite: ctx.template( template.name )
            };
            __write( fileData );
			process.stdout.write( util.format( '\x1b[32m%s ✓ \x1b[0m\n', 'Files Written' ) + '\n' );
            return;
        } );
    }
    catch( e ) {
        console.warn( e );
    }
}

ssg();
