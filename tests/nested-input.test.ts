import { createLoader } from '../lib/loader/index.js';
const myLoader = createLoader( {
    pathRoot: 'test-pkg/nested_loopobject',
    partials: 'partials',
    templates: 'templates',
    partialInput: {},
    templateInput: {
        foo: {
            bar: 'foobar'
        },
        page: {
            title: 'Hello World',
            body : {
                heading0: 'Page Title',
                heading1: 'Page Subtitle'
            }
        }
    },
    discoverPaths: true
} );

const tester = myLoader.template( 'home' );

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