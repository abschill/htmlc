import { Options, CoreOptions, LogStrategy, LogMode, HCL_EVENT, HCL_EVENT_SIGNATURE, HCL_RUNTIME_EVENT, RT_EVENT_DATA } from './types';
import { join, resolve } from 'path';
import { FG_COLOR_ESCAPES } from '.';
import { DEFAULTS } from '.';
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
const {
	blue, green
} = FG_COLOR_ESCAPES;

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
		signature: 'template:load',
		fatal: false
	}
];

export default class Debugger {

	runtimeOptions: CoreOptions;
	logMode: LogMode = 'normal';
	logStrategy: LogStrategy = 'stdout';
	logFile ?: string;
	silent: boolean;

	constructor( conf: Options ) {
		this.runtimeOptions = conf as CoreOptions;
		try {
			const debugOpt = this.runtimeOptions.debug;
			if( typeof( debugOpt ) === 'boolean' ) {
				if( debugOpt === true ) {
					this.logMode = 'normal';
					this.logStrategy = 'stdout';
				}
				else {
					this._setDefaults();
				}
				
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
		this.logStrategy = 'none';
	}

	success( 
		e: HCL_RUNTIME_EVENT
	): void {
		log( green, 'html-chunk-loader:', e.event_data ?? e.signature );
		if( e.signature === 'loader:init' ) {
			const path_root = join( process.cwd(), this.runtimeOptions.pathRoot ?? DEFAULTS.pathRoot );
			const t_root = join( path_root, this.runtimeOptions.templates ?? DEFAULTS.templates );
			const p_root = join( path_root, this.runtimeOptions.partials ?? DEFAULTS.partials );
			log( green, 'hcl:pathRoot:', path_root );
			log( green, 'hcl:templates:', t_root );
			log( green, 'hcl:partials:', p_root );
		}
	}

	status( 
		e: HCL_RUNTIME_EVENT | string,
		isEvent : boolean = typeof e != 'string'
	): void {
		if( !isEvent ) return log( e );
		const { signature, event_data } = e as HCL_RUNTIME_EVENT; 
		log( FG_COLOR_ESCAPES.blue, 'html-chunk-loader:', signature );
		
		if( signature !== 'template:load' ) {
			log( FG_COLOR_ESCAPES.blue, 'hcl:', event_data );
		}
		else {
			const { template_name, u_insert_map, c_insert_map } = event_data as RT_EVENT_DATA;
			log( blue, 'hcl:template: ', template_name );
			log( blue, 'hcl:umap: ', u_insert_map );
			log( blue, 'hcl:cmap: ', c_insert_map );
		}

		log();
		
	}
	

	init():
	void {
		if( this.silent ) return;
		return this.success( HCL_EVENT_MAP[0] as HCL_RUNTIME_EVENT ); 
	}

	handleEvent( sig: HCL_EVENT_SIGNATURE, data ?: any ) {
		const ev = HCL_EVENT_MAP.filter( ev => ev.signature === sig ).pop() as HCL_RUNTIME_EVENT;
		ev['event_data'] = data;
		return ev;
	}

	logEventNormal( 
		e: HCL_RUNTIME_EVENT
	): void {
		return this.status( e );
	}

	logEventFile( 
		e: HCL_RUNTIME_EVENT
	): void {
		//
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