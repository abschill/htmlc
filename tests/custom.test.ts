
import Loader from '../dist';
import mainTest from './setup';
import { _custom_template_test } from '../dist/default'
import { path_test, path_templates, path_partials } from './setup';
import { testInp } from './fn';
const l0 = new Loader( mainTest );
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
        const _t = l0.getTemplate( 'about', _custom_template_test.about );
        expect( _t ).toContain( '<head>' );
        expect( _t ).toContain( '<main>' );
        expect( _t ).toContain( '<footer>');
        expect( _t ).toContain( _custom_template_test.about.content ) 
    } );

    it( 'Loads Iterables', () => {
        const _tester = l0.getTemplate( 'home', _custom_template_test.home );
        Object.values( _custom_template_test.home ).forEach( input => {
            testInp( _tester, input );
        } );    
        const __tester = l0.getTemplate( 'about', _custom_template_test.about );
        Object.values( _custom_template_test.about ).forEach( input => {
           testInp( __tester, input );
        } ); 
    } );
    
});

