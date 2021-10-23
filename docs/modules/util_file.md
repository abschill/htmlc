[html-chunk-loader](../README.md) / [Exports](../modules.md) / util/file

# Module: util/file

## Table of contents

### Functions

- [\_files](util_file.md#_files)
- [loadFileUTF](util_file.md#loadfileutf)
- [mapFileData](util_file.md#mapfiledata)

## Functions

### \_files

▸ `Const` **_files**(`dir`): `string`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | `string` | Directory (path) to grab files from |

#### Returns

`string`[]

array of files in directory

#### Defined in

[util/file.ts:29](https://github.com/abschill/html-chunk-loader/blob/ef949bc/lib/util/file.ts#L29)

___

### loadFileUTF

▸ `Const` **loadFileUTF**(`_path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_path` | `string` |

#### Returns

`string`

path of file to load utf8

#### Defined in

[util/file.ts:38](https://github.com/abschill/html-chunk-loader/blob/ef949bc/lib/util/file.ts#L38)

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

[util/file.ts:9](https://github.com/abschill/html-chunk-loader/blob/ef949bc/lib/util/file.ts#L9)
