<template>
  <div class="pay">
    <!-- <van-nav-bar left-arrow @click-left="$router.goBack()"></van-nav-bar> -->
    <payIndex ref="payIndex" v-if="showIndex === 1" @codeStatus="codeStatus"> </payIndex>
    <trading ref="trading" v-if="showIndex === 2" @paystatus="paystatus" @aginscancode="aginscancode"></trading>
    <payRselut ref="payRselut" v-if="showIndex === 3" :payInfo="payInfo" @payagin="aginscancode"></payRselut>
  </div>
</template>
<script>
import payIndex from "./payIndex"
import trading from "./trading"
import payRselut from "./payRselut"
import API from "@/api/pay"
export default {
  name: "pay",
  components: {
    payIndex,
    trading,
    payRselut
  },
  data() {
    return {
      showIndex: 0,
      payInfo: {}
    }
  },
  mounted() {
    if (this.$route.query.paystatus) {
      if (this.$route.query.payInfo) {
        this.payInfo = JSON.parse(this.$route.query.payInfo)
        console.log(this.payInfo)
      }
      this.showIndex = 3
      this.$nextTick(() => {
        if (this.$route.query.paystatus === "PAY_SUCCESS") {
          this.$refs.payRselut.isSuccess = 0
        }
        if (this.$route.query.paystatus === "PAY_FAIL") {
          this.$refs.payRselut.isSuccess = 1
        }
        if (this.$route.query.paystatus === "PAY_CANEL") {
          this.$refs.payRselut.isSuccess = 2
        }
      })
    } else {
      this.showIndex = 1
    }
  },
  methods: {
    aginscancode() {
      this.showIndex = 1
    },
    paystatus(status, payInfo) {
      this.showIndex = 3
      this.$nextTick(() => {
        if (status !== "PAY_FAIL") {
          this.payInfo = payInfo
        } else {
          this.payInfo = {
            failmsg: payInfo
          }
        }
        if (status === "PAY_SUCCESS") {
          this.$refs.payRselut.isSuccess = 0
        } else if (status === "PAY_FAIL" || status === "PAY_INVALID") {
          this.$refs.payRselut.isSuccess = 1
        } else {
          this.$refs.payRselut.isSuccess = 2
        }
      })
    },
    codeStatus(status, tradeId) {
      if (status === "scanning") {
        this.showIndex = 2
        this.$nextTick(() => {
          this.$refs.trading.checkTrading(tradeId)
        })
      }
    }
  },
  destroyed() {
    console.log("likai")
    API.closevalidedqrcode().then(res => {
      //关闭二维码交易
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
.pay .van-nav-bar {
  position: fixed;
}
.pay {
  height: 100%;
  width: 100%;
  ::v-deep .van-nav-bar {
    background-color: #0490fc;
    .van-icon-arrow-left::before,
    .van-nav-bar__title {
      color: white;
    }
  }
  .van-hairline--bottom::after {
    border: none;
  }
}
</style>
