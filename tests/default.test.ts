
 import loader from '../dist';
 import partialData from './partialData.json';
 import templateData from './templateData.json';
// import defaults from '../dist/default';
// import { testInp } from './fn';
// const l1 = new Loader({
//     _partialInput: defaults._partialInput
// });
// const { _config } = l1;
const myLoader = loader( {
    pathRoot: "views2",
    templates: "templates",
    partialInput: partialData,
    templateInput: templateData,
    debug: false
} );
const home = myLoader.template( 'home' );
describe( 'Example Home Page Tests', () => {
    it( 'Loads page_title *', () => {
        // console.log( home );
        expect( home ).toMatch( '<title>My Blog</title>' );
        
    });
    it( 'Loads Styles 1d array', () => {
        expect( home ).toMatch( '<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">');
    });
    it( 'Loads page_description', () => {
        expect( home ).toMatch( '<meta name="description" content="Cool Description"/>' );
    } );
})
// describe( 'Automatically fills in constructor', () => {
//     it( 'Sets Partials', () => {
//         expect( _config.partials ).toBe( defaults.partialDefault );
//     } );

//     it( 'Sets Templates', () => {
//         expect( _config.templates ).toBe( defaults.templateDefault );
//     } );
    
//     it( 'Sets Root Dir', () => {
//         expect( _config.pathRoot ).toBe( defaults.rootDefault );
//     } );

//     it( 'Scan Templates', () => {
//         expect( l1.hasTemplates );
//     } );

//     it( 'Scan Partials', () => {
//         expect( l1.hasParts );
//     } );

//     it( 'Can Load Partials', () => {
//         l1.partials.forEach( part => {
//             expect( part.raw ).toBeDefined();
//             expect( part.parsed ).toBeDefined();
//         } );
//     } );

//     it( 'Can Load Templates', () => {
//         l1.templates.forEach( template => {
//             expect( template.raw ).toBeDefined();
//         } );
//     } );

//     it( 'Loads Static Template', () => {
//         const msg = 'This is the about page';
//         const _t = l1.getTemplate( 'about', { content: msg } );
//         expect( _t ).toContain( '<head>' );
//         expect( _t ).toContain( '<main>' );
//         expect( _t ).toContain( '<footer>');
//         expect( _t ).toContain( msg );
//     } );
//     it( 'Loads Iterables', () => {
//         const _tester = l1.getTemplate( 'home', defaults._template_data.home );
//         Object.values( defaults._template_data.home ).forEach( input => {
//             testInp( _tester, input );
//         } );    
//     } );
// } );