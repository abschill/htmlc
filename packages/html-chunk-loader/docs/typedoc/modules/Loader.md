[html-chunk-loader - v0.7.0](../README.md) / [Modules](../modules.md) / Loader

# Module: Loader

**`example`** Calling the imported Loader module factory function
```javascript
import { useLoader } from 'html-chunk-loader'
const myLoader = useLoader();
```

**`example`** Render templates by name from the loader, and optionally apply / override data from the constructor
```javascript
myLoader.template('home', { ...homeData } );
```

## Table of contents

### Functions

- [useLoader](Loader.md#useloader)

## Functions

### useLoader

▸ **useLoader**(`config?`): [`HTMLChunkLoader`](../interfaces/Types.HTMLChunkLoader.md)

**`function`** useLoader factory function for Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`USSROptions`](../interfaces/Types.USSROptions.md) | user config options |

#### Returns

[`HTMLChunkLoader`](../interfaces/Types.HTMLChunkLoader.md)

Loader from config options

#### Defined in

[index.ts:35](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/index.ts#L35)
