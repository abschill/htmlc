import { Loader } from '../lib/loader';
import partialData from './partialData.json';
import templateData from './templateData.json';
import Parser from '../lib/core/parser';
const pathRoot = 'test-pkg/def';
const templates = 'templates';
const i = Loader( {
    pathRoot,
    templates: templates,
    partialInput: partialData,
    templateInput: templateData,
    debug: false
} );


describe( 'Internal Class Module Tests', () => {
    it( 'Loads Static Parser Vals', () => {
        expect( Parser.__renderKey__ ).toBeDefined();
        expect( Parser.__loopKey__ ).toBeDefined();
        expect( Parser.__partialKey__ ).toBeDefined();
    } );
} );

describe( 'Internal Config Testing', () => {
    
    it( 'Loads Conf Root', () => {
        expect( i.ctx.config.pathRoot ).toBe( 'test-pkg/def' );
    } );

    it( 'Loads Conf Templates', () => {
        expect( i.ctx.config.templates ).toBe( templates );
    } );

    it( 'Load constructor data', () => expect( Object.keys( i.ctx.config.templateInput ).length ).toBeGreaterThan( 0 ) );
} );
