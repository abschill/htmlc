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
    const parser = new Parser( t );
    
    it( 'Parses Partial', () => {
        expect( Object.keys( p1 ) ).toContain( 'content' );
    } );
    it( 'Has unparsed variables', () => {
        const { content } = p1;
        const hasMatchers = content.includes( '$hp=' );
        expect( hasMatchers ).toBeTruthy();
    });
    it( 'Parses Variables in Partial', () => {
        parser.run()
        const { content } = p1;
        const hasMatchers = content.includes( '$hp=' );
        expect( hasMatchers ).toBeFalsy();
    })
} );