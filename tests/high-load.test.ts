import { createLoader } from '../src/loader';

const myLoader = createLoader( {
    pathRoot: 'test-pkg/big-bertha',
    templates: 'templates',
    partials: 'partials',
    intlCode: 'en_ES',
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
    heading: 'Hello World',
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

describe( 'Chonky Boi', () => {
    it( 'Loads es lang attribute', () => {
        expect( chonk ).toMatch( '<html lang="en-ES"' );
    } );

    it( 'registers discovered partials in template', () => {
        expect( myLoader.ctx.chunks.filter( chunk => chunk.type === 'partial' ).filter( partial => partial.name.includes( '/' ) ).length ).toBe( 4 );
    } );

    it( 'Loads Nest', () => {
        expect( chonk ).toMatch( '<p>baz</p>' );
        expect( chonk ).toMatch( '<p>ee</p>' );
        expect( chonk ).toMatch( 'Lorem ipsum dolor sit amet' );
        expect( chonk ).toMatch( 'Partial One' );
        expect( chonk ).toMatch( 'Hello World' );
        expect( chonk ).toMatch( 'Partial Two' );
        expect( chonk ).toMatch( 'Partial four' );
        expect( chonk ).toMatch( 'chonk' );
        expect( chonk ).toMatch( 'Generic Page Content' );
        for( const num of [1,2,3,4,5,6,7,8] ) {
            expect( chonk ).toMatch( `chonk${num}` );
        }
    } );

    it( 'Compiles all Inputs', () => {
        expect( chonk ).not.toMatch( '<!--@render' );
        expect( chonk ).not.toMatch( '<!--@partial' );
        expect( chonk ).not.toMatch( '<!--@loop' );
    } );
    
    it( 'Has no silent errors', () => {
        expect( chonk.includes( 'undefined' ) ).toBeFalsy();
    } );
} );
