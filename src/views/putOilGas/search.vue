<template>
  <div class="search" :class="{ wechatsearch: iswechat }">
    <div class="searchtitleinput">
      <van-search v-model="searchVal" @input="searcholistation" placeholder="输入油站名、油站地址" />
    </div>
    <div class="warp" v-show="!oilStationList.length">
      <van-row type="flex" justify="space-between">
        <van-col class="title" span="23">最近搜索</van-col>
      </van-row>
      <van-tag type="primary" v-for="(item, index) in historyList" :key="index" @click="tageSearchHistory(item)">{{ item }}</van-tag>
    </div>
    <div class="olistationlist" v-show="oilStationList.length">
      <olistationcard :oilStationList="oilStationList" @goDetails="goDetails" @openLocation="openLocation" @addOil="addOil"></olistationcard>
    </div>
  </div>
</template>
<script>
import _ from "lodash"
import API from "@/api/putOilGas"
import common from "@/utils/common"
import olistationcard from "./olistationcard.vue"
import { mapNavigation } from "@/utils/commonfunction"
export default {
  name: "search",
  components: { olistationcard },
  data() {
    return {
      iswechat: false,
      searchVal: "",
      lng: "",
      lat: "",
      formattedAddress: "",
      historyList: [],
      oilStationList: []
    }
  },
  watch: {
    oilStationList: {
      handler(newval) {
        console.log("newval", newval)
        if (!newval.length) {
          let arr = localStorage.getItem("TDH_GAS_search")
          if (arr) {
            this.historyList = JSON.parse(arr)
          }
        }
      },
      immediate: true
    }
  },
  created() {
    if (common.isWechat()) {
      this.iswechat = true
    }
    let localtionmsg = JSON.parse(localStorage.getItem("TDH_oil_mapSEARCHMSG"))
    this.lat = localtionmsg.lat
    this.lng = localtionmsg.lng
    this.formattedAddress = localtionmsg.formattedAddress
  },
  mounted() {
    // this.timer = setTimeout(() => {
    //   document.getElementsByClassName("van-field__control")[0].focus()
    //   clearTimeout(this.timer)
    // }, 500)
  },
  methods: {
    tageSearchHistory(item) {
      console.log("item", item)
      this.searchVal = item
      this.queryData(item)
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
    openLocation(item) {
      let beginmsg = {
        lat: this.lat,
        lng: this.lng,
        formattedAddress: this.formattedAddress
      }
      mapNavigation(beginmsg, item)
    },
    addOil(item) {
      this.$router.push({
        name: "pay",
        query: {
          stationName: item.stationName
        }
      })
    },
    setSearchHistory(val) {
      let arr = localStorage.getItem("TDH_GAS_search")
      if (!arr || arr.length === 0) {
        arr = []
      } else {
        arr = JSON.parse(arr)
        let index = arr.indexOf(val)
        console.log("index", index)
        if (index !== -1) {
          arr.splice(index, 1)
        }
      }
      arr.unshift(val)
      if (arr.length > 20) {
        arr.pop()
      }
      localStorage.setItem("TDH_GAS_search", JSON.stringify(arr))
    },
    searcholistation: _.debounce(function() {
      this.queryData(this.searchVal)
    }, 550),
    queryData(val) {
      if (!val) {
        if (this.oilStationList.length) this.oilStationList = []
        return
      }
      this.setSearchHistory(val)
      this.oilStationList = []
      var param = {
        page: 1,
        pagesize: 999,
        lat: this.lat,
        lng: this.lng,
        // oilType: this.oilType,
        sortDesc: "ASC",
        sortKey: "distance",
        stationKey: val
      }
      API.getOilStationList(param).then(res => {
        if (res.success) {
          if (res.body.result) {
            this.oilStationList = this.oilStationList.concat(res.body.result)
          }
        } else {
          this.$toast("请求失败")
        }
      })
    }
    // getHotCity() {
    //   API.queryHot().then(res => {
    //     if (res.success) {
    //       this.hotList = res.body
    //     } else {
    //       this.$toast(`${res.message}`)
    //     }
    //     console.log(this.hotList)
    //   })
    // }
  }
}
</script>
<style lang="scss">
.search {
  padding-top: 54px;
  box-sizing: border-box;
  background: #f7f7f7;
  .olistationlist {
    background: #f7f7f7;
  }
  .searchtitleinput {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .van-search {
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
.search {
  height: 100%;
  .van-search__action {
    line-height: 18px;
  }
  .warp {
    width: 343px;
    margin: 0 auto;
    font-size: 13px;
    .title {
      color: #222;
      line-height: 24px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .van-tag {
      @include texthandle(100%);
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #999999;
      box-sizing: border-box;
      padding: 0 12px;
      margin: 0 16px 12px 0;
      background-color: rgba(245, 245, 245, 1) !important;
      display: inline-block;
    }
  }
}
.wechatsearch {
  padding-top: 99px;
  .searchtitleinput {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    z-index: 99;
  }
}
</style>
