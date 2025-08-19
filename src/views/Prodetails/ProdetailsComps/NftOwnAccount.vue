<template>
  <div style="width: 100%; margin-top: 30px">
    <v-row class="d-flex justify-space-between" no-gutters>
      <v-col cols="12" sm="5" class="d-flex">
        <span class="owner" style="font-size: 16px"
          >{{ $t("productDetail.auctionCard.startPrice") }}：</span
        >
        <v-avatar size="16" class="mt-1">
          <img :src="require('@/assets/coinType/' + nft.coin.code + '.png')" />
        </v-avatar>
        <div style="margin-left: 5px">
          <span style="font-size: 18px">{{ price }}</span>
          <!--          <div class="owner" style="font-size: 12px">≈ ${{ processingPrice }}</div>-->
        </div>
      </v-col>
      <v-col class="px-0 d-flex d-sm-block mt-4 mt-sm-0" cols="12" sm="7">
        <div class="owner mr-5 mr-sm-0 text-right" style="font-size: 16px">
          {{ $t("productDetail.auctionCard.remainingDate") }}
        </div>
        <div
          class="d-flex mt-sm-2 justify-end text-center btnColor--text"
          style="font-size: 24px; font-family: 'Roboto', sans-serif"
        >
          <div class="date fontColor2" style="border-radius: 5px">{{ d }}</div>
          <div class="date mx-3 fontColor2" style="border-radius: 5px">
            {{ h }}
          </div>
          <div class="date fontColor2" style="border-radius: 5px">{{ m }}</div>
          <div class="date ml-3 fontColor2" style="border-radius: 5px">
            {{ s }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-2" no-gutters>
      <v-col class="owner mt-1" cols="1" style="min-width: 64px">
        <span style="font-size: 16px"
          >{{ $t("productDetail.price.newPrice") }}：</span
        >
      </v-col>
      <v-col class="d-flex justify-start justify-sm-end pa-0">
        <div class="mt-2 mr-4">
          <v-avatar size="30">
            <img
              :src="require('@/assets/coinType/' + nft.coin.code + '.png')"
            />
          </v-avatar>
        </div>
        <div>
          <div style="font-size: 30px; font-weight: bold">
            {{ showPrice }} {{ nft.coin.code }}
          </div>
          <!--          <div class="owner text-right" style="font-size: 16px">≈ ${{ processingPrice }}</div>-->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { formatDecimal, numFormat, cutZero } from "@/utils/math";
import { mapGetters } from "vuex";

export default {
  name: "NftOwnAccount",
  data: () => ({
    d: "",
    h: "",
    m: "",
    s: "",
  }),
  props: ["nft"],
  created() {
    this.countTime();
  },
  computed: {
    ...mapGetters(["getRate", "getCoinById", "config"]),
    coin() {
      if (this.nft && this.nft.coin.id) {
        return this.getCoinById(this.nft.coin.id);
      } else return null;
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin);
    },
    // rate() {
    //   if (this.coin)
    //     return this.getRate(this.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    //   return null
    // },
    price() {
      return cutZero(formatDecimal(this.nft.price, 4));
    },
    showPrice() {
      if (this.price) {
        return cutZero(numFormat(this.price));
      }
      return null;
    },
    // processingPrice() {
    //   return cutZero(numFormat(formatDecimal(Number(this.price) * this.rate.rate, 4)))
    // },
    newPrice() {
      return cutZero(numFormat(formatDecimal(Number(this.current_price), 4)));
    },
    //竞拍截止时间
    nftEndTime() {
      const endTime = this.nft.end_time.split(/\./g)[0].replace(/T/g, " ");
      return endTime;
    },
  },
  methods: {
    countTime: function () {
      //获取当前时间
      let timeNow = new Date().getTime();
      let localTimeOffset = new Date().getTimezoneOffset() * 60000;

      // let yearNow = timeNow.getUTCFullYear()
      // let monthNow = timeNow.getUTCMonth() + 1
      // let dayNow = timeNow.getUTCDate()
      // let hoursNow = timeNow.getUTCHours()
      // let minutesNow = timeNow.getUTCMinutes()
      // let secondsNow = timeNow.getUTCSeconds()
      // let nowTime = [yearNow, monthNow, dayNow, hoursNow, minutesNow, secondsNow]
      // let now = Date.UTC(...nowTime)
      let now = timeNow + localTimeOffset;

      //设置截止时间
      // let time = this.nftEndTime;
      // let year = time.substring(0, 4);
      // let month = time.substring(5, 7);
      // let day = time.substring(8, 10);
      // let hours = time.substring(11, 13);
      // let minutes = time.substring(14, 16);
      // let seconds = time.substring(17, 19);
      // let endTime = [year, month, day, hours, minutes, seconds];
      // let end = Date.UTC(...endTime);
      let end = new Date(this.nftEndTime).getTime()

      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (
        this.s === "00" &&
        this.m === "00" &&
        this.h === "00" &&
        this.d === "00"
      ) {
        clearInterval(timer);
      }
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
        if (this.s < 10) {
          this.s = "0" + this.s;
        }
        if (this.m < 10) {
          this.m = "0" + this.m;
        }
        if (this.h < 10) {
          this.h = "0" + this.h;
        }
        if (this.d < 10) {
          this.d = "0" + this.d;
        }
      }
      //递归每秒调用countTime方法，显示动态时间效果
      let timer = setTimeout(this.countTime, 1000);
    },
  },
};
</script>

<style scoped>
.date {
  width: 40px;
  height: 40px;
  line-height: 40px;
}
</style>
