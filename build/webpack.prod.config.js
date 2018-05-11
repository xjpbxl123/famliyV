/**
 * Create by Moersing on 2018/5/10
 */
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const shell = require('shelljs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBase = require('./webpack.config')
const NODE_ENV = process.env.NODE_ENV
const envConfig = require('./env')()
const isPro = NODE_ENV === 'production'
const shouldUseSourceMap = !!(NODE_ENV === 'development' || envConfig.env[NODE_ENV].shouldUseSourceMap)
const assist = require('./assist')
const config = require('./config')
/// Remove files of dist
shell.rm('-rf', path.resolve(config.assertRoot, '*'))
module.exports = webpackMerge(webpackBase, {
  output: {
    filename: assist.assetPath('javascript/[name].[chunkhash].js'),
    chunkFilename: assist.assetPath('javascript/[name].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'image-webpack-loader'
      }
    ]
  },
  devtool: shouldUseSourceMap && 'source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({filename: assist.assetPath('/style/[name].[chunkhash].css')}),
    new UglifyJsPlugin({
      // Compression specific options
      uglifyOptions: {
        compress: {
          // remove warnings
          warnings: false,
          // Drop console statements
          drop_console: isPro
        }
      },
      sourceMap: shouldUseSourceMap,
      parallel: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: function (module) {
        return module.context && /\.js$/.test(module.resource) && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      favicon: './src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true
      },
      cache: true
    })
  ]
})
