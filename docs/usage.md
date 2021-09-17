# Usage

    const Controller  = require( './dist' );
    const templateHandler = new Controller();
    templateHandler.getPartials().forEach( p => {
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
    //render page to template string
    console.log( templateHandler.getTemplate( 'home', { content: 'Body Content' } ) );
    
Check index.js for this example in a localized path format

These variables match up to the @render=variable_name directives in the /views/layout partials
The partials match up to the @render-partial=partial_name directives in the views/page templates

head.html

    <head>
        <title><!--@render=title--></title>
        <meta name="description" content="<!--@render=desc-->"/>
    </head>

This template takes the variables in the case of 'head' and outputs the following into the template from the partial

    <head>
        <title>This is a Test</title>
        <meta name="description" content="This is a Description"/>
    </head>