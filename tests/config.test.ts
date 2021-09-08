
import Config from '../lib/config';
const conf0 = new Config();
const { _config } = conf0;
const keyMap = Object.keys( _config );
describe( 'Check required config options', () => {

    it( 'Has Directory Base', () => {
        expect( keyMap ).toContain( 'rootDir' );
    } );

    it( 'Has Template Base', () => {
        expect( keyMap ).toContain( 'templateDir' );
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