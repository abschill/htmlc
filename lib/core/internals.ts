import { core } from '../loader';
export declare namespace internals {

	export type EventName = string;

	export type EventArgs<T> = [
		T,
		core.Context,
		IArguments
	]

	export interface CompilerArgs {
		template_name: string;
		ctx: core.Context;
		data ?: UINSERT_MAP;
	}

    export type Entry = Array<string | UINSERT_MAP>;

    export type Insertion = [
        string|UINSERT_MAP,
        Entry
    ];

    export type _match = RegExpMatchArray | []

    export type UINSERT_MAP = object;

    export interface compiledMap extends UINSERT_MAP {
        partialInput: UINSERT_MAP;
    }

    export interface RenderMap {
        todo_partials: _match;
        todo_keys: _match;
        todo_loops: _match;
    }

    export type Resolved<RenderMap> = {
        raw: string;
        renderMap: RenderMap;
        insertionMap: UINSERT_MAP;
        render: string;
    }

    export type StackItem = {
        replacer: core.template;
        insertion: core.template | core.template[] | core.template[][];
    }

    export type RenderTemplateArgs = {
        _toInsert: Object;
        raw: string;
        conf: core.Options;
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

	export interface TemplateInsertion {
		partialInput ?: TemplateInsertion;
	}

	export type Dictionary<ReservedWord> = Array<ReservedWord>

	export type ReservedWord = {
		key: string;
		boolean: ( target: string, arr: string ) => boolean;
		array: ( target: string ) => RegExpMatchArray | null;
	}

	export interface RuntimeState {
		ctx: core.Context;
		template: ( name: string, data ?: object ) => core.template;
	}
}

export const _DEFAULTS: core.Options = {
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

const { log } = console;

export class hclDebugger {

	constructor() {}

	static _registerEvent( ...args: internals.EventArgs<internals.EventName> ) {
		const eventName = args[0];
		const templateName = args[2]['0'].template_name;
		const contextData = args[2]['0'].ctx;
		if( args[1].config.debug ) {
			log( 'HCL_EVENT: ', eventName );
			log( 'HCL_TEMPLATE: ', templateName );
			log( 'HCL_CTX: ', contextData );
		}
	}
};
