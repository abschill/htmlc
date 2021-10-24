const fs = require( 'fs' );
const path = require( 'path' );
const loader = require( '../dist' );
module.exports = loadStaticFiles = ( ctx, parts ) => {
    const loaderFile = require( path.resolve( process.cwd(), ctx.loaderFile ) )() ?? require( path.resolve( process.cwd(), 'loader.js' ) )();
    const outDir = path.join( process.cwd(), ctx.outPath ) ?? path.join( process.cwd(), 'public' );
    if( ctx.debug ) {
        console.log( 'Loader File: ' );
        console.log( loaderFile );
        console.log( outDir );
        console.log( ctx );
    }
    
    
    if ( !fs.existsSync( outDir ) ) fs.mkdirSync( outDir );
    const static_loader = loader({
        pathRoot: ctx.root ?? 'views',
        partials: ctx.partials ?? 'partials',
        templates: ctx.templates ?? 'pages',
        partialInput: parts,
        templateInput: loaderFile(),
        debug: ctx.debug ?? false
    });
    static_loader.templates.forEach( template => {
        if( ctx.debug ) {
            console.log( loaderFile[template.name] );
        }
        if( loaderFile[template.name] ) {
            fs.writeFileSync( path.join( outDir, `${template.name}.html`), template.render( loaderFile[template.name] ) );
        }
        else {
            fs.writeFileSync( path.join( outDir, `${template.name}.html`), template.render( {} ) );
        }
        
    } );
    console.log( 'Done.' );
}