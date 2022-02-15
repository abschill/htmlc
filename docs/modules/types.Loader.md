[html-chunk-loader](../README.md) / [Modules](../modules.md) / [types](types.md) / Loader

# Namespace: Loader

[types](types.md).Loader

## Table of contents

### Type aliases

- [Context](types.Loader.md#context)
- [Options](types.Loader.md#options)
- [Runtime](types.Loader.md#runtime)
- [StaticOptions](types.Loader.md#staticoptions)
- [init](types.Loader.md#init)
- [template](types.Loader.md#template)

## Type aliases

### Context

Ƭ **Context**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `partials` | `any` |
| `templates` | `any` |

#### Defined in

[types.d.ts:14](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/types.d.ts#L14)

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

[types.d.ts:4](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/types.d.ts#L4)

___

### Runtime

Ƭ **Runtime**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `template` | `Function` |

#### Defined in

[types.d.ts:21](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/types.d.ts#L21)

___

### StaticOptions

Ƭ **StaticOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `load_options` | [`Options`](types.Loader.md#options) |
| `static_options` | `Object` |
| `static_options.cleanup` | `boolean` |
| `static_options.loaderFile` | `string` \| `string`[] |
| `static_options.outPath` | `string` |

#### Defined in

[types.d.ts:25](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/types.d.ts#L25)

___

### init

Ƭ **init**: (`options?`: [`Options`](types.Loader.md#options)) => [`Runtime`](types.Loader.md#runtime)

#### Type declaration

▸ (`options?`): [`Runtime`](types.Loader.md#runtime)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`Options`](types.Loader.md#options) |

##### Returns

[`Runtime`](types.Loader.md#runtime)

#### Defined in

[types.d.ts:3](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/types.d.ts#L3)

___

### template

Ƭ **template**: `string`

#### Defined in

[types.d.ts:19](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/types.d.ts#L19)
