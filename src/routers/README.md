### vue 路由入口

###Usage:

1. 为了避免冲突,现将路由模块拆分,每个文件以 `-router` 作为后缀.
2. **webpack 2.4** 新增语法 `import (/* webpackChunkName:index */ 'component/index');`  
   注意,`/**/` 是一个语法糖,不是一个注释, 其中 `webpackChunkName:index` 是打包后块的名字  
   详见 [dynamic-import-import](https://webpack.js.org/guides/code-splitting-async/#dynamic-import-import-)
