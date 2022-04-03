[html-chunk-loader - v0.5.9](../README.md) / [Modules](../modules.md) / createLoader

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

- [DebugConfig](../interfaces/createLoader.DebugConfig.md)
- [Loader](../interfaces/createLoader.Loader.md)

### Type aliases

- [LoaderContext](createLoader.md#loadercontext)
- [LoaderOptions](createLoader.md#loaderoptions)

### Functions

- [createLoader](createLoader.md#createloader)

## Type aliases

### LoaderContext

Ƭ **LoaderContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | `HTMLChunk`[] |
| `config` | `E_SSROptions` |

#### Defined in

[core/internals/types/index.ts:173](https://github.com/abschill/html-chunk-loader/blob/f29676d/lib/core/internals/types/index.ts#L173)

___

### LoaderOptions

Ƭ **LoaderOptions**: `E_SSROptions` \| `UserSSROptions`

#### Defined in

[core/internals/types/index.ts:67](https://github.com/abschill/html-chunk-loader/blob/f29676d/lib/core/internals/types/index.ts#L67)

## Functions

### createLoader

▸ **createLoader**(`u_config?`): [`Loader`](../interfaces/createLoader.Loader.md)

**`function`** createLoader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `u_config?` | [`LoaderOptions`](createLoader.md#loaderoptions) | user config options |

#### Returns

[`Loader`](../interfaces/createLoader.Loader.md)

Factory function for runtime context

#### Defined in

[loader.ts:36](https://github.com/abschill/html-chunk-loader/blob/f29676d/lib/loader.ts#L36)
