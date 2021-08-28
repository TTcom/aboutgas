/*
 * @Author: zhangjing
 * @Date: 2020-07-08 15:46:13
 * @Description: api
 * @FilePath: \gas-h5\src\api\putOilGas.js
 */
const baseUrl = "/gas"
import { doPost } from "@/utils/axios"
import { doGet } from "@/utils/axios"
export default {
  // 获取油站列表
  getOilStationList(params) {
    return doPost(`${baseUrl}/station/queryoilstations`, params)
  },
  // 油站详情
  getStationDetail(params) {
    return doPost(`${baseUrl}/station/stationdetail`, params)
  },
  // 查询待支付订单
  unPaiedTrade() {
    return doPost(`${baseUrl}/station/selectunpaiedtrade`)
  },

  // 获取热门城市
  queryHot() {
    return doPost(`${baseUrl}/station/queryHot`)
  },
  // 获取微信config
  getConfig(url) {
    return doGet(`/gas/account/getsignature?url=${url}`)
  }
}
