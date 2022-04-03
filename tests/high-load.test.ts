import { createLoader } from '../lib/loader';

const myLoader = createLoader( {
    pathRoot: 'test-pkg/big-bertha',
    templates: 'templates',
    partials: 'partials',
    intlCode: 'es',
    partialInput: {
        partial_one_data: 'Partial One',
        partial_four_data: 'Partial four'
    },
    templateInput: {
        generic_page_content: 'Generic Page Content'
    },
    debug: true,
    discoverPaths: true
} );
const chonk = myLoader.template( 'chonk', {
    partialInput: {
        heading: 'Hello World'
    },
    chonk: 'chonk',
    chonk1: 'chonk1',
    chonk2: 'chonk2',
    chonk3: 'chonk3',
    chonk4: 'chonk4',
    chonk5: 'chonk5',
    chonk6: 'chonk6',
    chonk7: 'chonk7',
    chonk8: 'chonk8'
} );

describe( 'Loads en espanol', () => {
    it( 'Loads es lang attribute', () => {
        expect( chonk ).toMatch( '<html lang="es"' );
    } );
} );

describe( 'Discover Paths', () => {

    it( 'registers names with slash chars in template', () => {
        expect( myLoader.ctx.chunks.filter( chunk => chunk.type === 'partial' ).filter( partial => partial.name.includes( '/' ) ).length ).toBe( 2 );
    } );

    it( 'Loads ee', () => {
        expect( chonk ).toMatch( '<p>ee</p>' );
    } );

    it( 'Loads Deeper Nest', () => {
        expect( chonk ).toMatch( '<p>baz</p>' );
    } );
    it( 'Compiles all Inputs', () => {
        expect( chonk ).not.toMatch( '<!--@render' );
    } );
    it( 'Compiles all Inputs', () => {
        expect( chonk ).not.toMatch( '<!--@partial' );
    } );
    it( 'Compiles all loops', () => {
        expect( chonk ).not.toMatch( '<!--@loop' );
    } );
} );

describe( 'Handles high volume data renders', () => {
    it( 'Loads Partial Inline w/ constructor', () => {
        expect( chonk ).toMatch( 'Partial One' );
        expect( chonk ).toMatch( 'Hello World' );
        expect( chonk ).toMatch( 'Partial Two' );
        expect( chonk ).toMatch( 'Partial four' );
    } );

    it( 'Loads without crashing or dropping input', () => {
        expect( chonk ).toMatch( 'chonk' );
        expect( chonk ).toMatch( 'Generic Page Content' );
        for( const num of [1,2,3,4,5,6,7,8] ) {
            expect( chonk ).toMatch( `chonk${num}` );
        }
    } );

    it( 'Has no silent errors', () => {
        expect( chonk.includes( 'undefined' ) ).toBeFalsy();
    } );
} );