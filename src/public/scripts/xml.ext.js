window.scrollDiv = ''
window.pageSize = {}

function curScoreDiv () {
  return document.querySelector('#' + window.scrollDiv)
}

function compatPageXOffset () {
  if (window.scrollDiv == '') {
    return window.pageXOffset
  } else {
    return curScoreDiv().scrollLeft
  }
}

function compatPageYOffset () {
  if (window.scrollDiv == '') {
    return window.pageYOffset
  } else {
    return curScoreDiv().scrollTop
  }
}
function compatScrollTo (x, y) {
  if (window.scrollDiv == '') {
    window.scrollTo(x, y)
  } else {
    curScoreDiv().scrollTo(x, y)
  }
}

function restoreParams () {
  window.progressBarElem = null
}

function getElementById (id) {
  if (window.scrollDiv != '') {
    return document.querySelector('#' + window.scrollDiv + ' #' + id)
  } else {
    return document.getElementById(id)
  }
}

function isSupportProgress () {
  var svg = document.querySelector('#svgcontainer')
  var targetElement = svg.parentElement.parentElement
  return (svg != undefined && targetElement.tagName.toLowerCase() == 'div' &&
    targetElement.clientWidth <= 1920)
}

// 支持非全屏区域定位自动滚动
function supportNotFullAreaProgress (mm) {
  if (isSupportProgress()) {
    for (var i = page_pos.length - 2; i > 0; i--) {
      var pp = page_pos[i]
      if (mm >= pp.m) {
        if (currentPage() == i) {
          break
        } else {
          if (mm <= page_pos[page_pos.length - 2].m) {
            window.compatScrollTo(pp.x, pp.y)
          }
        }
        // if (currentPage() == i) {
        //     break;
        // } else if (currentPage() < i) {
        //     turnPage(1)
        // } else {
        //     turnPage(-1)
        // }
        break
      }
    }
  }
}

function turnPageExt () {
  if (isSupportProgress()) {
    var pp = page_pos[currentPage()]
    if (pp.m != undefined) {
      showProgressLineMm(pp.m, 0, 0)
    }
  }
}
