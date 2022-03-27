import { 
	LoaderOptions, 
	CoreOptions, 
	LogStrategy, 
	LogMode, 
	HCL_EVENT, 
	HCL_EVENT_SIGNATURE, 
	HCL_RUNTIME_EVENT, 
	RT_EVENT_DATA,
	WriteLogFileArgs
} from './types';
import { 
	join, 
	resolve 
} from 'path';
import { __write } from '../../cli/tools';
import { FG_COLOR_ESCAPES } from './types/util';
import { DEFAULTS } from '.';
const { 
	log, 
	warn, 
	error
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
	logMode: LogMode = 'silent';
	logStrategy: LogStrategy = 'none';
	logFile ?: string;
	silent: boolean;

	constructor( conf: LoaderOptions ) {
		this.runtimeOptions = conf as CoreOptions;
		const debugOpt = this.runtimeOptions.debug;
		if( typeof( debugOpt ) === 'boolean' ) {
			if( debugOpt === true ) {
				this.logMode = 'verbose';
				this.logStrategy = 'stdout';
			}
		}
		else {
			this.logMode = debugOpt?.logMode ?? 'silent'; 
			this.logStrategy = debugOpt?.logStrategy ?? 'none';
			this.silent = this.logMode === 'silent';
		}
		this.init();
	}

	get_logpath() {
		return resolve( process.cwd(), this.logFile ?? 'hcl.log' );
	}

	_write(
		args: WriteLogFileArgs
	): void {
		//todo
	}


	success( 
		e: HCL_RUNTIME_EVENT
	): void {
		switch( e.signature ) {
			case 'loader:init':
				return this.std_init_success();
			default:
				return log( green, 'html-chunk-loader:', e.event_data ?? e.signature );
		}
	}

	std_init_success() {
		const path_root = join( process.cwd(), this.runtimeOptions.pathRoot ?? DEFAULTS.pathRoot );
		const t_root = join( path_root, this.runtimeOptions.templates ?? DEFAULTS.templates );
		const p_root = join( path_root, this.runtimeOptions.partials ?? DEFAULTS.partials );
		log( green, 'hcl:pathRoot:', path_root );
		log( green, 'hcl:templates:', t_root );
		log( green, 'hcl:partials:', p_root );
		log( green, 'hcl:',  'Loaded Config Successfully' );
		log( '\n' );
	}

	std_load_template(
		event_data: RT_EVENT_DATA
	) {
		const { template_name, u_insert_map, c_insert_map } = event_data;
		log( blue, 'hcl:template: ', template_name );
		log( blue, 'hcl:umap: ', u_insert_map );
		log( blue, 'hcl:cmap: ', c_insert_map );
		log( '\n' );
	}

	status( 
		e: HCL_RUNTIME_EVENT | string,
		isEvent : boolean = typeof e != 'string'
	): void {
		if( !isEvent ) return log( e );
		const { signature, event_data } = e as HCL_RUNTIME_EVENT; 
		log( blue, 'html-chunk-loader:', signature );
		switch( signature ) {
			case 'template:load':
				return this.std_load_template( event_data as RT_EVENT_DATA );
			default: 
				return log( blue, 'hcl:', event_data );
		}
	}

	event_to_file(
		e: HCL_RUNTIME_EVENT
	): void {
		//
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