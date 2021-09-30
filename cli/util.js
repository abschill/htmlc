const _parseCtx = ( [...args] ) => {
    const _r = args?.filter( _ => _.includes( '--r' ) );
    const _p = args?.filter( _ => _.includes( '--p' ) );
    const _t = args?.filter( _ => _.includes( '--t' ) );
    const root = _r && _r[0] ? _r[0].split( '=' )[1]: 'views';
    const partials = _p && _p[0] ? _p[0].split( '=' )[1] : 'partials';
    const templates = _t && _t[0] ? _t[0].split( '=' )[1] : 'pages'; 
    const current = process.cwd();
    return { current, root, partials, templates };
    
}
module.exports = { _parseCtx }; 