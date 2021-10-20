
// export const path_test = 'views';
// export const path_templates = 'pages2';
// export const path_partials = 'layout';
// export const test_title = 'Hello World';
// export const test_desc = 'Cool Description';
// export const test_footer = 'Hello From Footer';
// export const navTitle = "hello world";
// const test_custom = {
//     root: path_test,
//     templates: path_templates,
//     partials: path_partials,
//     _partialInput: {
//         head: {
//             title: test_title,
//             desc: test_desc,
//             styles:[
//                 "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
//                 "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
//            ]
//         },
//         footer: {
//             title: test_footer
//         },
//         nav:{
//             navItems:[
//                 { label: 'foo', url: '/foo' },
//                 { label: 'bar', url: '/bar' }
//             ],
//             navTitle
//         }
//     }
// };
// export default test_custom;
export const partialData = () =>{
    return {
        "*": {
            "page_title":"Hello World"
        },
        head:{
            "desc": "Cool Description",
            "styles":[
                    "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            ]
        },
        nav: {
            "page_title":"Hello World",
            links:[
                { url: '/', label: 'Home' },
                { url: '/test', label: 'Test' }
            ]
        }
    }
}