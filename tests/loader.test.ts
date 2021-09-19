
import Loader from '../dist';
const l0 = new Loader();
const { _config } = l0;
describe( 'Blank config options', () => {
    it( 'Sets Partials', () => {
        expect( _config.partials ).toBe( 'partials' );
    } );

    it( 'Sets Templates', () => {
        expect( _config.templates ).toBe( 'pages' );
    } );
    
    it( 'Sets Root Dir', () => {
        expect( _config.pathRoot ).toBe( 'views' );
    } );

    it( 'Scan Templates', () => {
        expect( l0.hasTemplates );
    } );

    it( 'Scan Partials', () => {
        expect( l0.hasParts );
    } );

    it( 'Can Load Partials', () => {
        l0.getPartials().forEach( part => {
            expect( part.raw ).toBeDefined();
        } );
    } );

    it( 'Can Load Templates', () => {
        l0.getTemplates().forEach( template => {
            expect( template.raw ).toBeDefined();
        } );
    } );

    it( 'Has not Loaded partial vars', () => {
        l0.getPartials().forEach( partial => {
            expect( partial.parsed ).toBeNull();
        })
    } );

} );