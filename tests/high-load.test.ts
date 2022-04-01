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
    it( 'Loads ee', () => {
        expect( chonk ).toMatch( '<p>ee</p>' );
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