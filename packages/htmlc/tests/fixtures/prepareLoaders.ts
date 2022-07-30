import { useLoader } from '../../src';
const barebones_Loader = useLoader();
import defaultPartialData from './partialData.json';
import defaultTemplateData from './templateData.json';
import customTemplate from './customTemplate';
import customPartial from './customPartial.json';

const defaultLoader = useLoader({
    pathRoot: 'test-pkg/def',
    templates: 'templates',
    partialInput: defaultPartialData,
    templateInput: defaultTemplateData
});

const defaultHome = defaultLoader.template('home');

const highLoad_Loader = useLoader({
    pathRoot: 'test-pkg/big-bertha',
    templates: 'templates',
    partials: 'partials',
    intlCode: 'en_ES',
    partialInput: {
        partial_one_data: 'Partial One',
        partial_four_data: 'Partial four'
    },
    templateInput: {
        generic_page_content: 'Generic Page Content'
    },
    discoverPaths: true
});

const highLoadChunk0 = highLoad_Loader.template('chonk', {
    heading: 'Hello World',
    chonk: 'chonk',
    chonk1: 'chonk1',
    chonk2: 'chonk2',
    chonk3: 'chonk3',
    chonk4: 'chonk4',
    chonk5: 'chonk5',
    chonk6: 'chonk6',
    chonk7: 'chonk7',
    chonk8: 'chonk8'
});

const custom_Loader0 = useLoader({
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: customPartial
});

const custom_Loader1 = useLoader({
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: customPartial,
    templateInput: customTemplate
});

const custom_Loader2 = useLoader({
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: {},
    templateInput: {}
});

const nestedLoader = useLoader({
    pathRoot: 'test-pkg/nested_loopobject',
    partials: 'partials',
    templates: 'templates',
    partialInput: {},
    templateInput: {
        foo: {
            bar: 'foobar'
        },
        page: {
            title: 'Hello World',
            body : {
                heading0: 'Page Title',
                heading1: 'Page Subtitle'
            }
        }
    }
});

const nestedHome = nestedLoader.template('home');

const alt_loader = useLoader({
	pathRoot: 'test-pkg/alt-ext'
});

export {
	alt_loader,
	barebones_Loader,
	custom_Loader0,
	custom_Loader1,
	custom_Loader2,
	customPartial,
	customTemplate,
	highLoad_Loader,
	highLoadChunk0,
	defaultLoader,
	defaultHome,
	defaultPartialData,
	defaultTemplateData,
	nestedLoader,
	nestedHome
};
