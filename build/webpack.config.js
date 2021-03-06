process.noDeprecation = true /// remove deprecation warning of webpack loader,see https://github.com/webpack/loader-utils/issues/56
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const path = require('path')
const webpack = require('webpack')
const assist = require('./assist')
const config = require('./config')
const NODE_ENV = process.env.NODE_ENV
const pkg = require('../package')
const envConfig = require('./env')({VERSION: pkg.version, BUILD_VERSION: pkg.build, VUE_DEV_TOOLS_HOST: require('ip').address()})
const env = envConfig.env[NODE_ENV] || envConfig.env
const shouldUseSourceMap = NODE_ENV === 'development' || env.shouldUseSourceMap
module.exports = {
  context: process.cwd(),
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: config.assertRoot,
    publicPath: './',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: assist.cssLoader()
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assist.assetPath('/images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: assist.assetPath('/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vue-find$': 'vue-find/dist/vue-find.esm.js',
      'components': path.posix.resolve(__dirname, '../src/components'),
      'scripts': path.posix.resolve(__dirname, '../src/scripts'),
      'styles': path.posix.resolve(__dirname, '../src/styles'),
      'images': path.posix.resolve(__dirname, '../src/images'),
      'plugins': path.posix.resolve(__dirname, '../src/plugins')
    },
    extensions: ['.js', '.vue'],
    symlinks: false // Because we have many local modules and they are though `npm link` to links in `node_modules`,But We don't hope webpack compile them.
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': envConfig.stringify})
  ].concat(config.staticAssert ? new HtmlWebpackIncludeAssetsPlugin({
    assets: [
      {path: 'public', glob: '**/*.js', globPath: config.staticAssert},
      {path: 'public', glob: '**/*.css', globPath: config.staticAssert}
    ],
    append: false
  }) : [])
};
/// add style loaders for .js files
[].push.apply(module.exports.module.rules, assist.stylesLoader({sourceMap: shouldUseSourceMap}))
