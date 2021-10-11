import fs from 'fs';
import path from 'path';
import Partial from '../partial';
import Template from '../template';
import { LoaderOptions } from './options';
import defaults from '../default';
export default class Loader {

    _config:LoaderOptions;
    hasTemplates: boolean;
    hasParts: boolean;
    templates: Template[];
    partials: Partial[];
    _partialInput: Object;
    verbose: boolean;

    constructor( { ...opts } ) {
        this._config = {
            pathRoot:opts?.pathRoot ?? defaults.rootDefault,
            templates: opts?.templates ?? defaults.templateDefault,
            partials: opts?.partials ?? defaults.partialDefault
        }
        this._partialInput = opts?._partialInput ?? require( path.join( process.cwd(), 'package.json' ) )?._partial_data ?? {};
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this.verbose = opts?.debug ?? false;
        this._configure();
    }
    
    _configure() {
        const root_dir = path.join( process.cwd(), this._config.pathRoot );
        if( fs.existsSync( root_dir ) ) {
            if( this.verbose ) {
                console.log( `Root Directory found at ${root_dir}` );
            }
            const tde = fs.existsSync( path.join( root_dir, this._config.templates ) );

            if( this.verbose && tde ) {
                console.log( `Template Directory found` );
            }

            if( tde && fs.existsSync( path.join( root_dir, this._config.partials ) ) ) {
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
                    if( tde ) {
                        throw new Error( `Partial directory "${this._config.partials}" not found in ${process.cwd()}` );
                    }
                    else {
                        throw new Error( `Template directory "${this._config.templates}" not found in ${process.cwd()}` );
                    } 
                }
        }
        else {
            throw new Error( `Directory "${this._config.pathRoot}" not found in ${process.cwd()}` );
        }
    }

    getTemplate( name: string, {...content } ) {
        if( this.verbose ) { 
            console.log( 'To Load: \n' );
            console.log( content );
            console.log( 'Into Template: \n' );
            console.log( name );
        }
        const target = this.templates.filter( _ => _.name === name )[0];
        if( Object.keys( content ).length > 0 ) {
            return target.render( content );
        } 
        else {
          return target.render( {} );
        }
    }

}