/**
 * Create by Moersing on 2018/5/10
 */
const path = require('path')
module.exports = {
  assertRoot: path.resolve(__dirname, '../dist'),
  assertPath: 'static',
  /// saving weex js files
  weexAssertPath: 'weex',
  publicPath: '../../'
}
