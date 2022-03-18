/**
 * @module file internal file handling
 */
import {
	fileUTF8,
	fileJSON,
	FileInputMeta,
	Options
} from '../types';
import { DEFAULTS } from '..';
import fs from 'fs';
import path from 'path';
import Debugger from '../debugger';

export class fsUtil {
	static  __WIN__ = '\\';
	static  __BSD__ = '/';

	static readDir( dir: string ) {
		return fs.readdirSync( dir )
			.filter( x => fs.lstatSync( path.join( dir, x ) ).isFile() )
			.map( x => path.resolve( dir, x ) );
	}

	static toStringF( filePath: string ):
		fileUTF8 {
		return fs.readFileSync( filePath ).toString( 'utf-8' );
	}

	static toJSONF( 
		filePath: string
	): fileJSON {
		return fs.readFileSync( filePath ).toJSON();
	}
	
	static mapData( filePath: string ):
		FileInputMeta {
		const n = filePath.split( '.html' );
		if( process.platform === 'win32' ) {
			const na = n[0].split( this.__WIN__ );
			const name = na[na.length - 1];
			const rawFile = this.toStringF( filePath );
			return {path: filePath, name, rawFile};
		}
		else {
			const na = n[0].split( this.__BSD__ );
			const name = na[na.length - 1];
			const rawFile = this.toStringF( filePath );
			return {path: filePath, name, rawFile};
		}
	}

	static resolveTemplates( conf: Options ):
		FileInputMeta[] | void {
		const {
			templates = DEFAULTS.templates, 
			pathRoot = DEFAULTS.pathRoot
		} = conf;
		const _path = path.join( process.cwd(), pathRoot, templates );
		return _path ? this.readDir( _path ).map( p => this.mapData( p ) ) : 
		Debugger.raise( `Error: finding templates in ${pathRoot}/${templates} `);

	}

	static resolvePartials( conf: Options ):
		FileInputMeta[] | void {
		const { 
			partials = DEFAULTS.partials,
			pathRoot = DEFAULTS.pathRoot 
		} = conf;
		const _path = path.join( process.cwd(), pathRoot, partials );
		return _path ?
			this.readDir( _path ).map( p => this.mapData( p ) ) : 
			Debugger.raise( `Error: finding templates in ${pathRoot}/${partials} `);
		
	}
}