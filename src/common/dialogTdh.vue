<template>
  <div class="dialogTdh" v-if="show">
    <transition name="van-fade">
      <div>
        <!-- 参数 说明 -->
        <!-- title 标题 -->
        <!-- message 文本内容，支持通过\n换行 string-->
        <!-- messageAlign 内容对齐方式，可选值为left right -->
        <!-- showConfirmButton 是否展示确认按钮 boolean true -->
        <!-- showCancelButton 是否展示取消按钮 boolean false-->
        <!--confirmButtonText 确认按钮文案 string 确认 -->
        <!-- confirmButtonColor 确认按钮颜色 string #1989fa-->
        <!--cancelButtonText 取消按钮文案 string 取消 -->
        <!-- cancelButtonColor 取消按钮颜色 string black -->
        <!-- overlay 是否展示遮罩层 boolean true  -->
        <!-- closeOnClickOverlay 是否在点击遮罩层后关闭弹窗 -->
        <!-- beforeClose 关闭前的回调函数， 调用 -->
        <!-- confirm 父组件点击确认按钮 -->
        <van-dialog
          :title="title"
          :message="message"
          :messageAlign="messageAlign"
          :className="className"
          v-model="show"
          :showConfirmButton="showConfirmButton"
          :showCancelButton="showCancelButton"
          :confirmButtonColor="confirmButtonColor"
          :confirmButtonText="confirmButtonText"
          :cancelButtonColor="cancelButtonColor"
          :beforeClose="beforeClose"
          @confirm="confirm"
        >
        </van-dialog>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "dialogTdh",
  components: {},

  props: ["message", "title", "messageAlign", "confirmButtonText", "overlay", "className", "showConfirmButton", "showCancelButton", "confirmButtonColor", "cancelButtonColor", "beforeClose"],
  data() {
    return {
      show: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    confirm() {
      this.$emit("confirm")
    }
  }
}
</script>

<style lang="scss">
.dialogTdh {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 11;
  left: 0;
  right: 0;
  bottom: 0;
  .close {
    position: absolute;
    left: 0 !important;
    right: 0;
    margin-top: 180px;
    margin-left: 345px;
    z-index: 3000;
  }
  .van-button__content {
    width: 280px;
    height: 42px;
    line-height: 42px;
    border-radius: 8px;
    background-image: linear-gradient(to right, #048cfc, #0469fc);
    color: #fff;
    text-align: center;
    margin: 0 auto 20px;
  }
}
</style>
