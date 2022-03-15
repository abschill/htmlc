import { compiler, internals } from "./internals";

export default class Parser {
	static _delim: string = '{_}';
	static __CLOSE__: string = '-->';
	static LOOP_CLOSE: string = `}${this.__CLOSE__}`;
	
	static LOOP_OPEN = ( key: string ): string => `<!--${this.__loopKey__}(${key}){`;

	static _renderKey = 'render';
	static __renderKey__ = `@${this._renderKey}`;
	static _partialKey = 'partial';
	static __partialKey__ = `@${this._partialKey}`;
	static _loopKey = 'loop';
	static __loopKey__ = `@${this._loopKey}`;

	static _loopSignature: string = `<!--${this.__loopKey__}(${this._delim}){}${this.__CLOSE__}`;
	static _keySignature: string = `<!--${this.__renderKey__}=${this._delim}${this.__CLOSE__}`;
	static _partialSignature: string = `<!--${this.__partialKey__}=${this._delim}${this.__CLOSE__}`;

	static _keyReggie: RegExp = /<!--@render=[\w|\d]+-->/gi;
	static _partialReggie: RegExp = /<!--@partial=[\w|\d]+-->/gi;


	private static _replaceSignature( type: string, val: string ) {
		switch( type ) {
			case Parser._partialKey:
				return Parser._partialSignature.replace( Parser._delim, val );
			case Parser._loopKey:
				return Parser._loopSignature.replace( Parser._delim, val );
			default:
				return Parser._keySignature.replace( Parser._delim, val );
		}
	}

	public static hasPartial( a: internals.kBUF ) {
		return a.target.includes( Parser._replaceSignature( Parser._partialKey, a.key ) );
	}

	public static partialIndex( a: internals.kBUF ) {
		return a.target.indexOf( Parser._replaceSignature( Parser._partialKey, a.key ) );
	}

	public static matchPartials( target: internals.AST_TARGET ) {
		return target.match( Parser._partialReggie );
	}

	public static replacePartial( a: internals.vBUF ) {
		return a.target.replace( Parser._replaceSignature( Parser._partialKey, a.key ), a.value );
	}

	public static hasKey( a: internals.kBUF ) {
		return a.target.includes( Parser._replaceSignature( Parser._renderKey, a.key ) );
	}

	public static matchKeys( target: internals.AST_TARGET  ) {
		return target.match( Parser._keyReggie );
	}

	public static hasLoop( a: internals.kBUF ) {
		return a.target.includes( `<!--${Parser.__loopKey__}(${a.key}){` );
	}

	public static matchLoops( target: internals.AST_TARGET ) {
		const out: Array<string> = [];
		const _opener = /<!--@loop\(\w+\){/gi;
		const opener = target.match( _opener );
		if( opener && opener?.length > 0 ) {
			opener.forEach( ( match: string ) => {
				const chopBottom = target.slice( target.indexOf( match ), target.length );
				if( chopBottom ) {
					const ret = chopBottom?.slice( 0, chopBottom.indexOf( Parser.LOOP_CLOSE ) + Parser.LOOP_CLOSE.length );
					if ( ret ) out.push( ret );
				}
			} );
		}
		return out;
	}

	public static replaceAnonLoopBuf( a: internals.kBUF ) {
		return a.target.replace( Parser._delim, a.key );
	}

	public static replacedNamedLoopBuf( clone: string, insert: internals.Insertion | internals.Entry ) {
		let copy = clone;
		insert.forEach( ( insertion: string | compiler.UINSERT_MAP ) => {
			copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
		} );
		return copy;
	}
}
