[html-chunk-loader - v0.6.12](README.md) / Exports

# html-chunk-loader - v0.6.12

**`example`** Calling the imported Loader module factory function
```javascript
const myLoader = createLoader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
```

**`example`** Render templates by name from the loader, and optionally apply / override data from the constructor
```javascript
myLoader.template( 'home', { ...homeData } );
```

## Table of contents

### Functions

- [createLoader](modules.md#createloader)

## Functions

### createLoader

▸ **createLoader**(`u_config?`): `HTMLChunkLoader`

**`function`** createLoader factory function for Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `u_config?` | `USSROptions` \| `USSGOptions` | user config options |

#### Returns

`HTMLChunkLoader`

Loader from config options

#### Defined in

[index.ts:33](https://github.com/abschill/html-chunk-loader/blob/bd5c0e4/src/loader/index.ts#L33)
