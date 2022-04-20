#!/usr/bin/env node
/**
 * @module find-config
 * CLI Feature to help locate your highest priority configuration in the directory the command is run.
 */
import { __DEFAULTS__, FULL_DEFAULTS } from '../../util';
import { createSSGConfig, createSSRConfig } from '../../config';
/**
 * @function findConfig
 * @description command line interface for ssg templates
 * @example
 * ```npx -p html-chunk-loader find-config```
*/
export function findConfig( mode: 'full' | 'ssg' | 'ssr' ) {
  //
}


