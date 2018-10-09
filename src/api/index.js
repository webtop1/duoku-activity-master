import Axios from 'axios'
import Util from '@/util'

const timeout = 10000 // 10秒超时
const axios = Axios.create({timeout})

// 封装GET请求
function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then((resp) => {
        if (+resp.data.code === 0) resolve(resp.data.data)
        else if (+resp.data.code === 10001) window.location = resp.data.data.referer
        else reject(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 封装POST请求
/* eslint-disable */
function post (url, params) {
  return new Promise ((resolve, reject) => {
    axios.post (url, params)
      .then ((resp) => {
        if (+resp.data.code === 0) resolve (resp.data.data)
        else if (+resp.data.code === 10001) window.location = resp.data.data.referer
        else reject (resp.data)
      })
      .catch ((err) => {
        reject (err)
      })
  })
}

// 用户权限通过切面拦截器处理
axios.interceptors.response.use (
  response => {
    if (response.status === 200 && response.data) {
      let res = response.data
      if (res.code > 0) {
        return response
      }
      // 正确返回：1002 用户已登录 错误返回：'-4001' => '活动未开始' '-4005' => '活动已过期' '-1003' => '用户未登录'
      var isLoginUrl = response.request.responseURL.indexOf ('activity/worldCup/getUserInfo')
      if (isLoginUrl > 0) {
        return response
      }
      switch (res.data.code) {
        case '-1003':
          login ()
          return response
        default:
          return response
      }
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          login.toLogin ()
          break
        case 500:
          return Promise.reject ('服务无响应，请重试')
      }
      return Promise.reject (error.response.data)
    } else {
      // console.log(error)
      return Promise.reject ('网络错误，请稍候再试')
    }
  })

function login () {
  // 是否在自有SDK中
  if (typeof BaiDuMobileGameJsBridge === 'object') {
  } else if (typeof (appclient) === 'object') {
    // 手机百度助手浏览器中，会在window上挂载变量appclient
    Util.dynamicLoadJs ('http://img.m.baidu.com/cimages/img/promo/page/sdk/sdk.js', function (rs) {
      window.AS.ready (function () {
        try {
          window.AS.account.toLogin (function () {
            window._hmt.push (['_trackEvent', '点击分类', '点击', '登录成功'])
            window.location.href = '/activity/guoq/index#/'
          }, function (error) {
            self.msg = error.toString ()
            window.location.href = '/activity/guoq/index#/'
          })
        } catch (e) {
          self.msg = e.toString ()
          window.location.href = '/activity/guoq/index#/'
        }
      })
    })
  } else {
    console.log('不支持的访问方式')
  }
}

/* eslint-disable */
// 请求汇总
/* 首页 */

// 获取用户信息
export function getUserInfo () {
  const url = '/activity/api/getUserInfo'
  return get (url)
}

// 抽奖
export function doLlottery (params) {
  const url = '/activity/api/updateUserInfo'
  return post(url, params)
}
