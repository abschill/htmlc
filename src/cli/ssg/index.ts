#!/usr/bin/env node
import {
    ensureOutPath,
    pathify,
    __write
} from './tools';
import { SSGOptions } from '../../types';
import { useLoader } from '../..';
import { useSSGConfig } from '../../config';
import util from 'util';
/**
 * @function ssg
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader ssg```
*/
export function ssg():
void {
    const static_config: SSGOptions = useSSGConfig();
	process.stdout.write(util.format('\x1b[32mOutpath found: %s ✓ \x1b[0m\n', static_config.outPath) + '\n');
    ensureOutPath(static_config.outPath);
    try {
        const ctx = useLoader(static_config);
        ctx.ctx.chunks.filter(chunk => chunk.type === 'template').forEach(template => {
            const fileData = {
                toName: pathify(template, static_config.outPath),
                toWrite: ctx.template(template.name)
            };
            __write(fileData);
			process.stdout.write(util.format('\x1b[32m%s ✓ \x1b[0m\n', 'Files Written') + '\n');
            return;
        });
    }
    catch(e) {
        console.warn(e);
    }
}

ssg();
