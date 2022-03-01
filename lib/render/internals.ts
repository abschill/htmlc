import { Runtime } from '../loader';
export declare namespace hclInternal {

	type EventName = string;

	type EventArgs<T> = [
		T,
		Runtime.Context,
		IArguments
	]

	interface CompilerArgs {
		template_name: string;
		ctx: Runtime.Context;
		data ?: _insertMap;
	}

    type Entry = Array<string | _insertMap>;

    type Insertion = [
        string|_insertMap,
        Entry
    ];

    type _match = RegExpMatchArray | []

    type _insertMap = object;

    interface compiledMap extends _insertMap {
        partialInput: _insertMap;
    }

    export interface RenderMap {
        todo_partials: _match;
        todo_keys: _match;
        todo_loops: _match;
    }

    export type Resolved<RenderMap> = {
        raw: string;
        renderMap: RenderMap;
        insertionMap: _insertMap;
        render: string;
    }

    export type StackItem = {
        replacer: Runtime.template;
        insertion: Runtime.template | Runtime.template[] | Runtime.template[][];
    }

    export type RenderTemplateArgs = {
        _toInsert: Object;
        raw: string;
        conf: Runtime.Options;
    }

    export type Template = {
        path: string;
        args: RenderTemplateArgs;
        valueOf: string;
    }
}

export declare namespace hclFS {

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
}


export type _templateInsert = object | {} | any | null;

export interface TemplateInsertion {
    partialInput ?: TemplateInsertion;
}

export type Dictionary<ReservedWord> = Array<ReservedWord>

export type ReservedWord = {
    key: string;
    boolean: ( target: string, arr: string ) => boolean;
    array: ( target: string ) => RegExpMatchArray | null
};

export interface LoaderContext {
    conf: Runtime.Context
    template: ( name: string, data ?: object ) => Runtime.template
};

export const DEFAULTS = {
    "_publishDefault" : "dist",
    "pathRoot":"views",
    "partials":"partials",
    "templates":"pages",
    "outDefault":"public",
    "static_config": {
        "pathRoot": "views",
        "partials": "partials",
        "templates": "pages",
        "outPath": "public",
        "loaderFile":"loader.js",
        "cleanup":true
    }
}
export const _DEFAULTS: Runtime.Options = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: true
}

const { log } = console;

export class hclDebugger {

	constructor() {}

	static _registerEvent( ...args: hclInternal.EventArgs<hclInternal.EventName> ) {
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
