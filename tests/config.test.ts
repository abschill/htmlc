
import Config from '../src/config';
const conf0 = new Config();
const { _config } = conf0;
const keyMap = Object.keys( _config );
describe( 'Check required config options', () => {

    it( 'Has Directory Base', () => {
        expect( keyMap ).toContain( 'rootDir' );
    } );

    it( 'Has Template Base', () => {
        expect( keyMap ).toContain( 'partialDir' );
    } );
    
    it( 'Has Partial Base', () => {
        expect( keyMap ).toContain( 'partialDir' );
    } );

    it( 'Has Delimiter', () => {
        expect( Object.keys( _config._internals ) ).toContain( 'delimiter' );
    } );

    it( 'Successfully scanned Template Dir', () => {
        expect( conf0.hasTemplates );
    } );

    it( 'Successfully scanned Part Dir', () => {
        expect( conf0.hasParts );
    } );

} );
// describe( 'Template Checks', () => {
//     it( 'Template Exists', () => {
//         expect( Object.keys( t.asObject() ) ).toContain( 'partials' );
//     } );
// } );

// describe( 'Parser Checks', () => {
//     const parser = new Parser( t );
    
//     it( 'Parses Partial', () => {
//         expect( Object.keys( p1 ) ).toContain( 'content' );
//     } );
//     it( 'Has unparsed variables', () => {
//         const { content } = p1;
//         const hasMatchers = content.includes( '$hp=' );
//         expect( hasMatchers ).toBeTruthy();
//     });
//     it( 'Parses Variables in Partial', () => {
//         parser.run()
//         const { content } = p1;
//         const hasMatchers = content.includes( '$hp=' );
//         expect( hasMatchers ).toBeFalsy();
//     })
// } );