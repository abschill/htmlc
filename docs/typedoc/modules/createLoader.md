[html-chunk-loader](../README.md) / [Modules](../modules.md) / createLoader

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
| `config` | `E_SSROptions` |
| `partials` | `ResolvedFile`[] |
| `templates` | `ResolvedFile`[] |

#### Defined in

[core/internals/types/index.ts:162](https://github.com/abschill/html-chunk-loader/blob/b345592/lib/core/internals/types/index.ts#L162)

___

### LoaderOptions

Ƭ **LoaderOptions**: `E_SSROptions` \| `UserSSROptions`

#### Defined in

[core/internals/types/index.ts:63](https://github.com/abschill/html-chunk-loader/blob/b345592/lib/core/internals/types/index.ts#L63)

## Functions

### createLoader

▸ **createLoader**(`config?`): [`Loader`](../interfaces/createLoader.Loader.md)

**`function`** createLoader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`LoaderOptions`](createLoader.md#loaderoptions) |

#### Returns

[`Loader`](../interfaces/createLoader.Loader.md)

Factory function for runtime context

#### Defined in

[loader.ts:35](https://github.com/abschill/html-chunk-loader/blob/b345592/lib/loader.ts#L35)
