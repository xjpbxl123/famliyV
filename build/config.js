/**
 * Create by Moersing on 2018/5/10
 */
const path = require('path')
module.exports = {
  assertRoot: path.resolve(__dirname, '../dist'),
  assertPath: 'static',
  /// static assert path such as src/public
  staticAssert: path.resolve(__dirname, '../src/public'),
  /// saving weex js files
  weexAssertPath: 'weex',
  publicPath: '../../'
}
