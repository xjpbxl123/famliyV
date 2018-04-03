/**
 * Created by moersing on 04/05/2017.
 */
let NODE_ENV = process.env.NODE_ENV
let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let assetConfig = {
  assertRoot: path.resolve(__dirname, '../dist'),
  assertPath: 'static',
  publicPath: '../../'
}
let assetPath = function (_path) {
  return path.posix.join(assetConfig.assertPath, _path)
}

module.exports = {
  /**
   * @desc return a absolute asset path
   * */
  assetPath: assetPath,
  assetConfig: assetConfig,
  /**
   * @desc  generating config,contain `ENV plugins` etc...
   * */
  generate: {
    productionPlugins: function () {
      return [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({filename: assetPath('/style/[name].[chunkhash].css')}),
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
          template: 'index.html',
          inject: true,
          favicon: './favicon.ico',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyJS: true
          },
          cache: true
        })
      ]
    },
    cssLoader (options = {}) {
      let loaders = {
        css: ['css-loader', 'postcss-loader'],
        scss: ['css-loader', 'sass-loader', 'postcss-loader']
      }
      for (let loader in loaders) {
        if (NODE_ENV !== 'development') {
          loaders[loader] = ExtractTextPlugin.extract({
            use: loaders[loader],
            fallback: 'vue-style-loader',
            publicPath: options.publicPath
          })
        } else {
          loaders[loader].unshift('vue-style-loader')
          loaders[loader] = loaders[loader].join('!')
        }
      }
      return loaders
    },
    stylesLoader (options = {}) {
      let stylesLoaders = []
      let loaders = module.exports.generate.cssLoader(options)
      for (let extension in loaders) {
        let loader = loaders[extension]
        stylesLoaders.push({
          test: new RegExp(`\\.${extension}$`),
          loader: loader
        })
      }
      return stylesLoaders
    }
  }
}
