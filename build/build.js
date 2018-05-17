/**
 * Create by Moersing on 2018/5/10
 */
const args = require('yargs').argv
const shell = require('shelljs')
const path = require('path')
const webpack = require('webpack')
const Progress = require('webpack/lib/ProgressPlugin')
const config = require('./config')
const assist = require('assist')
let webpackProd = require('./webpack.prod.config')
const weexWebpack = require('../weex/node_modules/webpack')
let weexBuild = require('../weex/webpack.config')
const stateConfig = {
  colors: true,
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false
}
/// Building web
const buildWeb = () => {
  const compiler = webpack(webpackProd)
  compiler.apply(new Progress())
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err)
        console.error(err.details)
        return reject(reject)
      }
      console.log(stats.toString(stateConfig) + '\n\n')
      resolve(null)
    })
  })
}
/// Building weex
const buildWeex = () => {
  weexBuild = weexBuild({NODE_ENV: process.env.WEEX_ENV || process.env.NODE_ENV})[0]
  weexBuild.context = path.resolve(process.cwd(), 'weex')
  weexBuild.output = {
    path: path.resolve(process.cwd(), 'dist/weex'),
    filename: '[name].js'
  }
  const weexCompiler = weexWebpack(weexBuild)
  weexCompiler.apply(new Progress())
  return new Promise((resolve, reject) => {
    weexCompiler.run((err, stats) => {
      if (err) {
        console.error(err)
        console.error(err.details)
        return reject(err)
      }
      console.log(stats.toString(stateConfig) + '\n\n')
      resolve(null)
    })
  })
}
/// build:fuller command will be building fully all of modules(web and weex)
/// build:weex  will be building weex modules
/// build command will be building web modules
switch (true) {
  case args.fuller:
    shell.rm('-rf', config.assertRoot)
    buildWeb().then(assist.copyStaticAssets)
    buildWeex()
    return
  case args.weex:
    shell.rm('-rf', path.resolve(config.assertRoot, config.weexAssertPath))
    return buildWeex()
  default:
    shell.rm('-rf', config.assertRoot)
    return buildWeb().then(assist.copyStaticAssets)
}
