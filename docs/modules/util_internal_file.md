[html-chunk-loader](../README.md) / [Exports](../modules.md) / util/internal/file

# Module: util/internal/file

## Table of contents

### Functions

- [\_files](util_internal_file.md#_files)
- [loadFileUTF](util_internal_file.md#loadfileutf)
- [mapFileData](util_internal_file.md#mapfiledata)

## Functions

### \_files

▸ `Const` **_files**(`dir`): `string`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | `string` | Directory to grab files from |

#### Returns

`string`[]

#### Defined in

[util/internal/file.ts:29](https://github.com/abschill/html-chunk-loader/blob/9c82be0/lib/v1/util/internal/file.ts#L29)

___

### loadFileUTF

▸ `Const` **loadFileUTF**(`_path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_path` | `any` |

#### Returns

`string`

#### Defined in

[util/internal/file.ts:33](https://github.com/abschill/html-chunk-loader/blob/9c82be0/lib/v1/util/internal/file.ts#L33)

___

### mapFileData

▸ `Const` **mapFileData**(`filePath`): `FileInputMeta`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Full system-specific path of target file |

#### Returns

`FileInputMeta`

Name of the html file in the given target path, x-platform

#### Defined in

[util/internal/file.ts:9](https://github.com/abschill/html-chunk-loader/blob/9c82be0/lib/v1/util/internal/file.ts#L9)
