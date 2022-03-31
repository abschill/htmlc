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

- [CoreContext](createLoader.md#corecontext)
- [CoreOptions](createLoader.md#coreoptions)
- [LoaderOptions](createLoader.md#loaderoptions)

### Functions

- [createLoader](createLoader.md#createloader)

## Type aliases

### CoreContext

Ƭ **CoreContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`CoreOptions`](createLoader.md#coreoptions) |
| `partials` | `ResolvedFile`[] |
| `templates` | `ResolvedFile`[] |

#### Defined in

[core/internals/types/index.ts:153](https://github.com/abschill/html-chunk-loader/blob/a3f69cf/lib/core/internals/types/index.ts#L153)

___

### CoreOptions

Ƭ **CoreOptions**: `Entity`<`UserSSROptions`\>

#### Defined in

[core/internals/types/index.ts:50](https://github.com/abschill/html-chunk-loader/blob/a3f69cf/lib/core/internals/types/index.ts#L50)

___

### LoaderOptions

Ƭ **LoaderOptions**: [`CoreOptions`](createLoader.md#coreoptions) \| `UserSSROptions`

#### Defined in

[core/internals/types/index.ts:46](https://github.com/abschill/html-chunk-loader/blob/a3f69cf/lib/core/internals/types/index.ts#L46)

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

[loader.ts:35](https://github.com/abschill/html-chunk-loader/blob/a3f69cf/lib/loader.ts#L35)
