import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/css/index.scss"
import "./assets/css/aboutVant.scss"
import "./assets/css/transition.scss"
import "./assets/font/font.css"
import "lib-flexible/flexible"
import "@/utils/vant_compoent.js"
//import "./mock"
Vue.prototype.$backKybPge = function() {
  console.log(window.tdh007)
  window.tdh007.invokeNative("goBack")
}
//获取存入原生的快运吧token
if (navigator.userAgent.match("TDH007") !== null) {
  try {
    if (window.AndroidFunction !== undefined) {
      let token = window.AndroidFunction["getAttribute"]("NIRVANA-TOKEN")
      console.log("Androidtoken", token)
      sessionStorage.setItem("KBYToken", token)
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      window.tdh007.invokeNative("getAttributeList", ["NIRVANA-TOKEN"], params => {
        let token = params["NIRVANA-TOKEN"]
        console.log("KbyTokenparams", token)
        sessionStorage.setItem("KBYToken", token)
      })
    }
  } catch (error) {
    console.log("快运吧获取token异常", error)
  }
}
import Vconsole from "vconsole"
import VueLazyload from "vue-lazyload"
// 解决老版ios 的刷新问题，原因是下面的组件有base格式，老版不兼容
const titles = require("vue-wechat-title")
  .toString()
  .replace("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "/favicon.ico")

function evil(fn) {
  var Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn("return " + fn)()
}
Vue.use(evil(titles))
Vue.use(VueLazyload)
let vConsole = new Vconsole()
Vue.use(vConsole)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
