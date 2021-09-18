const Loader  = require( './dist' );
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
console.log( Handler.getTemplate( 'home', { content: 'Body Content' } ) );

