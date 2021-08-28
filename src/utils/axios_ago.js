import axios from "axios"
import { Toast } from "vant"
import common from "@/utils/common"
import bridge from "@/utils/bridge"
//import qs from "qs"

export const doPost = (url, data, target) => {
  axios.defaults.withCredentials = true
  if (data) {
    data = {
      sign: "",
      body: data,
      productCode: "UTRUCK",
      appCode: "",
      version: "1.0.0"
    }
  }
  const instance = axios.create()
  const config = {
    url,
    data: data ? data : "",
    method: "post"
  }

  if (undefined !== target && target.loading !== undefined) {
    target.loading = true
  }
  //请求前的时候会执行此方法-拦截器
  instance.interceptors.request.use(
    config => {
      //config当前请求的配置
      config.headers[config.method]["X-Requested-With"] = "XMLHttpRequest"
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
  //设置响应拦截器
  instance.interceptors.response.use(
    res => {
      let serverData = res.data
      if (!serverData.success) {
        Toast.fail(serverData.message)
      }
      if (undefined !== target && target.loading !== undefined) {
        target.loading = false
      }
      if (serverData === null) {
        alert("未知的服务器返回")
      }
      if (serverData.code === "AA-403") {
        if (common.isApp()) {
          if (window.AndroidFunction !== undefined) {
            window.AndroidFunction.onLoginOut()
          } else {
            bridge.Core.callNativeHandler("onLoginOut")
          }
        }
      } else if ((serverData.code && serverData.code !== "200") || (!serverData.success && !serverData.code)) {
        let messagetest = serverData.message || "网络较弱，请稍后再试"
        Toast.fail(messagetest)
      }
      return serverData
    },
    err => {
      console.log(err.error)
      console.log(typeof err)
    }
  )
  return instance(config)
}

export const doGet = url => {
  const instance = axios.create()
  const config = {
    url,
    method: "get"
  }
  //请求前的时候会执行此方法-拦截器
  instance.interceptors.request.use(
    config => {
      //config当前请求的配置
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
  //设置响应拦截器
  instance.interceptors.response.use(res => {
    if (!res.data.success) {
      Toast.fail(res.data.message)
    }
    return res.data
  })
  return instance(config)
}
