const path = require( 'path' );
const fs = require( 'fs' );
// const { _parseCtx } = require( './util' );
module.exports = ( {...conf}, [...args] ) => {
    const _ctx = conf._static_config
    if( _ctx ) {
        _ctx.current = __dirname; //process.cwd() undefined from npx 
        const _tree0 = path.join( _ctx.current, _ctx.root );
        const _rootCheck = fs.existsSync( _tree0 );
        const _partialsCheck = fs.existsSync( path.join( _tree0, _ctx.partials ) );
        const _templatesCheck = fs.existsSync( path.join( _tree0, _ctx.templates ) );
        if ( _rootCheck && _partialsCheck && _templatesCheck ) {
            //parse static config info
            console.log( 'Your Config: \n' );
            console.log( _ctx );
            console.log( 'feature still under construction' );
        }
        else {
            throw new Error( `Directory tree not configured properly` );
        }
    }
    else {
        const ctx = {
            "root": "views",
            "partials": "partials",
            "templates": "pages",
            "outPath": "public"
        }
        const __tree0 = path.join( ctx.current, ctx.root );
        const __rootCheck = fs.existsSync( __tree0 );
        const __partialsCheck = fs.existsSync( path.join( __tree0, ctx.partials ) );
        const __templatesCheck = fs.existsSync( path.join( __tree0, ctx.templates ) );
        if ( __rootCheck && __partialsCheck && __templatesCheck ) {
            //parse static config info
            console.log( 'Your Config: \n' );
            console.log( ctx );
            console.log( 'feature still under construction' );
        }
        else {
            throw new Error( `Directory tree not configured properly` );
        }
    }
    
}