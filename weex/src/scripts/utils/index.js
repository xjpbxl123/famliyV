/**
 * Create by Moersing on 2018/5/8
 */
import URL from 'url-parse'

/**
 * @desc 获取weex bundle 绝对路径
 * */
export const getBundleRoot = () => {
  let fileName = /(\w+).\w+$/
  let bundleUrl = weex.config.bundleUrl
  let url = new URL(bundleUrl)
  return url.origin + url.pathname.replace(fileName.exec(url.pathname)[0], '')
}
