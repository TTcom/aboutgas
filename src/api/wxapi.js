import { doGet } from "@/utils/axios"
export default {
  getToken() {
    return doGet(`cgi-bin/gettoken?corpid=${corpid}&corpsecret=${secret}`)
  },
  getTicket(token) {
    return doGet(`cgi-bin/get_jsapi_ticket?access_token=${token}`)
  }
}
