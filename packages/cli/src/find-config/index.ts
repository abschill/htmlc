#!/usr/bin/env node
import { __DEFAULTS__ } from '@htmlc/internal';
import { findConfig } from '@htmlc//core';
import { ConfigStringType } from '@htmlc/types/index';
/**
 * @function findConfig
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader find-config```
*/
export const findConfigCLI = ( mode: ConfigStringType ) => findConfig( mode );


console.log( '\x1b[42mhtml-chunk-loader config found\x1b[0m:\n' );
console.log( findConfigCLI( <ConfigStringType>process.argv[2] ?? 'ssr' ) );
