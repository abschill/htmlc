# HTML Chunk Loader

## Node SSR/SSG Configurable Template Engine

### Getting Started

    npm i html-chunk-loader

Create a directory called views/ and inside it create layout/ and page/ insert your chunks into these folders. Check the views directory in our github repository for an example setup. You can also create an hp.config.js file in the root directory to override the default values. This is a work in progress, so don't expect much yet in it's current state beyond proof of concept.  


### Usage

    const { Controller } = require( 'html-chunk-loader' );


    const c = new Controller.default();

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

### More Info
[NPM Package](https://www.npmjs.com/package/html-chunk-loader)