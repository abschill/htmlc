/**
 * @module fs internal file handling
 */
import {
	ResolvedFile,
	E_SSROptions
} from '../types';

import {
	readdirSync,
	readFileSync,
	statSync
} from 'fs';

import {
	join,
	resolve
} from 'path';

import { HCL_DEFAULTS } from '..';
export const __WIN__ = '\\';
export const __BSD__ = '/';

export function validFileList(
	dir: string
): string[] {
	return readdirSync( dir )
	.filter( x => statSync( join( dir, x ) ).isFile() && x.includes( '.html' ) )
	.map( x => resolve( dir, x ) );
}

export function mapPath(
	splitter: string[],
	basename: string,
	sysSplit: string,
): string {
	let name = splitter[0];
	const na = name.split( sysSplit );
	name = na[na.length - 1];
	const base = na.indexOf( basename );
	const offset = na.indexOf( name ) - base;
	if( offset > 1 ) {
		const prefixArr = [];
		for( let i = base+1; i < base+offset + 1; i++ ) {
			prefixArr.push( na[i] );
		}
		name =  prefixArr.join( '/' );
	}
	return name;
}

export function fileMap(
	path: string,
	splitter: string[],
	basename: string
): ResolvedFile {
	return {
		path,
		rawFile: readFileSync( path ).toString( 'utf-8' ),
		name: mapPath( splitter, basename, process.platform === 'win32' ? __WIN__ : __BSD__ )
	};
}

export function createFileMap(
	filepath: string,
	basepath: string
): ResolvedFile {
	return fileMap( filepath, filepath.split( '.html' ), basepath );
}

export function readValidFSTree(
	dir: string,
): string[] {
	return readdirSync( dir ).map( file => {
		const filepath = join( dir, file );
		return statSync( filepath ).isDirectory() ? readValidFSTree( filepath ) : filepath;
	} ).flat();
}

export const mapPathList = (
	paths: string[],
	base: string
): ResolvedFile [] => paths.map( ( file ) => createFileMap( file, base ) );


export function findPartials( { 
	partials = HCL_DEFAULTS.partials,
	pathRoot = HCL_DEFAULTS.pathRoot,
	discoverPaths = HCL_DEFAULTS.discoverPaths
}: E_SSROptions ): ResolvedFile[] | null {
	const root = join( process.cwd(), pathRoot, partials );
	if( !discoverPaths ) return validFileList( root ).map( file => createFileMap( file, partials ) ); 
	return mapPathList( readValidFSTree( root ), partials );
}

export function findTemplates( {
	templates = HCL_DEFAULTS.templates, 
	pathRoot = HCL_DEFAULTS.pathRoot,
	discoverPaths = HCL_DEFAULTS.discoverPaths
}: E_SSROptions ): ResolvedFile[] | null {
	const root = join( process.cwd(), pathRoot, templates );
	if( !discoverPaths ) return validFileList( root ).map( ( file ) => createFileMap( file, templates ) ); 
	return mapPathList( readValidFSTree( root ), templates );
}