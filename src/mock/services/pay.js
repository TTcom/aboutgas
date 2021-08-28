import Mock from "mockjs2"
import { builder } from "../util"

const url = "https://www.baidu.com/"

const getCodeUrl = () => {
  return builder(
    {
      url: url,
      time: "176s",
      status: "scanning"
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  )
}
const getScanningResult = () => {
  return builder(
    {
      status: "success"
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  )
}

const getPayMessage = () => {
  return builder(
    {
      paymoney: "380.00",
      gasStation: "中石化上海嘉松南路加油站",
      nums: "0#柴油 国VI 100L",
      price: "5.28/L",
      paytime: "2020-05-11  12：35：12",
      save: "20.00"
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  )
}

Mock.mock(/\/pay\/getcodeurl/, "post", getCodeUrl)
Mock.mock(/\/pay\/getScanningResult/, "post", getScanningResult)
Mock.mock(/\/pay\/getPayMessage/, "post", getPayMessage)
