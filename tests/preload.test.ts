
import Loader from '../dist';

const path_test = 'views';
const path_templates = 'pages';
const path_partials = 'partials';
const test_title = 'Hello World';
const test_desc = 'Cool Description Bro';
const test_footer = 'Hello From Footer';
const l0 = new Loader({
    root: path_test,
    templates: path_templates,
    partials: path_partials,
    _partialInput: {
       title: test_title,
       desc: test_desc,
       footer_label: test_footer 
    }
});

describe( 'Custom Config Options', () => {

    it( 'sets custom directory base', () => {
        expect( l0._config.pathRoot ).toBe( path_test );
    } );
    it( 'sets custom template dir', () => {
        expect( l0._config.templates ).toBe( path_templates );
    } );
    it( 'sets custom partial dir', () => {
        expect( l0._config.partials ).toBe( path_partials );
    } );
    it( 'preloads partial variables from loader', () => {
        l0.getPartials().forEach( _ => {
             expect( _.parsed ).toBeDefined();
        })
    } );
});