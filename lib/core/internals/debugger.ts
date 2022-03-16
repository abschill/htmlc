import { coreEvent, compiler } from ".";

const { 
	log, 
	warn, 
	time, 
	timeEnd 
} = console;

export class Debugger {

	static _registerEvent( ...args: coreEvent.Args<coreEvent.Name> ) {
		const eventName = args[0];
		const templateName = args[2]['0'].template_name;
		const contextData = args[2]['0'].ctx;
		if( args[1].config.debug ) {
			log( 'HCL_EVENT: ', eventName );
			log( 'HCL_TEMPLATE: ', templateName );
			log( 'HCL_CTX: ', contextData );
		}
	}

	static raise( m ) {
		warn( m );
	}

	static stamp( msg: object | string, label: string ) {
		time( label );
		log( '\n' );
		log( '~~~~~~~~~~~~~~~~~~' );
		log( msg );
		log( '\n' );
		timeEnd( label );
	}

	static _registerMap( rmap: compiler.RenderMap, imap: compiler.UINSERT_MAP ) {
		log( 'HCL_EVENT: map::register' );
		log( rmap );
		log( imap );
	}

	static _finalize( args: { raw: string , render: string } ) {
		log( args );
	}
}