# Introduction

When writing HTML, you have probably come across the issue of rewriting a lot of the same logic, or seeking to compartmentalize your semantic HTML markup into modules that can be called programmatically on the server, or generated for static serving at runtime. You may even want to do a bit of both! I had such desires when making this package, with a 90% reduction in bundle size compared to alternatives like handlebars, and the freedom to control the full cycle the way I wanted was not something I came to regret. 

The main concept to understand is the concept of a Loader. A Loader simply makes strings, formatted for the text/html [MIME type](https://datatracker.ietf.org/doc/html/rfc6838). What html-chunk-loader does is dynamically build HTML pages for you to give to a server's response as an HTML page. How you use the library is up to you, it is very unopinionated and configurable, no application is limited to one loader, can use one for any given server auth level, user state, etc. The choice is really yours.

## Configuration Options

To configure your runtime options, for anything from loaders to template variables, you have a few options. For SSR, the first option is to inline every configuration into the factory function to create the given loader. You could load all your template variables right there at the start, which could be useful in a situation where you're creating loaders dynamically at runtime for a given session state. Another option is to initialize your loaders with fallback data, and then inline the overriding data to the ```Loader.template()``` function as the second argument. With SSG, you only have the option to set up fallback data, and now we will go over the ways that you can set that.

<h3 id="global-config">Global Config Example - hcl-config.js</h3>

```
module.exports = {
    ssr_config: {
        pathRoot: 'views',
        partials: 'partials',
        templates: 'pages',
        partialInput: {},
        templateInput: {},
        watch: false,
        discoverPaths: false,
        intlCode: 'en',
        debug: {
            logMode: 'silent',
            logStrategy: 'none',
            logFile: null
        }
    }
    static_config: {
        pathRoot: 'views',
        partials: 'partials',
        templates: 'pages',
        partialInput: {},
        templateInput: {},
    },
    fallbacks: {}
}
```

It will effectively just compile all the default options possible in the library itself. The basic concepts to really focus on would be the following properties

```
pathRoot: 'views',
partials: 'partials',
templates: 'pages',
partialInput: {},
templateInput: {},
```

The ```pathRoot``` option specifies, relative to the process directory, where to look for partial / template directories. The ```partials``` and ```template``` option set the paths within the root for the partials/templates. The next options are the inputs for the corresponding chunk type. They are key value pairs that can be accessed from within the expressions available in your chunks. 

[Learn More](/docs/reference/loader.md)

The ```fallbacks``` object allows you to specify any potential 'catch data' that can be used to attempt to suppress some sort of fatal error during runtime. An example may be a key / value of ```'content': 'Page not Found'```

<h3 id="config-types">hcl-config.js / hcl-config.json</h3>

You can create a file on the same level as package.json in your project with either of those names, and give it any of the following configuration options which will be a low priority fallback by the runtime itself. 

### package.json

If you set fallbacks in package.json, you would just take the same shape as above, but wrap it around hcl_config: {} in the package.json itself

[Loaders](/docs/reference/loader.md)
[CLI](/docs/reference/cli.md)
[Examples](https://github.com/abschill/html-chunk-loader-examples)
