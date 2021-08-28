import axios from "axios"
import command from "@/utils/common"
import { Toast } from "vant"
import bridge from "@/utils/bridge"
Toast.setDefaultOptions({ duration: 1500 })
/**
 * 2020-06-22 14:26:39 - AZ
 * 因为接了统一SSO请求，所以业务系统并发多个链接的时候会产生多个403，可能会发起重复SSO授权请求
 * 为了保证只有1个SSO，这里增加一个判断值是否正在SSO请求，另一个阻塞队列保存需要重发的请求
 */
var isSSOLogin = false
//  var repeatRequestQueue = [];
// 处理AA-403跳转SSO问题
var HandleSSO = function(response) {
  //  repeatRequestQueue.push(response)
  if (isSSOLogin) {
    return
  }
  isSSOLogin = true
  return new Promise((resolve, reject) => {
    if (response.data.code === "AA-403" && response.data.body.indexOf("sso") !== -1) {
      // const href = window.location.protocol + "//" + window.location.host + "/gas/page/page_redirect?date=" + new Date().getTime() + "&pageurl=" + encodeURI(window.location.href)
      if (command.isWechat()) {
        // window.location.href = href
        return
      }
      // window.location.href = href
      return
    }
    reject(response)
    isSSOLogin = false
  })
}

var LOGOUT = function() {
  if (command.isApp()) {
    if (window.AndroidFunction !== undefined) {
      window.AndroidFunction.onLoginOut()
    } else {
      bridge.Core.callNativeHandler("onLoginOut")
    }
  }
}

axios.defaults.withCredentials = true
let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken
let removePending = config => {
  if (pending.length > 0) {
    for (let p in pending) {
      if (pending[p].u === config.url + "&" + config.method) {
        // 当当前请求在数组中存在时执行函数体
        pending[p].f() // 执行取消操作
        pending.splice(p, 1) // 把这条记录从数组中移除
      }
    }
  }
}

axios.interceptors.request.use(config => {
  removePending(config) // 在一个ajax发送前执行一下取消操作
  config.cancelToken = new CancelToken(c => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({
      u: config.url + "&" + config.method,
      f: c
    })
  })
  if (navigator.userAgent.match("TDH007") !== null) {
    let getkbytoken = sessionStorage.getItem("KBYToken")
    console.log("getkbytoken", getkbytoken)
    if (getkbytoken) {
      config.headers["NIRVANA-TOKEN"] = `${getkbytoken}`
    }
  } else {
    // if (window.location.href.split("?")[1]) {
    //   let token = ""
    //   token = window.location.href.split("?")[1].split("=")[1]
    //   console.log("tokenheaders", token)
    //   if (token) {
    //     config.headers["NIRVANA-TOKEN"] = `${token}`
    //   }
    // }
  }

  config.headers[config.method]["X-Requested-With"] = "XMLHttpRequest"
  return config
})
axios.interceptors.response.use(
  response => {
    removePending(response.config)
    var serverData = response.data
    if (!serverData.success) {
      Toast.fail(serverData.message)
    }
    if (serverData === null) {
      alert("未知的服务器返回")
      return Promise.reject(response)
    }
    if (serverData.code === "200") {
      return Promise.resolve(serverData)
    } else if (serverData.code === "AA-403") {
      // 跳SSO，然后回来再发送请求
      return Promise.resolve(
        HandleSSO(response)
          .then(
            () => {},
            () => {
              LOGOUT()
            }
          )
          .catch(err => {
            console.log(err)
          })
      )
    } else if (serverData.code === "103") {
      return Promise.reject(response)
    } else if (serverData.code === "501") {
      return response
    } else if ((serverData.code && serverData.code !== "200") || (!serverData.success && !serverData.code)) {
      let messagetest = serverData.message || "网络较弱，请稍后再试"
      Toast.fail(messagetest)
      return Promise.resolve(response.data)
    }
    return response
  },
  error => {
    if (error.response && error.response.data.code === "AA-403") {
      // 跳SSO，然后回来再发送请求
      let result = HandleSSO(error.response)
      if (result) {
        return result
          .then(
            () => {},
            () => {
              // LOGOUT()
            }
          )
          .catch(err => {
            console.log(err)
          })
      }
    }
    return Promise.reject(error)
  }
)

export const doPost = (url, data, target) => {
  if (target && target.loading !== undefined) target.loading = true
  let postData = ""
  if (data) {
    postData = {
      sign: "",
      body: data,
      productCode: "UTRUCK",
      appCode: command.judgePlatform(),
      version: "1.0.0"
    }
  } else {
    postData = data
  }

  return axios.post(url, postData, target).finally(() => {
    if (target && target.loading !== undefined) target.loading = false
  })
}
export const doGet = (url, target) => {
  if (target && target.loading !== undefined) target.loading = true
  return axios.get(url).finally(() => {
    if (target && target.loading !== undefined) target.loading = false
  })
}
