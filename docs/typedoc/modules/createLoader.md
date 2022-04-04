[html-chunk-loader - v0.5.11](../README.md) / [Modules](../modules.md) / createLoader

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
- [toNarrowOptions](createLoader.md#tonarrowoptions)

### Functions

- [createLoader](createLoader.md#createloader)

## Type aliases

### DebugConfig

Ƭ **DebugConfig**: `Required`<`DebugOptions`\>

#### Defined in

[core/types/index.ts:14](https://github.com/abschill/html-chunk-loader/blob/f79e3e7/lib/core/types/index.ts#L14)

___

### LoaderContext

Ƭ **LoaderContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | `HTMLChunk`[] |
| `config` | `SSROptions` |

#### Defined in

[core/types/index.ts:70](https://github.com/abschill/html-chunk-loader/blob/f79e3e7/lib/core/types/index.ts#L70)

___

### toNarrowOptions

Ƭ **toNarrowOptions**: `SSROptions` \| `USSROptions`

#### Defined in

[core/types/index.ts:146](https://github.com/abschill/html-chunk-loader/blob/f79e3e7/lib/core/types/index.ts#L146)

## Functions

### createLoader

▸ **createLoader**(`u_config?`): [`Loader`](../interfaces/createLoader.Loader.md)

**`function`** createLoader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `u_config?` | `USSROptions` \| `USSGOptions` | user config options |

#### Returns

[`Loader`](../interfaces/createLoader.Loader.md)

Factory function for runtime context

#### Defined in

[loader.ts:37](https://github.com/abschill/html-chunk-loader/blob/f79e3e7/lib/loader.ts#L37)
