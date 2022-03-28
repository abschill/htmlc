# HTMLチャンクローダー
## ノード用の設定可能なテンプレートエンジン

html-chunk-loaderはノード用のシンプルで軽量なテンプレートエンジンです。 それはあなたの目標が何であるかに応じてssr/ssgをサポートしています。

## 基本的な概念

<strong>テンプレート</strong>には、部分文字列&またはデータが含まれています
A<strong>Partial</strong>データが含まれます


データを反復処理したり、初期化されたloaderオブジェクトからロードされたテンプレートに名前で直接挿入したりすることができます。

## CommonJS

```
const Loader=require('html-chunk-loader');
```


## Typescript/ES6+

ES6/Typescriptで正しいモジュールをインポートするには、次のようにパスからインポートしてください

```
import { Loader } from 'html-chunk-loader/dist/loader.js';
```

[参考文献](https://github.com/abschill/html-chunk-loader/blob/master/docs/modules.md)

[例](https://github.com/abschill/html-chunk-loader-examples)

[変更履歴](https://github.com/abschill/html-chunk-loader/tree/master/changelog.md)