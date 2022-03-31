/**
 * @module file internal file handling
 */
import {
	ResolvedFile,
	CoreOptions
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
import { DEFAULTS } from '..';

export class fsUtil {
	static  __WIN__ = '\\';
	static  __BSD__ = '/';

	static readDir = ( dir: string ) => readdirSync( dir )
			.filter( x => lstatSync( join( dir, x ) ).isFile() )
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

	static resolveTemplates( conf: CoreOptions ):
		ResolvedFile[] | null {
		const {
			templates = DEFAULTS.templates, 
			pathRoot = DEFAULTS.pathRoot
		} = conf;
		return fsUtil.readDir( join( process.cwd(), pathRoot, templates ) ).map( fsUtil.mapData );
	}

	static resolvePartials( conf: CoreOptions ):
		ResolvedFile[] | null {
		const { 
			partials = DEFAULTS.partials,
			pathRoot = DEFAULTS.pathRoot 
		} = conf;
		return fsUtil.readDir( join( process.cwd(), pathRoot, partials ) ).map( fsUtil.mapData ); 
	}
}