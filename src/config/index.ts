//overwrite with hp.config.js
import fs from 'fs-extra';
import path from 'path';
import Partial from '../partial';
import Template from '../template';
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

            if( fs.pathExistsSync( path.join( root_dir, this._config.templateDir ) ) 
                && fs.pathExistsSync( path.join( root_dir, this._config.partialDir )) ) {

                    const templates_ = path.join( root_dir, this._config.templateDir )
                    const partials_ = path.join( root_dir, this._config.partialDir );
                    this.hasTemplates = fs.existsSync( templates_ );
                    this.hasParts = fs.existsSync( partials_ );

                    fs.readdirSync( templates_ ).forEach( _template => {
                        return this.templates.push( new Template( _template.split( '.html')[0], path.join( templates_, _template ) ) );
                    } );

                     fs.readdirSync( partials_ ).forEach( _partial => {
                         return this.partials.push( new Partial(  _partial.split( '.html')[0], path.join(partials_, _partial ) ) ) 
                     } );
                }
                else {
                }

        }
    }
    
    getTemplates() {
        return this.templates;
    }

    getPartials() {
        return this.partials;
    }

    toObject() {
        return {
            config: this._config,
            templates: this.templates,
            partials: this.partials
        }
    }
}