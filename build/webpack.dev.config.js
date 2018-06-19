/**
 * Create by Moersing on 2018/5/10
 */
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const WebPackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackBase = require('./webpack.config')
const config = require('./config')
const assist = require('./assist')
/// Determine Ip and Port
const ip = require('ip').address()
const shell = require('shelljs')
const pkg = require('../package')
const NODE_ENV = process.env.NODE_ENV
const envConfig = require('./env')()
const env = envConfig.env[NODE_ENV] || envConfig.env
const port = env.PORT || '8080'
const useDevTools = env.VUE_DEV_TOOLS
const devPort = env.VUE_DEV_TOOLS_PORT || '8098'
const webpackConfig = webpackMerge(webpackBase, {
  plugins: [
    /// This plugin will cause the relative path of the module to be displayed when HMR is enabled.
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${ip}:${port} and you can visit http://localhost:${port} at the some time`]
      }
    })
  ].concat(
    /// Inject script tag for vue-devtool,See https://github.com/vuejs/vue-devtools/blob/master/shells/electron/README.md
    useDevTools
      ? [
        new HtmlWebpackIncludeAssetsPlugin({
          assets: [{path: `http://${ip}:${devPort}`, type: 'js'}],
          append: true,
          publicPath: false
        })
      ] : []
  )
})
const devServerOptions = {
  publicPath: '/',
  contentBase: config.assertRoot,
  host: '0.0.0.0',
  hot: true,
  historyApiFallback: true,
  stats: 'minimal',
  noInfo: false,
  compress: true,
  quiet: true /// Here set true, Because FriendlyErrorsPlugin will prints friendly error for you.
}
WebPackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)
const compiler = webpack(webpackConfig)
const server = new WebPackDevServer(compiler, devServerOptions)
server.listen(port, '0.0.0.0', () => {
  /// Running in debugger mode,We used devtools for other webBrowser that whit Electron
  if (useDevTools) {
    if (!pkg.devDependencies['@vue/devtools']) {
      console.error('Can\'t found @vue/devtools in package.json,Maybe you need install it use `yarn add -D @vue/devtools` command that for debugger.')
    } else {
      shell.exec(`cross-env PORT=${devPort} node_modules/.bin/vue-devtools`, {async: true})
    }
  }
  assist.copyStaticAssets()
})
