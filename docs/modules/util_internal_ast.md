[html-chunk-loader](../README.md) / [Exports](../modules.md) / util/internal/ast

# Module: util/internal/ast

## Table of contents

### Functions

- [hasKey](util_internal_ast.md#haskey)
- [hasLoop](util_internal_ast.md#hasloop)
- [hasPartial](util_internal_ast.md#haspartial)
- [keyIndex](util_internal_ast.md#keyindex)
- [loopIndex](util_internal_ast.md#loopindex)
- [matchKey](util_internal_ast.md#matchkey)
- [matchLoop](util_internal_ast.md#matchloop)
- [matchPartial](util_internal_ast.md#matchpartial)
- [partialIndex](util_internal_ast.md#partialindex)
- [replaceKey](util_internal_ast.md#replacekey)
- [replacePartial](util_internal_ast.md#replacepartial)
- [translateKeyName](util_internal_ast.md#translatekeyname)

## Functions

### hasKey

▸ `Const` **hasKey**(`target`, `key`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | the DOM to match against |
| `key` | `string` | the key of the iterable to match |

#### Returns

`boolean`

If the DOM has the render key

#### Defined in

[util/internal/ast/index.ts:24](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L24)

___

### hasLoop

▸ `Const` **hasLoop**(`target`, `arr`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | the DOM to match against |
| `arr` | `string` | - |

#### Returns

`boolean`

If the DOM has the render loop

#### Defined in

[util/internal/ast/index.ts:7](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L7)

___

### hasPartial

▸ `Const` **hasPartial**(`target`, `key`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | the DOM to match against |
| `key` | `string` | the key of the iterable to match |

#### Returns

`boolean`

If the DOM has the partial key

#### Defined in

[util/internal/ast/index.ts:47](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L47)

___

### keyIndex

▸ `Const` **keyIndex**(`target`, `key`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `key` | `string` |

#### Returns

`number`

#### Defined in

[util/internal/ast/index.ts:25](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L25)

___

### loopIndex

▸ `Const` **loopIndex**(`target`, `arr`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `arr` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `head` | `number` |
| `tail` | `number` |

#### Defined in

[util/internal/ast/index.ts:8](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L8)

___

### matchKey

▸ `Const` **matchKey**(`target`): `RegExpMatchArray`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The Partial/Template to match render key against |

#### Returns

`RegExpMatchArray`

matched segments from input

#### Defined in

[util/internal/ast/index.ts:37](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L37)

___

### matchLoop

▸ `Const` **matchLoop**(`target`): `RegExpMatchArray`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The Partial/Template to match render loop against |

#### Returns

`RegExpMatchArray`

matched segments from input

#### Defined in

[util/internal/ast/index.ts:14](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L14)

___

### matchPartial

▸ `Const` **matchPartial**(`target`): `RegExpMatchArray`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The Partial/Template to match partial key against |

#### Returns

`RegExpMatchArray`

matched segments from input

#### Defined in

[util/internal/ast/index.ts:59](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L59)

___

### partialIndex

▸ `Const` **partialIndex**(`target`, `key`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `key` | `string` |

#### Returns

`number`

#### Defined in

[util/internal/ast/index.ts:48](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L48)

___

### replaceKey

▸ `Const` **replaceKey**(`target`, `key`, `value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `key` | `string` |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[util/internal/ast/index.ts:27](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L27)

___

### replacePartial

▸ `Const` **replacePartial**(`target`, `key`, `value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `key` | `string` |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[util/internal/ast/index.ts:49](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L49)

___

### translateKeyName

▸ `Const` **translateKeyName**(`templated_key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `templated_key` | `string` |

#### Returns

`string`

#### Defined in

[util/internal/ast/index.ts:26](https://github.com/abschill/html-chunk-loader/blob/3536a6e/lib/v1/util/internal/ast/index.ts#L26)
