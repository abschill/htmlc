const loader = require( './dist' );
const mockDatabase = require( './mock/data.json' );
const partialData = () =>{
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
                page_title: 'My Blog',
                page_description: 'Fallback Website Description'
            } 
        }
    }
    
}

const myLoader = loader( {
    pathRoot: "views2",
    templates: "templates",
    partialInput: partialData(),
    templateInput: templateData(),
    debug: false
} );

myLoader.loadTemplate( 'home', { page_title: 'Home' } )
myLoader.loadTemplate( 'about', { page_title: 'About' } )