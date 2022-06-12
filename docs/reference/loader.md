# Reference - Loaders

## Importing in CommonJS

```
const { useLoader } = require('html-chunk-loader');
```

## Importing in ES6+/Typescript

```
import { useLoader } from 'html-chunk-loader';
```

## Calling the Loader Factory Function

```
const myLoader = useLoader();
```

If you do not specify any arguments, or any missing arguments, are assigned the following values:

```
{
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
```

For each value specified in the constructor object, the default value will be overridden. the ```debug``` property can be either a boolean, null, or an object. ```debug``` being omitted or equal to false compiles to the same result shown above. The ```logFile``` property is used if logStrategy is set to 'fs' or 'both', and logMode is set to 'verbose' instead of 'silent'. If you set a logFile without applying those values to the dependent attributes, then the logFile attribute will be ignored in favor of standard out.

### ```pathRoot```

The base path relative to the process's current working directory.

### ```partials```

The partial path relative to the base path

### ```templates```

The template path relative to the base path

### ```partialInput```

The default keyed data to be rendered into partials
```
partialInput: { foo: 'bar' }
```
```
<span><!--@render=foo--></span>
```
becomes
```
<span>bar</span>
```
### ```templateInput```

The default keyed data to be rendered into templates
```
templateInput: { foo: 'bar' }
```
```
<span><!--@render=foo--></span>
```
becomes
```
<span>bar</span>
```

### ```discoverPaths```

Whether or not the runtime is able to walk through the directory to find more partials/templates rather than just the html files at base level. Each folder will be namespaced, delimited with / in the template itself, for example

```
<!--@partial=foo/bar>
```

If you have discoverPaths enabled, and you have a partial in this format, it will search relative to the partial root for the loader calling it. If the partials property is 'partials', the partial will be linked to partials/foo/bar.html


### ```watch```

The ```watch``` property uses node's file system watcher in order to watch for changes in development. This can be integrated with something like nodemon or any other live reload utility, just make sure that when you run a test environment such a jest, you do not put this option or it will fail to close the listener when the testing environment finishes.

### ```debug```

The ```debug``` option can be a boolean or an object of the above type, with the boolean "true" defaults to ```logStrategy: "stdout"``` + ```logMode: "verbose"```, and "false" defaults to those options above.


## The Loader Instance

In a given application, you can have as many loaders for as many purposes as you need. Commonly, you may use 1 for public templates and 1 for authorized templates, with different data / views for each one. To call a view from a given loader, use the [```Loader.template()```](https://github.com/abschill/html-chunk-loader/blob/master/docs/typedoc/interfaces/ssr_loader.HCL_Runtime.md#template) function to return the DOMString & optionally override any constructor fallback variables.

[Further Reading](https://github.com/abschill/html-chunk-loader/blob/master/docs/typedoc/modules/ssr_loader.md)
