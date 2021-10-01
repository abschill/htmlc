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
        this.genTemplates();

    }

    printCtx() {
        console.log( 'Your Config: \n' );
        console.log( this.ctx );
    }

    async genTemplates( ) {
        for await( const chunk of this.files ) {
            console.log( '\n' );
            const _filename = chunk.match( /\w+.html$/gi )[0];
            const rawContent =  fs.readFileSync( chunk ).toString( 'utf-8' );
            const fileName = _filename.split( '.html' )[0];
            console.log( { rawContent, fileName } );
        }
    }
}