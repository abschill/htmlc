const lib = require( '..' );

const myLoader = lib();

describe( 'Load Static Partial Data with package.json options', () => {
    const home = myLoader.template( 'home' );
    
    it( 'Loads Head', () => {
        expect( home ).toMatch( '<h1>Home Page</h1>' );  
        expect( home ).toMatch( '<li>Nav 1</li>' ); 
        expect( home ).toMatch( '<li>Nav 2</li>' ); 
    } );

    it( 'Loads Nav', () => {
        expect( home ).toMatch( '<nav>' );
        expect( home ).toMatch( '</nav>' );
    } );

    it( 'Loads Page Content', () => {
        expect( home ).toMatch( '<h1>Home Page</h1>' );
    } );

    it( 'Loads Footer', () => {
        expect( home ).toMatch( '<footer>Footer</footer>' );
    } );

    it( 'Body Open/Close Tags', () => {
        expect( home ).toMatch( '<body' ); 
        expect( home ).toMatch( '</body>' );
    } );
} );