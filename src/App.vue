<template>
  <div id="app">
    <wechatheader v-if="iswechat"></wechatheader>
    <router-view />
  </div>
</template>
<script>
import common from "@/utils/common"
import wechatheader from "@/common/wechatheader"
export default {
  components: {
    wechatheader
  },
  data() {
    return {
      iswechat: false
    }
  },
  created() {
    if (common.isWechat()) {
      this.iswechat = true
    }
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  font-size: 15px;
  background: #f7f7f7;
}
</style>
