<template>
  <div class="olistationcard">
    <van-card ref="item" v-for="(item, index) in oilStationList" :key="index" :price="item.lvPrice" :title="item.stationName" @click.stop="goDetails(item.stationId)">
      <template #thumb>
        <div v-lazy-container="{ selector: 'img' }">
          <img
            class="van-card__thumb"
            :data-src="item.pictures && item.pictures[0] ? item.pictures[0] : ''"
            :data-error="require('./img/oilstationsmall.png')"
            :data-loading="require('./img/oilstationsmall.png')"
          />
        </div>
      </template>
      <template #desc>
        <van-row type="flex" justify="space-between">
          <van-col span="14" class="desc">{{ item.address }}</van-col>
          <van-col span="10" class="desc" style="text-align: right;">
            <span>
              <span v-if="item.distance">{{ item.distance }}km</span>
              <span style="color: rgba(4, 124, 252, 100);margin-left:3px;" @click.stop="openLocation(item)">导航</span>
            </span>
          </van-col>
        </van-row>
      </template>
      <template #tags>
        <div>
          <van-tag class="infoTag">
            <span>{{ item.plateFormName }}</span>
          </van-tag>
          <van-tag class="infoTag">
            <span>{{ item.guns && item.guns[0] ? item.guns[0].skuName.split(" ")[0] : "" }}</span>
          </van-tag>
          <van-tag class="infoTag OtherTag">
            <span>省{{ item.guns && item.guns[0] ? (item.guns[0].basePrice - item.guns[0].lvPrice).toFixed(2) : "" }}</span>
          </van-tag>
        </div>
      </template>
      <template #bottom>
        <div class="lvPrice">
          <span style="font-size:12px">￥</span>
          <span>{{ item.guns && item.guns[0] ? item.guns[0].lvPrice : "" }}</span>
        </div>
        <van-button class="addOil" @click.stop="addOil(item)">立即加油</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: ["oilStationList"],
  data() {
    return {}
  },
  methods: {
    goDetails(stationId) {
      this.$emit("goDetails", stationId)
    },
    openLocation(item) {
      this.$emit("openLocation", item)
    },
    addOil(item) {
      this.$emit("addOil", item)
    }
  }
}
</script>

<style scoped lang="scss">
.van-card {
  width: 343px;
  border-radius: 8px;
  min-height: 150px;
  background: #fff;
  margin: 16px auto;
  padding: 14px !important;
  .van-card__thumb {
    @include wh(48px !important, 48px !important);
    border-radius: 5px;
    margin-right: 12px;
  }
  .van-card__title {
    @include sc(18px, #222);
    font-weight: 550;
    max-height: inherit;
    line-height: inherit;
  }
  .van-card__price {
    color: #ff6000;
    .van-card__price-integer,
    .van-card__price-decimal {
      font-size: 20px;
    }
  }
  .van-card__bottom {
    margin-top: 16px;
  }
  .desc {
    @include sc(13px, #999);
    margin: 8px 0;
    margin-top: 3px;
    display: inline-block;
    .gpsIcon {
      @include wh(12px, 12px);
    }
  }
  .lvPrice {
    color: #ff4c37;
    font-size: 23px;
    display: inline-block;
  }
  .infoTag {
    font-size: 11px;
    margin: 0 2px;
    background-color: rgba(29, 123, 255, 0.1);
    color: #1d7bff;
  }
  .OtherTag {
    background: rgba(255, 96, 0, 0.1);
    color: #ff6000;
  }
  .addOil {
    @include wh(84px, 32px);
    @include sc(15px, #fff);

    border-radius: 16px;
    background-image: linear-gradient(to right, #048cfc, #0469fc);
    padding: 0 !important;
    float: right;
  }
}
img[src=""],
img:not([src]) {
  opacity: 0;
}
</style>
