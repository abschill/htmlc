#!/usr/bin/env node
import { __DEFAULTS__ } from '../../util';
import { useConfig } from '../../config';
import { ConfigStringType } from '../../types';
/**
 * @function findConfig
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader find-config```
*/
export const findConfigCLI = (mode: ConfigStringType) => useConfig(mode);
console.log('\x1b[42mhtml-chunk-loader config found\x1b[0m:\n');
console.log(findConfigCLI(<ConfigStringType>process.argv[2] ?? 'ssr'));
