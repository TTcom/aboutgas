<template>
  <div>
    <transition :name="transitionName">
      <router-view class="child-view" :class="{ childwechatstyle: iswechat }" v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </transition>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view" :class="{ childwechatstyle: iswechat }" v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import common from "@/utils/common"
export default {
  data() {
    return {
      transitionName: "slide-right",
      iswechat: false
    }
  },
  created() {
    if (common.isWechat()) {
      this.iswechat = true
    }
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = "slide-right"
    } else {
      this.transitionName = "slide-left"
    }
    this.$router.isBack = false
    next()
  }
}
</script>

<style scoped>
.child-view {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.childwechatstyle {
  padding-top: 45px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(50%, 0, 0);
  transform: translate3d(50%, 0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}
</style>
