/**
 * Create by Moersing on 2018/5/8
 */
/**
 * @desc 获取weex 域名
 * */
export const getBundleRoot = () => {
  let reg = /^http(s)?:\/\/(.*?)\//
  console.log(weex)
  return reg.exec(weex.config.bundleUrl)[0] + process.env.WEEX_ROOT
}
