import Partial from '../src/partials';
import Template from '../src/template';

const p = new Partial( 'views/layout/head.html', { order:0 } )
const t = new Template( [p], 'ssr' );
describe( 'Partial Checks', () => {
    it( 'Partial Exists', () => {
        expect( p.asObject() ).toBeTruthy();
    } );
} );
describe( 'Template Checks', () => {

    it( 'Template Exists', () => {
        expect(t.asObject()).toBeTruthy();
    } );
} );