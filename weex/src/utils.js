import Fly from 'flyio/dist/npm/weex'
export const setViewport = (width = 750) => {
  if (weex.config.env.platform === 'Web') {
    return
  }
  const meta = weex.requireModule('meta')
  meta.setViewport({
    width
  })
}
export const setParams = () => {
  if (weex.config.env.platform !== 'Web') {
    return
  }
  location.search.slice(1).split('&').map(kv => {
    let ks = kv.split('=')
    return {
      k: ks[0],
      v: ks[1]
    }
  }).forEach(kv => {
    weex.config[kv.k] = encodeURIComponent(kv.v)
  })
}

const initViewport = vpObj => {
  setParams()
  setViewport(vpObj)
  Vue.prototype.$http = new Fly()
}

const initWidth = (width = 750) => {
  initViewport({ width })
}

export {
  initWidth,
  initViewport
}
