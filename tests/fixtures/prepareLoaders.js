const { createLoader } = require('../..');
const barebones_Loader = createLoader();
const defaultTemplateData = {
	'content': 'My Blog',
    'items': [
        'foo',
        'bar'
    ],
    'items2': [
        { 'title': 'foo', 'desc': 'foo' },
        { 'title': 'bar', 'desc': 'bar' }
    ],
    'list': [
        'foo', 'bar'
    ]
};

const customTemplate = {
	"tags": [
        "foo",
        "bar"
    ],
    "homeLinks":[
        {
          icon: 'https://images.prismic.io/absedu/4a8c12a9-072d-4438-bcff-955588feed3d_http.png?auto=compress,format&rect=0,0,250,250&w=128&h=128',
          date: '2021-07-29',
          title: 'Web Servers 105: HTTP Caching',
          tags: 'Web Servers,Back End,HTTP/REST,Tutorial',
          href: 'http-105'
        },
        {
          icon: 'https://images.prismic.io/absedu/fee92613-28b8-4e63-90b4-c94d17ba7496_css.png?auto=compress,format&rect=0,0,512,512&w=128&h=128',
          date: '2021-07-19',
          title: 'Fundamentals 102 - Intro to CSS',
          tags: 'Tutorial,Front End,CSS,User Interface,Fundamentals',
          href: 'fundamentals-102'
        },
        {
          icon: 'https://images.prismic.io/absedu/0612c0f1-2c7c-49df-89f6-227e48fca371_prismic-logo-F6A173E6D0-seeklogo.com.png?auto=compress,format&rect=0,0,300,300&w=128&h=128',
          date: '2021-07-18',
          title: 'Why I like Prismic.io',
          tags: 'Opinion,Cloud Hosting,Content Management',
          href: 'why-prismic'
        },
        {
          icon: 'https://images.prismic.io/absedu/54412107-cede-4945-9b4f-c065d005e27c_net.png?auto=compress,format&rect=0,0,284,284&w=128&h=128',
          date: '2021-05-16',
          title: 'Entry Level Backend Developer Checklist',
          tags: 'Back End,Advice,Opinion',
          href: 'backend-concepts'
        },
        {
          icon: 'https://images.prismic.io/absedu/512d7e24-d033-4aaf-bae5-c5ed916033e6_732212.png?auto=compress,format&rect=0,0,512,512&w=128&h=128',
          date: '2021-04-01',
          title: 'Fundamentals 101 - Intro to HTML',
          tags: 'HTML,Front End,Tutorial,Fundamentals,User Interface',
          href: 'fundamentals-101'
        },
        {
          icon: 'https://images.prismic.io/absedu/4a8c12a9-072d-4438-bcff-955588feed3d_http.png?auto=compress,format&rect=0,0,250,250&w=128&h=128',
          date: '2021-03-12',
          title: 'Web Servers 104 - HTTP Payloads',
          tags: 'Web Servers,Tutorial,Back End,HTTP/REST',
          href: 'http-104'
        },
        {
          icon: 'https://images.prismic.io/absedu/4a8c12a9-072d-4438-bcff-955588feed3d_http.png?auto=compress,format&rect=0,0,250,250&w=128&h=128',
          date: '2021-02-10',
          title: 'Web Servers 103 - HTTP Headers',
          tags: 'Back End,Web Servers,HTTP/REST,Tutorial',
          href: 'http-103'
        },
        {
          icon: 'https://images.prismic.io/absedu/b944da6b-4803-4f9b-ad9c-8570ebcbda87_javascript_icon_130900.png?auto=compress,format&rect=0,0,512,512&w=128&h=128',
          date: '2021-01-31',
          title: 'Why I like React',
          tags: 'Opinion,User Interface',
          href: 'why-do-i-like-react'
        },
        {
          icon: 'https://images.prismic.io/absedu/af1dec18-e1c8-4de5-8385-67e3bcd59704_calender.jpg?auto=compress,format&rect=0,0,416,416&w=128&h=128',
          date: '2021-01-24',
          title: 'Technologies to look out for in 2021',
          tags: 'Opinion',
          href: 'technology-in-2021'
        },
        {
          icon: 'https://absedu.cdn.prismic.io/absedu/4bac1785-64db-4503-9148-148ffc213b39_aws-logo-logo.svg',
          date: '2021-01-12',
          title: 'AWS 101 - Intro to S3',
          tags: 'AWS,Tutorial,Web Servers,Cloud Hosting',
          href: 'aws-101'
        },
        {
          icon: 'https://images.prismic.io/absedu/386010e2-0ab4-4227-aef4-2c8ad56a8133_react.png?auto=compress,format&rect=0,0,200,200&w=128&h=128',
          date: '2020-12-30',
          title: 'React 101 - Intro to React',
          tags: 'React,User Interface,Front End,Tutorial',
          href: 'react-101'
        },
        {
          icon: 'https://images.prismic.io/absedu/386010e2-0ab4-4227-aef4-2c8ad56a8133_react.png?auto=compress,format&rect=0,0,200,200&w=128&h=128',
          date: '2020-12-30',
          title: 'React 102 - Hooks, Props & State',
          tags: 'React,User Interface,Front End,Tutorial',
          href: 'react-102'
        },
        {
          icon: 'https://images.prismic.io/absedu/4a8c12a9-072d-4438-bcff-955588feed3d_http.png?auto=compress,format&rect=0,0,250,250&w=128&h=128',
          date: '2020-12-26',
          title: 'Web Servers 102 - HTTP Status Codes',
          tags: 'Web Servers,Back End,HTTP/REST,Tutorial',
          href: 'http-102'
        },
        {
          icon: 'https://images.prismic.io/absedu/4a8c12a9-072d-4438-bcff-955588feed3d_http.png?auto=compress,format&rect=0,0,250,250&w=128&h=128',
          date: '2020-12-15',
          title: 'Web Servers 101 - Fundamentals of HTTP/REST',
          tags: 'Back End,HTTP/REST,Tutorial,Web Servers',
          href: 'http-101'
        }
    ]
};
const defaultPartialData = {
	'page_title': 'Wildcard Fallback Title',
    'page_description': 'Wilcard Fallback Desc',
    'styles': [
        'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
    ],
    'links': [
        { 'url': '/', 'label': 'Home' },
        { 'url': '/about', 'label': 'About' },
        { 'url': '/contact', 'label': 'Contact' }
    ]
};
const customPartial = {
	'page_title':'My Blog',
    'page_description': 'Cool Description',
    'styles': [
        'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
    ],
    'links': [
        { 'url': '/', 'label': 'Home' },
        { 'url': '/test', 'label': 'Test' }
    ]
}
const defaultLoader = createLoader({
    pathRoot: 'test-pkg/def',
    templates: 'templates',
    partialInput: defaultPartialData,
    templateInput: defaultTemplateData
});

const defaultHome = defaultLoader.template('home');

const highLoad_Loader = createLoader({
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

const custom_Loader0 = createLoader({
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: customPartial
});

const custom_Loader1 = createLoader({
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: customPartial,
    templateInput: customTemplate
});

const custom_Loader2 = createLoader({
    pathRoot: 'test-pkg/custom',
    partials: 'layout',
    templates: 'pages',
    partialInput: {},
    templateInput: {}
});

const nestedLoader = createLoader({
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

const alt_loader = createLoader({
	pathRoot: 'test-pkg/alt-ext'
});
module.exports = {
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
