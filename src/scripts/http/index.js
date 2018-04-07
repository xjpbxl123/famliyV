/**
 * Created by moersing on 11/9/2016.
 * @desc 预处理http请求
 */
let config = {
  _timeout: 5000,
  root: process.env.HTTP_ROOT
}
let assign = Object.assign
/**
 * @desc vue resource 预设处理，包括超时,预设参数,错误等
 * @desc vue resource HTTP
 * */
function HttpFetch (http) {
  if (http && http.interceptors) {
    http.interceptors.push(_errorHandle, _timeout, _setRequest)
  }
  http.options.root = config.root // root of http request
  let overWriteMethods = {get: http.get, post: http.post, put: http.put}
  ;['get'].forEach(value => {
    /// overwrite get method of http
    http[value] = (url, options) => {
      return overWriteMethods[value].call(
        http,
        url,
        assign(_defaultOptions(), options)
      )
    }
  })
  ;['post', 'put'].forEach(value => {
    /// overwrite post/put method of http
    http[value] = (url, body = {}, options) => {
      return overWriteMethods[value].call(
        http,
        url,
        body,
        assign(_defaultOptions(), options)
      )
    }
  })
}
/**
 * @desc  处理默认参数
 * */
function _defaultOptions () {
  return {
    headers: {}
  }
}

/**
 * @desc  超时处理
 * */
function _timeout (request, next) {
  let timeSeed
  let timeout = typeof request.timeout === 'number' ? request.timeout : config._timeout
  delete request.timeout

  timeSeed = setTimeout(() => {
    request.abort && request.abort()
    _timeoutHandle()
  }, timeout)
  next(function () {
    clearTimeout(timeSeed)
  })
}

/**
 * @desc  超时处理函数
 * */
function _timeoutHandle () {

}

/**
 *@desc 预设参数
 * */
function _setRequest (request, next) {
  if (request.method === 'GET') {
    request.params._ = Date.now() // prevent cache
  }
  request._timeout = config._timeout
  next()
}

/**
 * @desc 错误处理，可以根据code设置相应的处理方式
 * */
function _errorHandle (request, next) {
  next(function (response) {
    if (response.status === 500) {
      /// do something
    }
  })
}

export default HttpFetch
