/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ["admin", "editor"]
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* 给protal前台页面认证 */
// 是否是真实姓名
export function isvalidRealName(str) {
  const reg = /^[\u4e00-\u9fa5·]+$/
  return reg.test(str)
}

// 是否是身份证号
export function isvalidUserIdentify(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}

// 是否是手机号
export function isvalidMobile(str) {
  const reg = /^1\d{10}$/
  return reg.test(str)
}

// 是否是工商注册号
export function isvalidEnterpriseIdentify(str) {
  const reg = /(^[0-9A-Za-z]{15,18}$)/
  return reg.test(str)
}

// 是否是企业银行账户
export function isvalidEnterpriseBankAccount(str) {
  const reg = /(^[0-9]+$)/
  return reg.test(str)
}

// 是否是金额
export function isvalidMoney(str) {
  const reg = /(^(0|([1-9]\d{0,9}))(\.\d{1,2})?$)/
  return reg.test(str)
}

// 是否是打款金额
export function isvalidSmallMoney(str) {
  const reg = /(^(0)(\.\d{1,2})?$)/
  return reg.test(str)
}

// 是否是金额
export function isvalidPassword(str) {
  return str.length >= 6
}

// 数字校验
export function isvalidNum(str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}
