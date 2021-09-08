//overwrite with hp.config.js
import fs from 'fs-extra';
import path from 'path';
import Partial from '../partial';
import { Template } from '../types/template';
import { ConfigOptions } from '../types/config';

export default class Config {

    _config:ConfigOptions
    hasTemplates: boolean
    hasParts: boolean
    templates: Template[]
    partials: Partial[]

    constructor() {
        this._config = {
                        "_internals":{
                            "delimiter":"hp"
                        },
                        "rootDir":"views",
                        "templateDir":"page",
                        "partialDir":"layout",
                        "staticGeneration":false,
                    }
        this.hasTemplates = false;
        this.hasParts = false;
        this.partials = [];
        this.templates = [];
        this._configure();
  
    }
    _configure() {
        const config_path = path.join( process.cwd(), 'hp.config.js' );
        const root_dir = path.join( process.cwd(), this._config.rootDir );
        if( fs.existsSync( config_path ) ) {
            this._config = require( config_path );
        }
        if( fs.pathExistsSync( root_dir ) ) {
            //config-defined directory located
            if( fs.pathExistsSync( path.join( root_dir, this._config.templateDir ) ) 
                && fs.pathExistsSync( path.join( root_dir, this._config.partialDir )) ) {
                    const templates_ = path.join( root_dir, this._config.templateDir )
                    const partials_ = path.join( root_dir, this._config.partialDir );
                    this.hasTemplates = fs.existsSync( templates_ );
                    this.hasParts = fs.existsSync( partials_ );
                    // console.log( );
                    // fs.readdirSync( templates_ ).forEach( _template => {
                    //    // this.templates.push( fs.readFileSync( file ).toString( 'utf-8' ) ) );
                    //    console.log( fs.readFileSync( path.resolve( templates_, _template ) ).toString( 'utf-8' )  );
                    // } )
                     fs.readdirSync( partials_ ).forEach( _partial => this.partials.push( new Partial( path.join(partials_, _partial ) ) ) );
                    // console.log( this.parts );
                    // console.log( fs.readdirSync( path.join( root_dir, this._config.partialDir )));
                }
                else {
                }
            //check for layout and page folders or otherwise configured folder names

        }
    }

    toString(){
        return this;
    }
}