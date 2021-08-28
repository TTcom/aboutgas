<template>
  <div class="orderDetail">
    <!-- <van-nav-bar left-arrow title="" @click-left="$router.goBack()" /> -->
    <van-nav-bar />
    <div class="innerorderDetail" v-show="orderDetail">
      <div class="top_content">
        <div>
          <img :src="detaiImaeg(orderDetail.stateCd)" />
        </div>
        <div>
          ￥<span class="success_money" v-if="orderDetail.totalPrice">{{ parseFloat(orderDetail.totalPrice).toFixed(2) }}</span>
        </div>
        <div class="waitting_text">{{ orderDetail.stateCdTex }}</div>
      </div>
      <div class="squediv">
        <div class="btm_msg">
          <div class="left_text">加油站</div>
          <div class="right_text">{{ orderDetail.stationName }}</div>
        </div>
        <div class="btm_msg">
          <div class="left_text">类型</div>
          <div class="right_text">
            <span class="oiltypenum">{{ orderDetail.oilType }}柴油</span>
            <span>国{{ orderDetail.oilLevel }}</span>
          </div>
        </div>
        <div class="btm_msg">
          <div class="left_text">数量</div>
          <div class="right_text">{{ orderDetail.count }}L</div>
        </div>
        <div class="btm_msg">
          <div class="left_text">单价</div>
          <div class="right_text">
            ￥{{ orderDetail.price }}/L <span class="totalPricetext">￥{{ orderDetail.marketStationPrice }}/L</span>
          </div>
        </div>
        <div class="btm_msg">
          <div class="left_text">应付金额</div>
          <div class="right_text" v-if="orderDetail.originalAmount">￥{{ parseFloat(orderDetail.originalAmount).toFixed(2) }}</div>
        </div>
        <div class="btm_msg">
          <div class="left_text">优惠金额</div>
          <div class="right_text corange" v-if="orderDetail.discountAmount">￥{{ parseFloat(orderDetail.discountAmount).toFixed(2) }}</div>
        </div>
        <div class="btm_msg">
          <div class="left_text">实付金额</div>
          <div class="right_text" v-if="orderDetail.totalPrice">￥{{ parseFloat(orderDetail.totalPrice).toFixed(2) }}</div>
        </div>
      </div>
      <div class="squediv">
        <div class="btm_msg">
          <div class="left_text">支付时间</div>
          <div class="right_text">{{ orderDetail.payTime }}</div>
        </div>
        <div class="btm_msg">
          <div class="left_text">订单编号</div>
          <div class="right_text">{{ orderDetail.consumeOrderNo }}</div>
        </div>
        <div class="btm_msg">
          <div class="left_text">交易单号</div>
          <div class="right_text">{{ orderDetail.thirdOrderNo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/api/orders"
export default {
  name: "orderDetail",
  data() {
    return {
      orderDetail: ""
    }
  },
  created() {
    console.log(this.$route.query.consumeOrderNo)
    API.consumeOrderDetail({ consumeOrderNo: this.$route.query.consumeOrderNo }).then(res => {
      console.log(res)
      if (res.body) {
        this.orderDetail = res.body
      }
    })
  },
  methods: {
    // getOrderStatus(stateCd) {
    //   let weakArr = new Map([
    //     ["CANCEL_PAID", "已退款"],
    //     ["CANCEL_PAYING", "退款中"],
    //     ["CLOSE", "已关闭"],
    //     ["PAID", "已付款"],
    //     ["PAYING", "付款中"],
    //     ["WAIT_CANCEL_PAY", "待退款"],
    //     ["WAIT_PAY", "待付款"]
    //   ])
    //   return weakArr.get(stateCd)
    // },
    detaiImaeg(stateCd) {
      switch (stateCd) {
        case "WAIT_PAY":
        case "WAIT_CANCEL_PAY":
        case "PAYING":
        case "CANCEL_PAYING":
          return require("./img/waitting.png")
          break
        case "PAID":
          return require("./img/success.png")
          break
        case "CANCEL_PAID":
          return require("./img/refundsuccess.png")
          break
        case "CLOSE":
          return require("./img/closed.png")
          break
        default:
          return require("./img/waitting.png")
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.orderDetail {
  height: 100%;
  width: 100%;
  .innerorderDetail {
    background: #f7f7f7;
    padding-bottom: 10px;
  }
  .squediv {
    margin: 15px;
    background: white;
    border-radius: 8px;
  }
  .van-nav-bar {
    position: fixed;
    .van-icon-arrow-left::before {
      color: #bbbbbb;
    }
  }
  .top_content {
    height: 140px;
    padding-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 64px;
      width: 64px;
    }
  }
  .btm_msg {
    @include flex(row, space-between, center);
    height: 40px;
    padding: 0 25px;
    .left_text {
      color: #737373;
      min-width: 60px;
    }
    .right_text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 10px;
      .oiltypenum {
        margin-right: 6px;
      }
      .corange {
        color: #ff3b30;
      }
      .totalPricetext {
        color: #a8a8a8;
        margin-left: 6px;
        text-decoration: line-through;
      }
    }
  }
  .waitting_text {
    font-size: 18px;
    margin: 10px 0;
    text-align: center;
  }
  .failed_text {
    @extend .waitting_text;
    color: #ff3b30;
  }
  .success_money {
    color: rgba(34, 34, 34, 1);
    font-size: 26px;
    font-weight: 600;
    text-align: center;
    margin-top: 15px;
  }
}
</style>
