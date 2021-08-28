<template>
  <div class="oilGasList">
    <!-- <div class="pagemodal" v-if="isgetalluserlocation"></div> -->
    <van-sticky>
      <van-nav-bar>
        <template #title>
          <div class="titlesearch" @click="goSearch">
            <div><van-icon name="search" /></div>
            <div class="rightinputtext">输入油站名、油站地址</div>
          </div>
        </template>
      </van-nav-bar>
      <div class="topmenu">
        <div class="leftmenustyle">
          <van-dropdown-menu active-color="#1D7BFF">
            <van-dropdown-item v-model="filterType" :options="filterOption" class="van-hairline--right" @change="changeDropdown" />
            <van-dropdown-item v-model="oilType" :options="oilTypeOption" @change="changeDropdown" />
          </van-dropdown-menu>
        </div>
        <div class="rightmapstyle" @click="goMap">
          <div class="navRightTitle"><span style="vertical-align: middle;">地图模式</span><img src="./img/switch.png" class="mapIcon" /></div>
        </div>
      </div>
    </van-sticky>
    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" ref="pullRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" ref="list">
        <olistationcard :oilStationList="oilStationList" @goDetails="goDetails" @openLocation="openLocation" @addOil="addOil"></olistationcard>
      </van-list>
    </van-pull-refresh>
    <div class="btmbtn">
      <router-link to="/orders" tag="span">
        <van-button type="default">
          <span style="display: inline-block;vertical-align: middle;">油气订单</span
          ><van-icon
            style="vertical-align: middle;
              margin-left: 5px;"
            name="arrow"
        /></van-button>
      </router-link>
    </div>
    <!-- 支付弹框 -->
    <dialogTdh v-if="isShowUnPay" :message="waitpayordermsg" confirmButtonText="去支付" confirmButtonColor="#048CFC" messageAlign="left" @confirm="goOrders"></dialogTdh>
    <div id="container" class="XSDFXPage"></div>
  </div>
