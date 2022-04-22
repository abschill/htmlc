#!/usr/bin/env node
/**
 * @module find-config
 * CLI Feature to help locate your highest priority configuration in the directory the command is run.
 */
import { __DEFAULTS__, FULL_DEFAULTS } from '../../util';
import { findConfig } from '../../config';
import { ConfigStringType } from '../../types/index';
/**
 * @function findConfig
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader find-config```
*/
export function findConfigCLI(
	mode: ConfigStringType
) {
  return findConfig( mode );
}

console.log( '\x1b[42mhtml-chunk-loader config found\x1b[0m:\n' );
console.log( findConfigCLI( <ConfigStringType>process.argv[2] ?? 'ssr' ) );
