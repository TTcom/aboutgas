import wx from "weixin-js-sdk"
import command from "./common"
export const mapNavigation = function(beginmsg, endmsg) {
  if (command.isWechat()) {
    //如果是微信端
    wx.openLocation({
      latitude: parseFloat(endmsg.lat), // 纬度，浮点数，范围为90 ~ -90
      longitude: parseFloat(endmsg.lng), // 经度，浮点数，范围为180 ~ -180。
      name: endmsg.stationName, // 位置名
      address: endmsg.address, // 地址详情说明
      scale: 10 // 地图缩放级别,整形值,范围从1~28。默认为最大
    })
    // wx.checkJsApi({
    //   jsApiList: ["openLocation"],
    //   success: function(res) {
    //     console.log(JSON.stringify(res))

    //   }
    // })
  } else {
    let args = {
      // 坐标点
      points: [
        {
          routeType: 0,
          name: beginmsg.formattedAddress,
          latitude: parseFloat(beginmsg.lat),
          longitude: parseFloat(beginmsg.lng)
        },
        {
          routeType: 1,
          name: endmsg.address,
          latitude: parseFloat(endmsg.lat),
          longitude: parseFloat(endmsg.lng)
        }
      ],
      // 车辆信息
      vehicleInfo: {
        plateNo: "京N66Y66", // 车牌号
        type: 0, // 0:小车; 1:货车; 2:纯电动车; 3:纯电动货车. 默认0(小车).
        size: 4, // 1:微型货车; 2:轻型/小型货车; 3:中型货车; 4:重型货车
        height: 3.9, // 货车的高度,范围:(0,10],单位：米
        length: 15, // 货车的长度,范围:(0,25],单位：米
        weight: 50, // 货车的总重量,范围:(0,100],单位：吨.
        width: 3, // 货车的宽度,范围:(0,5],单位：米
        load: 45, // 货车的核定载重,范围:(0,100],单位：吨. 注意:核定载重应小于总重量
        axisNums: 6 // 货车的轴数（用来计算过路费及限重）
      },
      otherInfo: {
        strategy: 10 // 策略，默认10
      }
    }
    window.tdh007.invokeNative("onNaviMap", JSON.stringify(args))
  }
}
