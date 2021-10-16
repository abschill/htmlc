const fs = require( 'fs' );
const path = require( 'path' );
const { filterFiles } = require( './util' );
module.exports = class StaticLoader {

    constructor( ctx, { partials, templates } ) {
        this.ctx = ctx;
        this.partial_data = require( path.resolve( process.cwd(), 'package.json' ) )._partial_data;
        this.partials_inp = partials;
        this.templates_inp = templates;
        this.partials = [];
        this.templates = [];
        //set default for these eventually from config
        this.loaderFile = require( path.resolve( process.cwd(), this.ctx.loaderFile ) )() ?? 
        require( path.resolve( process.cwd(), 'loader.js' ) )();
        console.log( 'Loader File: ' );
        console.log( this.loaderFile );
        this.outDir = path.join( process.cwd(), this.ctx.outPath ) ?? path.join( process.cwd(), 'public' );
        this._configure(); 
    }
    _configure () {
        this._configurePartials();
        this._configureTemplates();
        
        const e = this._configureOutPath();

        console.log( `Directory Setup ${e?'Success':'Failed' } `);
        this.printCtx();
    }
    _clearDirFiles( files ) {
        for( const file of files ) fs.unlinkSync( file );
    }
    _configureOutPath() {
        let dirFiles;
        if ( !fs.existsSync( this.outDir ) ) {
            const e = fs.mkdirSync( this.outDir );
            //write files here
            if( fs.existsSync( this.outDir ) ) {
                dirFiles = filterFiles( this.outDir );
                if( this.ctx.cleanup ) this._clearDirFiles( dirFiles );
                return true;
            }
            else {
                throw new Error( 'Error: output path not configured correctly' );
            }
        }
        else {
            dirFiles = filterFiles( this.outDir );
            if( this.ctx.cleanup ) this._clearDirFiles( dirFiles );
            return true;
        }
    }
    _getIterator ( txt ) {
        const _reggie = /<!--@for\(\w+\){([\s|\w|<|=|"|:|/|\.({})>]+)-->/gi;
        return txt.match( _reggie );
    }
    _configurePartials() {
        try{
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
        catch( e ) {
            throw new Error( 'Partial Configuration Failed. Make sure you define _partial_data in package.json' );
        }
        
    }
    _configureTemplates() {
        try{ 
            this.templates_inp.forEach( part => {
                const _filename = part.match( /\w+.html$/gi )[0];
                const rawContent =  fs.readFileSync( part ).toString( 'utf-8' );
                let _copy = rawContent;
                const fileName = _filename.split( '.html' )[0];
                const iterable_map = Object.values( this.loaderFile ).map( Array.isArray );
                const _iterable_map = iterable_map.filter( _ => _ === true );
                const num_iterables = _iterable_map?.length;
                const iterators = this._getIterator( rawContent );
                if( num_iterables === iterators?.length ) {
                    //input matches declarations
                    const _dom = _copy;
                    const _parser = Object.keys( this.loaderFile ).map( x => {
                        const render_val = `<!--@render=${x}-->`;
                        const loop_val = `<!--@for(${x}){`;
                        if( _dom.includes( render_val ) ) {
                            return render_val;
                        }
                        if( _dom.includes( loop_val ) ) {
                            return loop_val;
                        }
                        return false;
                    } );
                    function iterateObj( segment, entries ) {
                        let shallow = segment;
                        Object.entries( entries ).map( ent => {
                            shallow = shallow.replace( `{${ent[0]}}`, ent[1] );
                        } );
                        return shallow;
                    }
                    let outVal = [];
                    let outObj = [];
                    _parser.forEach( ( p, idx ) => {
                        const _iterator = iterators[idx - 1];
                        const match = Object.entries( this.loaderFile )[ idx ];
                        if( p && p.includes( 'render' ) ) {
                            _copy = _copy.replace( p, match[1] );
                        }
                        else{ 
                            if( p && p.includes( 'for' ) ) {
                                const _hLen = `<!--@for(${match[0]}){`;
                                const _tLen = '}-->';
                                match[1].forEach( matcher => {
                                    let newIterator = _iterator;
                                    //loop each submitted array item and create new element
                                    newIterator = newIterator.replace( _hLen, '' );
                                    newIterator = newIterator.replace( _tLen, '' );
                                    const _el = newIterator.trim();
                                    if( typeof( matcher ) === 'string' ) {
                                        outVal.push( { 'child': _el.replace( '{_}', matcher ), parent: _iterator } );
                                    }
                                    else {
                                        outObj.push( { 'child': iterateObj( _el, matcher ), parent: _iterator } );
                                    } 
                                } );
                            }
                        }
                    } );
                    const elArr = outVal.map( x => x.child ).join( '' );
                    const valArr = outObj.map( x => x.child ).join( '' );
                    
                    outVal.forEach( ( _out ) => _copy = _copy.replace( _out.parent, elArr ) );
                    outObj.forEach( ( _out ) => _copy = _copy.replace( _out.parent, valArr ) );
                    this.partials.forEach( _ => {
                        _copy = _copy.replace( `<!--@render-partial=${_.name}-->`, _.parsed );
                    } );
                }
                else {
                    this.partials.forEach( _ => {
                        _copy = _copy.replace( `<!--@render-partial=${_.name}-->`, _.parsed );
                    } );
                }
                this.templates.push( { path: part,  rawName: _filename, name: fileName, raw: rawContent, parsed: _copy } );
            } );
        }
        catch( e ) {
            throw new Error( 'Template Configuration Failed. Make sure you define loaderFile path in _static_config in package.json' );
        }
        
    }
    printCtx() {
        console.log( 'Your Config: \n' );
        console.log( this.ctx );
        this.templates.forEach( template => {
            fs.writeFileSync( path.resolve( this.outDir, template.rawName ), template.parsed );
        } );
    }
}