# CLI Reference

## Configuration

    "_static_config": {
        "root": "views",
        "partials": "partials",
        "templates": "pages",
        "outPath": "public",
        "cleanup":true
    }

In your package.json, you can define the paths for your input & exports like so. If you don't define one, this is what will be created for you in this format. If you haven't changed any defaults, you can omit this declaration (apart from outPath). The cleanup property decides whether or not to clear the target outDir on build or not. If you have anything important in that folder DO NOT set this to true, or you will have to restore from recycle bin. 

    "_partial_data": {
    "head": {
      "title": "Hello World",
      "desc": "Cool Description"
    },
    "footer": {
      "title": "Hello From Footer"
    }

You will want to declare your partials in package.json as well, in this format per namespace (filename)


## Running the CLI


    npx html-chunk-loader --mode=ssg

Base Command to build your SSG Templates. Please report any bugs you encounter, this is still in early stages. 

