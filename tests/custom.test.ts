
import Loader from '../dist';
import mainTest from './setup';
import { _custom_template_test } from '../dist/config'
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
        const _tester = l0.getTemplate( 'home', _custom_template_test );
        Object.values( _custom_template_test ).forEach( input => {
            if( typeof( input ) !== 'string' ) {
                //is array
                //@ts-ignore
                input.forEach( entry => {
                    if( typeof( entry ) !== 'object' ) {
                        //entry is value
                        expect( _tester ).toContain( entry ); 
                       
                    }
                    else {
                        //entry is obj
                        Object.values( entry ).forEach( val => {
                            expect( _tester ).toContain( val );
                        } );
                    }
                } );
            }
            else {
                //is value map
                expect( _tester ).toContain( input );
            }
        } ); 
    } );
});