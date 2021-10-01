const Loader  = require( './dist' );
const packagedData = require( './package.json' )._template_data;
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

// console.log( Handler );
// Server Side Rendering
console.log( Handler.getTemplate( 'home', packagedData ) );
console.log('\n' );

//Simple Static Pages
console.log( Handler.getTemplate( 'about' ) );
