/**
 * Create by Moersing on 2018/5/10
 */
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const WebPackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackBase = require('./webpack.config')
const config = require('./config')
const assist = require('./assist')
/// Determine Ip and Port
const ip = require('ip').address()
const NODE_ENV = process.env.NODE_ENV
const envConfig = require('./env')()
const env = envConfig.env[NODE_ENV] || envConfig.env
const port = env.PORT || '8080'
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
  ]
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
server.listen(port, '0.0.0.0', assist.copyStaticAssets())
