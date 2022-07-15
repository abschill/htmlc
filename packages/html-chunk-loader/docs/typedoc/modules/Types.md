[html-chunk-loader - v0.7.0](../README.md) / [Modules](../modules.md) / Types

# Module: Types

## Table of contents

### Enumerations

- [DebugEventPhase](../enums/Types.DebugEventPhase.md)
- [DebugEventStatus](../enums/Types.DebugEventStatus.md)
- [Locale](../enums/Types.Locale.md)

### Interfaces

- [CallerDebugArgs](../interfaces/Types.CallerDebugArgs.md)
- [DEP\_TAG](../interfaces/Types.DEP_TAG.md)
- [HTMLChunkLoader](../interfaces/Types.HTMLChunkLoader.md)
- [MapWithPartial](../interfaces/Types.MapWithPartial.md)
- [UDebugConfig](../interfaces/Types.UDebugConfig.md)
- [USSGOptions](../interfaces/Types.USSGOptions.md)
- [USSROptions](../interfaces/Types.USSROptions.md)

### Type Aliases

- [ABT\_Binding](Types.md#abt_binding)
- [AST\_MAP](Types.md#ast_map)
- [AnyLoadConfig](Types.md#anyloadconfig)
- [ChunkableSplitData](Types.md#chunkablesplitdata)
- [ConfigStringType](Types.md#configstringtype)
- [ConfigType](Types.md#configtype)
- [DebugConfig](Types.md#debugconfig)
- [DebugEventSignature](Types.md#debugeventsignature)
- [DebugEventType](Types.md#debugeventtype)
- [DebugFn](Types.md#debugfn)
- [DebugLogArgs](Types.md#debuglogargs)
- [Debugger](Types.md#debugger)
- [Defaulted](Types.md#defaulted)
- [GlobalOptions](Types.md#globaloptions)
- [HTMLChunk](Types.md#htmlchunk)
- [HTMLChunkContent](Types.md#htmlchunkcontent)
- [HTMLChunkRenderArgs](Types.md#htmlchunkrenderargs)
- [HTMLChunkRenderFN](Types.md#htmlchunkrenderfn)
- [HTMLChunkType](Types.md#htmlchunktype)
- [HTMLPage](Types.md#htmlpage)
- [LoaderContext](Types.md#loadercontext)
- [LogMode](Types.md#logmode)
- [LogStrategy](Types.md#logstrategy)
- [ParsedKey](Types.md#parsedkey)
- [SSGOptions](Types.md#ssgoptions)
- [SSROptions](Types.md#ssroptions)
- [Token](Types.md#token)
- [UGlobalOptions](Types.md#uglobaloptions)
- [UUDebugConfig](Types.md#uudebugconfig)

### Functions

- [toLocale](Types.md#tolocale)

## Type Aliases

### ABT\_Binding

Ƭ **ABT\_Binding**<`T`\>: (`chunk`: `string`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`chunk`): `T`

Compiler/Parser Internals

##### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `string` |

##### Returns

`T`

#### Defined in

[types/index.ts:111](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L111)

___

### AST\_MAP

Ƭ **AST\_MAP**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `keys` | [`Token`](Types.md#token)[] |
| `loops` | [`Token`](Types.md#token)[] |
| `partials` | [`Token`](Types.md#token)[] |

#### Defined in

[types/index.ts:112](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L112)

___

### AnyLoadConfig

Ƭ **AnyLoadConfig**: [`GlobalOptions`](Types.md#globaloptions) \| [`UGlobalOptions`](Types.md#uglobaloptions) \| [`USSGOptions`](../interfaces/Types.USSGOptions.md) \| [`USSROptions`](../interfaces/Types.USSROptions.md) \| [`SSROptions`](Types.md#ssroptions) \| [`SSGOptions`](Types.md#ssgoptions)

#### Defined in

[types/index.ts:62](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L62)

___

### ChunkableSplitData

Ƭ **ChunkableSplitData**: [`string`, `string`]

#### Defined in

[types/index.ts:137](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L137)

___

### ConfigStringType

Ƭ **ConfigStringType**: ``"ssr"`` \| ``"ssg"``

#### Defined in

[types/index.ts:76](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L76)

___

### ConfigType

Ƭ **ConfigType**: [`SSROptions`](Types.md#ssroptions) \| [`SSGOptions`](Types.md#ssgoptions)

#### Defined in

[types/index.ts:53](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L53)

___

### DebugConfig

Ƭ **DebugConfig**: [`Defaulted`](Types.md#defaulted)<[`UDebugConfig`](../interfaces/Types.UDebugConfig.md)\>

#### Defined in

[types/index.ts:36](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L36)

___

### DebugEventSignature

Ƭ **DebugEventSignature**: ``"parser:tokenize"`` \| ``"file:change"`` \| ``"watch:init"`` \| ``"loader:init"`` \| ``"compiler:resolutions"`` \| ``"partial:load"`` \| ``"template:load"``

#### Defined in

[types/index.ts:102](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L102)

___

### DebugEventType

Ƭ **DebugEventType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fatal` | `boolean` |
| `phase` | [`DebugEventPhase`](../enums/Types.DebugEventPhase.md) |
| `signature` | [`DebugEventSignature`](Types.md#debugeventsignature) |

#### Defined in

[types/index.ts:103](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L103)

___

### DebugFn

Ƭ **DebugFn**<`T`\>: (...`DebugLogArgs`: `any`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (...`DebugLogArgs`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...DebugLogArgs` | `any` |

##### Returns

`T`

#### Defined in

[types/index.ts:82](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L82)

___

### DebugLogArgs

Ƭ **DebugLogArgs**: [eventSignature: DebugEventSignature, data: unknown]

Debug Types

#### Defined in

[types/index.ts:81](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L81)

___

### Debugger

Ƭ **Debugger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `err` | [`DebugFn`](Types.md#debugfn)<`void`\> |
| `log` | [`DebugFn`](Types.md#debugfn)<`void`\> |

#### Defined in

[types/index.ts:83](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L83)

___

### Defaulted

Ƭ **Defaulted**<`T`\>: `Readonly`<`Required`<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types/index.ts:63](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L63)

___

### GlobalOptions

Ƭ **GlobalOptions**: [`Defaulted`](Types.md#defaulted)<[`UGlobalOptions`](Types.md#uglobaloptions)\>

#### Defined in

[types/index.ts:37](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L37)

___

### HTMLChunk

Ƭ **HTMLChunk**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `extension` | `string` |
| `hasChildNodes` | `boolean` |
| `isCached` | `boolean` |
| `name` | `string` |
| `needsRehydrate` | `boolean` |
| `path` | `string` |
| `rawFile` | [`HTMLChunkContent`](Types.md#htmlchunkcontent) |
| `renderedChunk?` | [`HTMLChunkContent`](Types.md#htmlchunkcontent) |
| `type` | [`HTMLChunkType`](Types.md#htmlchunktype) |

#### Defined in

[types/index.ts:138](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L138)

___

### HTMLChunkContent

Ƭ **HTMLChunkContent**: `string`

#### Defined in

[types/index.ts:135](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L135)

___

### HTMLChunkRenderArgs

Ƭ **HTMLChunkRenderArgs**: [name: string, data?: object]

#### Defined in

[types/index.ts:149](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L149)

___

### HTMLChunkRenderFN

Ƭ **HTMLChunkRenderFN**: (...`HTMLChunkRenderArgs`: `any`) => [`HTMLPage`](Types.md#htmlpage)

#### Type declaration

▸ (...`HTMLChunkRenderArgs`): [`HTMLPage`](Types.md#htmlpage)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...HTMLChunkRenderArgs` | `any` |

##### Returns

[`HTMLPage`](Types.md#htmlpage)

#### Defined in

[types/index.ts:150](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L150)

___

### HTMLChunkType

Ƭ **HTMLChunkType**: ``"template"`` \| ``"partial"``

#### Defined in

[types/index.ts:136](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L136)

___

### HTMLPage

Ƭ **HTMLPage**: `string`

Other Runtime Internals

#### Defined in

[types/index.ts:134](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L134)

___

### LoaderContext

Ƭ **LoaderContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunks` | [`HTMLChunk`](Types.md#htmlchunk)[] |
| `config` | [`SSROptions`](Types.md#ssroptions) |

#### Defined in

[types/index.ts:9](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L9)

___

### LogMode

Ƭ **LogMode**: ``"silent"`` \| ``"verbose"`` \| ``"considerate"``

#### Defined in

[types/index.ts:42](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L42)

___

### LogStrategy

Ƭ **LogStrategy**: ``"none"`` \| ``"fs"`` \| ``"stdout"`` \| ``"both"``

#### Defined in

[types/index.ts:44](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L44)

___

### ParsedKey

Ƭ **ParsedKey**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `token` | `string` |

#### Defined in

[types/index.ts:126](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L126)

___

### SSGOptions

Ƭ **SSGOptions**: [`Defaulted`](Types.md#defaulted)<[`USSGOptions`](../interfaces/Types.USSGOptions.md)\>

#### Defined in

[types/index.ts:14](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L14)

___

### SSROptions

Ƭ **SSROptions**: [`Defaulted`](Types.md#defaulted)<[`USSROptions`](../interfaces/Types.USSROptions.md)\>

#### Defined in

[types/index.ts:16](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L16)

___

### Token

Ƭ **Token**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `raw` | `string` |

#### Defined in

[types/index.ts:122](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L122)

___

### UGlobalOptions

Ƭ **UGlobalOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | [`UUDebugConfig`](Types.md#uudebugconfig) |
| `discoverPaths?` | `boolean` |
| `errorSuppression?` | `boolean` |
| `experimentalExtensions?` | `boolean` |
| `intlCode?` | `string` |
| `partialInput?` | `object` |
| `partials?` | `string` |
| `pathRoot?` | `string` |
| `templateInput?` | `object` |
| `templates?` | `string` |

#### Defined in

[types/index.ts:18](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L18)

___

### UUDebugConfig

Ƭ **UUDebugConfig**: `boolean` \| [`UDebugConfig`](../interfaces/Types.UDebugConfig.md)

#### Defined in

[types/index.ts:30](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/index.ts#L30)

## Functions

### toLocale

▸ **toLocale**(`input`): [`Locale`](../enums/Types.Locale.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

[`Locale`](../enums/Types.Locale.md)

#### Defined in

[types/locale.ts:735](https://github.com/abschill/html-chunk-loader/blob/0db52a1/src/types/locale.ts#L735)
