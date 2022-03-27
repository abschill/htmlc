[html-chunk-loader](README.md) / Exports

# html-chunk-loader

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

- [HCL\_Runtime](interfaces/HCL_Runtime.md)

### Type aliases

- [CoreContext](modules.md#corecontext)
- [CoreOptions](modules.md#coreoptions)
- [DebugOptions](modules.md#debugoptions)
- [LoadOptions](modules.md#loadoptions)

### Functions

- [Loader](modules.md#loader)

## Type aliases

### CoreContext

Ƭ **CoreContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`CoreOptions`](modules.md#coreoptions) |
| `partials` | `FileInputMeta`[] |
| `templates` | `FileInputMeta`[] |

#### Defined in

[core/internals/types.ts:1](https://github.com/abschill/html-chunk-loader/blob/a6a05f2/lib/core/internals/types.ts#L1)

___

### CoreOptions

Ƭ **CoreOptions**: `Entity`<[`LoadOptions`](modules.md#loadoptions)\>

#### Defined in

[core/internals/types.ts:124](https://github.com/abschill/html-chunk-loader/blob/a6a05f2/lib/core/internals/types.ts#L124)

___

### DebugOptions

Ƭ **DebugOptions**: `boolean` \| { `logFile?`: `string` ; `logMode?`: `LogMode` ; `logStrategy?`: `LogStrategy`  }

#### Defined in

[core/internals/types.ts:104](https://github.com/abschill/html-chunk-loader/blob/a6a05f2/lib/core/internals/types.ts#L104)

___

### LoadOptions

Ƭ **LoadOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | [`DebugOptions`](modules.md#debugoptions) |
| `partialInput?` | `DirtyMap` |
| `partials?` | `string` |
| `pathRoot?` | `string` |
| `templateInput?` | `DirtyMap` |
| `templates?` | `string` |
| `watch?` | `boolean` |

#### Defined in

[core/internals/types.ts:114](https://github.com/abschill/html-chunk-loader/blob/a6a05f2/lib/core/internals/types.ts#L114)

## Functions

### Loader

▸ **Loader**(`config?`): [`HCL_Runtime`](interfaces/HCL_Runtime.md)

**`function`** Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`LoadOptions`](modules.md#loadoptions) |

#### Returns

[`HCL_Runtime`](interfaces/HCL_Runtime.md)

Factory function for runtime context

#### Defined in

[loader.ts:38](https://github.com/abschill/html-chunk-loader/blob/a6a05f2/lib/loader.ts#L38)
