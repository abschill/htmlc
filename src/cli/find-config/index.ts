#!/usr/bin/env node
import { __DEFAULTS__ } from '../../util';
import { findConfig } from '../../config';
import { ConfigStringType } from '../../types/index';
/**
 * @function findConfig
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader find-config```
*/
export const findConfigCLI = ( mode: ConfigStringType ) => findConfig( mode );


console.log( '\x1b[42mhtml-chunk-loader config found\x1b[0m:\n' );
console.log( findConfigCLI( <ConfigStringType>process.argv[2] ?? 'ssr' ) );
