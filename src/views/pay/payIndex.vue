<template>
  <div class="payIndex">
    <slot name="header"></slot>
    <div class="pay_content">
      <div class="title">
        <img src="./img/talkface.png" class="pay_img" />
        <span class="pay_span" style="vertical-align: baseline;">请提醒加油员使用老吕加油扫码结算</span>
        <span v-if="loading">loadinggggg</span>
      </div>
      <div class="pay_contentxx">
        <div class="pay_qrcode">
          <vue-qr :text="qrcode.url" :logoSrc="qrcode.logoSrc" :size="160" :margin="0"></vue-qr>
        </div>
        <div class="pay_repaly">
          <div>
            <span class="cblue">{{ qrcode.time }}</span
            ><span class="cgray">s后自动更新</span>
          </div>
          <div>
            <span @click="getCodeUrl" class="refreshspan">
              <span class="cblue pay_span" style="margin-left:0;">点此刷新</span>
              <img src="./img/replay.png" class="refresh_pay_img"
            /></span>
          </div>
        </div>
        <div class="btm_text">
          <img src="./img/moneypic.png" class="pay_img" />
          <span class="pay_span">账户余额</span>
        </div>
        <div class="money_text">
          ￥<span class="userbalance">{{ totalAmount }}</span>
        </div>
        <div class="btm_text">
          <img src="./img/nowoilstation.png" class="pay_img" />
          <span class="pay_span">当前油站</span>
        </div>
        <div class="oliplace_text">{{ stationName }}</div>
        <div class="btm_msg">
          <img src="./img/oilx.png" class="pay_img" />
          <span class="pay_span">由老吕加油提供服务</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQr from "vue-qr"
import API from "@/api/pay"
export default {
  name: "pay",
  components: {
    VueQr
  },
  data() {
    return {
      loading: false,
      stationName: "",
      totalAmount: "",
      qrcode: {
        url: "",
        logoSrc: require("./img/oilxxx.png"),
        time: ""
      }
    }
  },
  created() {
    this.stationName = this.$route.query.stationName
  },
  mounted() {
    this.getCodeUrl()
    this.getAvailableAmount()
  },
  methods: {
    destroycheckcode() {
      this.checkQrcode = null
      if (this.checkQrcodeTimer) {
        clearTimeout(this.checkQrcodeTimer)
      }
      if (this.codeTimeInterval) {
        clearInterval(this.codeTimeInterval)
      }
    },
    getAvailableAmount() {
      API.getAvailableAmount().then(res => {
        console.log(res)
        if (res.success) {
          this.totalAmount = res.body.totalAmount
        }
      })
    },
    checkQrcode() {
      API.checkqrcode({ qrcodeStr: this.qrcode.url }).then(res => {
        console.log(res)
        if (res.body.stateCode === "INVALID") {
          //二维码失效
          console.log("二维码失效")
          this.getCodeUrl()
        }
        if (res.body.stateCode === "SUCCESS") {
          //扫码成功
          this.$emit("codeStatus", "scanning", res.body.tradeId)
        }
        if (res.body.stateCode === "UNSCAN") {
          //未扫码
          console.log("未扫码")
          this.checkQrcodeTimer = setTimeout(() => {
            if (this.checkQrcode) {
              this.checkQrcode()
            } else {
              clearTimeout(this.checkQrcodeTimer)
            }
          }, 2000)
        }
      })
    },
    getCodeUrl() {
      //获取二维码轮询
      API.getcodeurl().then(res => {
        console.log(res)
        if (res.success) {
          if (!res.body.effectiveEndTime || !res.body.effectiveStartTime) {
            return
          }
          if (this.checkQrcodeTimer) {
            clearTimeout(this.checkQrcodeTimer)
          }
          this.qrcode.url = res.body.qrcodeStr
          this.checkQrcode()
          this.qrcode.time = (new Date(res.body.effectiveEndTime.replace(/-/g, "/")) - new Date(res.body.effectiveStartTime.replace(/-/g, "/"))) / 1000
          if (this.codeTimeInterval) {
            clearInterval(this.codeTimeInterval)
          }
          this.codeTimeInterval = setInterval(() => {
            if (this.qrcode.time === 0) {
              if (this.getCodeUrl) {
                this.getCodeUrl()
              } else {
                clearInterval(this.codeTimeInterval)
              }
            } else {
              this.qrcode.time--
            }
          }, 1000)
        }
      })
    }
  },
  destroyed() {
    clearTimeout(this.checkQrcodeTimer)
    clearInterval(this.codeTimeInterval)
    this.checkQrcode = null
    this.getCodeUrl = null
  }
}
</script>
<style lang="scss" scoped>
.payIndex {
  height: 100%;
  width: 100%;
  padding-top: 10px;
  background: #0490fc;
  box-sizing: border-box;
  .pay_content {
    background: white;
    border-radius: 8px;
    margin: 0 10px;
  }
  .pay_contentxx {
    padding: 0 10px;
  }
  .title {
    padding: 0 10px;
    height: 56px;
    line-height: 56px;
    color: #047cfc;
    font-size: 17px;
    background-color: rgba(248, 248, 248, 1);
    border-radius: 8px 8px 0 0;
  }
  .pay_qrcode {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 20px;
    height: 160px;
  }
  .pay_repaly {
    line-height: 30px;
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #e9eaea;
    margin-bottom: 20px;
    img {
      margin-left: 5px;
    }
  }
  .btm_text {
    margin-top: 10px;
    margin-bottom: 6px;
  }
  .money_text {
    margin-left: 30px;
    color: black;
    .userbalance {
      font-size: 18px;
      font-weight: 550;
    }
  }
  .oliplace_text {
    font-size: 13px;
    margin-left: 30px;
    padding-bottom: 15px;
  }
  .cgray {
    color: #b9b9bc;
  }
  .cblue {
    color: #56a7fd;
  }
  .btm_msg {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #e9eaea;
  }
  .pay_img {
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }
  .refresh_pay_img {
    vertical-align: middle;
    width: 16px;
    height: 16px;
  }
  .pay_span {
    margin-left: 10px;
    vertical-align: middle;
  }
  .refreshspan {
    display: inline-block;
    background-color: rgba(230, 246, 255, 1);
    border-radius: 25px;
    padding: 0 10px;
    text-align: center;
    margin-top: 5px;
  }
}
</style>
