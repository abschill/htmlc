import { Loader } from '../lib/loader';

const myLoader = Loader( {
    pathRoot: 'test-pkg/big-bertha',
    templates: 'templates',
    partials: 'partials',
    partialInput: {
        partial_one_data: 'Partial One',
        partial_four_data: 'Partial four'
    },
    templateInput: {
        generic_page_content: 'Generic Page Content'
    }
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
} );

describe( 'Handles high volume data renders', () => {
    it( 'Loads Partial Inline w/ constructor', () => {
        expect( chonk ).toMatch( 'Partial One' );
        expect( chonk ).toMatch( 'Hello World' );
        expect( chonk ).toMatch( 'Partial four' );
    } );

    it( 'Loads without crashing or dropping input', () => {
        expect( chonk ).toMatch( 'chonk' );
        expect( chonk ).toMatch( 'chonk1' );
        expect( chonk ).toMatch( 'chonk2' );
        expect( chonk ).toMatch( 'chonk3' );
        expect( chonk ).toMatch( 'chonk4' );
        expect( chonk ).toMatch( 'Generic Page Content' );
    } );

    it( 'Has no silent errors', () => {
        expect( chonk.includes( 'undefined' ) ).toBeFalsy();
    } );
} );