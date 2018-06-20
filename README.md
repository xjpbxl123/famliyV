# Find

> Find 家庭版

## Get Start

```
# 安装依赖
yarn install

# 开发环境
yarn run dev

# 仿真环境
yarn run build:test
yarn run build:testFull -- build仿真环境和weex

# 生产环境
yarn run build
yarn run build:full  -- build 生产环境和weex

# 单独打包weex
yarn run weex -- 打包到dist/weex
# 检测&自动格式化代码
yarn run lint
```

### Usage

1.  postcss 配置在`package.json`的`postcss`字段 ,详见 [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config#postcssrc),兼容浏览器版本位于 `package.json`的`browserslist`字段,详见[browserslist](https://github.com/browserslist/browserslist)
2.  环境变量位于根目录,根据环境配置: `.env.json`,本地环境变量则是:`.env.local.json`,除此之外,你还可以根据环境变量自由配置,如: 你的`NODE_ENV`是 test,那么,你可以新增一个 `.env.test.json`,即 `.env.{NODE_ENV}.json`的格式,固定环境变量参数解释如下:

        PORT:8080  //DevServer 的端口
        VUE_DEV_TOOLS:true  // 是否使用 vue-devTools
        VUE_DEV_TOOLS_HOST: 'your_ip' // vue-devtools host,默认是本机ip
        VUE_DEV_TOOLS_PORT: 8098 // vue-devtools debug 端口
        HTTP_ROOT:'your_api_url' // ajax 请求的url
        WEEX_URL:'weex_url' // weex 打包的js路径
        ....其他

3.  由于个人习惯不同,使用的编辑器也不同,editorConfig 是一个 coding style 的标准,这能使我们在 coding style 上达到统一的风格,相关编辑器插件可以到[(http://editorconfig.org/](http://editorconfig.org/)上查找.
4.  esLint 默认没有配置全局变量,这可能会导致检测错误,有两种方式可以避免:

第一种:在`.eslintrc`中:

    "globals": {
        "jquery": true
    }

第二种:在<script></script>顶部使用注释:

    /* global jquery:true */
    或者
    /* global jquery */

### Note

1.  关于图片的问题,公共的图片放到 images 文件夹中,个人模块的图片放到个人的文件夹中
2.  为了避免冲突,现将路由模块拆分,每个文件以 `-router` 作为后缀,放到模块的根目录,然后在 Router 的 index 中 import 进来
3.  **webpack 2.4** 新增语法 `()=> import (/* webpackChunkName:"index" */ 'component/index');`
    注意,`/**/` 是一个语法糖,不是一个注释, 其中 `webpackChunkName:"index"` 是打包后块的名字.详见 [dynamic-import-import](https://webpack.js.org/guides/code-splitting-async/#dynamic-import-import-)
