# Usage

    const Loader  = require( './dist' );
    const Handler = new Loader({
     root: 'views',
     templates: 'pages',
     partials: 'partials',
     _partialInput: {
         head: {
            title: 'Hello World',
            desc: 'Cool Description Bro',
        },
        footer: {
            title: 'Hello From Footer'
        }
     }
    });
    console.log( Handler.getTemplate( 'home', { 
        content: 'Body Content', 
        items: [ 'foo', 'bar' ], 
        items2: [ 
            { title: 'item 1', desc: 'this is item 1' }, 
            { title: 'item 2', desc: 'this is item 2' } 
        ] 
    } 
    ) );
    
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
        <ul>
            <!--@for(items){
                <li class="test">{_}</li>    
            }-->
        </ul>
        <ul>
            <!--@for(items2){
            <li>
                <a href="https://google.com">
                    {title}
                </a>
                <p>{desc}</p>
            </li>
        }-->
    </ul>
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
        <ul>
            <li class="test">foo</li><li class="test">bar</li>
        </ul>
        <ul>
            <li>
                <a href="https://google.com">      
                    item 1
                </a>
                <p>this is item 1</p>
            </li><li>
                <a href="https://google.com">      
                    item 2
                </a>
                <p>this is item 2</p>
            </li>
    </ul>
    </main>
    <footer>
        <h5>Hello From Footer</h5>
    </footer>