<template>
  <div class="mapStation" :class="{ mapStationwechat: iswechat }">
    <van-sticky>
      <div class="topmenu">
        <div class="leftmenustyle">
          <van-dropdown-menu>
            <van-dropdown-item v-model="oilType" :options="oilList" @change="getList" @open="openDropdown" />
            <van-dropdown-item :title="placetitle" ref="cityRef" @open="openDropdown()">
              <van-tree-select :items="cityList" :active-id.sync="activeId" :main-active-index.sync="mainActiveIndex" @click-item="clickItem" selected-icon />
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <div class="rightmapstyle" @click="goList">
          <div class="navRightTitle"><span style="vertical-align: middle;">列表模式</span><img src="./img/switch.png" class="mapIcon" /></div>
        </div>
      </div>
    </van-sticky>

    <div id="mapContainer"></div>
    <div class="infoCard" v-if="showCard" @click="goDetails">
      <van-row type="flex" justify="space-between">
        <van-col span="23" style="color:#222;font-size:17px;margin-bottom:9px;">{{ stationName }}</van-col>
        <van-col span="1">
          <van-icon name="arrow" @click="goDetails" />
        </van-col>
      </van-row>
      <div class="middlemsg">
        <div class="styleskuName">{{ skuName }}</div>
        <div class="cmoney">
          <span>￥</span>
          <span class="lvPrice">{{ lvPrice }}</span>
        </div>
      </div>
      <div class="middlemsg">
        <span class="styleskuName cgrayplace">
          <span class="inyourplace" v-if="distance">据您{{ distance }}km</span>
          {{ address }}
        </span>
      </div>
      <div class="goGps" @click.stop="openLocation">去这里</div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap"
