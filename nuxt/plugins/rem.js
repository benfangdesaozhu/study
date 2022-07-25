/**
 * 在移动端自适应
 * */
(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize' // 判断是否支持横竖屏
  let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (clientWidth > 750) {
      docEl.style.fontSize = 32 + 'px'
    } else {
      docEl.style.fontSize = 32 * (clientWidth / 750) + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
