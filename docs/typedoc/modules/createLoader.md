[html-chunk-loader - v0.5.15](../README.md) / [Modules](../modules.md) / createLoader

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

[types/index.ts:18](https://github.com/abschill/html-chunk-loader/blob/b0e9007/src/types/index.ts#L18)

___

### LoaderContext

Ƭ **LoaderContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | `HTMLChunk`[] |
| `config` | `SSROptions` |

#### Defined in

[types/index.ts:74](https://github.com/abschill/html-chunk-loader/blob/b0e9007/src/types/index.ts#L74)

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

[loader/index.ts:36](https://github.com/abschill/html-chunk-loader/blob/b0e9007/src/loader/index.ts#L36)
