<template>
  <div class="trading">
    <div class="top_img">
      <img src="./img/time.png" />
    </div>
    <div>
      加油员正在交易，请耐心等待交易结果…
    </div>
    <div class="btm_btn">
      <van-button type="info" @click="abandon">重新扫码</van-button>
    </div>
  </div>
</template>
<script>
import API from "@/api/pay"
export default {
  name: "",
  data() {
    return {
      hasAbandon: false,
      tradeId: ""
    }
  },
  methods: {
    abandon() {
      //放弃交易
      this.hasAbandon = true
      this.checkTrading = null
      let params = {
        tradeId: this.tradeId
      }
      API.closeoiltrading(params).then(res => {
        console.log(res)
        this.checkTrading = null
        this.$emit("aginscancode")
      })
    },
    checkTrading(tradeId) {
      this.tradeId = tradeId
      let params = {
        tradeId: tradeId
      }
      //等待结果
      API.checktrading(params).then(res => {
        console.log(res)
        if (this.hasAbandon) return
        if (res.body.stateCode === "PAYING") {
          //交易中
          if (this.checkTrading) this.checkTrading(tradeId)
        }
        if (res.body.stateCode === "PAY_SUCCESS") {
          //支付成功
          this.$emit("paystatus", "PAY_SUCCESS", res.body.payInfo)
        }
        if (res.body.stateCode === "PAY_FAIL") {
          //支付失败
          this.$emit("paystatus", "PAY_FAIL", res.body.stateDesc)
        }
        if (res.body.stateCode === "INVALID") {
          //支付失效
          this.$emit("paystatus", "PAY_INVALID")
        }
        if (res.body.stateCode === "CANEL") {
          //支付取消
          this.$emit("paystatus", "PAY_CANEL", res.body.payInfo)
        }
      })
    }
  },
  destroyed() {
    this.checkTrading = null
  }
}
</script>
<style lang="scss" scoped>
.trading {
  height: 100%;
  width: 100%;
  @include flex(column, center, center);
  .top_img {
    margin-bottom: 30px;
    img {
      height: 62px;
      width: 54px;
    }
  }
  .btm_btn {
    margin-top: 20px;
    ::v-deep .van-button {
      width: 170px;
      border-radius: 5px;
      height: 48px;
      font-size: 18px;
    }
  }
}
</style>
