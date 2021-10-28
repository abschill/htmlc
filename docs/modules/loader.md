[html-chunk-loader](../README.md) / [Modules](../modules.md) / loader

# Module: loader

**`example`** Initialization
```javascript
const myLoader = loader( { pathRoot: 'views', templates: 'pages', partials: 'partials', partialInput: {}, templateInput: {} } );
```

**`example`** Render
```javascript
myLoader.template( 'home', {...homeData} );
```

## Table of contents

### Functions

- [loader](loader.md#loader)

## Functions

### loader

▸ `Const` **loader**(`config`): [`Loader`](options.md#loader)

**`function`** loader

**`description`** Rendering Context

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`LoaderOptions`](options.md#loaderoptions) | config object for loader |

#### Returns

[`Loader`](options.md#loader)

Loader for application

#### Defined in

[loader.ts:26](https://github.com/abschill/html-chunk-loader/blob/564fb41/lib/loader.ts#L26)
