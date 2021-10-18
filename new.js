const loader = require( './dist' );
const mockDatabase = require( './mock/data.json' );
const partialData = () =>{
    return {
        head:{
            meta_title:"Cool Title for your Web App"
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
                meta_title: 'Cool Fallback Title',
                meta_description: 'Fallback Website Description'
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

myLoader.loadTemplate( 'home', { page_title: 'Page Title' } )
