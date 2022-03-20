import { Loader } from '../lib/loader';
import partialData from './customPartial.json';
import templateData from './customTemplate.js';

const myLoader0 = Loader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: partialData,
    debug: false
} );

const myLoader1 = Loader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: partialData,
    templateInput: templateData,
    debug: false
} );


const myLoader2 = Loader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: {},
    templateInput: {},
    debug: false
} );

describe( 'Load Constructed Partial Data', () => {
    it( 'Gets Argument', () => {
        const data = myLoader0.template( 'home', templateData );
        expect( data ).toMatch( 'HTTP' );
        expect( data ).toMatch( 'HTML' );
        expect( data ).toMatch( 'CSS' );
        expect( data ).toMatch( 'React' );
        expect( data ).toMatch( 'Prismic' );
    } );

    it( 'Gets Constructor', () => {
        const data = myLoader1.template( 'home' );
        expect( data ).toMatch( 'HTTP' );
        expect( data ).toMatch( 'HTML' );
        expect( data ).toMatch( 'CSS' );
        expect( data ).toMatch( 'React' );
        expect( data ).toMatch( 'Prismic' );
    } );

});

describe( 'Load Empty Input FF', () => {
    it( 'Gets Empty Constructor Inline', () => {
        const data = myLoader2.template( 'home', {
            partialInput: partialData,
            ...templateData
        } );
        expect( data ).toMatch( 'HTTP' );
        expect( data ).toMatch( 'HTML' );
        expect( data ).toMatch( 'CSS' );
        expect( data ).toMatch( 'React' );
        expect( data ).toMatch( 'Prismic' );
    } );
    
} );
