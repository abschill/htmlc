import { 
	LoaderOptions, 
	E_SSROptions, 
	LogStrategy, 
	LogMode, 
	HCL_EVENT, 
	HCL_EVENT_SIGNATURE, 
	HCL_RUNTIME_EVENT, 
	RT_EVENT_DATA
} from './types';
import { 
	join, 
	resolve 
} from 'path';
import { 
	writeFileSync, 
	appendFileSync, 
	existsSync 
} from 'fs';
import { HCL_DEFAULTS } from '.';
const { 
	log, 
	warn, 
	error
} = console;

export const FG_COLOR_ESCAPES = {
	black: '\x1b[30m%s\x1b[0m',
	red: '\u001b[31m%s\x1b[0m',
	green: '\x1b[32m%s\x1b[0m',
	yellow: '\x1b[33m%s\x1b[0m',
	blue: '\x1b[34m%s\x1b[0m',
	magenta: '\x1b[35m%s\x1b[0m',
	cyan: '\x1b[36m%s\x1b[0m',
	white: '\x1b[37m%s\x1b[0m'
};

export const BG_COLOR_ESCAPES = {
	black: '\x1b[40m%s\x1b[0m',
	red: '\x1b[41m%s\x1b[0m',
	green: '\x1b[42m%s\x1b[0m',
	yellow: '\x1b[43m%s\x1b[0m',
	blue: '\x1b[44m%s\x1b[0m',
	magenta: '\x1b[45m%s\x1b[0m',
	cyan: '\x1b[46m%s\x1b[0m',
	white: '\x1b[47m%s\x1b[0m',
};

const HCL_EVENT_MAP: HCL_EVENT[] = [
	{
		phase: 0,
		type: 0,
		signature: 'loader:init',
		fatal: false
	},
	{
		phase: 0,
		type: 0,
		signature: 'watch:init',
		fatal: false 
	},
	{
		phase: -1,
		type: 1,
		signature: 'file:change',
		fatal: false 
	},
	{
		phase: 1,
		type: 1,
		signature: 'partial:load',
		fatal: false
	},
	{
		phase: 1,
		type: 1,
		signature: 'template:load',
		fatal: false
	}
];

export default class Debugger {

	runtimeOptions: E_SSROptions;
	logMode: LogMode = 'silent';
	logStrategy: LogStrategy = 'none';
	logFile ?: string;
	silent: boolean;

	constructor( conf: LoaderOptions ) {
		this.runtimeOptions = conf as E_SSROptions;
		const { debug = HCL_DEFAULTS.debug } = this.runtimeOptions;
		if( typeof( debug ) === 'boolean' ) {
			if( debug === true ) {
				this.logMode = 'verbose';
				this.logStrategy = 'stdout';
			}
		}
		else {
			this.logMode = debug?.logMode ?? 'silent'; 
			this.logStrategy = debug?.logStrategy ?? 'none';
			this.logFile = debug?.logFile ?? 'hcl.log';
			this.silent = this.logMode === 'silent';
		}
		this.init();
	}

	get_logpath() {
		return resolve( process.cwd(), this.logFile ?? 'hcl.log' );
	}

	success( 
		e: HCL_RUNTIME_EVENT
	): void {
		switch( e.signature ) {
			case 'loader:init':
				return this.std_init_success();
			default:
				return log( '\x1b[42m%s\x1b[0m', 'hcl_debug:', e.event_data ?? e.signature );
		}
	}

	std_init_success() {
		const path_root = join( process.cwd(), this.runtimeOptions.pathRoot ?? HCL_DEFAULTS.pathRoot );
		const t_root = join( path_root, this.runtimeOptions.templates ?? HCL_DEFAULTS.templates );
		const p_root = join( path_root, this.runtimeOptions.partials ?? HCL_DEFAULTS.partials );
		log( FG_COLOR_ESCAPES.green, 'hcl_debug:pathRoot:', path_root );
		log( FG_COLOR_ESCAPES.green, 'hcl_debug:templates:', t_root );
		log( FG_COLOR_ESCAPES.green, 'hcl_debug:partials:', p_root );
		log( FG_COLOR_ESCAPES.green, 'hcl_debug:event:',  'Loaded Config Successfully' );
		log( '\n' );
	}

	std_load_template(
		event_data: RT_EVENT_DATA
	) {
		const { template_name, u_insert_map, c_insert_map } = event_data;
		log( FG_COLOR_ESCAPES.blue, 'hcl_debug:template:load: ', template_name );
		if( !Object.is( u_insert_map, {} ) ) log( FG_COLOR_ESCAPES.blue, 'hcl:umap: ', u_insert_map );
		if( !Object.is( c_insert_map, {} ) ) log( FG_COLOR_ESCAPES.blue, 'hcl:cmap: ', c_insert_map );
		log( '\n' );
	}

	status( 
		e: HCL_RUNTIME_EVENT | string,
		isEvent : boolean = typeof e != 'string'
	): void {
		if( !isEvent ) return log( e );
		const { signature, event_data } = e as HCL_RUNTIME_EVENT; 
		log( '\x1b[44m%s\x1b[0m', 'hcl_debug:', signature );
		switch( signature ) {
			case 'template:load':
				return this.std_load_template( event_data as RT_EVENT_DATA );
			default: 
				return log( FG_COLOR_ESCAPES.blue, 'hcl_debug:event:', event_data );
		}
	}

	append_line( __path: string, s ?: string ) {
		appendFileSync( __path, `${s ?? '~~~~~~~~~~~~~~~~~'}\n` );
	}

	event_to_file(
		e: HCL_RUNTIME_EVENT
	): void {
		const logFilePath = resolve( process.cwd(), this.logFile );
		const { 
			signature, 
			event_data, 
			phase, 
			type 
		} = e;
		const date = new Date();
		const timeStamp = date.toUTCString();

		if( !existsSync( logFilePath ) ) writeFileSync( logFilePath, '' );

		switch( signature ) {
			default:
				this.append_line( logFilePath, `hcl_debug:event: ${signature}` );
				this.append_line( logFilePath, `hcl_debug:event_type: ${type}` );
				this.append_line( logFilePath, `hcl_debug:event_phase: ${phase}` );
				this.append_line( logFilePath, `${timeStamp}` );
				this.append_line( logFilePath );
				break;
		}
	}
	
	init():
	void {
		if( this.silent ) return;
		const ev = HCL_EVENT_MAP[0] as HCL_RUNTIME_EVENT;
		if( this.logFile ) this.event_to_file( ev );
		return this.success( ev ); 
	}

	handleEvent( sig: HCL_EVENT_SIGNATURE, data ?: any ) {
		const ev = HCL_EVENT_MAP.filter( ev => ev.signature === sig ).pop() as HCL_RUNTIME_EVENT;
		ev['event_data'] = data;
		return ev;
	}

	logEventNormal( 
		e: HCL_RUNTIME_EVENT | string
	): void {
		return this.status( e );
	}

	logEventFile( 
		e: HCL_RUNTIME_EVENT
	): void {
		return this.event_to_file( e );
	}

	event( 
		name: HCL_EVENT_SIGNATURE,
		data: any
	):
	void {
		if( this.silent ) return;
		return this.logFile ? this.logEventFile( this.handleEvent( name, data ) ) : 
			this.logEventNormal( this.handleEvent( name, data ) );
	}
}