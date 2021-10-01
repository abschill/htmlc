const path = require( 'path' );
const fs = require( 'fs' );
const { _mode, filterFiles } = require( './util' );
let ctx = {
    "root": "views",
    "partials": "partials",
    "templates": "pages",
    "outPath": "public"
}
const processTemplates = ( path ) => filterFiles( path );

module.exports = async ( {...conf}, [...args] ) => {
    const mode = _mode( args );
    
    if( mode ) {
        console.log( `Initiating ${_mode( args )} build...` );
        const _ctx = conf?._static_config ?? ctx;
        _ctx.current = process.cwd();
        const _tree0 = path.join( _ctx.current, _ctx.root );
        const _rootCheck = fs.existsSync( _tree0 );
        const _partialsCheck = fs.existsSync( path.join( _tree0, _ctx.partials ) );
        const _templatesCheck = fs.existsSync( path.join( _tree0, _ctx.templates ) );
        console.log( 'Your Config: \n' );
        console.log( _ctx );
        if ( _rootCheck && _partialsCheck && _templatesCheck ) {
            //parse static config info
            console.log( 'Your Config: \n' );
            console.log( _ctx );
            console.log( 'Finding Templates..' );
            const files = processTemplates( path.join( _tree0, _ctx.templates ) );
            for await( const path of files ) {
                console.log( '\n' );
                const filename = path.match( /\w+.html$/gi )[0];
                console.log( filename.split( '.html' )[0] );
                console.log( fs.readFileSync( path ).toString( 'utf-8' ) );
            }
            
        }
        else {
            console.log( 's0f1' );
        }
  
    }
    else {
        console.log('No Mode Configured, exiting...' )
    }

}