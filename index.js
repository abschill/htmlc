const Loader  = require( './dist' );
const partialData = require( './package.json' )._partial_data;
const packagedData = require( './config' )._template_data;
const Handler = new Loader({
     _partialInput: partialData
});

// Server Side Rendering
console.log( Handler.getTemplate( 'home', packagedData ) )

console.log('\n' );

//Simple Hard-Coded Pages
console.log( Handler.getTemplate( 'about' ) );
