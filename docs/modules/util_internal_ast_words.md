[html-chunk-loader](../README.md) / [Exports](../modules.md) / util/internal/ast/words

# Module: util/internal/ast/words

## Table of contents

### Variables

- [default](util_internal_ast_words.md#default)

### Functions

- [FOR\_H](util_internal_ast_words.md#for_h)
- [FOR\_T](util_internal_ast_words.md#for_t)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@for` | `Object` |
| `@for.array` | (`target`: `string`) => `RegExpMatchArray` |
| `@for.boolean` | (`target`: `string`, `arr`: `string`) => `boolean` |
| @for.head\|tail | (`target`: `string`, `arr`: `string`) => { `head`: `number` ; `tail`: `number`  } |
| `@render` | `Object` |
| `@render.array` | (`target`: `string`) => `RegExpMatchArray` |
| `@render.boolean` | (`target`: `string`, `key`: `string`) => `boolean` |
| `@render.translate` | (`templated_key`: `string`) => `string` |
| `@render-partial` | `Object` |
| `@render-partial.array` | (`target`: `string`) => `RegExpMatchArray` |
| `@render-partial.boolean` | (`target`: `string`, `key`: `string`) => `boolean` |

#### Defined in

[util/internal/ast/words.ts:19](https://github.com/abschill/html-chunk-loader/blob/9c82be0/lib/v1/util/internal/ast/words.ts#L19)

## Functions

### FOR\_H

▸ `Const` **FOR_H**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

`string`

#### Defined in

[util/internal/ast/words.ts:12](https://github.com/abschill/html-chunk-loader/blob/9c82be0/lib/v1/util/internal/ast/words.ts#L12)

___

### FOR\_T

▸ `Const` **FOR_T**(): `string`

#### Returns

`string`

#### Defined in

[util/internal/ast/words.ts:13](https://github.com/abschill/html-chunk-loader/blob/9c82be0/lib/v1/util/internal/ast/words.ts#L13)
