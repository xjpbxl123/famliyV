process.noDeprecation = true /// remove deprecation warning of webpack loader,see https://github.com/webpack/loader-utils/issues/56
const path = require('path')
const webpack = require('webpack')
const assist = require('./assist')
const config = require('./config')
const NODE_ENV = process.env.NODE_ENV
const envConfig = require('./env')()
const shouldUseSourceMap = NODE_ENV === 'development' || envConfig.env[NODE_ENV].shouldUseSourceMap
module.exports = {
  context: process.cwd(),
  entry: ['./build/polyfill.js', './src/main.js'],
  output: {
    path: config.assertRoot,
    publicPath: NODE_ENV !== 'development' ? './' : '',
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
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assist.assetPath(`/images/[name].[ext]?${NODE_ENV !== 'development' && '[hash]'}`)
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: assist.assetPath(`/fonts/[name].[ext]?${NODE_ENV !== 'development' && '[hash]'}`)
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
    extensions: ['.js', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    noInfo: false,
    compress: true
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': envConfig.stringify})
  ]
};
/// add style loaders for .js files
[].push.apply(module.exports.module.rules, assist.stylesLoader({sourceMap: shouldUseSourceMap}))
