# HTML Chunk Loader

## Node SSR/SSG Configurable Template Engine

### Getting Started

    npm i html-chunk-loader

Create a directory called views/ and inside it create layout/ and page/ insert your chunks into these folders. Check the views directory in our github repository for an example setup. You can also create an render.config.js file in the root directory to override the default values. This is a work in progress, so don't expect much yet in it's current state beyond proof of concept.  


### Usage

    const Controller  = require( 'html-chunk-loader' ).default;


    const c = new Controller();

    c.getPartials().forEach( p => {
   
    switch( p.name ){
        case 'head':
            p.parse(
                [ 
                    { title: 'This is a Test' }, 
                    { desc: 'This is a Description' }
                ] 
                );
                break;
        case 'footer':
            p.parse(
                [
                    { footerTitle: 'Hello World' }
                ]
            )
        default:
            break;
    }
    });

    c.getTemplates().forEach( t => {
        t.parse( [{ content: 'Body Content'}])
    } );
    // load into Template String on Server Side
    console.log( c.getTemplates()[0].parsed );
    
Check index.js for this example in a localized path format

These variables match up to the @render=variable_name directives in the /views/layout partials
The partials match up to the @render-partial=partial_name directives in the views/page templates

head.html

    <head>
    <title><!--@render=title--></title>
    <meta name="description" content="<!--@render=desc-->"/>
    </head>

This template takes the variables in the case of 'head'
### More Info
[NPM Package](https://www.npmjs.com/package/html-chunk-loader)