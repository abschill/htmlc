import { createLoader } from './lib/loader';
import { compile } from './lib/modules/compiler/v2';
import partialInput from './tests/partialData.json';
import templateInput from './tests/templateData.json';
const loader0 = createLoader();
const loader1 = createLoader( {
    pathRoot: 'test-pkg/def',
    templates: 'templates',
    partialInput,
    templateInput
} );
compile( {
    template_name: 'home',
    caller_data: {},
    caller_ctx: loader0.ctx
} );

compile( {
    template_name: 'home',
    caller_data: {},
    caller_ctx: loader1.ctx
} );