import Partial from '../src/partials';
import Template from '../src/template';
import Parser from '../src/parser';
const p0 = new Partial( 'views/layout/head.html', { order:0 } )
const p1 = new Partial( './views/layout/head.html', { order:0 }, [{ title:'Test Title', desc: 'This is a description' }] )
const t = new Template( [p1], 'ssr' );

describe( 'Partial Checks', () => {
    it( 'Partial Exists', () => {
        expect( p0.asObject() ).toBeTruthy();
    } );

} );
describe( 'Template Checks', () => {
    it( 'Template Exists', () => {
        expect(t.asObject()).toBeTruthy();
    } );
} );

describe( 'Parser Checks', () => {
    it( 'Parses Partial', () => {
        const parser = new Parser( t );
        parser.run()
        expect(p1.content).toBeTruthy();
    } );
} );