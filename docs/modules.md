[html-chunk-loader](README.md) / Exports

# html-chunk-loader

**`example`** Initialization
```javascript
const myLoader = Loader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
```

**`example`** Render
```javascript
myLoader.template( 'home', { ...homeData } );
```

## Table of contents

### Namespaces

- [Runtime](modules/Runtime.md)

### Functions

- [Loader](modules.md#loader)

## Functions

### Loader

▸ `Const` **Loader**(`__namedParameters`): `Object`

**`function`** Loader

**`description`** Rendering Context for templates

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Options`](modules/Runtime.md#options) |

#### Returns

`Object`

Loader for application

| Name | Type |
| :------ | :------ |
| `template` | (`name`: `string`, `__namedParameters?`: `object`) => `string` |

#### Defined in

[loader.ts:54](https://github.com/abschill/html-chunk-loader/blob/11112b4/lib/loader.ts#L54)
