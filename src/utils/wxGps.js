/*
 * @Author: zhangjing
 * @Date: 2020-07-08 15:46:13
 * @Description:
 * @FilePath: \gas-h5\src\utils\wxGps.js
 */
import wx from "weixin-js-sdk"
import AMap from "AMap"
import API from "@/api/putOilGas"
import { Dialog } from "vant"
import Vue from "vue"
Vue.use(Dialog)
export default {
  getLocation(callback) {
    // 获取经纬度
    wx.getLocation({
      type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function(res) {
        callback(res)
      },
      // 用户拒绝定位调用
      cancel: function() {
        alert("无法获取您的城市信息,请允许获取您的位置信息!")
        // if (typeof callback === "function") {
        //   callback("cancel")
        // }
      },
      fail: function(res) {
        alert("获取位置信息失败" + JSON.stringify(res) + "fail")
      }
      // 无论成功失败都使用
      // complete: function () {
      //   if (typeof (callback) === 'function') {
      //     callback(tude)
      //   }
      // }
    })
  },
  /**
   * @description: 微信签名
   */
  getConfig(callback) {
    let url = location.href.split("#")[0]
    API.getConfig(url).then(res => {
      let data = res
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.body.appId, // 必填，公众号的唯一标识
        timestamp: data.body.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.body.nonceStr, // 必填，生成签名的随机串
        signature: data.body.signature, // 必填，签名，见附录1
        jsApiList: ["checkJsApi", "getLocation", "openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录
      })
      wx.ready(function() {
        console.log("ready")
        callback()
      })
    })
  },
  /**
   * @description: 获取当前经纬度
   * @param {function} 函数
   */
  getLotion(callback) {
    new AMap.Map("container", {
      //地图初始化
      resizeEnable: true,
      zoom: 16
    })
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000 //超过10秒后停止定位，默认：5s
      })
      geolocation.getCurrentPosition((status, result) => {
        console.log(status)
        console.log(result)
        if (status === "complete") {
          if (typeof callback === "function") {
            console.log("mapreslut", result)
            callback(result.position, result.formattedAddress)
          }
        } else {
          Dialog.alert({
            message: `${result.message}`
          })
          console.log(result.message)
        }
      })
    })
  },
  getAddress(lnglat, callback) {
    let geocoder = new AMap.Geocoder({
      radius: 1000 //范围，默认：500
    })
    new AMap.Map("container", {
      //地图初始化
      resizeEnable: true,
      zoom: 16
    })
    geocoder.getAddress(lnglat, function(status, result) {
      if (status === "complete" && result.regeocode) {
        callback(result.regeocode.formattedAddress)
      } else {
        Dialog.alert({
          message: `根据经纬度查询地址失败`
        })
        // log.error('根据经纬度查询地址失败')
      }
    })
  },
  getLngLat(address, callback) {
    let geocoder = new AMap.Geocoder({
      radius: 1000 //范围，默认：500
    })
    geocoder.getLocation(address, function(status, result) {
      if (status === "complete" && result.geocodes.length) {
        var lnglat = result.geocodes[0].location
        callback(lnglat)
      } else {
        log.error("根据地址查询位置失败")
      }
    })
  },
  getCityCode() {
    let map = new AMap.Map("container", {
      resizeEnable: true
    })
    return map.getAdcode()
  },
  getcitylnglat(address, callback) {
    var geocoder = new AMap.Geocoder()
    geocoder.getLocation(address, function(status, result) {
      if (status === "complete" && result.geocodes.length) {
        callback(result.geocodes[0].location)
      } else {
        log.error("根据地址查询位置失败")
      }
    })
  }
}
