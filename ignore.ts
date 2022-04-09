import { createLoader } from './lib/loader';
import { compile } from './lib/modules/compiler/v2';
import partialInput from './tests/partialData.json';
import templateInput from './tests/templateData.json';
const { log } = console;
const loader0 = createLoader();
const loader1 = createLoader( {
    pathRoot: 'test-pkg/def',
    templates: 'templates',
    partialInput,
    templateInput
} );
const loader2 = createLoader( {
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
// log( compile( {
//     template_name: 'home',
//     caller_data: {},
//     caller_ctx: loader0.ctx
// } ) );
//
// log( compile( {
//     template_name: 'home',
//     caller_data: {},
//     caller_ctx: loader1.ctx
// } ) );

log( compile( {
    template_name: 'home',
    caller_data: {},
    caller_ctx: loader2.ctx
} ) );
