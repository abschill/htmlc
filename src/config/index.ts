//overwrite with hp.config.js
import fs from 'fs-extra';
import path from 'path';
import { Template } from '../types/template';
import { ConfigOptions } from '../types/config';

export default class Config {
    _config:ConfigOptions
    template: Template
    constructor(){
        this._config = {
                        "_internals":{
                            "delimiter":"hp"
                        },
                        "rootDir":"views",
                        "templateDir":"page",
                        "partialDir":"layout",
                        "staticGeneration":false,
                    }
        this.setConfig();

        
    }
    setConfig(){
        if( fs.existsSync( path.join( process.cwd(), 'hp.config.js') ) ){
            this._config = require( path.join( process.cwd(), 'hp.config.js' ) );
        }
        if( fs.pathExistsSync( path.join(process.cwd(), this._config.rootDir ) )) {
            //config-defined directory located
            //check for layout and page folders or otherwise configured folder names

        }
    }
}