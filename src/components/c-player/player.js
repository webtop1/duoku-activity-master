/**
 * Create by .
 * User: liutinghai
 * Date: 2018/9/28
 * Time: 14:13
 */
var VideoPlayer = function (params) {
  var setting = {
    el: null,
    url: null,
    volume: 1,
    autoplay: false,
    loop: false,
    mute: false
  }

  setting = Object.assign(setting, params)

  this._dom = document.getElementById(params.el)
  this._video = this._dom.getElementsByTagName('video')[0]

  if (setting.url) this._video.src = setting.url
  if (setting.volume !== 1) this._video.volume = setting.volume
  if (setting.autoplay) this._video.autoplay = setting.autoplay
  if (setting.loop) this._video.loop = setting.loop
  if (setting.mute) this._video.mute = setting.mute

  this._skin = new Skin(this._dom, this._video)
  this._skin.init()
}

function hasClass (elem, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0) return false // 当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

function addClass (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
  }
}

function removeClass (elem, cls) {
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}

var Skin = function (_dom, _video) {
  var scope = this

  this._onState = null
  this._onMute = false

  // 视频div层
  this._dom = _dom
  // 视频对象
  this._video = _video

  // 提示层
  this._playerTips = null
  this._playing = null
  this._waiting = null
  this._replaying = null

  // 控制层
  this._playerControls = null
  this._switchBtn = null
  this._timeCurrent = null
  this._timeDuration = null
  this._processBar = null
  this._processBuffer = null
  this._processLine = null
  this._muteBtn = null

  this.init = function () {
    this._dom.addEventListener('mouseover', function (event) {
      scope._playerControls.style.display = 'block'
    })

    this._dom.addEventListener('mouseout', function (event) {
      if (scope._onState === null || scope._onState === 'pause' || scope._onState === 'ended') {

      } else {
        scope._playerControls.style.display = 'none'
      }
    })

    this._playerTips = this._dom.getElementsByClassName('player-tips')[0]
    this._playerTips.addEventListener('click', function (e) {
      e.stopPropagation() // 不再派发事件
      if (scope._onState === 'ended') {
        scope.toPlay()
        scope._replaying.style.display = 'none'
      } else {
        scope.togglePlay()
      }
    })
    this._playing = this._dom.getElementsByClassName('playing')[0]
    this._waiting = this._dom.getElementsByClassName('waiting')[0]
    this._replaying = this._dom.getElementsByClassName('replaying')[0]
    this._playerControls = this._dom.getElementsByClassName('player-controls')[0]
    this._switchBtn = this._dom.getElementsByClassName('switch')[0]
    this._switchBtn.addEventListener('click', function (e) {
      e.stopPropagation() // 不再派发事件
      if (scope._onState === 'ended') {
        scope.toPlay()
        scope._replaying.style.display = 'none'
      } else {
        scope.togglePlay()
      }
    })
    this._timeCurrent = this._dom.getElementsByClassName('time-current')[0].innerText = formatTime(0)
    this._timeDuration = this._dom.getElementsByClassName('time-duration')[0].innerText = formatTime(0)
    this._processBar = this._dom.getElementsByClassName('process-bar')[0]
    this._processBar.addEventListener('click', function (e) {
      let offsetX = e.offsetX
      let barWidth = document.getElementById(e.currentTarget.id).width()
      let n = (offsetX / barWidth)
      let d = _video.duration
      let ct = n * d
      console.log(offsetX, barWidth, n, ct, d)
      scope.seek(ct)
    })
    this._processBuffer = this._dom.getElementsByClassName('process-buffer')[0]
    this._processLine = this._dom.getElementsByClassName('process-line')[0]
    // 静音按钮
    this._muteBtn = this._dom.getElementsByClassName('mute')[0]
    this._muteBtn.addEventListener('click', function (e) {
      e.stopPropagation()
      scope.onMute = !scope.onMute
    })

    addVideoEvents(_video)
  }

  function addVideoEvents (_v) {
    // 当音频/视频处于加载过程中时，会依次发生以下事件：
    _v.addEventListener('loadstart', function () { // 客户端开始请求数据
      console.log('1、loadstart、客户端开始请求数据')
    }, false)
    _v.addEventListener('durationchange', function () { // 资源长度改变
      console.log('2、durationchange、资源长度改变')
      scope._timeDuration = formatTime(_v.duration)
    }, false)
    _v.addEventListener('loadedmetadata', function () {
      console.log('3、loadedmetadata、')
    }, false)
    _v.addEventListener('loadeddata', function () {
      console.log('4、loadeddata、')
    }, false)
    _v.addEventListener('progress', function () {
      var log = '5、progress、'
      if (_v.readyState === 4) {
        var n = Math.round(_v.buffered.end(0) / _v.duration * 100)
        log += '正在缓冲：' + n + '%'
        scope.setProcess(n)
      }
      console.log(log)
    }, false)
    _v.addEventListener('canplay', function () {
      console.log('6、canplay、缓冲已足够开始时。-----每次卡住，再缓冲成功都会调用此方法')
      scope.hideWaiting()
      scope._playing.style.display = 'none'
    }, false)
    _v.addEventListener('canplaythrough', function () { // 可以播放，歌曲全部加载完毕
      console.log('7、canplaythrough、')
    }, false)

    _v.addEventListener('waiting', function () {
      console.log('waiting,当媒介已停止播放但打算继续播放时（比如当媒介暂停已缓冲更多数据）运行脚本')
      scope.onState = 'waiting'
    }, false)
    _v.addEventListener('play', function () {
      console.log('play,当媒介已就绪可以开始播放时运行的脚本。')
    }, false)
    _v.addEventListener('playing', function () {
      console.log('playing,当媒介已开始播放时运行的脚本。-----加载提示影藏')
      scope.onState = 'playing'
    }, false)
    _v.addEventListener('pause', function () {
      console.log('pause,当媒介被用户或程序暂停时运行的脚本。-----视频播放结束也会调用此方法')
      scope.onState = 'pause'
    }, false)
    _v.addEventListener('ended', function () {
      console.log('ended,当媒介已到达结尾（可发送类似“感谢观看”之类的消息）。')
      scope.onState = 'ended'
      scope.seek(0)
    }, false)

    _v.addEventListener('suspend', function () {
    }, false) // 延迟下载
    _v.addEventListener('abort', function () {
    }, false) // 客户端主动终止下载（不是因为错误引起）
    _v.addEventListener('stalled', function () {
    }, false) // 网速失速
    _v.addEventListener('seeking', function () {
    }, false)
    _v.addEventListener('seeked', function () {
    }, false)

    _v.addEventListener('ratechange', function () {
    }, false) // 播放速率改变
    _v.addEventListener('volumechange', function () {
    }, false) // 音量改变
    _v.addEventListener('timeupdate', function () {
      scope.updateBar()
    }, false)

    _v.addEventListener('error', videoError, false)
  }

  function videoError () {
    var err = {}
    err.code = scope._video.error.code
    err.error = ''
    switch (err.code) {
      case 1:
        err.error = '播放过程中用户终止'
        break
      case 2:
        err.error = '播放过程中网络错误'
        break
      case 3:
        err.error = '播放过程中解码错误'
        break
      case 4:
        err.error = '播放过程中URL无效'
    }
    console.log(JSON.stringify(err))
    scope.showWarning()
  }
}
Skin.prototype = {
  set onMute (value) {
    this._onMute = value

    if (value) { this._video.muted = true } else { this._video.muted = false }

    this._muteBtn.toggleClass('mute-off mute-on')
  },
  get onMute () {
    return this._onMute
  },
  set onState (value) {
    this._onState = value

    if (value === 'waiting') {
      this.showWaiting()
    } else if (value === 'playing') {
      removeClass(this._switchBtn, 'play pause')
      addClass(this._switchBtn, 'pause')
    } else if (value === 'pause') {
      removeClass(this._switchBtn, 'play pause')
      addClass(this._switchBtn, 'play')
    } else if (value === 'ended') {
      this.showEnded()
      this._playerControls.style.display = 'block'
    }
  },
  showPause: function () {
  },
  hidePause: function () {
  },
  showProcessBar: function () {
  },
  hideProcessBar: function () {
  },
  updateBar: function () {
    let length = parseInt(this._video.duration)
    let ct = parseInt(this._video.currentTime)
    let n = ct / length * 100
    this._processLine.style.width = n + '%'
    this._timeCurrent = formatTime(ct)
  },
  setProcess: function (n) {
    this._processBuffer.style.width = n + '%'
  },
  seek: function (e) {
    this._video.currentTime = e
  },
  toPlay: function () {
    this._video.play()

    this._playing.style.display = 'none'
  },
  toPause: function () {
    this._video.pause()

    this._playing.style.display = 'block'
  },
  showWaiting: function () {
    this._waiting.style.display = 'block'
  },
  hideWaiting: function () {
    this._waiting.style.display = 'none'
  },
  showWarning: function () {

  },
  togglePlay: function () {
    if (this._video.paused) {
      this.toPlay()
    } else {
      this.toPause()
      // 如果当前在加载则影藏加载，显示出播放按钮
      this.hideWaiting()
    }
  },
  showEnded: function () {
    this._replaying.style.display = 'block'
  }
}

// 小于10前面加0
var t = function (num) {
  if (num < 10) {
    return '0' + num.toString()
  }
  return num
}

// 秒转换成时分秒
var formatTime = function (time) {
  let hours = ''
  let minutes = ''
  let seconds = ''
  if (time > 0) {
    seconds = t(parseInt(time % 60))
    if (time >= 60) {
      minutes = t(parseInt(time / 60 % 60)) + ':'
      if (time >= 3600) {
        hours = t(parseInt(time / 3600 % 24)) + ':'
      }
    } else {
      minutes = '00:'
    }
  } else {
    seconds = '00:00'
  }
  return hours + minutes + seconds
}

export default VideoPlayer
