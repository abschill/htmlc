const fs = require( 'fs' );
const path = require( 'path' );
module.exports = class StaticLoader {

    constructor( ctx, { partials, templates } ) {
        this.ctx = ctx;
        this.partial_data = JSON.parse( fs.readFileSync( path.resolve( process.cwd(), 'package.json' ) ).toString( 'utf-8' ) )._partial_data;
        this.partials_inp = partials;
        this.templates_inp = templates;
        this.partials = [];
        this.templates = [];
        this._configure(); 
    }
    _configure () {
        this._configurePartials();
        this._configureTemplates();
        this.printCtx();
    }
    _configurePartials() {
        // console.log( this.partial_data );
        this.partials_inp.forEach( part => {
            // console.log( part );
            const _filename = part.match( /\w+.html$/gi )[0];
            const rawContent =  fs.readFileSync( part ).toString( 'utf-8' );
            const fileName = _filename.split( '.html' )[0];
            let renderedContent = rawContent;
            Object.entries( this.partial_data ).forEach( arr => {
                if( fileName === arr[0] ) {
                    //is  the right set of vars
                    const _i = Object.entries( arr[1] );
                    //[[title, 'hello world'], ['desc', '']...]
                    _i.forEach( dbo => {
                        const _match = `<!--@render=${dbo[0]}-->`;
                        const _replace = dbo[1];
                        if( rawContent.includes( _match ) ) {
                            renderedContent = renderedContent.replace( _match, _replace )
                        }
                    } );
                }
                
            } );  
            this.partials.push( { name: fileName, path: part, raw: rawContent, parsed: renderedContent } );
        } );
    }
    _configureTemplates() {
        this.templates_inp.forEach( part => {
            const _filename = part.match( /\w+.html$/gi )[0];
            const rawContent =  fs.readFileSync( part ).toString( 'utf-8' );
            const fileName = _filename.split( '.html' )[0];
            this.templates.push( { name: fileName, path: part, raw: rawContent } );
        } );
    }
    printCtx() {
        console.log( 'Your Config: \n' );
        console.log( this.ctx );
        console.log( this.partials );
       // console.log( this.templates );
    }
}