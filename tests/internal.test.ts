import { createLoader } from '../src/loader';
import partialData from './partialData.json';
import templateData from './templateData.json';
const pathRoot = 'test-pkg/def';
const templates = 'templates';

const i = createLoader( {
    pathRoot,
    templates,
    partialInput: partialData,
    templateInput: templateData
} );

describe( 'Internal Config Testing', () => {
    it( 'Loads Conf', () => {
        expect( i.ctx.config.pathRoot ).toBe( 'test-pkg/def' );
        expect( i.ctx.config.templates ).toBe( templates );
        expect( Object.keys( i.ctx.config.templateInput ).length ).toBeGreaterThan( 0 );
    } );
} );
