[html-chunk-loader](../README.md) / [Modules](../modules.md) / options

# Module: options

## Table of contents

### Type aliases

- [Loader](options.md#loader)
- [LoaderOptions](options.md#loaderoptions)
- [StaticLoaderOptions](options.md#staticloaderoptions)

## Type aliases

### Loader

Ƭ **Loader**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `template` | `Function` |

#### Defined in

[options.d.ts:1](https://github.com/abschill/html-chunk-loader/blob/37399e7/lib/options.d.ts#L1)

___

### LoaderOptions

Ƭ **LoaderOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | `boolean` |
| `partialInput` | `object` |
| `partials?` | `string` |
| `pathRoot?` | `string` |
| `templateInput` | `object` |
| `templates?` | `string` |

#### Defined in

[options.d.ts:4](https://github.com/abschill/html-chunk-loader/blob/37399e7/lib/options.d.ts#L4)

___

### StaticLoaderOptions

Ƭ **StaticLoaderOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `load_options` | [`LoaderOptions`](options.md#loaderoptions) |
| `static_options` | `Object` |
| `static_options.cleanup` | `boolean` |
| `static_options.loaderFile` | `string` \| `string`[] |
| `static_options.outPath` | `string` |

#### Defined in

[options.d.ts:12](https://github.com/abschill/html-chunk-loader/blob/37399e7/lib/options.d.ts#L12)
