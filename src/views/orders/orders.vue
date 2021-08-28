<template>
  <div class="orders" :class="{ orderswechat: iswechat }">
    <div class="stil_top">
      <!-- <van-nav-bar>
        <template #right>
          
        </template>
      </van-nav-bar> -->
    </div>
    <div class="orders_top">
      <van-tabs v-model="active" color="#047CFC" title-active-color="#047CFC" @change="tabChange">
        <van-tab title="全部"></van-tab>
        <van-tab title="已付款"></van-tab>
        <van-tab title="待付款"></van-tab>
        <van-tab title="已退款"></van-tab>
      </van-tabs>
      <div class="selectdate">
        <span @click="showPicker = true">
          <span>{{ queryMonth }}</span>
          <img src="./img/down.png" />
        </span>
      </div>
    </div>

    <van-pull-refresh v-model="isPullLoading" @refresh="onRefresh">
      <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onListLoad">
        <div class="btm_list">
          <div class="order_list" v-for="(item, index) in list" :key="index" @click="todetail(item)">
            <div class="second_text">
              <div class="left_text">交易单号：{{ item.consumeOrderNo }}</div>
              <div class="right_text">{{ item.stateCdTex }}</div>
            </div>
            <div class="oli_station">{{ item.stationName }}</div>
            <div class="cblack">
              <img src="./img/oliIcon.png" /><span>{{ item.oilType + " " + item.oilName + " " + item.count }}L</span>
            </div>
            <div class="second_text cblack">
              <div class="left_text">
                <img src="./img/dateIcon.png" /><span>{{ item.createShpDate }}</span>
              </div>
              <div class="oli_stationnumber">
                ￥<span class="orderpirce" v-if="item.totalPrice">{{ parseFloat(item.totalPrice).toFixed(2) }}</span>
              </div>
            </div>
            <div class="btmbtndiv" v-if="item.stateCd === 'WAIT_PAY'">
              <van-button type="info" @click.stop="nowpaytip(item)">立即支付</van-button>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
    <form :action="payurl" method="post">
      <input type="hidden" name="param" :value="signature" />
    </form>
    <van-dialog v-model="isShowPaytip" title="标题" message="是否确认支付" show-cancel-button @confirm="gopay" confirmButtonText="确认免密支付"> </van-dialog>
  </div>
