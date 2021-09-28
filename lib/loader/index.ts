//overwrite with stml.config.js
import fs from 'fs';
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

    constructor( { ...opts } ) {

        this._config = {
            pathRoot:opts.pathRoot ?? 'views',
            templates: opts.templates ?? 'pages',
            partials: opts.partials ?? 'partials',
            static:opts.static ?? false
        }
        this._partialInput = opts._partialInput ?? {};
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this._configure();
    }
    _configure() {
        const root_dir = path.join( process.cwd(), this._config.pathRoot );
        if( fs.existsSync( root_dir ) ) {

            if( fs.existsSync( path.join( root_dir, this._config.templates ) ) 
                && fs.existsSync( path.join( root_dir, this._config.partials )) ) {

                    const templates_ = path.join( root_dir, this._config.templates )
                    const partials_ = path.join( root_dir, this._config.partials );

                    fs.readdirSync( templates_ ).forEach( _template => {
                        return this.templates.push( new Template( this, _template.split( '.html')[0], path.join( templates_, _template ) ) );
                    } );
                     fs.readdirSync( partials_ ).forEach( _partial => {
                         const name = _partial.split( '.html')[0];
                         return this.partials.push( new Partial( name, path.join(partials_, _partial ), Object.entries( this?._partialInput )?.filter( _ => _[0]=== name )?.['0']?.['1'] ) ) 
                     } );
                }
                else {
                    throw new Error( `Directory "${this._config.pathRoot}"" not found in ${process.cwd()}` );
                }

        }
    }

    getTemplate( name: string, {...content } ) {
        const target = this.templates.filter( _ => _.name === name )[0];
        if( Object.keys( content ).length > 0 ) {
            return target.render( content );
        } 
        else {
          return target.render( [] );
        }
        
    }

}