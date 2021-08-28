<template>
  <div>
    <div class="oilGasDetails">
      <van-image width="100%" :src="detailInfo.pictures && detailInfo.pictures.length ? detailInfo.pictures[0] : require('./img/oilstationbig.png')">
        <template v-slot:error><van-image :src="require('./img/oilstationbig.png')"/></template>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <van-card :title="detailInfo.stationName">
        <template #desc>
          <van-row type="flex" justify="flex-start">
            <van-col span="20" class="desc">
              <span style="color:#222222;">距您{{ detailInfo.distance }}km</span> <span style="color:#D8D8D8;">|</span> <span style="color:#444444;">{{ detailInfo.address }}</span>
              <div class="oilstationtel">
                <span style="color:#A8A8A8;" v-if="detailInfo.tel" @click="gopalyphone(detailInfo.tel)">{{ detailInfo.tel }}</span>
              </div>
            </van-col>
            <van-col span="4" class="desc rightdesc" @click="openLocation()">
              <img src="./img/smallmap.png" class="gpsIcon" />
              <div class="locationspantext">导航</div>
            </van-col>
          </van-row>
        </template>
      </van-card>
      <div class="warp">
        <div class="todyoilprice">今日油价</div>
        <div class="toplist">
          <div class="list" v-for="(item, index) in gunsList" :key="index">
            <van-row class="item" type="flex" justify="space-between" gutter="80">
              <div>
                <div class="van-card__title">{{ item.skuName }}</div>
                <div class="descInfo" v-if="item.basePrice" style="background-color: rgba(255, 96, 16, 0.1);">每升加油节省{{ (item.basePrice - item.lvPrice).toFixed(2) }}元</div>
              </div>
              <div class="lvpricestyle">
                <div class="van-card__title ">优惠价</div>
                <div class="descInfo">
                  ￥<span>{{ item.lvPrice }}</span>
                </div>
              </div>
              <div class="mainpricestyle">
                <div class="van-card__title">发改委价</div>
                <div class="descInfo" style="color:black;">
                  ￥<span>{{ item.basePrice }}</span>
                </div>
              </div>
            </van-row>
          </div>
        </div>
      </div>

      <div type="default" round class="service" @click="gopalyphone(-1)">
        <img src="./img/service.png" class="serviceIcon" />
        <span>老吕加油客服</span>
      </div>

      <dialog-tdh v-if="isShowUnPay" :message="waitpayordermsg" confirmButtonText="去支付" confirmButtonColor="#048CFC" messageAlign="left" @confirm="goOrders"></dialog-tdh>
    </div>
    <div class="topfooter">
      <div class="footer" @click="addOil">
        <span>立即加油</span>
        <p>如要有加油问题请联系老吕加油客服</p>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api/putOilGas"
