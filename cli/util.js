const _mode = ( [...args] ) => {
    const mode = args?.filter( _ => _.includes( '--mode' ) )?.[0]?.split( '=' )?.[1];
    return mode;
}
module.exports = { _mode }; 