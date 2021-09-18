//overwrite with stml.config.js
import fs from 'fs-extra';
import path from 'path';
import Partial from '../partial';
import Template from '../template';
import { LoaderOptions } from '../types/config';
export default class Loader {

    _config:LoaderOptions;
    hasTemplates: boolean;
    hasParts: boolean;
    templates: Template[];
    partials: Partial[];
    _partialInput: Object;

    constructor( {...opts} ) {

        this._config = {
            pathRoot:opts.pathRoot || 'views',
            templates: opts.templates || 'pages',
            partials: opts.partials || 'partials',
            static:opts.static || false
        }
        this._partialInput = opts._partialInput;
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this._configure();
    }
    _configure() {
        const config_path = path.join( process.cwd(), `render.config.js` );
        const root_dir = path.join( process.cwd(), this._config.pathRoot );

        if( fs.existsSync( config_path ) ) {
            this._config = require( config_path );
        }
        if( fs.pathExistsSync( root_dir ) ) {

            if( fs.pathExistsSync( path.join( root_dir, this._config.templates ) ) 
                && fs.pathExistsSync( path.join( root_dir, this._config.partials )) ) {

                    const templates_ = path.join( root_dir, this._config.templates )
                    const partials_ = path.join( root_dir, this._config.partials );

                    fs.readdirSync( templates_ ).forEach( _template => {
                        return this.templates.push( new Template( this, _template.split( '.html')[0], path.join( templates_, _template ) ) );
                    } );

                     fs.readdirSync( partials_ ).forEach( _partial => {
                         return this.partials.push( new Partial(  this, _partial.split( '.html')[0], path.join(partials_, _partial ) ) ) 
                     } );
                }
                else {
                    throw new Error( 'Directory not configured' );
                }

        }
        this._partials_process();
    }
    _partials_process() {
        if( this._partialInput ) {
            //@ts-ignore
            this.partials = this.getPartials().map( _ => _.parse(  this._partialInput ) )
        }
        
    }


    getTemplates( mode ) {
        switch( mode ) {
            case 'preload':
                //@ts-ignore
                const _ = this.templates.map( _ => _._preload());
                return _;
            default:
                return this.templates;
        }
    }

    getPartials( ) {
        return this.partials;
        
    }

    _asObject() {
        return {
            config: this._config,
            templates: this.templates,
            partials: this.partials
        }
    }

    getTemplate( name, {...content } ) {
        const target = this.templates.filter( _ => _.name === name )[0];
        if( Object.keys( content ).length > 0 ) {
            return target.render( [ content ] );
        } 
        else {
          return target.render( [] );
        }
        
    }

}