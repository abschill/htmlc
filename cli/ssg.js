const path = require( 'path' );
const fs = require( 'fs' );
// const { _parseCtx } = require( './util' );
module.exports = ( {...conf}, [...args] ) => {
    const _ctx = conf._static_config
    _ctx.current = process.cwd();
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