import Partial from '../src/partial';
import Template from '../src/template';
import Parser from '../src/parser';
const p0 = new Partial( 'views/layout/head.html', { order:0 } )
const p1 = new Partial( './views/layout/head.html', { order:0 }, [{ title:'Test Title', desc: 'This is a description' }] )
const t = new Template( [p1], 'ssr' );

describe( 'Partial Checks', () => {
    it( 'Partial Exists', () => {
        expect( Object.keys( p0.asObject() ) ).toContain( 'content' );
    } );

} );
describe( 'Template Checks', () => {
    it( 'Template Exists', () => {
        expect( Object.keys( t.asObject() ) ).toContain( 'partials' );
    } );
} );

describe( 'Parser Checks', () => {
    it( 'Parses Partial', () => {
        const parser = new Parser( t );
        parser.run()
        expect( Object.keys( p1 ) ).toContain( 'content' );
    } );
} );