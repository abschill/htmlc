
import Loader from '../dist';
const l0 = new Loader();
const { _config } = l0;
const keyMap = Object.keys( _config );
describe( 'Check required config options', () => {
    it( 'Has Directory Base', () => {
        expect( keyMap ).toContain( 'pathRoot' );
    } );

    it( 'Has Template Base', () => {
        expect( keyMap ).toContain( 'templates' );
    } );
    
    it( 'Has Partial Base', () => {
        expect( keyMap ).toContain( 'partials' );
    } );

    it( 'Successfully scanned Template Dir', () => {
        expect( l0.hasTemplates );
    } );

    it( 'Successfully scanned Part Dir', () => {
        expect( l0.hasParts );
    } );

    it( 'Can Load Partials', () => {
        l0.getPartials().forEach( part => {
            expect( part ).toHaveProperty( 'raw' );
        } );
    } );

    it( 'Can Load Templates', () => {
        l0.getTemplates().forEach( template => {
            expect( template ).toHaveProperty( 'raw' )
        } );
    } );

} );