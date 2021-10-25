import loader from '../dist';
import partialData from './customPartial.json';
import templateData from './customTemplate';
const myLoader = loader( {
    pathRoot: 'test-pkg/custom',
    partials: "layout",
    templates: "pages",
    partialInput: partialData,
    debug: false
} );
describe( 'Load Complex Partial Data', () => {
    it( 'Gets Metadata', () => {
        const data = myLoader.template( 'home', templateData );
        // console.log( data );
        expect( data ).toMatch( 'HTTP' );
        expect( data ).toMatch( 'HTML' );
        expect( data ).toMatch( 'CSS' );
        expect( data ).toMatch( 'React' );
        expect( data ).toMatch( 'Prismic' );
    })
    
})