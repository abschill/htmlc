const path = require( 'path' );
const fs = require( 'fs' );
const { _mode, filterFiles } = require( './util' );
let ctx = {
    "root": "views",
    "partials": "partials",
    "templates": "pages",
    "outPath": "public"
}
async function processTemplates( path ) {
    console.log( filterFiles( path ) );
}


module.exports = ( {...conf}, [...args] ) => {
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
            console.log( 'Building Templates..' );
            processTemplates( path.join( _tree0, _ctx.templates ) );
            
        }
        else {
            console.log( 's0f1' );
        }
  
    }
    else {
        console.log('No Mode Configured, exiting...' )
    }

}