# Reference - Loaders

## Importing in CommonJS

```
const Loader = require('html-chunk-loader');
```

## Importing in ES6+/Typescript

```
import { Loader } from 'html-chunk-loader/dist/loader.js';
```

## Calling the Loader Factory Function

```
const myLoader = Loader();
```

If you do not specify any arguments, they take the following defaults in the following configuration shape:

```
{
    pathRoot: 'views',
    partials: 'partials',
    templates: 'pages',
    partialInput: {},
    templateInput: {},
    watch: false,
    debug: {
        logMode: 'silent',
        logStrategy: 'none',
        logFile: null
    }
}
```

For each value specified in the constructor object, the default value will be overridden. the ```debug``` property can be either a boolean, null, or an object. ```debug``` being omitted or equal to false compiles to the same result shown above. The ```logFile``` property is used if logStrategy is set to 'fs' or 'both', and logMode is set to 'verbose' instead of 'silent'. If you set a logFile without applying those values to the dependent attributes, then the logFile attribute will be ignored in favor of standard out. 



### The ```watch``` property

The watch property uses node's file system watcher in order to watch for changes in development. This can be integrated with something like nodemon or any other live reload utility, just make sure that when you run a test environment such a jest, you do not put this option or it will fail to close the listener when the testing environment finishes. 

[Further Reading](https://github.com/abschill/html-chunk-loader/blob/0.5.x/docs/typedoc/modules/ssr_loader.md)