import { city } from "@/utils/cityCoding"
import common from "@/utils/common"
import bridge from "@/utils/bridge"
import wxGps from "@/utils/wxGps"
import API from "@/api/putOilGas"
import { mapNavigation } from "@/utils/commonfunction"
export default {
  name: "mapStation",
  props: {},
  data() {
    return {
      mapcenterlng: "",
      mapcenterlat: "",
      placetitle: "全部地区",
      iswechat: false,
      showCard: false, //选中点信息
      offsetTop: "40", //局顶部距离
      lng: "", //当前位置精度
      lat: "", //当前位置纬度
      map: {}, //地图
      cityList: city, //省市数据
      activeId: "", //右侧选中项的 id
      mainActiveIndex: "", //左侧选中项的索引
      oilType: "0#", //油品类型选中项
      oilList: [
        //油品类型
        { text: "0#", value: "0#" },
        { text: "-10#", value: "-10#" },
        { text: "-20#", value: "-20#" },
        { text: "-35#", value: "-35#" }
      ],
      cityCode: "", //城市code
      oilStationList: [], //油站列表
      stationName: "", //油站名称
      skuName: "", //油枪信息
      lvPrice: "", //现价
      distance: 5, //据当前位置搜索范围
      address: "", //油站地址
      stationId: "", //油站id
      destinationLat: "", //目的地维度
      destinationLng: "", //目的地精度
      ceshimap: "",
      zoom: 5 //地图缩放级别
    }
  },
  created() {
    if (common.isWechat()) {
      this.iswechat = true
    }
  },
  mounted() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0
    })
    this.getList()
  },
  destroyed() {
    this.$toast.clear()
    if (this.map) {
      this.map = null
    }
  },
  methods: {
    goList() {
      this.$router.push({
        name: "oilGasList"
      })
    },
    openDropdown() {
      this.showCard = false
    },
    togetuserlocation(lnglat) {
      if (common.isWechat() && !navigator.userAgent.match("TDH007")) {
        wxGps.getLocation(data => {
          console.log("data22", data)
          if (this.lng === data.longitude && this.lat === data.latitude) {
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
          console.log("locationStr", locationStr)
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
        } else {
          wxGps.getLotion((data, formattedAddress) => {
            this.lng = data.lng.toString()
            this.lat = data.lat.toString()
            this.formattedAddress = formattedAddress
            this.getQueryData()
          })
        }
      }
    },
    getQueryData() {
      if (this.map.CLASS_NAME) {
        this.map.clearMap() // 清除地图覆盖物
        if (this.cluster) {
          this.cluster.setMap(null)
        }
      } else {
        this.map = new AMap.Map("mapContainer", {
          resizeEnable: true,
          zoom: this.zoom
        })
      }
      var param = {
        page: 1,
        pagesize: 0,
        oilType: this.oilType,
        lat: this.lat, //用户当前位置
        lng: this.lng,
        nowLng: this.mapcenterlng, //用户查询的地理位置
        nowLat: this.mapcenterlat,
        sortDesc: "ASC"
      }
      if (this.cityCode) {
        param.cityCode = this.cityCode
      }
      API.getOilStationList(param).then(res => {
        let body = res.body
        if (res.success) {
          if (body.result) {
            this.oilStationList = body.result
          }
          this.map.setZoom(10) //设置地图层级
          if (this.mapcenterlng) {
            this.map.setCenter([this.mapcenterlng, this.mapcenterlat]) //设置地图中心点
          } else {
            this.map.setCenter([this.lng, this.lat]) //设置地图中心点
          }
          if (!this.oilStationList || !this.oilStationList.length) {
            this.$toast.clear()
            return
          }
          this.$toast.loading({
            message: "油站创建中...",
            forbidClick: true,
            duration: 0
          })
          this.initMapNext(this.oilStationList)
          this.$toast.clear()
        } else {
          this.$toast("请求失败")
          this.$toast.clear()
        }
      })
    },
    openLocation() {
      let endmsg = {
        lat: this.destinationLat,
        lng: this.destinationLng,
        address: this.address,
        stationName: this.stationName
      }
      let beginmsg = {
        lat: this.lat,
        lng: this.lng,
        formattedAddress: this.formattedAddress
      }
      console.log(beginmsg)
      console.log(endmsg)
      mapNavigation(beginmsg, endmsg)
    },
    goDetails() {
      this.$router.push({
        name: "oilGasDetails",
        query: {
          stationId: this.stationId,
          lng: this.lng,
          lat: this.lat,
          formattedAddress: this.formattedAddress
        }
      })
    },
    clickItem(data) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      })
      console.log("data", data)
      this.placetitle = data.text
      this.$refs.cityRef.toggle()
      if (data.text !== "全部地区") {
        wxGps.getcitylnglat(data.text, msg => {
          console.log(msg)
          this.mapcenterlng = msg.lng
          this.mapcenterlat = msg.lat
          this.cityCode = data.administrativeCode
          this.getList()
        })
      } else {
        this.mapcenterlng = ""
        this.mapcenterlat = ""
        this.cityCode = ""
        this.getList()
      }
    },

    initMapNext(arrr) {
      console.log("initMapNext", arrr)
      let markers = []
      console.log(markers)
      console.log(arrr)
      arrr.forEach(val => {
        markers.push(
          new AMap.Marker({
            position: [val.lng, val.lat],
            content: `<div class="mark" ><div class="markIcon"></div><div class="markInfo">￥${val.guns && val.guns[0] ? val.guns[0].lvPrice : ""}</div></div>`,
            clickable: true,
            extData: {
              stationName: val.stationName,
              skuName: val.guns && val.guns[0] ? val.guns[0].skuName : "",
              lvPrice: val.guns && val.guns[0] ? val.guns[0].lvPrice : "",
              distance: val.distance,
              address: val.address,
              stationId: val.stationId,
              destinationLat: val.lat,
              destinationLng: val.lng
            },
            offset: new AMap.Pixel(-15, -15)
          })
        )
      })
      // }
      markers.forEach(val => {
        AMap.event.addListener(val, "click", e => {
          console.log("e", e)
          let data = JSON.parse(JSON.stringify(e.target.getExtData()))
          this.stationName = data.stationName
          this.skuName = data.skuName
          this.lvPrice = data.lvPrice
          this.distance = data.distance
          this.address = data.address
          this.stationId = data.stationId
          this.showCard = true
          this.destinationLat = data.destinationLat
          this.destinationLng = data.destinationLng
        })
      })
      let addCluster = tag => {
        if (this.cluster) {
          this.cluster.setMap(null)
        }
        if (tag === 2) {
          //完全自定义
          console.log("context", 222)
          this.cluster = new AMap.MarkerClusterer(this.map, markers, {
            gridSize: 80
          })
        } else if (tag === 1) {
          //自定义图标
          var sts = [
            {
              url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
              size: new AMap.Size(32, 32),
              offset: new AMap.Pixel(-16, -16)
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/green.png",
              size: new AMap.Size(32, 32),
              offset: new AMap.Pixel(-16, -16)
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
              size: new AMap.Size(36, 36),
              offset: new AMap.Pixel(-18, -18)
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/red.png",
              size: new AMap.Size(48, 48),
              offset: new AMap.Pixel(-24, -24)
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
              size: new AMap.Size(48, 48),
              offset: new AMap.Pixel(-24, -24)
            }
          ]
          this.cluster = new AMap.MarkerClusterer(this.map, markers, {
            styles: sts,
            gridSize: 80
          })
        } else {
          //默认样式
          this.cluster = new AMap.MarkerClusterer(this.map, markers, { gridSize: 80 })
        }
      }
      addCluster(2)
    }
  }
}
</script>
<style lang="scss">
.mapStation .van-dropdown-menu__bar {
  box-shadow: none !important;
}
.mapStation {
  .topmenu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .leftmenustyle {
      flex: 1;
    }
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
  .navRightTitle {
    height: 31px;
    line-height: 31px;
    font-size: 15px;
    color: rgba(4, 124, 252, 100);
    font-family: "PingFangSC-Regular" !important;
    padding: 0 25px;
  }
  .mark {
    padding: 0 5px;
    // line-height: 36px;
    text-align: center;
    color: #fff;
    padding: 3px 5px;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #048cfc, #0469fc);
    border-radius: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .markIcon {
      @include bgPic("./img/station.png");
      width: 11px;
      height: 10px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 3px;
    }
    .markInfo {
      font-size: 9px;
    }
  }
}
</style>
<style lang="scss" scoped>
.mapStation {
  background: #fff;
  font-size: 15px;
  height: 100%;
  ::v-deep .van-tree-select {
    height: 100% !important;
  }
  ::v-deep .van-dropdown-item__content {
    height: 100% !important;
  }
  .middlemsg {
    margin-bottom: 6px;
    .styleskuName {
      font-size: 15px;
      display: inline-block;
      margin-right: 13px;
    }
    .cmoney {
      @extend .styleskuName;
      color: #ff4c37;
      .lvPrice {
        font-size: 17px;
        font-size: 20px;
      }
    }
    .cgrayplace {
      color: #a8a8a8;
      font-size: 12px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      .inyourplace {
        margin-right: 6px;
      }
    }
  }

  .navRight {
    img {
      @include wh(12px, 12px);
      margin-top: -20px;
    }
    .navRightTitle {
      height: 11px;
      line-height: 11px;
      margin-top: -20px;
      font-size: 11px;
    }
  }
  .van-tree-select {
    .van-sidebar-item--select::before {
      background-color: #1989fa;
    }
    .van-tree-select__item {
      font-weight: normal;
    }
    .van-tree-select__item--active {
      color: #1989fa;
    }
  }
  .infoCard {
    @include wh(343px, 200px);
    font-size: 13px;
    padding: 20px 16px;
    background: #fff;
    position: fixed;
    bottom: 16px;
    left: 16px;
    z-index: 1000;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 6.67px 12.04px 0px rgba(34, 34, 34, 0.06);
    border: 1px solid rgba(245, 245, 245, 1);
    &:last-child {
      border-bottom: 0;
    }
    .van-row {
      line-height: 18px;
    }
    .descInfo {
      height: 18px;
      line-height: 18px;
      color: #1d7bff;
      margin: 8px 4px 0;
      padding: 0 3px;
      background-color: rgba(29, 123, 255, 0.1);
    }
  }
  #mapContainer {
    background: #fff;
    width: 100%;
    position: absolute;
    top: 48px;
    bottom: 0px;
    left: 0px;
  }
  .goGps {
    @include wh(310px, 49px);
    @include sc(18px, #fff);
    margin-top: 15px;
    line-height: 49px;
    border-radius: 4px;
    background-image: linear-gradient(to right, #048cfc, #0469fc);
    text-align: center;
    border-radius: 25px;
  }
}
.mapStationwechat {
  #mapContainer {
    top: 93px;
  }
}
</style>
