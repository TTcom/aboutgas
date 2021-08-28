<template>
  <div class="payRselut">
    <div class="top_content">
      <div>
        <img v-if="isSuccess === 0" src="./img/success.png" />
        <img v-if="isSuccess === 1" src="./img/failed.png" />
        <img v-if="isSuccess === 2" src="./img/failed.png" />
      </div>
      <div class="success_money" v-if="isSuccess === 0 || isSuccess === 2">￥{{ payInfo.amount }}</div>
      <div class="success_text" v-if="isSuccess === 0">支付成功</div>
      <div class="failed_text" v-if="isSuccess === 1">支付失败：{{ payInfo.failmsg }}</div>
      <div class="failed_text" v-if="isSuccess === 2">支付取消</div>
    </div>
    <div class="paymessage" v-if="isSuccess === 0 || isSuccess === 2">
      <div class="btm_msg">
        <div class="left_text">加油站</div>
        <div>{{ payInfo.stationName }}</div>
      </div>
      <div class="btm_msg">
        <div class="left_text">数量</div>
        <div>
          <span class="oiltypenum">{{ payInfo.addOilType }}柴油</span><span class="oiltypenum">国{{ payInfo.addOilLevel }}</span> {{ payInfo.addCount }}L
        </div>
      </div>
      <div class="btm_msg">
        <div class="left_text">单价</div>
        <div>
          ￥{{ payInfo.price }}/L <span class="totalPricetext">￥{{ payInfo.stationPice }}/L</span>
        </div>
      </div>
      <div class="btm_msg">
        <div class="left_text">支付时间</div>
        <div>{{ payInfo.payTime }}</div>
      </div>
      <div class="btm_msg">
        <div class="left_text">为您节省</div>
        <div class="moneytext" v-if="payInfo.discountAmount">￥{{ payInfo.discountAmount.toFixed(2) }}</div>
      </div>
    </div>
    <div class="oil_server" @click="gopalyphone">
      <span class="inneroil_server">
        <img src="./img/telpice.png" />
        <span>老吕加油客服</span>
      </span>
    </div>
    <div class="page_btm">
      <div class="btm_btn">
        <button type="button" v-if="isSuccess === 0" class="left_btn" @click="toOrderList">查看订单</button>
        <button type="button" v-if="isSuccess === 0" class="right_btn" @click="noteBoolBtn">返回个人中心</button>
        <button type="button" v-if="isSuccess === 1 || isSuccess === 2" class="failed_btn" @click="goaginpay">重新支付</button>
      </div>
    </div>
  </div>
</template>
<script>
import command from "@/utils/common"
import bridge from "@/utils/bridge"
export default {
  name: "payRselut",
  props: {
    payInfo: {
      type: Object,
      defalut: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isSuccess: 0 //0成功，1失败，2取消
    }
  },
  methods: {
    goaginpay() {
      this.$emit("payagin")
    },
    gopalyphone() {
      if (window.AndroidFunction !== undefined) {
        window.AndroidFunction.callPhone("4009001211")
      }
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        const args = "4009001211"
        window.tdh007.invokeNative("callPhone", args)
      }
      if (command.isWechat()) {
        window.location.href = "tel:4009001211"
      }
    },
    noteBoolBtn() {
      //  此时点击返回会员中心
      if (command.isWechat()) {
        window.open(`${process.env.VUE_APP_YOUKA_APP_URL}/#/personInfo`)
      } else {
        //  回到APP会员中心页面
        if (window.AndroidFunction !== undefined) {
          window.AndroidFunction.toPersonalCenter()
        } else {
          bridge.Core.callNativeHandler("toPersonalCenter")
        }
      }
    },
    toOrderList() {
      this.$router.push({
        name: "orderDetail",
        query: {
          consumeOrderNo: this.payInfo.consumeOrderNo
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.payRselut {
  width: 100%;
  position: relative;
  padding-bottom: 80px;
  background: #f7f7f7;
  .oiltypenum {
    margin-right: 5px;
  }
  .moneytext {
    color: #ff3b30;
  }
  .top_content {
    height: 220px;
    margin-bottom: 10px;
    @include flex(column, center, center);
    background: white;
    img {
      height: 64px;
      width: 64px;
    }
  }
  .paymessage {
    margin: 15px;
    background: white;
    padding: 5px 0;
    border-radius: 8px;
  }
  .btm_msg {
    @include flex(row, space-between, center);
    height: 38px;
    padding: 0 15px;
    .left_text {
      color: #737373;
    }
    .totalPricetext {
      color: #a8a8a8;
      margin-left: 6px;
      text-decoration: line-through;
    }
  }
  .success_text {
    font-size: 17px;
    color: #1677ff;
    margin: 10px 0;
    text-align: center;
  }
  .failed_text {
    @extend .success_text;
    color: #ff3b30;
  }
  .success_money {
    color: rgba(34, 34, 34, 1);
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }
  .oil_server {
    margin: 40px 0;
    text-align: center;
    color: #047cfc;
    font-size: 13px;
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 2px;
    }
    .inneroil_server {
      padding-top: 1px;
      display: inline-block;
      vertical-align: middle;
      padding: 8px 10px;
      background: white;
      border-radius: 22px;
      span {
        vertical-align: middle;
      }
    }
  }
  .page_btm {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    font-size: 17px;
    .btm_btn {
      height: 80px;
      padding: 0 15px;
      @include flex(row, space-between, center);
      button {
        border: none;
        border-radius: 2px;
        border-radius: 2px;
        flex: 1;
        background: none;
        height: 48px;
        font-size: 17px;
      }
      .left_btn {
        margin-right: 8px;
        border-radius: 24px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 117, 249, 1);
        color: #047cfc;
      }
      .right_btn {
        margin-left: 8px;
        background: #1989fa;
        color: white;
        border-radius: 24px;
        background-color: rgba(4, 124, 252, 1);
      }
      .failed_btn {
        @extend .right_btn;
        margin: 0;
      }
    }
  }
}
</style>
