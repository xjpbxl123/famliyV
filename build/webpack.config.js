process.noDeprecation = true /// remove deprecation warning of webpack loader,see https://github.com/webpack/loader-utils/issues/56
let shell = require('shelljs')
let path = require('path')
let webpack = require('webpack')
let assist = require('./assist')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV
let envConfig = require('./env')()
console.log(envConfig)
let shouldUseSourceMap = NODE_ENV === 'development' || envConfig.env[NODE_ENV].shouldUseSourceMap
module.exports = {
  entry: ['./build/polyfill.js', './src/main.js'],
  output: {
    path: assist.assetConfig.assertRoot,
    publicPath: NODE_ENV !== 'development' ? './' : '',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: assist.cssLoader()
        }
      },
      {
        enforce: 'pre',
        test: /\.js/,
        loader: 'eslint-loader',
        exclude: /node_modules/
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
      'components': path.posix.join(__dirname, '../src/components'),
      'scripts': path.posix.join(__dirname, '../src/scripts'),
      'styles': path.posix.join(__dirname, '../src/styles'),
      'images': path.posix.join(__dirname, '../src/images'),
      'plugins': path.posix.join(__dirname, '../src/plugins'),
      'vue-find': path.posix.join(__dirname, '../src/plugins/vue-find'),
      'find-sdk': path.posix.join(__dirname, '../src/scripts/findSDK')
    },
    extensions: ['.js', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    noInfo: false,
    compress: true
  },
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': envConfig.stringify})
  ]
};

/// add style loaders for .js files
[].push.apply(module.exports.module.rules, assist.stylesLoader({sourceMap: shouldUseSourceMap}))
switch (NODE_ENV) {
  case 'development':
    [].push.apply(module.exports.plugins, [
      /// This plugin will cause the relative path of the module to be displayed when HMR is enabled.
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true
      })
    ])
    break
  case 'production':
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.devtool = false
    break
  default:
    module.exports.devtool = shouldUseSourceMap && 'source-map'
    break
}
if (NODE_ENV !== 'development') {
  module.exports.output.filename = assist.assetPath('javascript/[name].[chunkhash].js')
  module.exports.output.chunkFilename = assist.assetPath('javascript/[name].[chunkhash].js')
  module.exports.plugins = (module.exports.plugins || []).concat(assist.productionPlugins())
  module.exports.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'image-webpack-loader'
  })
  shell.rm('-rf', assist.assetConfig.assertRoot)
}
