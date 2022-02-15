[html-chunk-loader](../README.md) / [Exports](../modules.md) / Runtime

# Namespace: Runtime

## Table of contents

### Type aliases

- [Context](Runtime.md#context)
- [Options](Runtime.md#options)
- [StaticOptions](Runtime.md#staticoptions)
- [template](Runtime.md#template)

## Type aliases

### Context

Ƭ **Context**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`Options`](Runtime.md#options) |
| `partials` | `FileInputMeta`[] |
| `templates` | `FileInputMeta`[] |

#### Defined in

[loader.ts:29](https://github.com/abschill/html-chunk-loader/blob/11112b4/lib/loader.ts#L29)

___

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |
| `partialInput?` | `object` |
| `partials?` | `string` |
| `pathRoot?` | `string` |
| `templateInput?` | `object` |
| `templates?` | `string` |
| `watch?` | `boolean` |

#### Defined in

[loader.ts:19](https://github.com/abschill/html-chunk-loader/blob/11112b4/lib/loader.ts#L19)

___

### StaticOptions

Ƭ **StaticOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `load_options` | [`Options`](Runtime.md#options) |
| `static_options` | `Object` |
| `static_options.cleanup` | `boolean` |
| `static_options.loaderFile` | `string` \| `string`[] |
| `static_options.outPath` | `string` |

#### Defined in

[loader.ts:37](https://github.com/abschill/html-chunk-loader/blob/11112b4/lib/loader.ts#L37)

___

### template

Ƭ **template**: `string`

#### Defined in

[loader.ts:35](https://github.com/abschill/html-chunk-loader/blob/11112b4/lib/loader.ts#L35)
