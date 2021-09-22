
import Loader from '../dist';
import testData from './setup';
import { path_test, path_templates, path_partials } from './setup';
const l0 = new Loader( testData )
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
    
});