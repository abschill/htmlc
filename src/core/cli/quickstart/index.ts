#!/usr/bin/env node
/**
 * @module quickstart
 */
import { __DEFAULTS__, FULL_DEFAULTS } from '../../../util';
import {
	existsSync,
	mkdirSync,
	writeFileSync,
} from 'fs';
import {
	join,
	resolve
} from 'path';
const { log } = console;
const demoChunks = require( './demo' );

function createPath( path: string ) {
	log( `Creating Directory at ${path}` );
	mkdirSync( path );
}
/**
 * @function quickstart
 * @description command line interface for quickstart template
 * @example
 * ```npx -p html-chunk-loader quickstart```
*/
export function quickstart() {
	const { pathRoot, partials, templates } = __DEFAULTS__;
	const joinedRoot = join( process.cwd(), pathRoot );
	const joinedPartials = join( joinedRoot, partials );
	const joinedTemplates = join( joinedRoot, templates );
	if( !existsSync( joinedRoot ) ) createPath( joinedRoot );
	if( !existsSync( joinedPartials ) ) createPath( joinedPartials );
	if( !existsSync( joinedTemplates ) ) createPath( joinedTemplates );

	demoChunks.forEach( chunk => {
		if( chunk.type === 'partial' ) {
			const partial = resolve( joinedPartials, chunk.filename );
			if( !existsSync( partial ) ) writeFileSync( partial, chunk.content );
		}
		else {
			const template = resolve( joinedTemplates, chunk.filename );
			if( !existsSync( template ) ) writeFileSync( template, chunk.content );
		}
	} );

	const configFile = resolve( process.cwd(), 'hcl-config.js' );

	if( !existsSync( configFile ) ) {
		const jsonString = JSON.stringify( FULL_DEFAULTS, null,  4 );
		const moduleString = `module.exports = ${jsonString}`;
		writeFileSync( configFile, moduleString );
	}

	log( 'Done.' );
}

quickstart();
