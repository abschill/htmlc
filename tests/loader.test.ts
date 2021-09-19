
import Loader from '../dist';
const l0 = new Loader();
const { _config } = l0;
describe( 'Blank config options', () => {
    it( 'Sets Partial Dir', () => {
        expect( _config.partials ).toBe( 'partials' );
    } );

    it( 'Sets Template Dir', () => {
        expect( _config.templates).toBe( 'pages' );
    } );
    
    it( 'Sets Root Dir', () => {
        expect( _config.pathRoot ).toBe( 'views' );
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