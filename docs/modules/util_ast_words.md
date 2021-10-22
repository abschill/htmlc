[html-chunk-loader](../README.md) / [Exports](../modules.md) / util/ast/words

# Module: util/ast/words

## Table of contents

### Variables

- [default](util_ast_words.md#default)

### Functions

- [FOR\_H](util_ast_words.md#for_h)
- [FOR\_T](util_ast_words.md#for_t)

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

util/ast/words.ts:19

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

util/ast/words.ts:12

___

### FOR\_T

▸ `Const` **FOR_T**(): `string`

#### Returns

`string`

#### Defined in

util/ast/words.ts:13