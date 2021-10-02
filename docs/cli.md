# CLI Reference

## Configuration

    "_static_config": {
        "root": "views",
        "partials": "partials",
        "templates": "pages",
        "outPath": "public"
    }

In your package.json, you can define the paths for your input & exports like so. If you don't define one, this is what will be created for you in this format. If you haven't changed any defaults, you can omit this declaration. 

    "_partial_data": {
    "head": {
      "title": "Hello World",
      "desc": "Cool Description Bro"
    },
    "footer": {
      "title": "Hello From Footer"
    }

You will want to declare your partials in package.json as well, in this format per namespace (filename)


## Running the CLI


    npx html-chunk-loader --mode=ssg

Base Command to begin the SSG interface. 

## UNDER CONSTRUCTION