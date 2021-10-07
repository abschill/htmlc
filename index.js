const Loader  = require( './dist' );
const partialData = require( './package.json' )._partial_data;
const packagedData = require( './dist/default' )._template_data;
const Handler = new Loader({
     partials: 'layout',
     _partialInput: partialData
});

// Server Side Rendering
console.log( Handler.getTemplate( 'home', packagedData ) )

console.log('\n' );

//Simple Hard-Coded Pages
console.log( Handler.getTemplate( 'about' ) );
