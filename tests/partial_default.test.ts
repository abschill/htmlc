
import Loader from '../dist';
const l1 = new Loader({
    _partialInput: {
        head: {
            title: 'Hello World',
            desc: 'Cool Description Bro',
        },
        footer: {
            title: 'Hello From Footer'
        }
    }
});
const { _config } = l1;
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
        const _t = l1.getTemplate( 'about' );
        expect( _t ).toContain( '<head>' );
        expect( _t ).toContain( '<main>' );
        expect( _t ).toContain( '<footer>');
    } );

    it( 'Loads Iterables', () => {
        const _tester = l1.getTemplate( 'home', { 
            content: 'Body Content', 
            items: [ 'foo', 'bar' ], 
            items2: [ 
                { title: 'item 1', desc: 'this is item 1' }, 
                { title: 'item 2', desc: 'this is item 2' } 
            ] 
        } );
        expect( _tester ).toContain( 'foo' ); 
        expect( _tester ).toContain( 'bar' ); 

        expect( _tester ).toContain( 'this is item 1' ); 
        expect( _tester ).toContain( 'this is item 2' ); 
    } );

} );