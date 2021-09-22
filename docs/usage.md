# Usage

    const Loader  = require( './dist' );
    const Handler = new Loader({
        root: 'views',
        templates: 'pages',
        partials: 'partials',
        _partialInput: {
            //in the head template, the title and desc variables will be available
            head: {
                title: 'Hello World',
                desc: 'Cool Description Bro',
            },
            //object-based template variables allow for duplicate names between templates
            footer: {
                title: 'Hello From Footer'
            }
        }
    });
    console.log( Handler.getTemplate( 'home', { content: 'Body Content' } ) );
    
[Click here](https://github.com/abschill/html-chunk-loader/tree/master/examples) to see example integrations with the server

These variables match up to the @render=variable_name directives in the /views/layout partials
The partials match up to the @render-partial=partial_name directives in the views/page templates

head.html

    <head>
        <title><!--@render=title--></title>
        <meta name="description" content="<!--@render=desc-->"/>
    </head>

home.html

    <!--@render-partial=head-->
        <main>
        <h1><!--@render=content--></h1>
    </main>
    <!--@render-partial=footer-->

footer.html

    <footer>
        <h5><!--@render=title--></h5>
    </footer>

This template takes the template, parses each partial, and outputs the following into the template from the code above

    <head>
    <title>Hello World</title>
    <meta name="description" content="Cool Description Bro"/>
    </head>
    <main>
        <h1>Body Content</h1>
    </main>
    <footer>
        <h5>Hello from Footer</h5>
    </footer>