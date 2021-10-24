const fs = require('fs')
const path = require('path')
const filterFiles = (dir) =>fs.readdirSync(dir).filter(x => fs.lstatSync(path.join(dir, x)).isFile()).map(x => path.resolve(dir, x));
const _mode = ( [...args] ) => {
    const mode = args?.filter( _ => _.includes( '--mode' ) )?.[0]?.split( '=' )?.[1];
    return mode;
}
module.exports = { _mode, filterFiles }; 