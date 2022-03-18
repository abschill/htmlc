import { 
	kBUF,
	vBUF,
	Insertion,
	AST_TARGET,
	Entry,
	UINSERT_MAP
} from './internals/types';

export default class Parser {
	static _delim = '{_}';
	static __CLOSE__ = '-->';
	static LOOP_CLOSE = `}${Parser.__CLOSE__}`;
	
	static LOOP_OPEN = ( key: string ): string => `<!--${Parser.__loopKey__}(${key}){`;

	static _renderKey = 'render';
	static __renderKey__ = `@${Parser._renderKey}`;
	static _partialKey = 'partial';
	static __partialKey__ = `@${Parser._partialKey}`;
	static _loopKey = 'loop';
	static __loopKey__ = `@${Parser._loopKey}`;

	static _loopSignature = `<!--${Parser.__loopKey__}(${Parser._delim}){}${Parser.__CLOSE__}`;
	static _keySignature = `<!--${Parser.__renderKey__}=${Parser._delim}${Parser.__CLOSE__}`;
	static _partialSignature = `<!--${Parser.__partialKey__}=${Parser._delim}${Parser.__CLOSE__}`;

	static _keyReggie = /<!--@render=[\w|\d]+-->/gi;
	static _partialReggie = /<!--@partial=[\w|\d]+-->/gi;

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

	static hasPartial( a: kBUF ) {
		return a.target.includes( Parser._replaceSignature( Parser._partialKey, a.key ) );
	}

	static partialIndex( a: kBUF ) {
		return a.target.indexOf( Parser._replaceSignature( Parser._partialKey, a.key ) );
	}

	static matchPartials( target: AST_TARGET ) {
		return target.match( Parser._partialReggie );
	}

	static replacePartial( a: vBUF ) {
		return a.target.replace( Parser._replaceSignature( Parser._partialKey, a.key ), a.value );
	}

	static hasKey( a: kBUF ) {
		return a.target.includes( Parser._replaceSignature( Parser._renderKey, a.key ) );
	}

	static matchKeys( target: AST_TARGET  ) {
		return target.match( Parser._keyReggie );
	}

	static hasLoop( a: kBUF ) {
		return a.target.includes( `<!--${Parser.__loopKey__}(${a.key}){` );
	}

	static matchLoops( target: AST_TARGET ) {
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

	static replaceAnonLoopBuf( a: kBUF ) {
		return a.target.replace( Parser._delim, a.key );
	}

	static replacedNamedLoopBuf( clone: string, insert: Insertion | Entry ) {
		let copy = clone;
		insert.forEach( ( insertion: string | UINSERT_MAP ) => {
			copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
		} );
		return copy;
	}
}
