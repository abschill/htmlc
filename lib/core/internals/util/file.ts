/**
 * @module file internal file handling
 */
import {
	ResolvedFile,
	E_SSROptions
} from '../types';
import {
	lstatSync,
	readdirSync,
	readFileSync,
} from 'fs';
import {
	join,
	resolve
} from 'path';
import { HCL_DEFAULTS } from '..';

export class fsUtil {
	static  __WIN__ = '\\';
	static  __BSD__ = '/';

	static readDir = ( dir: string ) => readdirSync( dir )
			.filter( x => lstatSync( join( dir, x ) ).isFile() && x.includes( '.html' ) )
			.map( x => resolve( dir, x ) );

	static toStringF = ( filePath: string ): string => readFileSync( filePath ).toString( 'utf-8' );

	static toJSONF =( 
		filePath: string
	): object => readFileSync( filePath ).toJSON();
	
	static mapData( filePath: string ):
		ResolvedFile {
		const n = filePath.split( '.html' );
		if( process.platform === 'win32' ) {
			const na = n[0].split( fsUtil.__WIN__ );
			return {
				path: filePath, 
				name: na[na.length - 1], 
				rawFile: fsUtil.toStringF( filePath )
			};
		}
		else {
			const na = n[0].split( fsUtil.__BSD__ );
			return {
				path: filePath, 
				name: na[na.length - 1], 
				rawFile: fsUtil.toStringF( filePath )};
		}
	}

	static getChildDirectories( pathBase: string ) {
		const dir = readdirSync( pathBase );
		const dirs = dir.filter( ent => lstatSync( resolve( pathBase, ent ) ).isDirectory() );
		if( dirs.length === 0 ) return null;
		return dirs;
	}

	static resolveTemplates( conf: E_SSROptions ):
		ResolvedFile[] | null {
		const {
			templates = HCL_DEFAULTS.templates, 
			pathRoot = HCL_DEFAULTS.pathRoot,
			discoverPaths = HCL_DEFAULTS.discoverPaths
		} = conf;
		const root = join( process.cwd(), pathRoot, templates );
		return fsUtil.readDir( root ).map( fsUtil.mapData );
	}

	static resolvePartials( conf: E_SSROptions ):
		ResolvedFile[] | null {
		const { 
			partials = HCL_DEFAULTS.partials,
			pathRoot = HCL_DEFAULTS.pathRoot,
			discoverPaths = HCL_DEFAULTS.discoverPaths
		} = conf;
		const root = join( process.cwd(), pathRoot, partials );
		if( !discoverPaths ) return fsUtil.readDir( root ).map( fsUtil.mapData ); 


		// discover max depth of 5
		// probably a better way to do this recursively but this wont crash anything at runtime for the next semver at least
		const d0 = fsUtil.getChildDirectories( root );
		if( !d0 ) {
			return fsUtil.readDir( root ).map( fsUtil.mapData ); 
		}
		else {
			const acc = [];
			acc.push( d0.flat() );
			const d1 = d0.map( dir => fsUtil.getChildDirectories( join( root, dir ) ) ).filter( e => e );
			if( d1.length === 0 ) return fsUtil.readDir( root ).map( fsUtil.mapData ); 
			acc.push( d1.flat() );
			console.log( acc );
			// const d2 = d1.map( )
		}
	}
}