/**
 * Create by .
 * User: litong
 * Date: 2018/9/6
 * Time: 13:50
 */
// 将Date类型格式化
export default {
  formatDateWithDate (date, fmt) {
    let obj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var key in obj) {
      if (new RegExp('(' + key + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)))
      }
    }
    return fmt
  },
  // 将date字符串格式化
  formatDateWithDateStr (dateStr, fmt) {
    let date = new Date(dateStr)
    let obj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var key in obj) {
      if (new RegExp('(' + key + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)))
      }
    }
    return fmt
  },

  /**
   * 动态加载JS
   * @param {string} url 脚本地址
   * @param {function} callback  回调函数
   */
  dynamicLoadJs (url, callback) {
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    if (typeof (callback) === 'function') {
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          callback()
          script.onload = script.onreadystatechange = null
        }
      }
    }
    head.appendChild(script)
  },
  sysIsIOS () {
    let reg = [
      /(Android).*/i,
      /(iPhone|iPad|iPod|iOS).*/i,
      /(windows(.*|\s*)phone).*/i
    ]
    return reg[1].test((navigator.userAgent).toLowerCase())
  }
}
