const express = require( 'express' );
const app = express();
const Loader = require( 'html-chunk-loader' );
const templateData = require( './template' );
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


app.get( '/', ( req, res ) => {
    const page = Handler.getTemplate( 'home', templateData() );
    res.send( page );
} );

app.listen( 3000 );