'use strict'
const merge = require('lodash.merge')
const buildPlugins = require('./configs/plugin')()

const CleanWebpackPlugin = require('clean-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const publicPath = isProd ? './' : 'dist/'

const loaders = {}
const plugins = []

if (isProd) {
  plugins.push(new CleanWebpackPlugin(['dist']))
}

const config = {
  framework: 'weex',
  port: 9089,
  buildPath: 'dist',
  publicPath,
  alias: {
    '@': 'src',
    '@views': 'src/views',
    '@components': 'src/components'
  },
  loaders,
  plugins,
  done () {}
}

module.exports = merge(buildPlugins, config)
