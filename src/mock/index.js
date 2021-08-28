// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== "production") {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  const Mock = require("mockjs2")
  require("./services/auth")
  require("./services/pay")
  require("./services/order")

  Mock.setup({
    timeout: 2000 // setter delay time
  })
  console.log("[antd-pro] mock mounted")
}
