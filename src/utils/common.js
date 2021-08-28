import bridge from "@/utils/bridge"
export default {
  judgePlatform() {
    if (navigator.userAgent.match(/MicroMessenger/i) !== null && navigator.userAgent.match(/iPhone/i) !== null) {
      return "iOS_WeChat"
    } else if (navigator.userAgent.match(/MicroMessenger/i) !== null && navigator.userAgent.match(/Android/i) !== null) {
      return "Android_WeChat"
    } else if (navigator.userAgent.match(/MacWechat/i) !== null) {
      return "Mac_WeChat"
    } else if (navigator.userAgent.match(/WindowsWechat/i) !== null) {
      return "Windows_Wechat"
    } else if (navigator.userAgent.match("Android") !== null && navigator.userAgent.match("uTruck2.0") !== null) {
      return "Android_U"
    } else if (navigator.userAgent.match(/iPhone/i) !== null && navigator.userAgent.match(/uTruck2.0/i) !== null) {
      return "iOS_U"
    } else {
      return "WEB_UNKNOW"
    }
  },

  isWechat() {
    console.log("navigatormessage", navigator.userAgent.match("TDH007"))
    console.log("navigatormessageaaaaaaa", window.location.href)
    if (navigator.userAgent.match("TDH007") !== null) {
      if (!sessionStorage.getItem("ishavekybfirstpage")) {
        sessionStorage.setItem("ishavekybfirstpage", window.location.href)
      }
      return true
    }
    let current = this.judgePlatform()
    if (current === "iOS_WeChat" || current === "Android_WeChat" || current === "Mac_WeChat" || current === "Windows_Wechat") {
      return true
    }
    return false
  },
  isApp() {
    let current = this.judgePlatform()
    if (current === "Android_U" || current === "iOS_U") {
      return true
    }
    return false
  },
  openWebView(url, offOn, openReset) {
    if (this.isApp()) {
      if (window.AndroidFunction !== undefined) {
        if (openReset) {
          window.AndroidFunction.openWebView(url, offOn, JSON.stringify(openReset))
        } else {
          window.AndroidFunction.openWebView(url, offOn)
        }
      } else {
        if (openReset) {
          bridge.Core.callNativeHandler("openWebView", [url, offOn, openReset])
        } else {
          bridge.Core.callNativeHandler("openWebView", [url, offOn])
        }
      }
    }
  }
}
