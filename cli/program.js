const path = require( 'path' );
const fs = require( 'fs' );
const defaults = require( '../config.json' );
const { _mode, filterFiles } = require( './util' );
const StaticLoader = require( './static-loader' );
let ctx = {
    "root": defaults.rootDefault,
    "partials": defaults.partialDefault,
    "templates": defaults.templateDefault,
    "outPath": defaults.outDefault
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
        
        if ( _rootCheck && _partialsCheck && _templatesCheck ) {
            //parse static config info
            console.log( 'Finding Templates..' );
            const files = processTemplates( path.join( _tree0, _ctx.templates ) );
            const Loader = new StaticLoader( _ctx, files );
            Loader.genTemplates();
        }
        else {
            console.log( 's0f1' );
        }
  
    }
    else {
        console.log( 'No Mode Configured, exiting...' )
    }

}