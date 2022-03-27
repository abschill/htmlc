import { Options, CoreOptions, LogStrategy, LogMode } from './types';
const { 
	log, 
	warn, 
	error, 
	time, 
	timeEnd, 
	table, 
	profile, 
	profileEnd, 
	timeLog, 
	timeStamp, 
	trace 
} = console;

enum FG_COLOR_ESCAPES {
	black = '\x1b[30m%s\x1b[0m',
	red = '\u001b[31m%s\x1b[0m',
	green = '\x1b[32m%s\x1b[0m',
	yellow = '\x1b[33m%s\x1b[0m',
	blue = '\x1b[34m%s\x1b[0m',
	magenta = '\x1b[35m%s\x1b[0m',
	cyan = '\x1b[36m%s\x1b[0m',
	white = '\x1b[37m%s\x1b[0m'
}

enum BG_COLOR_ESCAPES {
	black = '\x1b[40m%s\x1b[0m',
	red = '\x1b[41m%s\x1b[0m',
	green = '\x1b[42m%s\x1b[0m',
	yellow = '\x1b[43m%s\x1b[0m',
	blue = '\x1b[44m%s\x1b[0m',
	magenta = '\x1b[45m%s\x1b[0m',
	cyan = '\x1b[46m%s\x1b[0m',
	white = '\x1b[47m%s\x1b[0m',
}


export default class Debugger {

	runtimeOptions: CoreOptions;
	logMode: LogMode = 'normal';
	logStrategy: LogStrategy = 'stdout';
	logFile ?: string = 'hcl.log';
	silent: boolean;

	constructor( conf: Options ) {
		this.runtimeOptions = conf as CoreOptions;
		try {
			const debugOpt = this.runtimeOptions.debug;
			if( typeof( debugOpt ) === 'boolean' ) {
				this._setDefaults();
			}
			else {
				this.logMode = debugOpt?.logMode ?? 'silent'; 
				this.logStrategy = debugOpt?.logStrategy ?? 'stdout';
				this.silent = this.logMode === 'silent';
			}
		}
		catch( e ) {
			this._setDefaults();
		}

		this.init();
	}

	_setDefaults() {
		this.logMode = 'normal';
		this.logStrategy = 'stdout';
	}

	success( msg ) {
		log( FG_COLOR_ESCAPES.green, msg );
	}

	status( msg ) {
		log( FG_COLOR_ESCAPES.blue, msg );
	}


	init() {
		if( !this.silent ) this.success( 'HCL Debug started' );
	}

	event( name, ex ) {
		if( !this.silent ) {
			this.status( `Debugger|-Event: ${name}\n` );
			this.status( 'Debugger|-Event-Data: \n' );
			log( ex );
			log();
			log();
		}
	}
}