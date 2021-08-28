import { doPost } from "@/utils/axios"
const api = "/gas/qrcode/"
const apinext = "/gas/account/"

export default {
  /**获取加油账户余额*/
  getAvailableAmount() {
    return doPost(`${apinext}getAvailableAmount`)
  },
  /**获取加油二维码相关信息*/
  getcodeurl() {
    return doPost(`${api}queryoilpayqrcodeinfo`)
  },
  /**二维码使用轮循*/
  checkqrcode(data) {
    return doPost(`${api}checkqrcode`, data)
  },
  /**二维码等待结果交易轮循*/
  checktrading(data) {
    return doPost(`${api}checktrading`, data)
  },
  /**等待页面放弃交易*/
  closeoiltrading(data) {
    return doPost(`${api}closeoiltrading`, data)
  },
  /**关闭二维码交易*/
  closevalidedqrcode() {
    return doPost(`${api}closevalidedqrcode`)
  }
}
