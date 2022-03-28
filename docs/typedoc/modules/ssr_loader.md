[html-chunk-loader](../README.md) / [Modules](../modules.md) / ssr-loader

# Module: ssr-loader

**`example`** Calling the imported Loader module factory function
```javascript
const myLoader = Loader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
```

**`example`** Render templates by name from the loader, and optionally apply / override data from the constructor
```javascript
myLoader.template( 'home', { ...homeData } );
```

## Table of contents

### Interfaces

- [HCL\_Runtime](../interfaces/ssr_loader.HCL_Runtime.md)

### Type aliases

- [CoreContext](ssr_loader.md#corecontext)
- [CoreOptions](ssr_loader.md#coreoptions)
- [DebugConfig](ssr_loader.md#debugconfig)
- [LoaderOptions](ssr_loader.md#loaderoptions)

### Functions

- [Loader](ssr_loader.md#loader)

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

[core/internals/types/index.ts:7](https://github.com/abschill/html-chunk-loader/blob/93a59c9/lib/core/internals/types/index.ts#L7)

___

### CoreOptions

Ƭ **CoreOptions**: `Entity`<`LoadOptions`\>

#### Defined in

[core/internals/types/config.ts:49](https://github.com/abschill/html-chunk-loader/blob/93a59c9/lib/core/internals/types/config.ts#L49)

___

### DebugConfig

Ƭ **DebugConfig**: `boolean` \| { `logFile?`: `string` ; `logMode?`: `LogMode` ; `logStrategy?`: `LogStrategy`  }

#### Defined in

[core/internals/types/config.ts:11](https://github.com/abschill/html-chunk-loader/blob/93a59c9/lib/core/internals/types/config.ts#L11)

___

### LoaderOptions

Ƭ **LoaderOptions**: [`CoreOptions`](ssr_loader.md#coreoptions) \| `LoadOptions`

#### Defined in

[core/internals/types/config.ts:35](https://github.com/abschill/html-chunk-loader/blob/93a59c9/lib/core/internals/types/config.ts#L35)

## Functions

### Loader

▸ **Loader**(`config?`): [`HCL_Runtime`](../interfaces/ssr_loader.HCL_Runtime.md)

**`function`** Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`LoaderOptions`](ssr_loader.md#loaderoptions) |

#### Returns

[`HCL_Runtime`](../interfaces/ssr_loader.HCL_Runtime.md)

Factory function for runtime context

#### Defined in

[loader.ts:37](https://github.com/abschill/html-chunk-loader/blob/93a59c9/lib/loader.ts#L37)
