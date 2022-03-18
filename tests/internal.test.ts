import { Loader } from '../lib/loader';
import partialData from './partialData.json';
import templateData from './templateData.json';
import { fsUtil } from '../lib/core/internals/util/file';

const pathRoot = 'test-pkg/def';
const templates = 'templates';
const i = Loader( {
    pathRoot,
    templates: templates,
    partialInput: partialData,
    templateInput: templateData,
    debug: false
} );

describe( 'Internal TS Module Testing', () => {
    
    it( 'Loads Conf Root', () => {
        expect( i.ctx.config.pathRoot ).toBe( 'test-pkg/def' );
    } );

    it( 'Loads Conf Templates', () => {
        expect( i.ctx.config.templates ).toBe( templates );
    } );

    it( 'Load constructor data', () => expect( Object.keys( i.ctx.config.templateInput ).length ).toBeGreaterThan( 0 ) );
} );

