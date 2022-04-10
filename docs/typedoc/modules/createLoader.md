[html-chunk-loader - v0.6.1](../README.md) / [Modules](../modules.md) / createLoader

# Module: createLoader

**`example`** Calling the imported Loader module factory function
```javascript
const myLoader = createLoader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
```

**`example`** Render templates by name from the loader, and optionally apply / override data from the constructor
```javascript
myLoader.template( 'home', { ...homeData } );
```

## Table of contents

### Interfaces

- [Loader](../interfaces/createLoader.Loader.md)

### Type aliases

- [DebugConfig](createLoader.md#debugconfig)
- [LoaderContext](createLoader.md#loadercontext)

### Functions

- [createLoader](createLoader.md#createloader)

## Type aliases

### DebugConfig

Ƭ **DebugConfig**: `Required`<`DebugOptions`\>

#### Defined in

[types/index.ts:17](https://github.com/abschill/html-chunk-loader/blob/afc981e/src/types/index.ts#L17)

___

### LoaderContext

Ƭ **LoaderContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | `HTMLChunk`[] |
| `config` | `SSROptions` |

#### Defined in

[types/index.ts:73](https://github.com/abschill/html-chunk-loader/blob/afc981e/src/types/index.ts#L73)

## Functions

### createLoader

▸ **createLoader**(`u_config?`): [`Loader`](../interfaces/createLoader.Loader.md)

**`function`** createLoader factory function for Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `u_config?` | `USSROptions` \| `USSGOptions` | user config options |

#### Returns

[`Loader`](../interfaces/createLoader.Loader.md)

Loader from config options

#### Defined in

[loader/index.ts:36](https://github.com/abschill/html-chunk-loader/blob/afc981e/src/loader/index.ts#L36)
