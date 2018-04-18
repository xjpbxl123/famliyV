# Find

> Find 家庭版

## Get Start

```
# 安装依赖
yarn install

# 开发环境
yarn run dev

# 仿真环境
yarn  run build:test

# 生产环境
yarn run build

# 检测&自动格式化代码
yarn run lint
```

### Usage

1. 配置 postcss,通过根目录的`.postssrc.json` ,详见 [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config#postcssrc)
2. 环境变量位于根目录,根据环境配置: `.env.json`,本地环境变量则是:`.env.local.json`.
3. 由于个人习惯不同,使用的编辑器也不同,editorConfig 是一个 coding style 的标准,这能使我们在 coding style 上达到统一的风格,相关编辑器插件可以到[(http://editorconfig.org/](http://editorconfig.org/)上查找.
4. esLint 默认没有配置全局变量,这可能会导致检测错误,有两种方式可以避免:

第一种:在`.eslintrc`中:

    "globals": {
        "jquery": true
    }

第二种:在<script></script>顶部使用注释:

    /* global jquery:true */
    或者
    /* global jquery */

### Note

1. 关于图片的问题,公共的图片放到 images 文件夹中,个人模块的图片放到个人的文件夹中
2. 为了避免冲突,现将路由模块拆分,每个文件以 `-router` 作为后缀,放到模块的根目录,然后在 Router 的 index 中 import 进来
3. **webpack 2.4** 新增语法 `()=> import (/* webpackChunkName:"index" */ 'component/index');`
   注意,`/**/` 是一个语法糖,不是一个注释, 其中 `webpackChunkName:"index"` 是打包后块的名字.详见 [dynamic-import-import](https://webpack.js.org/guides/code-splitting-async/#dynamic-import-import-)

4. 如果需要真机测试,可以在`run`命令添加`--host`: `yarn run dev -- --host=yourIp --port=8080`,注:如果您使用的 yarn 版本>1.0,可以直接使用`yarn run dev --host=yourIp`
