
import { defaultLoader as i } from './fixtures/prepareLoaders';

describe( 'Internal Config Testing', () => {
    it( 'Loads Conf', () => {
        expect( i.ctx.config.pathRoot ).toBe( 'test-pkg/def' );
        expect( i.ctx.config.templates ).toBe( 'templates' );
        expect( Object.keys( i.ctx.config.templateInput ).length ).toBeGreaterThan( 0 );
    } );
} );
