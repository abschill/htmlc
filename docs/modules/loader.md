[html-chunk-loader](../README.md) / [Modules](../modules.md) / loader

# Module: loader

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

- [HCL\_Runtime](../interfaces/loader.HCL_Runtime.md)

### Type aliases

- [CoreContext](loader.md#corecontext)
- [CoreOptions](loader.md#coreoptions)
- [DebugOptions](loader.md#debugoptions)
- [LoadOptions](loader.md#loadoptions)

### Functions

- [Loader](loader.md#loader)

## Type aliases

### CoreContext

Ƭ **CoreContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`CoreOptions`](loader.md#coreoptions) |
| `partials` | `FileInputMeta`[] |
| `templates` | `FileInputMeta`[] |

#### Defined in

[core/internals/types.ts:1](https://github.com/abschill/html-chunk-loader/blob/24d17aa/lib/core/internals/types.ts#L1)

___

### CoreOptions

Ƭ **CoreOptions**: `Entity`<[`LoadOptions`](loader.md#loadoptions)\>

#### Defined in

[core/internals/types.ts:124](https://github.com/abschill/html-chunk-loader/blob/24d17aa/lib/core/internals/types.ts#L124)

___

### DebugOptions

Ƭ **DebugOptions**: `boolean` \| { `logFile?`: `string` ; `logMode?`: `LogMode` ; `logStrategy?`: `LogStrategy`  }

#### Defined in

[core/internals/types.ts:104](https://github.com/abschill/html-chunk-loader/blob/24d17aa/lib/core/internals/types.ts#L104)

___

### LoadOptions

Ƭ **LoadOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | [`DebugOptions`](loader.md#debugoptions) |
| `partialInput?` | `DirtyMap` |
| `partials?` | `string` |
| `pathRoot?` | `string` |
| `templateInput?` | `DirtyMap` |
| `templates?` | `string` |
| `watch?` | `boolean` |

#### Defined in

[core/internals/types.ts:114](https://github.com/abschill/html-chunk-loader/blob/24d17aa/lib/core/internals/types.ts#L114)

## Functions

### Loader

▸ **Loader**(`config?`): [`HCL_Runtime`](../interfaces/loader.HCL_Runtime.md)

**`function`** Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`LoadOptions`](loader.md#loadoptions) |

#### Returns

[`HCL_Runtime`](../interfaces/loader.HCL_Runtime.md)

Factory function for runtime context

#### Defined in

[loader.ts:37](https://github.com/abschill/html-chunk-loader/blob/24d17aa/lib/loader.ts#L37)
