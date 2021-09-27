
import Loader from '../dist';
import mainTest from './setup';
import { path_test, path_templates, path_partials } from './setup';
const l0 = new Loader( mainTest )
describe( 'Custom Config Options', () => {
    it( 'sets custom directory base', () => {
        expect( l0._config.pathRoot ).toBe( path_test );
    } );
    it( 'sets custom template dir', () => {
        expect( l0._config.templates ).toBe( path_templates );
    } );
    it( 'sets custom partial dir', () => {
        expect( l0._config.partials ).toBe( path_partials );
    } );
    it( 'Loads Static Template', () => {
        const _t = l0.getTemplate( 'about' );
        expect( _t ).toContain( '<head>' );
        expect( _t ).toContain( '<main>' );
        expect( _t ).toContain( '<footer>');
    } );

    it( 'Loads Iterables', () => {
        const _tester = l0.getTemplate( 'home', { 
            content: 'Body Content', 
            items: [ 'foo', 'bar' ], 
            items2: [ 
                { title: 'item 1', desc: 'this is item 1' }, 
                { title: 'item 2', desc: 'this is item 2' } 
            ] 
        } );
        expect( _tester ).toContain( 'foo' ); 
        expect( _tester ).toContain( 'bar' ); 

        expect( _tester ).toContain( 'this is item 1' ); 
        expect( _tester ).toContain( 'this is item 2' ); 
    } );
});