/**
 * Created by moersing on 04/05/2017.
 */
let NODE_ENV = process.env.NODE_ENV
let isPro = NODE_ENV === 'production'
let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let assetConfig = {
  assertRoot: path.resolve(__dirname, '../dist'),
  assertPath: 'static',
  publicPath: '../../'
}
/**
 * @desc return an absolute asset path
 * @param {string} _path
 * */
const assetPath = function (_path) {
  return path.posix.join(assetConfig.assertPath, _path)
}
const productionPlugins = () => {
  return [
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({filename: assetPath('/style/[name].[chunkhash].css')}),
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
      sourceMap: !isPro,
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
}
/**
 * @desc Parse css/sass for vue
 * */
const cssLoader = ({sourceMap = true, publicPath = assetConfig.publicPath} = {}) => {
  let loaders = {
    css: ['css-loader', 'postcss-loader'],
    scss: ['css-loader', 'sass-loader', 'postcss-loader']
  }
  for (let loader in loaders) {
    if (NODE_ENV !== 'development') {
      loaders[loader] = ExtractTextPlugin.extract({
        use: loaders[loader],
        fallback: 'vue-style-loader',
        publicPath: publicPath
      })
    } else {
      loaders[loader].unshift('vue-style-loader')
      loaders[loader] = `${loaders[loader].join('!')}?sourceMap=${sourceMap}`
    }
  }
  return loaders
}

/**
 * @desc Parse common styles(css/sass)
 * */
const stylesLoader = (options = {}) => {
  let stylesLoaders = []
  let loaders = cssLoader(options)
  for (let extension in loaders) {
    let loader = loaders[extension]
    stylesLoaders.push({
      test: new RegExp(`\\.${extension}$`),
      loader: loader
    })
  }
  return stylesLoaders
}
module.exports = {
  assetConfig,
  assetPath,
  productionPlugins,
  cssLoader,
  stylesLoader
}
