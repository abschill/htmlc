/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */
import { cleanHTML } from './internals/util/cleanHTML';
import { internals, compiler } from './internals';
import Debugger from './internals/debugger';
import Compiler  from './compile';
import Parser from './parser';

export declare namespace core {
    export type Context = {
        config: ROptions;
        partials: internals.FileInputMeta[];
        templates: internals.FileInputMeta[];
    };

	export interface RuntimeState {
		ctx: core.Context;
		template: ( name: string, data ?: object ) => core.template;
	}

	type Entity<Type> = {
		[Property in keyof Type]-?: Type[Property];
	}

	export type Event<T> = {
		( args: T ): T;
	}

    export type Options = {
        pathRoot ?: string;
        templates ?: string;
        partials ?: string;
        partialInput ?: compiler.UINSERT_MAP;
        templateInput ?: compiler.UINSERT_MAP;
        watch ?: boolean;
        debug ?: boolean;
    };

	export type ROptions = Entity<Options>;

    export type template = string;

    export type StaticOptions = {
        load_options: ROptions;
        static_options: {
            cleanup: boolean;
            outPath: string;
            loaderFile: string | string[];
        };
    };
}
/**
 *
 * @param {Partial[]} declaredPartials array of partials declared in loader context
 * @param {string} rawFile raw file contents to insert to
 * @param {object} insertMap map to insert values into templates from
 * @param debug
 * @returns {string} The rendered template
 */
const render = (
    declaredPartials: internals.FileInputMeta[],
    rawFile: internals.fileUTF8,
    insertMap: compiler.UINSERT_MAP,
    debug ?: boolean
): core.template => {
    let rootCopy = rawFile;
    const renMap = Compiler.__renderMap( rootCopy );
    if( debug ) Debugger._registerMap( renMap, insertMap );

    if( renMap.todo_partials && renMap.todo_partials.length > 0 ) {
        renMap.todo_partials.forEach( ( partialSeg: string ) => {
            const p_name = partialSeg.split( `${Parser.__partialKey__}=` )[1].split( Parser.__CLOSE__ )[0];
            const matchPartials = declaredPartials.filter( n => n.name === p_name );
            if( matchPartials.length > 0 ) {
                matchPartials.forEach( partial => {
                    const renderMap = Compiler.__renderMap( partial.rawFile );
                    const scoped_insertion = insertMap[ 'partialInput' ] ?? {};
                    const insertion = { ...insertMap, ...scoped_insertion };
                    const resolved = Compiler.resolve( partial.rawFile, renderMap, insertion, debug );
                    if( debug ) Debugger._registerMap( renderMap, insertMap );
                    rootCopy = rootCopy.replace( partialSeg, resolved.render );
                } );
            }
        } );
    }

    if( renMap.todo_keys && renMap.todo_keys.length > 0 ) {
        renMap.todo_keys.forEach( _ => {
            const renderMap = Compiler.__renderMap( rootCopy );
            const resolved = Compiler.resolve( rootCopy, renderMap, insertMap );
			if( debug ) Debugger._registerMap( renderMap, insertMap );

            rootCopy = resolved.render;
        } );
    }

    if( renMap.todo_loops && renMap.todo_loops.length > 0 ) {
        renMap.todo_loops.forEach( _ => {
            const renderMap = Compiler.__renderMap( rootCopy );
            if( debug ) Debugger._registerMap( renderMap, insertMap );
            rootCopy = Compiler.resolve( rootCopy, renderMap, insertMap ).render;
        } );
    }

    try {
        const render = cleanHTML( rootCopy );
        if( debug ) Debugger._finalize( { raw: rawFile, render } );
        return render;
    }
    catch( e ) {
		Debugger.raise( 'Failed to Clean HTML' );
		Debugger.raise( e );
        return rootCopy;
    }
}
export default render;
