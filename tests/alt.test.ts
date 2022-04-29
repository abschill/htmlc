import { alt_loader as myLoader } from './fixtures/prepareLoaders';

describe( 'Alt: non-html file extension testing', () => {
    const home = myLoader.template( 'home' );
    it( 'Loads Page Content', () => {
        expect( home ).toMatch( '<h1>Hello World</h1>' );
		expect( home ).toMatch( 'Test Partial' );
    } );
} );
