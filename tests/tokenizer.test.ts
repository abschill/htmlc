import { createLoader } from '../src/loader';
import { tokenize } from '../src/modules/compiler/parser';
import templateInput from './templateData.json';
const myLoader = createLoader( {
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    templateInput
} );

const myChunkTest = myLoader.ctx.chunks.filter( chunk => chunk.type === 'template' )[0];
const tokens = tokenize( myChunkTest.rawFile );

describe( 'Parses Tokens Properly', () => {
   it( 'Gets the right shape', () => {
       const types = Object.keys( tokens );
       expect( types.length ).toBe( 3 );
       expect( types ).toContain( 'loops' );
       expect( types ).toContain( 'keys' );
       expect( types ).toContain( 'partials' );
   } );
   it( 'Gets the right values', () => {
       const values = Object.values( tokens );
       expect( values.length ).toBe( 3 );
       expect( values[0].length ).toBe( 0 );
       expect( values[1].length ).toBe( 2 );
       expect( values[2].length ).toBe( 2 );
   } );
} );
