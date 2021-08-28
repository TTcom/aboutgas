<!--
 * @Author: zhangjing
 * @Date: 2020-07-20 17:25:32
 * @Description: 
 * @FilePath: \gas-h5\src\common\headTdh.vue
-->
<template>
  <div class="headTdh">
    <van-sticky>
      <van-nav-bar @click-left="$router.goBack()">
        <template #left>
          <van-icon name="arrow-left" />
        </template>
        <template #title>
          <span>{{ title }}</span>
        </template>

        <template #right>
          <slot name="rightIcon"></slot>
        </template>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>
<script>
import Vue from "vue"
import { Sticky, NavBar } from "vant"
Vue.use(Sticky)
Vue.use(NavBar)
export default {
  name: "headTdh",
  data() {
    return {
      title: this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.headTdh {
  position: absolute;
  width: 100%;
  .nav-right {
    img {
      width: 12px;
      height: 12px;
    }
    .nav-right-title {
      height: 11px;
      line-height: 11px;
    }
  }
}
</style>