import dialogTdh from "@/common/dialogTdh"
import common from "@/utils/common"
import { mapNavigation } from "@/utils/commonfunction"
export default {
  name: "oilGasDetails",
  components: { dialogTdh },
  data() {
    return {
      waitpayordermsg: "",
      detailInfo: "", //详情
      gunsList: [], //油枪列表
      lng: "", //油站精度
      lat: "", //油站纬度
      isShowUnPay: false, //显示待支付订单弹框
      tradeId: "" //交易单号
    }
  },
  beforeMount() {
    this.stationId = this.$route.query.stationId
    this.selectUnPaiedTrade()
    this.getStationDetail()
  },
  methods: {
    gopalyphone(tel) {
      let playtel = tel === -1 ? "4009001211" : tel
      if (window.AndroidFunction !== undefined) {
        window.AndroidFunction.callPhone(playtel)
      }
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.tdh007.invokeNative("callPhone", playtel)
      }
      if (common.isWechat() && !navigator.userAgent.match("TDH007")) {
        window.location.href = `tel:${playtel}`
      }
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
    getStationDetail() {
      const param = {
        stationId: this.stationId,
        lat: this.$route.query.lat,
        lng: this.$route.query.lng
      }
      API.getStationDetail(param).then(res => {
        this.detailInfo = res.body
        this.gunsList = res.body.guns
        this.lat = this.detailInfo.lat
        this.lng = this.detailInfo.lng
      })
    },
    addOil() {
      this.$router.push({
        name: "pay",
        query: {
          stationName: this.detailInfo.stationName
        }
      })
    },
    goOrders() {
      console.log("tradu", this.tradeId)
      this.$router.push({
        name: "orders",
        params: {
          tradeId: this.tradeId
        }
      })
    },
    openLocation() {
      let beginmsg = {
        lat: this.$route.query.lat,
        lng: this.$route.query.lng,
        formattedAddress: this.$route.query.formattedAddress
      }
      mapNavigation(beginmsg, this.detailInfo)
    }
  }
}
</script>
<style lang="scss">
.oilGasDetails {
  padding: 0 16px;
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 82px;
  .locationspantext {
    color: #777777;
    font-size: 12px;
    padding-right: 3px;
  }
  .rightdesc {
    text-align: right;
  }
  .van-nav-bar {
    position: fixed;
    .van-icon-arrow-left::before {
      color: #bbbbbb;
    }
  }
  .detailpalce {
    margin-left: 6px;
  }
  .oilstationtel {
    margin-top: 12px;
    a {
      color: #999999;
    }
  }
  .locationicon {
    text-align: right;
  }
  .lvpricestyle {
    margin-left: 15px;
    color: #ff6010;
    span {
      font-size: 20px;
    }
  }
  .mainpricestyle {
    margin-left: 15px;
    color: #222222;
    span {
      font-size: 20px;
    }
  }
}
.topfooter {
  padding: 17px;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  span {
    display: inline-block;
    margin-top: 4px;
    font-size: 15px;
  }
  p {
    font-size: 12px;
  }
}
.footer {
  @include sc(18px, #fff);
  height: 48px;
  width: 100%;
  border-radius: 30px !important;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
  background-image: linear-gradient(to right, #048cfc, #0469fc);
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.oilGasDetails {
  ::v-deep .van-image {
    img {
      border-radius: 20px 20px 0 0;
      display: inherit;
      width: 343px;
      height: 188px;
    }
  }
  .van-card:not(:first-child) {
    margin: 0;
  }
  .van-card {
    width: 100%;
    min-height: 108px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    padding: 15px;
    .van-card__title {
      @include sc(20px, #222);
      font-weight: 550;
      line-height: inherit;
    }
    .desc {
      @include sc(13px, #222222);
      margin: 0;
      display: inline-block;
      line-height: 1.5;
      a:link {
        text-decoration: none;
      }
      .gpsIcon {
        margin-bottom: 4px;
        width: 28px;
        height: 28px;
      }
    }
  }
  .warp {
    width: 100%;
    padding: 0 15px;
    margin-top: 10px;
    @include sc(17px, rgba(34, 34, 34, 1));
    font-size: 17px;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 8px;
    padding-bottom: 15px;
    .todyoilprice {
      height: 48px;
      line-height: 48px;
      color: black;
      font-weight: 550;
    }
    .toplist {
      min-height: 82px;
    }
    .list {
      font-size: 13px;
      padding: 15px 10px;
      padding-top: 15px;
      border-radius: 4px;
      background-color: rgba(245, 245, 245, 1);
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
      .descInfo {
        height: 18px;
        line-height: 18px;
        margin-top: 8px;
        padding: 0 3px;
        color: #ff6010;
      }
      .cutDown {
        color: #ff6000;
        margin-bottom: 5px;
        line-height: 16px;
        @include sc(8px, #ff6000);
      }
      .standardMoney {
        text-decoration: line-through;
        color: #bbbbbb;
      }
    }
  }
  .service {
    width: 122px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 11px;
    border-radius: 22px;
    background-color: rgba(255, 255, 255, 1);
    margin: 10px auto;
    margin-bottom: 15px;
    a {
      color: #047cfc;
      &:link {
        text-decoration: none;
      }
    }
    .serviceIcon {
      margin-right: 5px;
      width: 16px;
      height: 16px;
    }
  }
}
</style>
