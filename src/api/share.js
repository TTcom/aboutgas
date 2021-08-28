import { doPost } from "@/utils/axios"

export default {
  /**获取已参与报名的人 */
  getInviteStatistics() {
    return doPost(`/serapi/api/invite/statistics.do`)
  },
  /**参与报名 */
  driverApply(params) {
    return doPost(`/serapi/api/invite/driverApply.do`, params)
  },
  /** 获取分享邀请人的ID */
  shareUserId() {
    return doPost(`/serapi/api/invite/shareInvite.do`)
  },
  /** 获取微信注入权限数据 */
  getsignature(params) {
    return doPost(`/serapi/api/invite/getsignature.do`, params)
  },
  /** 获取邀请或已注册的人数数据 */
  getdriverList(params, target) {
    return doPost(`/serapi/api/invite/inviteDriverList.do`, params, target)
  }
}
