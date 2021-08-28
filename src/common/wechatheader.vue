<template>
  <div class="wechatheader" :class="{ cpaystlye: $route.meta.title === '付款' }">
    <div class="leftarrow" @click="goback"><van-icon name="arrow-left" /></div>
    <div class="titletext">{{ $route.meta.title }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goback() {
      if (navigator.userAgent.match("TDH007") !== null && sessionStorage.getItem("ishavekybfirstpage") === window.location.href) {
        this.$backKybPge()
        return
      }
      window.history.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.leftarrow {
  width: 50px;
  text-align: center;
  position: absolute;
  left: 0;
}
.titletext {
  width: 100%;
  text-align: center;
}
.wechatheader {
  height: 45px;
  line-height: 45px;
  width: 100%;
  background: white;
  font-size: 18px;
  color: black;
  font-weight: 550;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  .van-icon-arrow-left {
    line-height: 45px;
  }
  .van-icon-arrow-left::before {
    color: black;
  }
}
.cpaystlye {
  background: #0490fc;
  color: white;
  .van-icon-arrow-left::before {
    color: white;
  }
}
</style>
