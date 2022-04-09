import { createLoader } from '../lib/loader/index.js';
import { compile } from '../src/modules/compiler/v2/index';

const myLoader = createLoader( {
    pathRoot: 'test-pkg/nested_loopobject',
    templates: 'templates',
    templateInput: {
        foo: {
            bar: 'foobar'
        },
        page: {
            title: 'Hello World'
        }
    }
} );

const tester = myLoader.template( 'home' );
console.log( tester );

describe( 'Parses nested token insertions from input', () => {
    it( 'Gets key/values', () => {
        expect( tester ).toMatch( 'foobar' );
        expect( tester ).toMatch( 'Hello World' );
    } );
} );