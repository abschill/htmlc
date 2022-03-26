
import { 
	RenderMap,
	UINSERT_MAP,
	coreEventArgs,
	coreEventName
} from './types';
import EventEmitter from 'events';
const { 
	log, 
	warn, 
	time, 
	timeEnd 
} = console;
const deb = new EventEmitter();
deb.on( 'start', () => log( 'HCL::debug - started' ) );
deb.on( 'file::change', ( e: string ) => log( e ) );
deb.on( 'fs::error', ( e ) => warn( e ) );
export default deb;