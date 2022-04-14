import {
	GlobalOptions,
	SSROptions,
	SSGOptions,
	LogStrategy,
	LogMode,
	DebugEventType,
	DebugEventSignature,
	DebugConfig,
	UDebugConfig
} from '../types';
import {
	join,
	resolve
} from 'path';
import {
	writeFileSync,
	appendFileSync,
	existsSync
} from 'fs';
import { 
	SSR_DEFAULTS, 
	FG_COLOR_ESCAPES, 
	HCL_EVENT_MAP, 
	DEBUG_DEFAULTS 
} from '.';
const c = console;
// export class Debugger {

// 	runtimeOptions: SSROptions;
// 	logMode: LogMode  = 'none';
// 	logStrategy: LogStrategy = 'silent';
// 	logFile ?: string;
// 	silent: boolean;

// 	constructor( conf: toLoadOptions ) {
// 		this.runtimeOptions = <SSROptions>conf;
// 		const { debug = __DEFAULTS__.debug } = this.runtimeOptions;
// 		if( typeof( debug ) === 'boolean' ) {
// 			if( debug === true ) {
// 				this.logMode = 'stdout';
// 				this.logStrategy = 'verbose';
// 			}
// 			else {
// 				this.logMode = 'none';
// 				this.logStrategy = 'silent';
// 			}
// 		}
// 		else {
// 			this.logMode = debug?.logMode ?? 'none';
// 			this.logStrategy = debug?.logStrategy ?? 'silent';
// 			this.logFile = debug?.logFile ?? 'hcl.log';
// 		}
// 		this.silent = this.logStrategy === 'verbose';
// 		this.init();
// 	}

// 	get_logpath() {
// 		return resolve( process.cwd(), this.logFile ?? 'hcl.log' );
// 	}

// 	success(
// 		e: RuntimeEvent
// 	): void {
// 		switch( e.signature ) {
// 			case 'loader:init':
// 				return this.std_init_success();
// 			default:
// 				return log( '\x1b[42m%s\x1b[0m', 'hcl_debug:', e.event_data ?? e.signature );
// 		}
// 	}

// 	std_init_success() {
// 		const path_root = join( process.cwd(), this.runtimeOptions.pathRoot ?? __DEFAULTS__.pathRoot );
// 		const t_root = join( path_root, this.runtimeOptions.templates ?? __DEFAULTS__.templates );
// 		const p_root = join( path_root, this.runtimeOptions.partials ?? __DEFAULTS__.partials );
// 		log( FG_COLOR_ESCAPES.green, 'hcl_debug:pathRoot:', path_root );
// 		log( FG_COLOR_ESCAPES.green, 'hcl_debug:templates:', t_root );
// 		log( FG_COLOR_ESCAPES.green, 'hcl_debug:partials:', p_root );
// 		log( FG_COLOR_ESCAPES.green, 'hcl_debug:event:',  'Loaded Config Successfully' );
// 		log( '\n' );
// 	}

// 	std_load_template(
// 		event_data: RT_EVENT_DATA
// 	) {
// 		const { template_name, u_insert_map, c_insert_map } = event_data;
// 		log( FG_COLOR_ESCAPES.blue, 'hcl_debug:template:load: ', template_name );
// 		if( !Object.is( u_insert_map, {} ) ) log( FG_COLOR_ESCAPES.blue, 'hcl:umap: ', u_insert_map );
// 		if( !Object.is( c_insert_map, {} ) ) log( FG_COLOR_ESCAPES.blue, 'hcl:cmap: ', c_insert_map );
// 		log( '\n' );
// 	}

// 	status(
// 		e: RuntimeEvent | string,
// 		isEvent : boolean = typeof e != 'string'
// 	): void {
// 		if( !isEvent ) return log( e );
// 		const { signature, event_data } = <RuntimeEvent>e;
// 		log( '\x1b[44m%s\x1b[0m', 'hcl_debug:', signature );
// 		switch( signature ) {
// 			case 'template:load':
// 				return this.std_load_template( <RT_EVENT_DATA>event_data );
// 			default:
// 				return log( FG_COLOR_ESCAPES.blue, 'hcl_debug:event:', event_data );
// 		}
// 	}

// 	append_line( __path: string, s ?: string ) {
// 		appendFileSync( __path, `${s ?? '~~~~~~~~~~~~~~~~~'}\n` );
// 	}

// 	event_to_file(
// 		e: RuntimeEvent
// 	): void {
// 		const logFilePath = resolve( process.cwd(), this.logFile );
// 		const {
// 			signature,
// 			event_data,
// 			phase,
// 			type
// 		} = e;
// 		const date = new Date();
// 		const timeStamp = date.toUTCString();

// 		if( !existsSync( logFilePath ) ) writeFileSync( logFilePath, '' );

// 		switch( signature ) {
// 			default:
// 				this.append_line( logFilePath, `hcl_debug:event: ${signature}` );
// 				this.append_line( logFilePath, `hcl_debug:event_type: ${type}` );
// 				this.append_line( logFilePath, `hcl_debug:event_phase: ${phase}` );
// 				this.append_line( logFilePath, `${timeStamp}` );
// 				this.append_line( logFilePath );
// 				break;
// 		}
// 	}

// 	init():
// 	void {
// 		console.log( this.runtimeOptions );
// 		console.log( this.silent );
// 		if( this.silent ) return;
// 		const ev = <RuntimeEvent>HCL_EVENT_MAP[0];
// 		if( this.logFile ) this.event_to_file( ev );
// 		return this.success( ev );
// 	}

// 	handleEvent( sig: DebugEventSignature, data ?: any ) {
// 		const ev = <RuntimeEvent>HCL_EVENT_MAP.filter( ev => ev.signature === sig ).pop();
// 		ev['event_data'] = data;
// 		return ev;
// 	}

// 	logEventNormal(
// 		e: RuntimeEvent | string
// 	): void {
// 		return this.status( e );
// 	}

// 	logEventFile(
// 		e: RuntimeEvent
// 	): void {
// 		return this.event_to_file( e );
// 	}

// 	event(
// 		name: DebugEventSignature,
// 		data: any
// 	):
// 	void {
// 		if( this.silent ) return;
// 		return this.logFile ? this.logEventFile( this.handleEvent( name, data ) ) :
// 			this.logEventNormal( this.handleEvent( name, data ) );
// 	}
// }

// export function createDebugger(
// 	options: toLoadOptions
// 	):
// Debugger {
// 	return new Debugger( options );
// }

function cleanArgs(
	args: UDebugConfig | true
): DebugConfig {
	if( args !== true ) return {...DEBUG_DEFAULTS, ...<UDebugConfig>args };
	return DEBUG_DEFAULTS;
}

export function createDebugger( 
	options: SSROptions | SSGOptions
) {
	if( !options.debug ) {
		return;
	}
	const config = cleanArgs( options.debug );
	//@ts-ignore
	if( config.logMode === 'silent' ) {
		return;
	}
	c.log( FG_COLOR_ESCAPES.green, 'html-chunk-loader: config loaded\n' );
	c.log( FG_COLOR_ESCAPES.green, config );
	
	function log ( 
		event_signature: DebugEventSignature, 
		data: unknown 
	) {
		c.log( FG_COLOR_ESCAPES.blue, `html-chunk-loader: ${event_signature}` );
		c.log( <string>data );
	}

	return { log };
}