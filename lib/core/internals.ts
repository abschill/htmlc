import { core } from '../loader';

export declare namespace coreEvent {
	export type Name = string;
	export type Args<T> = [
		T,
		core.Context,
		IArguments
	]

	export interface Trigger<T> {
		name: string;
		signature: Args<T>
	}
}

export declare namespace compiler {
	export type ASTMatch = RegExpMatchArray | String[] | []

	export interface Args {
		template_name: string;
		ctx: core.Context;
		data ?: compiler.UINSERT_MAP;
	}

	export interface RenderMap {
        todo_partials: ASTMatch;
        todo_keys: ASTMatch;
        todo_loops: ASTMatch;
    }

	export type Dictionary<ReservedWord> = Array<ReservedWord>

	export type ReservedWord = {
		key: string;
		boolean: ( a: internals.kBUF ) => boolean;
		array: ( a: internals.AST_TARGET ) => Array<string>;
	}

	export type StackItem = {
        replacer: core.template;
        insertion: core.template | core.template[] | core.template[][];
    }

	export type UINSERT_MAP = object;

    export interface compiledMap extends UINSERT_MAP {
        partialInput: UINSERT_MAP;
    }
}

export declare namespace internals {

	export type AST_TARGET = string;

	//stores key value to test against ast target domstring
	export type kBUF = {
		target: AST_TARGET
		key: string;
	}

	//stores value assigned to key to test against target domstring
	export type vBUF = {
		target: AST_TARGET;
		key: string;
		value: string;
	}

	export interface RLoopBUF {
		head: number;
		tail: number;
	}

    export type Entry = Array<string | compiler.UINSERT_MAP>;

    export type Insertion = [
        string|compiler.UINSERT_MAP,
        Entry
    ];

    export type Resolved<RenderMap> = {
        raw: string;
        renderMap: RenderMap;
        insertionMap: compiler.UINSERT_MAP;
        render: string;
    }

    export type RenderTemplateArgs = {
        _toInsert: Object;
        raw: string;
        conf: core.ROptions;
    }

	type TargetDirectoryTree = {
        path: string;
        files: string[];
    }

    type FileInputMeta = {
        path: string;
        name: string;
        rawFile: string;
    }

    type fileUTF8 = string;

	export type _templateInsert = object | {} | any | null;

}

export const _DEFAULTS: core.Entity<core.Options> = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: false,
	debug: false
}

export const DEFAULTS = {
	..._DEFAULTS,
    _publishDefault : "dist",
    outDefault: "public",
    static_config: {
        pathRoot: 'views',
        partials: 'partials',
        templates: 'pages',
        outPath: 'public',
        loaderFile: 'loader.js',
        cleanup: true
    }
}

const { log, warn } = console;

export class Debugger {

	constructor() {}

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

	static _registerMap( rmap: compiler.RenderMap, imap: compiler.UINSERT_MAP ) {
		log( 'HCL_EVENT: map::register' );
		log( rmap );
		log( imap );
	}
}
