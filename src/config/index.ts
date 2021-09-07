//overwrite with hp.config.js
import fs from 'fs-extra';
import path from 'path';
const config = () => {
// if static generation is true define path "staticOutput":""
    // if static generation is true define route endpoint "staticEndpointPath":""
    if( !fs.existsSync(path.join( process.cwd(), 'hp.config.js' ) ) ){
        return {
            "_internals":{
                "delimiter":"hp"
            },
            "templateDirectory":"views",
            "staticGeneration":false,
        }
    }
    else {
        const conf = require( path.join( process.cwd(), 'hp.config.js' ) );
        return conf;
    }
    
}

export default config;