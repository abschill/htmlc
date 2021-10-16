
import Loader from '../dist';
import defaults from '../dist/default';
const l1 = new Loader();
const { _config } = l1;
describe( 'Automatically fills in constructor', () => {
    it( 'Sets Partials', () => {
        expect( _config.partials ).toBe( defaults.partialDefault );
    } );

    it( 'Sets Templates', () => {
        expect( _config.templates ).toBe( defaults.templateDefault );
    } );
    
    it( 'Sets Root Dir', () => {
        expect( _config.pathRoot ).toBe( defaults.rootDefault );
    } );

    it( 'Scan Templates', () => {
        expect( l1.hasTemplates );
    } );

    it( 'Scan Partials', () => {
        expect( l1.hasParts );
    } );

    it( 'Can Load Partials', () => {
        l1.partials.forEach( part => {
            expect( part.raw ).toBeDefined();
        } );
    } );

    it( 'Can Load Templates', () => {
        l1.templates.forEach( template => {
            expect( template.raw ).toBeDefined();
        } );
    } );

    it( 'Loads Static Template', () => {
        const msg = 'This is the about page';
        const _t = l1.getTemplate( 'about', {content: msg } );
        expect( _t ).toContain( '<head>' );
        expect( _t ).toContain( '<main>' );
        expect( _t ).toContain( '<footer>');
        expect( _t ).toContain( msg );
    } );

    it( 'Loads Iterables', () => {
        const _tester = l1.getTemplate( 'home', defaults._template_data.home );
        Object.values( defaults._template_data.home ).forEach( input => {
            if( typeof( input ) !== 'string' ) {
                //is array
                //@ts-ignore
                input.forEach( entry => {
                    if( typeof( entry ) !== 'object' ) {
                        //entry is value
                        expect( _tester ).toContain( entry ); 
                       
                    }
                    else {
                        //entry is obj
                        Object.values( entry ).forEach( val => {
                            expect( _tester ).toContain( val );
                        } );
                    }
                } );
            }
            else {
                //is value map
                expect( _tester ).toContain( input );
            }
        } );    
    } );
} );