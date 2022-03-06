import { compiler, internals } from "./internals";

export default class Parser {
	static _delim: string = '{_}';

	static _renderKey = 'render';
	static __renderKey__ = `@${this._renderKey}`;
	static _partialKey = 'partial';
	static __partialKey__ = `@${this._partialKey}`;
	static _loopKey = 'for';
	static __loopKey__ = `@${this._loopKey}`;

	static FOR_T = (): string => `}-->`;
	static FOR_H = ( key: string ): string => `<!--@for(${key}){`;

	static _loopSignature: string = `<!--${this.__loopKey__}(${this._delim}){}-->`;
	static _keySignature: string = `<!--${this.__renderKey__}=${this._delim}->`;
	static _partialSignature: string = `<!--${this.__partialKey__}=${this._delim}-->`;

	private static _replaceSignature( type: string, val: string ) {
		switch( type ) {
			case 'partial':
				return this._partialSignature.replace( this._delim, val );
			case 'loop':
				return this._loopSignature.replace( this._delim, val );
			default:
				return this._keySignature.replace( this._delim, val );
		}
	}

	public static hasPartial( a: internals.kBUF ) {
		return a.target.includes( this._replaceSignature( this._partialKey, a.key ) );
	}

	public static partialIndex( a: internals.kBUF ) {
		return a.target.indexOf( this._replaceSignature( this._partialKey, a.key ) );
	}

	public static matchPartials( target: internals.AST_TARGET ) {
		return target.match( /<!--@partial=[\w|\d]+-->/gi );
	}

	public static replacePartial( a: internals.vBUF ) {
		return a.target.replace( this._replaceSignature( this._partialKey, a.key ), a.value );
	}

	public static hasKey( a: internals.kBUF ) {
		return a.target.includes( this._replaceSignature( this._renderKey, a.key ) );
	}

	public static matchKeys( target: internals.AST_TARGET  ) {
		return target.match( /<!--@render=[\w|\d]+-->/gi );
	}

	public static hasLoop( a: internals.kBUF ) {
		return a.target.includes( `<!--@for(${a.key}){` );
	}
	public static matchLoops( target: internals.AST_TARGET ) {
		const out: Array<string> = [];
		const _opener = /<!--@for\(\w+\){/gi;
		const opener = target.match( _opener );
		if( opener && opener?.length > 0 ) {
			opener.forEach( match => {
				const chopBottom = target.slice( target.indexOf( match ), target.length );
				if( chopBottom ) {
					const ret = chopBottom?.slice( 0, chopBottom.indexOf( '}-->' ) + 4 );
					if ( ret ) out.push( ret );
				}
			} );
		}
		return out;
	}

	public static replaceAnonLoopBuf( a: internals.kBUF ) {
		return a.target.replace( this._delim, a.key );
	}

	public static replacedNamedLoopBuf(  clone: string, insert: internals.Insertion | internals.Entry ) {
		let copy = clone;
		insert.forEach( ( insertion: string | compiler.UINSERT_MAP ) => {
			copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
		} );
		return copy;
	}
}
