import { Loader } from '../lib/loader';
import partialData from './partialData.json';
import templateData from './templateData.json';

const pathRoot = 'test-pkg/def';
const templates = 'templates';
const i = Loader( {
    pathRoot,
    templates: templates,
    partialInput: partialData,
    templateInput: templateData
} );

describe( 'Internal TS Module Testing', () => {
    it( 'Loads Conf Root', () => {
        expect( i.conf.config.pathRoot ).toBe( 'test-pkg/def' );
    } );
    it( 'Loads Conf Templates', () => {
        expect( i.conf.config.templates ).toBe( templates );
    } );
    it( 'Load constructor data', () => expect( Object.keys( i.conf.config.templateInput ).length ).toBeGreaterThan( 0 ) );
} );