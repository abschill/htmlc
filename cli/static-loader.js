const fs = require( 'fs' );
const path = require( 'path' );
const Partial = require( '../dist/partial' );
const Template = require('../dist/template' ) ;

module.exports = class StaticLoader {

    constructor( ctx, files ) {
        this.files = files;
        this.ctx = ctx;
        this.templates = [];
        this.printCtx();
    }

    printCtx() {
        console.log( 'Your Config: \n' );
        console.log( this.ctx );
    }

    async genTemplates( ) {
        for await( const path of this.files ) {
            console.log( '\n' );
            const filename = path.match( /\w+.html$/gi )[0];
            console.log( filename.split( '.html' )[0] );
            console.log( fs.readFileSync( path ).toString( 'utf-8' ) );
        }
    }
}