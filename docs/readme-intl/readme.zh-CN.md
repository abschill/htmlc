# HTML 块加载器
## NodeJS 的可配置模板引擎

HTML Chunk Loader 是一个简单、轻量级的 Node.js 模板引擎。它支持服务器端渲染或静态站点生成，具体取决于您的目标。

## 基本概念

一个 <strong>模板</strong> 包括部分和/或数据
<strong>部分</strong> 包括数据


数据可以迭代，也可以直接按名称插入到从初始化的loader对象加载的模板中，这将是使用commonjs时的默认导出

## CommonJS

```
const createLoader = require('html-chunk-loader');
```


## 打字稿/ES6+

要在 打字稿/ES6+ 中导入正确的模块，请确保从以下路径导入


```
import { createLoader } from 'html-chunk-loader/dist/loader.js';
```


[参考](https://github.com/abschill/html-chunk-loader/blob/master/docs/modules.md)

[例子](https://github.com/abschill/html-chunk-loader-examples)

[变更日志](https://github.com/abschill/html-chunk-loader/tree/master/changelog.md)