</template>
<script>
import common from "@/utils/common"
import dialogTdh from "@/common/dialogTdh"
import wxGps from "@/utils/wxGps"
import API from "@/api/putOilGas"
import olistationcard from "./olistationcard.vue"
import { mapNavigation } from "@/utils/commonfunction"
import bridge from "@/utils/bridge"
export default {
  name: "oilGasList",
  components: { dialogTdh, olistationcard },
  props: {},
  data() {
    return {
      waitpayordermsg: "",
      formattedAddress: "", //当前位置地址
      lng: "", //当前位置精度
      lat: "", //当前位置纬度
      stationKey: localStorage.getItem("searchWord") ? localStorage.getItem("searchWord") : "", //收索框内容
      filterType: "distance",
      oilType: "0#",
      filterOption: [
        { text: "距离最近", value: "distance" },
        { text: "价格最低", value: "price" }
      ],
      oilTypeOption: [
        { text: "0#", value: "0#" },
        { text: "-10#", value: "-10#" },
        { text: "-20#", value: "-20#" },
        { text: "-35#", value: "-35#" }
      ],
      list: [],
      loading: false, //是否底部加载中
      finished: false, //是否已加载完成
      refreshing: false, //刷新
      error: false, //是否加载失败
      scrollY: 0,
      oilStationList: [], //油站数据
      cityCode: "", //城市code
      page: 1,
      pagesize: 5,
      total: 0,
      isShowUnPay: false, //待支付订单弹框
      tradeId: "" //交易单号
    }
  },
  beforeMount() {
    this.selectUnPaiedTrade()
  },
  // 滚动条位置
  activated() {
    window.scrollTo(0, this.scrollY)
  },
  deactivated() {
    this.scrollY = document.documentElement.scrollTop || document.body.scrollTop
    window.scrollTo(0, 0)
  },
  methods: {
    changeDropdown() {
      this.page = 1
      this.onRefresh()
    },
    togetuserlocation(lnglat) {
      if (common.isWechat() && !navigator.userAgent.match("TDH007")) {
        wxGps.getLocation(data => {
          console.log("data22", data)
          if (data.longitude && this.lng === data.longitude && this.lat === data.latitude) {
            this.getQueryData()
            return
          }
          if (data === "cancel") {
            this.$toast("无法获取您的城市信息,请允许获取您的位置信息!")
            this.lng = "116.407526"
            this.lat = "39.90403"
          } else {
            this.lng = data.longitude
            this.lat = data.latitude
          }
          let lnglat = [this.lng, this.lat]
          console.log("lnglat", lnglat)
          wxGps.getAddress(lnglat, data => {
            console.log("dataadreess", data)
            this.formattedAddress = data
            this.getQueryData()
          })
        })
      } else {
        wxGps.getAddress(lnglat, data => {
          this.formattedAddress = data
          this.getQueryData()
        })
      }
    },
    getList() {
      if (common.isWechat() && !navigator.userAgent.match("TDH007")) {
        console.log("weixin")
        this.togetuserlocation()
      } else if (window.AndroidFunction !== undefined) {
        let location = window.AndroidFunction.getLocation()
        let local = null
        if (location && typeof location === "string") {
          local = location.split(",")
        }
        if (!location || !local) {
          this.lng = "116.407526"
          this.lat = "39.90403"
          this.$toast("定位获取异常！<br>请打开手机定位")
        } else {
          if (this.lng === local[1] && this.lat === local[0]) {
            this.getQueryData()
            return
          }
          this.lng = local[1]
          this.lat = local[0]
        }
        let lnglat = [this.lng, this.lat]
        this.togetuserlocation(lnglat)
      } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        bridge.Core.callNativeHandler("getLocation", [{ cordType: "BD09" }], locationStr => {
          console.log("iOSlocationStr", locationStr)
          let local = ("" + locationStr).split(",")
          if (!locationStr || !local[0]) {
            this.lng = "116.407526"
            this.lat = "39.90403"
            this.$toast("定位获取异常！<br>请打开手机定位")
          } else {
            if (this.lng === local[1] && this.lat === local[0]) {
              this.getQueryData()
              return
            }
            this.lng = local[1]
            this.lat = local[0]
          }
          let lnglat = [this.lng, this.lat]
          this.togetuserlocation(lnglat)
        })
      } else {
        if (this.lng) {
          this.getQueryData()
          return
        }
        wxGps.getLotion((data, formattedAddress) => {
          this.lng = data.lng.toString()
          this.lat = data.lat.toString()
          this.formattedAddress = formattedAddress
          this.getQueryData()
        })
      }
    },

    getQueryData() {
      var param = {
        page: this.page,
        pagesize: this.pagesize,
        lat: this.lat,
        lng: this.lng,
        oilType: this.oilType,
        sortDesc: "ASC",
        sortKey: this.filterType,
        stationKey: this.stationKey
      }
      API.getOilStationList(param).then(res => {
        let body = res.body
        if (!body.result || !res.success || !body.result.length) {
          this.oilStationList = []
          this.finished = true
          return
        }
        if (res.success) {
          if (body.result && body.result.length) {
            this.oilStationList = this.oilStationList.concat(body.result)
            this.total = body.pagination.total
            if (this.oilStationList.length === this.total) {
              this.finished = true
            }
          }
          this.loading = false
          this.page++
        } else {
          this.$toast("请求失败")
        }
        this.refreshing = false
      })
    },
    selectUnPaiedTrade() {
      API.unPaiedTrade().then(res => {
        if (res.success) {
          if (res.body && res.body.tradeId) {
            this.tradeId = res.body.tradeId
            this.isShowUnPay = true
            this.waitpayordermsg = `您的有一笔${res.body.totalPrice}元订单待支付，请支付完成后再加油哦`
          }
        } else {
          this.$toast(`${res.message}`)
        }
      })
    },
    // 聚焦跳转页面
    goSearch() {
      if (!this.lng && !this.lat) {
        this.$toast(`无法获取定位，请打开定位并重试`)
        return
      }
      let searchmessage = {
        lng: this.lng,
        lat: this.lat,
        formattedAddress: this.formattedAddress
        // cityCode: this.cityCode
      }
      localStorage.setItem("TDH_oil_mapSEARCHMSG", JSON.stringify(searchmessage))
      if (common.isWechat() && !navigator.userAgent.match("TDH007")) {
        this.$router.push("/search")
      } else if (window.AndroidFunction !== undefined) {
        window.AndroidFunction.openWebView(window.location.protocol + "//" + window.location.host + "/#/search", false)
      } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        bridge.Core.callNativeHandler("openWebView", [window.location.protocol + "//" + window.location.host + "/#/search", false])
      } else {
        this.$router.push("/search")
      }
    },
    goDetails(stationId) {
      this.$router.push({
        name: "oilGasDetails",
        query: {
          stationId: stationId,
          lng: this.lng,
          lat: this.lat,
          formattedAddress: this.formattedAddress
        }
      })
    },

    goMap() {
      this.$router.push({
        name: "mapStation"
      })
      // if (common.isWechat()) {
      //   this.$router.push({
      //     name: "mapStation"
      //   })
      // } else {
      //   if (window.AndroidFunction !== undefined) {
      //     window.AndroidFunction.onOilMap()
      //   } else if (window.tdhutruck) {
      //     if (window.tdhutruck) {
      //       window.tdhutruck.onOilMap()
      //     }
      //   }
      // }
    },
    addOil(item) {
      this.$router.push({
        name: "pay",
        query: {
          stationName: item.stationName
        }
      })
    },
    goOrders() {
      this.$router.push({
        name: "orders",
        params: { tradeId: this.tradeId }
      })
    },
    openLocation(item) {
      console.log(item)
      let beginmsg = {
        lat: this.lat,
        lng: this.lng,
        formattedAddress: this.formattedAddress
      }
      mapNavigation(beginmsg, item)
    },
    onLoad() {
      console.log("this.refreshing", this.refreshing)
      if (this.refreshing) {
        this.page = 1
        this.getList()
      } else {
        console.log(1222222)
        if (common.isWechat() && !navigator.userAgent.match("TDH007")) {
          if (this.lat && this.lng) {
            this.getList()
            return
          }
          wxGps.getConfig(() => {
            this.getList()
          })
        } else {
          this.getList()
        }
      }
    },
    onRefresh() {
      console.log("onrefresh")
      this.oilStationList = []
      this.onLoad()
    }
  }
}
</script>
<style lang="scss">
.btmbtn {
  position: fixed;
  bottom: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
  z-index: 9;
  text-align: center;
  background: #f7f7f7;
  .van-button--normal {
    color: rgb(4, 124, 252);
    border: none;
    border-radius: 27px;
    padding: 0 15px;
    height: 36px;
    padding-right: 10px;
  }
}
.pagemodal {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
}
.oilGasList {
  [class*="van-hairline"]::after {
    border: none;
  }
  .van-search__content--round {
    border-radius: 5px;
  }
  .van-nav-bar {
    padding: 6px 0;
    .van-nav-bar__left {
      padding: 10px;
    }
    .van-icon {
      color: #999999 !important;
      font-size: 19px;
      display: flex;
      font-weight: 600;
    }
    .van-nav-bar__title {
      width: 100%;
      max-width: inherit;
      padding: 10px 15px;
    }
    .titlesearch {
      box-sizing: border-box;
      height: 34px;
      width: 100%;
      background: #f5f5f5;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0 10px;
      align-items: center;
      font: 400 15px Arial;
      color: #a8a8a8;
      .rightinputtext {
        padding-left: 10px;
      }
    }
  }
  .topmenu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    .leftmenustyle {
      flex: 1;
    }
  }
}
</style>

<style lang="scss" scoped>
.oilGasList {
  background: #f7f7f7;
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
  }
  .van-pull-refresh {
    background: #f7f7f7;
  }
  .mapIcon {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .van-search__action {
    line-height: 18px;
  }
  .navRightTitle {
    height: 31px;
    line-height: 31px;
    font-size: 15px;
    color: rgba(4, 124, 252, 100);
    font-family: "PingFangSC-Regular" !important;
    padding: 0 25px;
  }
  .fixIcon {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 52px;
    right: 10px;
    img {
      margin: 11px auto 5px;
      display: block;
      width: 15px;
      height: 17px;
    }
    p {
      color: rgba(29, 123, 255, 1);
      font-size: 11px;
      text-align: center;
    }
  }
}
</style>
