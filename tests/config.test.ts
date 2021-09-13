
import Controller from '../dist';
const conf0 = new Controller();
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

    it( 'Successfully scanned Template Dir', () => {
        expect( conf0.hasTemplates );
    } );

    it( 'Successfully scanned Part Dir', () => {
        expect( conf0.hasParts );
    } );

    it( 'Can Load Partials', () => {
        conf0.getPartials().forEach( part => {
            expect( part ).toHaveProperty( 'raw' );
        } );
    } );

    it( 'Can Load Templates', () => {
        conf0.getTemplates().forEach( template => {
            expect( template ).toHaveProperty( 'raw' )
        } );
    } );
} );