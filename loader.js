const data = require( './dist/default' );
const mockDatabase = require( './mock/data.json' );
module.exports = ( id ) => {
    //load data
    const _data = data._template_data;
    const matchedPost = mockDatabase.filter( d => d.id === id )[0];
    // console.log( matchedPost );
    if( matchedPost ) {
        _data.post = matchedPost
    }
    console.log( _data );
    return _data;
}