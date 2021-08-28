import Mock from "mockjs2"
import { builder } from "../util"

const getCodeUrl = () => {
  return builder(
    {
      data: [
        {
          ordernum: 2020051200000,
          status: 0,
          gasStation: "闵行加油站",
          gastype: "0# 柴油 国V 78L",
          datetime: "2020-04-07 17:28:39",
          price: "220.00"
        },
        {
          ordernum: 2020051200001,
          status: 1,
          gasStation: "虹桥二号航站楼加油站",
          gastype: "0# 柴油 国V 168L",
          datetime: "2020-04-07 18:28:39",
          price: "230.00"
        },
        {
          ordernum: 2020051200002,
          status: 2,
          gasStation: "闵行加油站",
          gastype: "0# 柴油 国V 78L",
          datetime: "2020-04-07 19:28:39",
          price: "230.00"
        },
        {
          ordernum: 2020051200003,
          status: 1,
          gasStation: "北京紫禁城加油站",
          gastype: "0# 柴油 国V 78L",
          datetime: "2020-04-07 20:28:39",
          price: "250.00"
        }
      ]
    },
    "",
    200,
    { "Custom-Header": Mock.mock("@guid") }
  )
}

Mock.mock(/\/order\/getorderlist/, "post", getCodeUrl)
