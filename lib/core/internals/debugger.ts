
import { 
	RenderMap,
	UINSERT_MAP,
	coreEventArgs,
	coreEventName
} from './types';

const { 
	log, 
	warn, 
	time, 
	timeEnd 
} = console;

export default class Debugger {

	static _registerEvent( ...args: coreEventArgs<coreEventName> ) {
		const eventName = args[0];
		const meta = args[1];
		if( args[1].config.debug ) {
			log( 'HCL_EVENT: ', eventName );
			log( '\n' );
			log( 'IEVENT_DATA:', meta );
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

	static _registerMap( rmap: RenderMap, imap: UINSERT_MAP ) {
		log( 'HCL_EVENT: map::register' );
		log( rmap );
		log( imap );
	}

	static _finalize( args: { raw: string , render: string } ) {
		log( args );
	}
}