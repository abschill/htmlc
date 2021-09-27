export const path_test = 'views';
export const path_templates = 'pages2';
export const path_partials = 'layout';
export const test_title = 'Hello World';
export const test_desc = 'Cool Description Bro';
export const test_footer = 'Hello From Footer';
const test_custom = {
    root: path_test,
    templates: path_templates,
    partials: path_partials,
    _partialInput: {
        head: {
            title: test_title,
            desc: test_desc,
        },
        footer: {
            title: test_footer
        }
    }
};
const test1 = {

}


export default test_custom;