# Overriding the default config

To create your own configuration, create a render.config.js file in the root directory and use this template for options
    
    module.exports = {
    "_internals":{
        "delimiter":"stml"
    },
    "rootDir":"views",
    "templateDir":"pages",
    "partialDir":"partials",
    "staticGeneration":false,
    }