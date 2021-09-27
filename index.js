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

// console.log( Handler );
// Server Side Rendering
console.log( Handler.getTemplate( 'home', { 
    content: 'Body Content', 
    items: [ 'foo', 'bar' ], 
    items2: [ 
        { title: 'item 1', desc: 'this is item 1' }, 
        { title: 'item 2', desc: 'this is item 2' } 
    ] 
} 
) );
console.log('\n' );

//Simple Static Pages
console.log( Handler.getTemplate( 'about' ) );
