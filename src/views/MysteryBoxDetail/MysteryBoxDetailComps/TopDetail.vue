<template>
  <div class="detail">
    <div class="text-truncate detail_title">
      {{ data.name }}
    </div>
    <div class="nft_detail">
      <div></div>
      <v-img class="logo" src="@/assets/lightLogo.png"></v-img>
      <span class="span">{{ data.sub_title }}</span>
    </div>
    <div class="remainingAmount">
      {{ $t("mysteryBox.mysteryBoxDetail.remainingAmount") }}
      {{ data.current_store }}/{{ data.total_store }}
    </div>
    <v-divider class="divider"></v-divider>

    <div class="price" :class="!isShowTime ? 'startTimeBtn' : ''">
      <p>{{ $t("mysteryBox.mysteryBoxDetail.price") }}:</p>
      <div class="d-flex">
        <v-img
          class="img"
          :src="
            require(`@/assets/coinType/${
              data.coin ? data.coin.code : 'USDT'
            }.png`)
          "
        ></v-img>
        <span>{{ currentPrice }}</span>
      </div>
    </div>

    <div class="time" v-if="isShowTime">
      <p>{{ $t("mysteryBox.mysteryBoxDetail.startTime") }}</p>
      <div
        class="d-flex mt-sm-2 text-center btnColor--text"
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
    </div>
    <div class="btn">
      <v-btn
        :loading="loading"
        block
        elevation="0"
        height="50"
        :disabled="isBtn"
        @click="buyClick"
      >
        {{
          $t(`mysteryBox.mysteryBoxDetail.${showEndTime && data.current_store > 0  ? "buyNow" : "buyEnd"}`)
        }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { formatStrPrice, numFormat, cutZero } from "@/utils/math";
// import moment from "moment";
import { mapGetters } from "vuex";
import { buyBlindbox } from "@/api/mysteryBox";

export default {
  name: "TopDetail",
  props: ["data"],
  data: () => ({
    d: "",
    h: "",
    m: "",
    s: "",
    changeBtn: false,
    loading: false,

    nowTime:new Date()
  }),
  created() {
    this.countTime();
  },
  computed: {
    ...mapGetters(["user"]),
    currentPrice() {
      return cutZero(formatStrPrice(numFormat(this.data.price), 4));
    },
    startAndCurrent() {
      // let time = new Date()
      let localTime = this.nowTime.getTime()
      let localTimeOffset = this.nowTime.getTimezoneOffset()*60000

      let utcTime = localTime + localTimeOffset

      let start = new Date(this.data.start_time).getTime()

      // let time = new Date();
      // let year = time.getUTCFullYear();
      // let month = time.getUTCMonth() + 1;
      // let day = time.getUTCDate();
      // let hours = time.getUTCHours();
      // let minutes = time.getUTCMinutes();
      // let seconds = time.getUTCMilliseconds();
      // let nowTime = [year, month, day, hours, minutes, seconds];
      //
      // let current = Date.UTC(...nowTime);
      //
      // let start_time = this.data.start_time ? this.data.start_time : "";
      //
      // let yearTime = start_time.substring(0, 4);
      // let monthTime = start_time.substring(5, 7);
      // let dayTime = start_time.substring(8, 10);
      // let hoursTime = start_time.substring(11, 13);
      // let minutesTime = start_time.substring(14, 16);
      // let secondsTime = start_time.substring(17, 19);
      // let startTime = [
      //   yearTime,
      //   monthTime,
      //   dayTime,
      //   hoursTime,
      //   minutesTime,
      //   secondsTime,
      // ];
      // let start = Date.UTC(...startTime);
      //时间差（当前时间-开始时间）
      let difference = utcTime - start;
      return difference;

    },
    endAndCurrent() {
      // let time = new Date()
      let localTime = this.nowTime.getTime()
      let localTimeOffset = this.nowTime.getTimezoneOffset()*60000

      let utcTime = localTime + localTimeOffset

      let end = new Date(this.data.end_time).getTime()

      // let time = new Date();
      // let year = time.getUTCFullYear();
      // let month = time.getUTCMonth() + 1;
      // let day = time.getUTCDate();
      // let hours = time.getUTCHours();
      // let minutes = time.getUTCMinutes();
      // let seconds = time.getUTCMilliseconds();
      // let nowTime = [year, month, day, hours, minutes, seconds];
      // let current = Date.UTC(...nowTime);
      //
      // // let end = moment(this.data.end_time);
      // // return end.diff(current);
      // let end_time = this.data.end_time ? this.data.end_time : "";
      // let yearTime = end_time.substring(0, 4);
      // let monthTime = end_time.substring(5, 7);
      // let dayTime = end_time.substring(8, 10);
      // let hoursTime = end_time.substring(11, 13);
      // let minutesTime = end_time.substring(14, 16);
      // let secondsTime = end_time.substring(17, 19);
      // let endTime = [
      //   yearTime,
      //   monthTime,
      //   dayTime,
      //   hoursTime,
      //   minutesTime,
      //   secondsTime,
      // ];
      // let end = Date.UTC(...endTime);
      //时间差（结束时间-当前时间）
      let difference = end - utcTime;
      return difference;
    },
    showTime() {
      if (this.startAndCurrent < 0) {
        return this.data.start_time;
      } else if (this.endAndCurrent > 0) {
        return this.data.end_time;
      } else {
        return "2022-02-18T10:45:13";
      }
    },
    // showStartTime() {
    //   if (this.startAndCurrent < 0) {
    //     return true;
    //   }
    //   return false;
    // },
    showEndTime() {
      if (this.endAndCurrent > 0) {
        return true;
      }
      return false;
    },
    isShowTime() {
      if (this.startAndCurrent < 0) {
        return true;
      }
      return false;
    },
    isBtn() {
      if(this.data.current_store <= 0)
        return true
      if (this.startAndCurrent < 0) {
        return true;
      } else if (this.endAndCurrent < 0) {
        return true;
      } else if (this.changeBtn) {
        return true;
      }
      return false;
    },
    //竞拍截止时间
    // nftEndTime() {
    //   if (this.nft && this.nft.end_time) {
    //     const endTime = this.nft.end_time.split(/\./g)[0].replace(/T/g, ' ')
    //     return endTime
    //   } else {
    //     return false
    //   }
    // }
  },
  methods: {
    //购买
    buyClick() {
      this.loading = true;
      buyBlindbox(this.data.id, { amount: 1 })
        .then((res) => {
          if (res.code === 0) {
            this.$emit("clickBuy");
            this.$toast.success(this.$t("mysteryBox.mysteryBoxDetail.success"));
          } else {
            this.toasterErr(res.code);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    countTime: function () {
      this.nowTime = new Date()
      //获取当前时间
      let timeNow = this.nowTime;
      let yearNow = timeNow.getUTCFullYear();
      let monthNow = timeNow.getUTCMonth() + 1;
      let dayNow = timeNow.getUTCDate();
      let hoursNow = timeNow.getUTCHours();
      let minutesNow = timeNow.getUTCMinutes();
      let secondsNow = timeNow.getUTCSeconds();
      let nowTime = [
        yearNow,
        monthNow,
        dayNow,
        hoursNow,
        minutesNow,
        secondsNow,
      ];
      let now = Date.UTC(...nowTime);

      //设置截止时间
      let time = this.showTime ? this.showTime : "";
      let year = time.substring(0, 4);
      let month = time.substring(5, 7);
      let day = time.substring(8, 10);
      let hours = time.substring(11, 13);
      let minutes = time.substring(14, 16);
      let seconds = time.substring(17, 19);
      let endTime = [year, month, day, hours, minutes, seconds];
      let end = Date.UTC(...endTime);
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
        this.changeBtn = true;
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

<style scoped lang="scss">
.detail {
  width: 574px;
  //min-width: 400px;

  .detail_title {
    font-weight: normal;
    color: #000000;
    line-height: 34px;
    height: 33px;
    font-size: 30px;
  }

  .nft_detail {
    display: flex;
    align-items: center;
    margin-top: 63px;

    div {
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #f6f5f3;
    }

    .logo {
      position: relative;
      left: -37px;
      width: 37px;
      max-width: 37px;
      height: 18px;
    }

    .span {
      position: relative;
      left: -25px;
      height: 22px;
      font-size: 16px; 
      font-weight: 600;
      color: #050505;
      line-height: 22px;
    }
  }

  .remainingAmount {
    margin-top: 26px;
    font-weight: 500;
    color: #2a2c38;
    line-height: 22px;
    height: 22px;
    font-size: 16px;
  }

  .divider {
    border-color: #cccccc;
    margin-top: 39px;
    margin-bottom: 73px;
  }

  .price {
    &.startTimeBtn {
      margin-top: 171px;
    }

    p {
      margin-bottom: 9px;
      font-weight: 400;
      color: #9e9e9e;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
    }

    > div {
      .img {
        max-width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      span {
        font-weight: normal;
        color: #050505;
        line-height: 34px;
        height: 33px;
        font-size: 30px;
      }
    }
  }

  .time {
    margin-top: 35px;

    p {
      margin-bottom: 0px;
      font-weight: 400;
      color: #9e9e9e;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
    }

    .date {
      width: 35px;
      height: 33px;
      line-height: 33px;
    }
  }

  .btn {
    margin-top: 58px;

    ::v-deep .v-btn {
      background-color: #cc9933;
      border-radius: 4px;
      width: 100%;

      span {
        font-size: 20px;
        color: white;
      }
    }
  }
}

@media screen and(max-width: 960px) {
  .detail {
    width: 100%;
  }
}
</style>