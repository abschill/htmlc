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

- [CoreContext](modules.md#corecontext)
- [CoreOptions](modules.md#coreoptions)
- [DebugOptions](modules.md#debugoptions)

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

[core/internals/types.ts:1](https://github.com/abschill/html-chunk-loader/blob/8c234a3/lib/core/internals/types.ts#L1)

___

### CoreOptions

Ƭ **CoreOptions**: `Entity`<`LoadOptions`\>

#### Defined in

[core/internals/types.ts:124](https://github.com/abschill/html-chunk-loader/blob/8c234a3/lib/core/internals/types.ts#L124)

___

### DebugOptions

Ƭ **DebugOptions**: `boolean` \| { `logFile?`: `string` ; `logMode?`: `LogMode` ; `logStrategy?`: `LogStrategy`  }

#### Defined in

[core/internals/types.ts:104](https://github.com/abschill/html-chunk-loader/blob/8c234a3/lib/core/internals/types.ts#L104)

## Functions

### Loader

▸ **Loader**(`config?`): [`RuntimeState`](interfaces/RuntimeState.md)

**`function`** Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `LoadOptions` |

#### Returns

[`RuntimeState`](interfaces/RuntimeState.md)

Factory function for runtime context

#### Defined in

[loader.ts:39](https://github.com/abschill/html-chunk-loader/blob/8c234a3/lib/loader.ts#L39)
