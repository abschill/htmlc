# HTML Chunk Loader
## Configurable Template Engine for Node

html-chunk-loader is a simple, lightweight template engine for Node. It has support for ssr/ssg depending on what your goal is.

## Basic Concepts

A <strong>Template</strong> includes partials & or data
A <strong>Partial</strong> includes data


Data can be iterated over, or directly inserted by name into a template which is loaded from the initialized loader object, which will be the default export when using commonjs

```
const Loader = require( 'html-chunk-loader' );
```


## Typescript / ES6

To import the correct module in ES6/Typescript, make sure to import from the path as follows


```
import { Loader } from 'html-chunk-loader/dist/loader.js';
```


[API Reference](https://github.com/abschill/html-chunk-loader/tree/master/docs/modules.md)

[Example Repos](https://github.com/abschill/html-chunk-loader-examples)
