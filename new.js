const loader = require( './dist' );
const mockDatabase = require( './mock/data.json' );
const partialData = () =>{
    return {
        "*": {
            "page_title":"Hello World"
        },
        head:{
            "page_title":"Hello World",
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
        },
        footer: {
            "page_title":"Hello World"
        }
    }
}
    
const partialData2 = () => {
    return {
        head:{
            "title": "Hello World",
            "desc": "Cool Description",
            "styles":[
                    "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            ]
        },
        nav: {
            nav_title: "Nav Title",
            links:[
                { url: '/', label: 'Home' },
                { url: '/test', label: 'Test' }
            ]
        }
    }
}
const templateData = ( id ) => {
    if( id ) {
        const matchedPost = mockDatabase.filter( d => d.id === id )[0];
        return matchedPost;
    }
    else {
        return { 
            "*": {
                content: 'My Blog',
                page_description: 'Fallback Website Description',
            },
            "home":{
                items: [
                    'foo',
                    'bar'
                ],
                items2: [
                    { 'title': 'foo', desc: 'foo' },
                    { 'title': 'bar', desc: 'bar' }
                ]
            },
            "about":{
                "list":[
                    "foo", 'bar'
                ]
            }
        }
    }
    
}

const myLoader = loader( {
    pathRoot: "views",
    partialInput: partialData(),
    templateInput: templateData(),
    debug: false
} );

myLoader.loadTemplate( 'home' );

//myLoader.loadTemplate( 'home', { page_title: 'Home Page' } )
//myLoader.loadTemplate( 'about', { page_title: 'About Page', list: ['foo', 'bar'] } )