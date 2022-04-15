# HTML Chunk Loader

html-chunk-loader is a simple, lightweight template engine for Node. It has support for ssr/ssg depending on what your goal is.

## Basic Concepts

### Terminology

A ```Template``` includes partials & or data
A ```Partial``` includes data (soon will be able to nest partials in themselves too)

A ```Chunk``` is either a template or a partial, and a ```Page``` is the compiled result of these 3 concepts.

Data can be iterated over, or directly inserted by name into a template which is loaded from the initialized loader object, which will be the default export when using commonjs

## Import Paths

### CommonJS

```js
const createLoader = require('html-chunk-loader');
```

### Typescript / ES6+

To import the correct module in ES6/Typescript, make sure to import from the path as follows

```ts
import { createLoader } from 'html-chunk-loader/lib/loader';
//for the above module's typed return
import { HTMLChunkLoader } from 'html-chunk-loader/lib/types';
```

[API Reference](https://html-chunk-loader.vercel.app/)

[Example Repos](https://github.com/abschill/html-chunk-loader-examples)

[Changelog](https://github.com/abschill/html-chunk-loader/tree/master/changelog.md)
