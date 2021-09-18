const express = require( 'express' );
const app = express();
const Loader = require( 'html-chunk-loader' );
const Handler = new Loader({
    root: 'views',
    templates: 'pages',
    partials: 'partials',
    _partialInput: {
       title: 'Hello World',
       desc: 'Cool Description Bro',
       footer_label: 'Hello from Footer' 
    } 
});


app.get( '/', ( req, res ) => {
    res.send( Handler.getTemplate( 'home', {content: 'Body Content' } ) );
} );

app.listen( 3000 );