</template>
<script>
import common from "@/utils/common"
import API from "@/api/orders"
import moment from "moment"
let arr = new Map([
  [0, ""],
  [1, "PAID"],
  [2, "WAIT_PAY"],
  [3, "CANCEL_PAID"]
])
export default {
  name: "orders",
  data() {
    return {
      iswechat: false,
      signature: "",
      payurl: "",
      isShowPaytip: false,
      showPicker: false,
      active: 0,
      isPullLoading: false,
      list: [],
      loading: false, //是否底部加载中
      finished: false, //是否已加载完成
      page: 1,
      pagesize: 10,
      totalPage: 0,
      queryMonth: "",
      state: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  created() {
    if (common.isWechat()) {
      this.iswechat = true
    }
    this.queryMonth = moment().format("YYYY-MM")
    console.log(this.$route.params.tradeId)
    if (this.$route.params.tradeId) {
      this.active = 2
      this.state = arr.get(2)
    }
  },
  mounted() {
    this.loading = true
    this.onListLoad()
  },
  methods: {
    nowpaytip(item) {
      this.paymsg = item
      this.isShowPaytip = true
      // this.$dialog.confirm({
      //   title: "标题",
      //   message: "是否确认支付",
      //   beforeClose: this.gopay
      // })
    },
    gocheckingpayresult(data) {
      //等待结果
      API.gopaychecktrading(data).then(res => {
        console.log(res)
        if (!this.gocheckingpayresult) return
        if (res.body.stateCode === "PAYING") {
          //交易中
          if (this.gocheckingpayresult) this.gocheckingpayresult(data)
        }
        if (res.body.stateCode === "PAY_SUCCESS") {
          this.$toast.clear()
          //支付成功
          this.$router.push({
            name: "pay",
            query: {
              paystatus: "PAY_SUCCESS",
              payInfo: JSON.stringify(res.body.payInfo)
            }
          })
        }
        if (res.body.stateCode === "PAY_FAIL" || res.body.stateCode === "INVALID") {
          //支付失败 失效
          this.$toast.clear()
          this.$router.push({
            name: "pay",
            query: {
              paystatus: "PAY_FAIL",
              payInfo: JSON.stringify(res.body.payInfo)
            }
          })
        }
        if (res.body.stateCode === "CANEL") {
          //支付取消
          this.$toast.clear()
          this.$router.push({
            name: "pay",
            query: {
              paystatus: "PAY_CANEL",
              payInfo: JSON.stringify(res.body.payInfo)
            }
          })
        }
      })
    },
    gopay() {
      console.log(11)
      let data = {
        tradeId: this.paymsg.tradeId
      }
      this.$toast.loading({
        message: "支付中...",
        forbidClick: true,
        duration: 0
      })
      API.gopayLinePayReve(data)
        .then(res => {
          console.log(res)
          if (res.success) {
            this.gocheckingpayresult(data)
          } else {
            this.$toast(res.message)
          }
        })
        .catch(() => {
          // this.$toast.clear()
        })
    },
    onConfirm(value) {
      this.showPicker = false
      if (moment(value).format("YYYY-MM") !== this.queryMonth) {
        this.queryMonth = moment(value).format("YYYY-MM")
        this.page = 1
        this.getOrderList()
      }
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`
      } else if (type === "month") {
        return `${val}月`
      }
      return val
    },
    todetail(item) {
      this.$router.push({ name: "orderDetail", query: { consumeOrderNo: item.consumeOrderNo } })
    },
    onListLoad() {
      if (!this.isPullLoading) {
        this.getOrderList()
      } else {
        this.page = 1
        this.getOrderList()
      }
    },
    getOrderList() {
      let data = {
        queryMonth: this.queryMonth,
        state: this.state,
        page: this.page,
        pagesize: this.pagesize
      }
      API.getOrderList(data)
        .then(res => {
          if (!res.body.result || !res.success || !res.body.result.length) {
            this.list = []
            this.finished = true
            return
          }
          if (this.page === 1) {
            this.list = res.body.result
            this.finished = false
          } else {
            this.list = this.list.concat(res.body.result)
          }
          this.page += 1
          this.totalPage = res.body.pagination.totalPage
          if (this.list.length === res.body.pagination.total) {
            this.finished = true
          }
          this.loading = false
        })
        .catch(() => {
          // if (!res.__proto__.__CANCEL__) {
          //   this.finished = true
          // }
        })
        .finally(() => {
          this.isPullLoading = false
        })
    },
    // orderStatus(stateCd) {
    //   let arr = new Map([
    //     ["WAIT_PAY", "待付款"],
    //     ["WAIT_CANCEL_PAY", "待退款"],
    //     ["PAYING", "付款中"],
    //     ["PAID", "已付款"],
    //     ["CLOSE", "已关闭"],
    //     ["CANCEL_PAYING", "退款中"],
    //     ["CANCEL_PAID", "已退款"]
    //   ])
    //   return arr.get(stateCd)
    // },
    onRefresh() {
      //  this.finished = false
      // this.loading = false
      this.onListLoad()
    },
    tabChange(active) {
      this.list = []
      this.finished = false
      this.loading = true
      this.page = 1
      this.state = arr.get(active)
      this.getOrderList()
    }
  },
  destroyed() {
    this.gocheckingpayresult = null
  }
}
</script>
<style lang="scss" scoped>
.orders {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .selectdate {
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    span {
      vertical-align: middle;
    }
    img {
      width: 8px;
      height: 8px;
      margin-left: 6px;
    }
  }
  .stil_top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    ::v-deep .van-nav-bar__right {
      font-size: 13px;
      img {
        width: 8px;
        height: 8px;
        margin-left: 5px;
      }
    }
  }
  ::v-deep .van-pull-refresh__track {
    top: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding-top: 107px;
  }
  ::v-deep .van-tabs {
    font-size: 17px;
  }
  .orders_top {
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    z-index: 99;
  }
  .btm_list {
    width: 100%;
    height: 100%;
    background: #f7f7f7;
  }
  .order_list {
    padding: 10px 20px;
    font-size: 13px;
    color: #a8a8ac;
    margin: 10px 15px;
    background: white;
    border-radius: 8px;
    &:first-child {
      margin-top: 0;
    }
    .cblack {
      color: black;
    }
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 5px;
    }
    span {
      vertical-align: middle;
    }
    div {
      line-height: 25px;
    }
    .second_text {
      @include flex(row, space-between, center);
      .left_text {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .right_text {
        color: #047cfc;
        min-width: 40px;
        padding-left: 3px;
      }
    }
    .oli_station {
      font-size: 17px;
      color: black;
    }
    .oli_stationnumber {
      font-size: 12px;
      color: #ff4c37;
    }
    .orderpirce {
      font-size: 18px;
      font-weight: 550;
      vertical-align: baseline;
    }
    ::v-deep .van-button {
      width: 95px;
      border-radius: 4px;
      margin-top: 15px;
      height: 40px;
      line-height: 39px;
      font-size: 13px;
      border-radius: 25px;
      height: 32px;
    }
  }
  .btmbtndiv {
    text-align: right;
  }
}
.orderswechat {
  ::v-deep .van-pull-refresh__track {
    padding-top: 152px;
  }
  .orders_top {
    top: 45px;
  }
}
</style>
