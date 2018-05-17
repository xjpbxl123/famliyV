/**
 * Created by moersing on 04/05/2017.
 */
const NODE_ENV = process.env.NODE_ENV
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const assetConfig = require('./config')
const shell = require('shelljs')
/**
 * @desc return an absolute asset path
 * @param {string} _path
 * */
const assetPath = function (_path) {
  return path.posix.join(assetConfig.assertPath, _path)
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
/**
 * @desc Copy static assets such as Public folder
 * */
const copyStaticAssets = (root = assetConfig.assertRoot) => {
  shell.cp('-R', assetConfig.staticAssert, root)
}
module.exports = {
  assetPath,
  cssLoader,
  stylesLoader,
  copyStaticAssets
}
