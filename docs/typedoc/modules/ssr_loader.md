[html-chunk-loader](../README.md) / [Modules](../modules.md) / ssr-loader

# Module: ssr-loader

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

- [DebugConfig](../interfaces/ssr_loader.DebugConfig.md)
- [Loader](../interfaces/ssr_loader.Loader.md)

### Type aliases

- [CoreContext](ssr_loader.md#corecontext)
- [CoreOptions](ssr_loader.md#coreoptions)
- [LoaderOptions](ssr_loader.md#loaderoptions)

### Functions

- [createLoader](ssr_loader.md#createloader)

## Type aliases

### CoreContext

Ƭ **CoreContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`CoreOptions`](ssr_loader.md#coreoptions) |
| `partials` | `FileInputMeta`[] |
| `templates` | `FileInputMeta`[] |

#### Defined in

[core/internals/types/index.ts:3](https://github.com/abschill/html-chunk-loader/blob/017ce62/lib/core/internals/types/index.ts#L3)

___

### CoreOptions

Ƭ **CoreOptions**: `Entity`<`LoadOptions`\>

#### Defined in

[core/internals/types/index.ts:81](https://github.com/abschill/html-chunk-loader/blob/017ce62/lib/core/internals/types/index.ts#L81)

___

### LoaderOptions

Ƭ **LoaderOptions**: [`CoreOptions`](ssr_loader.md#coreoptions) \| `LoadOptions`

#### Defined in

[core/internals/types/index.ts:66](https://github.com/abschill/html-chunk-loader/blob/017ce62/lib/core/internals/types/index.ts#L66)

## Functions

### createLoader

▸ **createLoader**(`config?`): [`Loader`](../interfaces/ssr_loader.Loader.md)

**`function`** createLoader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`LoaderOptions`](ssr_loader.md#loaderoptions) |

#### Returns

[`Loader`](../interfaces/ssr_loader.Loader.md)

Factory function for runtime context

#### Defined in

[loader.ts:37](https://github.com/abschill/html-chunk-loader/blob/017ce62/lib/loader.ts#L37)
