import { nestedHome as tester } from './fixtures/prepareLoaders';

describe( 'Parses nested token insertions from input', () => {
    it( 'Gets key/values', () => {
        expect( tester ).toMatch( 'foobar' );
        expect( tester ).toMatch( 'Hello World' );
        expect( tester ).toMatch( 'Page Title' );
        expect( tester ).toMatch( 'Page Subtitle' );
    } );
    it( 'Doesnt silent error', () => {
        expect( tester ).not.toMatch( 'undefined' );
        expect( tester ).not.toMatch( '<!--@render' );
        expect( tester ).not.toMatch( '<!--@partial' );
        expect( tester ).not.toMatch( '<!--@loop' );
    } );
} );
