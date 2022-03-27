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

- [RuntimeState](interfaces/RuntimeState.md)

### Type aliases

- [Options](modules.md#options)
- [coreContext](modules.md#corecontext)

### Functions

- [Loader](modules.md#loader)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `RDebugOpts` |
| `partialInput?` | `DirtyMap` |
| `partials?` | `string` |
| `pathRoot?` | `string` |
| `templateInput?` | `DirtyMap` |
| `templates?` | `string` |
| `watch?` | `boolean` |

#### Defined in

[core/internals/types.ts:117](https://github.com/abschill/html-chunk-loader/blob/60dee54/lib/core/internals/types.ts#L117)

___

### coreContext

Ƭ **coreContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | `ROptions` |
| `partials` | `FileInputMeta`[] |
| `templates` | `FileInputMeta`[] |

#### Defined in

[core/internals/types.ts:1](https://github.com/abschill/html-chunk-loader/blob/60dee54/lib/core/internals/types.ts#L1)

## Functions

### Loader

▸ **Loader**(`config?`): [`RuntimeState`](interfaces/RuntimeState.md)

**`function`** Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`Options`](modules.md#options) |

#### Returns

[`RuntimeState`](interfaces/RuntimeState.md)

Factory function for runtime context

#### Defined in

[loader.ts:32](https://github.com/abschill/html-chunk-loader/blob/60dee54/lib/loader.ts#L32)
