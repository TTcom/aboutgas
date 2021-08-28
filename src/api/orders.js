import { doPost } from "@/utils/axios"
const api = "/gas/query/"
const apinext = "/gas/account/"
const apicode = "/gas/qrcode/"

export default {
  /**深入支付 */
  gopaychecktrading(data) {
    return doPost(`${apicode}checktrading`, data)
  },
  /**立即支付 */
  gopayLinePayReve(data) {
    return doPost(`${apinext}payLinePayReve`, data)
  },
  /**立即支付 */
  // getpaySignature(data) {
  //   return doPost(`${apinext}paySignature`, data)
  // },
  /**查询加油订单列表 */
  getOrderList(data) {
    return doPost(`${api}consumeOrderList`, data)
  },
  /**查询加油订单详情 */
  consumeOrderDetail(data) {
    return doPost(`${api}consumeOrderDetail`, data)
  }
}
