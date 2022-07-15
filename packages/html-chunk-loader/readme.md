# HTML Chunk Loader

html-chunk-loader is a simple, lightweight template engine for Node. It has support for ssr/ssg depending on what your goal is.

## Basic Concepts

### Terminology

A ```Template``` includes partials & or data
A ```Partial``` includes data (soon will be able to nest partials in themselves too)

A ```Chunk``` is either a template or a partial, and a ```Page``` is the compiled result of these 3 concepts.

Data can be iterated over, or directly inserted by name into a template which is loaded from the initialized loader object, which will be the default export when using commonjs

## installation

```
npm i html-chunk-loader
```

```
yarn add html-chunk-loader
```

## Import Paths

### CommonJS

```js
const { useLoader } = require('html-chunk-loader');
```

### Typescript / ES6+

```ts
import { useLoader } from 'html-chunk-loader';
```

## command line compiler
```
npx html-chunk-loader ssg
```

run through npx to compile static context in the current path. learn more in the examples

[API Reference](https://htmlc.abschill.com/)

[Example Repos](https://github.com/abschill/html-chunk-loader-examples)

[Changelog](https://github.com/abschill/html-chunk-loader/tree/master/changelog.md)
