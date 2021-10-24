[html-chunk-loader](../README.md) / [Modules](../modules.md) / RESERVED\_WORDS

# Module: RESERVED\_WORDS

**`description`** Maps reserved keywords in syntax to callbacks for the rendering engine

**`returns`** Dictionary with typed callbacks for AST

## Table of contents

### Variables

- [default](RESERVED_WORDS.md#default)

### Functions

- [FOR\_H](RESERVED_WORDS.md#for_h)
- [FOR\_T](RESERVED_WORDS.md#for_t)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@for` | `Object` |
| `@for.array` | (`target`: `string`) => `any`[] |
| `@for.boolean` | (`target`: `string`, `arr`: `string`) => `boolean` |
| `@render` | `Object` |
| `@render.array` | (`target`: `string`) => `RegExpMatchArray` |
| `@render.boolean` | (`target`: `string`, `key`: `string`) => `boolean` |
| `@render-partial` | `Object` |
| `@render-partial.array` | (`target`: `string`) => `RegExpMatchArray` |
| `@render-partial.boolean` | (`target`: `string`, `key`: `string`) => `boolean` |

#### Defined in

[util/ast/words.ts:18](https://github.com/abschill/html-chunk-loader/blob/37399e7/lib/util/ast/words.ts#L18)

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

[util/ast/words.ts:15](https://github.com/abschill/html-chunk-loader/blob/37399e7/lib/util/ast/words.ts#L15)

___

### FOR\_T

▸ `Const` **FOR_T**(): `string`

#### Returns

`string`

#### Defined in

[util/ast/words.ts:16](https://github.com/abschill/html-chunk-loader/blob/37399e7/lib/util/ast/words.ts#L16)
