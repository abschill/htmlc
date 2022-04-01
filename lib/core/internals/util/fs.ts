/**
 * @module fs internal file handling
 */
import {
	ResolvedFile,
	E_SSROptions
} from '../types';
import {
	readdir,
	readdirSync,
	readFileSync,
	opendirSync,
	statSync,stat
} from 'fs';
import {
	join,
	resolve
} from 'path';
import { HCL_DEFAULTS } from '..';
export const __WIN__ = '\\';
export const __BSD__ = '/';
export function readValidFileList(
	dir: string
) {
	return readdirSync( dir )
	.filter( x => statSync( join( dir, x ) ).isFile() && x.includes( '.html' ) )
	.map( x => resolve( dir, x ) );
}
export function mapFileData(
	filePath: string
): ResolvedFile {
	const n = filePath.split( '.html' );
	if( process.platform === 'win32' ) {
		const na = n[0].split( __WIN__ );
		return {
			path: filePath, 
			name: na[na.length - 1], 
			rawFile: readFileSync( filePath ).toString( 'utf-8' )
		};
	}
	else {
		const na = n[0].split( __BSD__ );
		return {
			path: filePath, 
			name: na[na.length - 1], 
			rawFile: readFileSync( filePath ).toString( 'utf-8' )
		};
	}
}

export function getChildDirectories( 
	pathBase: string 
): string[] {
	const dir = readdirSync( pathBase );
	const dirs = dir.filter( ent => statSync( resolve( pathBase, ent ) ).isDirectory() );
	if( dirs.length === 0 ) return null;
	return dirs.map( dir => join( pathBase, dir ) );
}

export function readValidFSTree(
	dir: string,
): string[] {
	return readdirSync( dir ).map( file => {
		const filepath = join( dir, file );
		return statSync( filepath ).isDirectory() ? readValidFSTree( filepath ) : filepath;
	} ).flat();
}

export function resolvePartials( 
	conf: E_SSROptions 
): ResolvedFile[] | null {
	const { 
		partials = HCL_DEFAULTS.partials,
		pathRoot = HCL_DEFAULTS.pathRoot,
		discoverPaths = HCL_DEFAULTS.discoverPaths
	} = conf;
	const root = join( process.cwd(), pathRoot, partials );
	if( !discoverPaths ) return readValidFileList( root ).map( mapFileData ); 
	const paths = Array.from( new Set( readValidFSTree( root ) ) );
	return paths.map( mapFileData );
}

export function resolveTemplates(
	conf: E_SSROptions 
): ResolvedFile[] | null {
	const {
		templates = HCL_DEFAULTS.templates, 
		pathRoot = HCL_DEFAULTS.pathRoot,
		discoverPaths = HCL_DEFAULTS.discoverPaths
	} = conf;
	const root = join( process.cwd(), pathRoot, templates );
	if( !discoverPaths ) return readValidFileList( root ).map( mapFileData ); 
	const paths = Array.from( new Set( readValidFSTree( root ) ) );
	return paths.map( mapFileData );
}