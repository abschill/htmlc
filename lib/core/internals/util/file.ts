/**
 * @module file internal file handling
 */
import { core } from '../../';
import { DEFAULTS } from '..';
import fs from 'fs';
import path from 'path';
import { internals } from '..';

export class fsUtil {

	static readDir( dir: string ) {
		return fs.readdirSync( dir )
			.filter( x => fs.lstatSync( path.join( dir, x ) ).isFile() )
			.map( x => path.resolve( dir, x ) );
	}

	static loadUTF8( filePath: string ):
		internals.fileUTF8 {
		return fs.readFileSync( filePath ).toString( 'utf-8' );
	}
	
	static mapData( filePath: string ):
		internals.FileInputMeta {
		const n = filePath.split( '.html' );
		if( process.platform === 'win32' ) {
			const na = n[0].split( '\\' );
			const name = na[ na.length - 1 ];
			const rawFile = this.loadUTF8( filePath );
			return { path: filePath, name, rawFile };
		}
		else {
			const na = n[0].split( '/' );
			const name = na[ na.length - 1 ];
			const rawFile = this.loadUTF8( filePath );
			return { path: filePath, name, rawFile };
		}
	}

	static resolveTemplates( conf: core.Options ):
		internals.FileInputMeta[] {
		const { templates = DEFAULTS.templates,
			pathRoot = DEFAULTS.pathRoot } = conf;
		const _path = path.join( process.cwd(), pathRoot, templates );
		if( _path ) {
			try {
				return this.readDir( _path ).map( p => this.mapData( p ) );
			}
			catch( e ) {
				throw e;
			}
		}
		else {
			throw new Error( 'Template Directory Resolution Failed - Template Directory not found' );
		}
	}

	static resolvePartials( conf: core.Options ):
		internals.FileInputMeta[] {
		const { partials = DEFAULTS.partials,
			pathRoot = DEFAULTS.pathRoot } = conf;
		const _path = path.join( process.cwd(), pathRoot, partials );
		if( _path ) {
			try {
				return this.readDir( _path ).map( p => this.mapData( p ) );
			}
			catch( e ) {
				throw e;
			}
		}
		else {
			throw new Error( 'Partial Directory Resolution Failed - Partial Directory not Found' );
		}
	}
}
