'use strict'

let volumeManager = {
  isOpenWeex: Boolean,
  cbs: Array // 回调存储
}
volumeManager.setup = function () {
  console.log('volumeManager.setup()完成')
  volumeManager.isOpenWeex = false
  volumeManager.cbs = []
  window.fp.modules.global.listenVolumeOrMuteDidChange()
  window.fp.modules.notification.regist('VolumeChange', function (data) {
    console.log(volumeManager.isOpenWeex, '调音台是否打开')
    if (volumeManager.isOpenWeex) {
      window.fp.modules.page.sendMsgToWeex({
        method: 'setVolumeData',
        params: {volumeData: data}
      })
    }
    for (let fn in volumeManager.cbs) {
      volumeManager.cbs[fn](data)
    }
  })
}
// // 打开调音台
volumeManager.openSoundMix = function (info, fn) {
  window.fp.modules.volume.getAllVolumeSize().then(function (data1) {
    let weexUrl = info.weexUrl
    let pianoType = info.pianoType
    if ((weexUrl === undefined) || (pianoType === undefined)) {
      console.warn('openSoundMix 参数错误' + info)
      return
    }
    // 发送位置信息给调音台
    window.fp.modules.global.getKeyboardPosition().then(function (data) {
      if (data) {
        let location = [data[50].centerX, data[57].centerX, data[62].centerX, data[69].centerX]
        window.fp.modules.page.openWeexViewController(weexUrl, {
          volumeValue: data1,
          location: location,
          pianoType: pianoType // real 真钢 electric 电钢
        }).then(function (res) { // weex 创建成功回调
          volumeManager.isOpenWeex = true
          volumeManager.registWeexNotif()
        })
      }
    })
  })
}
// 注册音量变化监听
volumeManager.registVolumeChange = function (fn) {
  if (volumeManager.cbs.indexOf(fn) === -1) {
    volumeManager.cbs.push(fn)
    return true
  }
  console.warn('findVolume-registVolumeChange 存在相同的function,请检查代码')
  return false
}
// 移除音量变化监听
volumeManager.removeVolumeChange = function (fn) {
  let index = volumeManager.cbs.indexOf(fn)
  if (index !== -1) {
    volumeManager.cbs.pop(index)
  }
}

/// 注册weex监听
volumeManager.registWeexNotif = function () {
  window.fp.modules.notification.regist('receiveMsgFromWeex', function (data1) {
    console.log(data1)
    let data = data1.params
    if (data.close) {
      volumeManager.isOpenWeex = false
      return
    }
    switch (data.name) {
      case 'setMute':
        window.fp.modules.volume.volumeMute(data.type, data.value)
        break
      case 'volumeSet':
        if (data.type === 'resetAll') {
          // 重置 直接调用这个
          return window.fp.modules.volume.resetVolume()
        }
        window.fp.modules.volume.volumeSet(data.type, data.value, false).then(function (data) {
        })
        break
    }
  })
}

volumeManager.setup()

let utils = {}
utils.volumeManager = volumeManager
if (window.fp) {
  window.fp.utils = utils
} else {
  console.warn('没有window.fp，请在Find Hybrid环境运行')
}
