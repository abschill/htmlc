import { createLoader } from '../src/loader';
import partialData from './customPartial.json';
import templateData from './customTemplate.js';

const myLoader0 = createLoader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: partialData
} );

const myLoader1 = createLoader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: partialData,
    templateInput: templateData
} );


const myLoader2 = createLoader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: {},
    templateInput: {}
} );

describe( 'Load Constructed Partial Data', () => {
    const data0 = myLoader0.template( 'home', templateData );
    const data1 = myLoader1.template( 'home' );
    it( 'Gets Argument', () => {
        expect( data0 ).toMatch( 'HTTP' );
        expect( data0 ).toMatch( 'HTML' );
        expect( data0 ).toMatch( 'CSS' );
        expect( data0 ).toMatch( 'React' );
        expect( data0 ).toMatch( 'Prismic' );
    } );

    it( 'Gets Constructor', () => {
        expect( data1 ).toMatch( 'HTTP' );
        expect( data1 ).toMatch( 'HTML' );
        expect( data1 ).toMatch( 'CSS' );
        expect( data1 ).toMatch( 'React' );
        expect( data1 ).toMatch( 'Prismic' );
    } );

    it( 'Compiles all Inputs', () => {
        expect( data0 ).not.toMatch( '<!--@render' );
        expect( data1 ).not.toMatch( '<!--@render' );
    } );
    it( 'Compiles all Inputs', () => {
        expect( data0 ).not.toMatch( '<!--@partial' );
        expect( data1 ).not.toMatch( '<!--@partial' );
    } );
    it( 'Compiles all loops', () => {
        expect( data0 ).not.toMatch( '<!--@loop' );
        expect( data1 ).not.toMatch( '<!--@loop' );
    } );
} );

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
