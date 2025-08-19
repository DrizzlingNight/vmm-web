<template>
  <div class="block">
    <div class="d-flex justify-space-between topText">
      <p>{{ $t("mining.repurchases.currentAmount") }}</p>
      <div class="d-flex align-center rightText">
        <span>{{ $t("mining.repurchases.nextRepurchase") }}</span>
        <div class="d-flex align-center timeDiv">
          <v-img class="img" width="20px" height="20px" style="margin-right: 9px"
                 src="@/assets/mining/time.png"></v-img>
          <div>{{ d }}:{{ h }}:{{ m }}:{{ s }}</div>
        </div>
      </div>
    </div>
    <div class="Amount d-flex justify-space-between">
      <div class="d-flex align-center div" style="height: 57px">
        <v-img class="d-inline-block img" width="57px" height="57px" style="margin-right: 34px"
               src="@/assets/coinType/USDT.png"></v-img>
        <span class="span">{{ currentBuybackAmount }} {{ buybackCoin ? buybackCoin.code : "" }}</span>
      </div>
    </div>
    <p class="p">{{ $t("mining.repurchases.reCurrentAmount") }}</p>
    <div class="Amount d-flex justify-space-between">
      <div class="d-flex align-center div" style="height: 57px">
        <v-img class="d-inline-block img" width="57px" height="57px" style="margin-right: 34px"
               src="@/assets/mining/V.png"></v-img>
        <span class="span">{{ currentSellAmount }} VMM</span>
      </div>
    </div>
    <p class="pWarning">{{ $t("mining.repurchases.currentPrice") }}{{ current10000SellAmount }} {{ buybackCoin ? buybackCoin.code : "" }}</p>
    <p v-if="user" class="p">{{ $t("mining.repurchases.ownReCurrentAmount") }}</p>
    <div v-if="user" class="Amount d-flex justify-space-between">
      <div class="d-flex align-center div" style="height: 57px">
        <v-img class="d-inline-block img" width="57px" height="57px" style="margin-right: 34px"
               src="@/assets/mining/V.png"></v-img>
        <span class="span">{{ userAmount }} VMM</span>
      </div>
    </div>
    <p v-if="user" class="pWarning">{{
        $t("mining.repurchases.sellAmount")
      }}{{ (takeUpCurrentSellAmount * 100).toFixed(2) }}%,
      {{ $t("mining.repurchases.takeUp") }}{{ takeUpAmount }}
      {{ buybackCoin ? buybackCoin.code : "" }}</p>
  </div>
</template>

<script>
import {formatStrPrice, numFormat, cutZero} from "@/utils/math";
import {mapGetters} from "vuex";

export default {
  name: "currentAmount",
  props: ["buybackPool", "poolData", "todayData", "buybackCoin"],
  data: () => ({
    d: '',
    h: '',
    m: '',
    s: '',

  }),
  computed: {
    ...mapGetters(["config", "user"]),
    currentBuybackAmount() {
      return cutZero(formatStrPrice(numFormat(this.poolData.total * this.config.buybackpool_daily_divrate), 4))
    },
    currentSellAmount() {
      return cutZero(formatStrPrice(numFormat(this.todayData.total), 4))
    },
    current10000SellAmount() {
      return cutZero(formatStrPrice(numFormat(this.poolData.total * this.config.buybackpool_daily_divrate * 10000 / (Number(this.todayData.total) + 10000)), 4))
    },
    userAmount() {
      return cutZero(formatStrPrice(numFormat(this.todayData.user_amount), 4))
    },
    takeUpCurrentSellAmount() {
      if (this.todayData.total === 0) {
        return 0
      } else return this.todayData.user_amount / this.todayData.total
    },
    takeUpAmount() {
      return cutZero(formatStrPrice(numFormat(this.poolData.total * this.config.buybackpool_daily_divrate * this.takeUpCurrentSellAmount), 4))
    }
  },
  created() {
    this.countTime()
  },
  methods: {

    countTime: function () {
      //获取当前时间
      let timeNow = new Date().getTime()
      let localTimeOffset = new Date().getTimezoneOffset() * 60000;

      // let yearNow = timeNow.getUTCFullYear()
      // let monthNow = timeNow.getUTCMonth() + 1
      // let dayNow = timeNow.getUTCDate()
      // let hoursNow = timeNow.getUTCHours()
      // let minutesNow = timeNow.getUTCMinutes()
      // let secondsNow = timeNow.getUTCSeconds()
      // let nowTime = [yearNow, monthNow, dayNow, hoursNow, minutesNow, secondsNow]
      // let now = Date.UTC(...nowTime)
      let now =timeNow+localTimeOffset

      //设置截止时间
      // let time = this.poolData ? this.poolData.settle_time : ""
      // let year = time.substring(0, 4)
      // let month = time.substring(5, 7)
      // let day = time.substring(8, 10)
      // let hours = time.substring(11, 13)
      // let minutes = time.substring(14, 16)
      // let seconds = time.substring(17, 19)
      // let endTime = [year, month, day, hours, minutes, seconds]
      // let end = Date.UTC(...endTime)
      let end = new Date(this.poolData.settle_time).getTime()

      var leftTime = end - now
      //定义变量 d,h,m,s保存倒计时的时间
      if (this.s === '00' && this.m === '00' && this.h === '00' && this.d === '00') {
        clearInterval(timer)
      }
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24)//天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        this.m = Math.floor((leftTime / 1000 / 60) % 60)
        this.s = Math.floor((leftTime / 1000) % 60)
        if (this.s < 10) {
          this.s = '0' + this.s
        }
        if (this.m < 10) {
          this.m = '0' + this.m
        }
        if (this.h < 10) {
          this.h = '0' + this.h
        }
        if (this.d < 10) {
          this.d = '0' + this.d
        }

      }
      //递归每秒调用countTime方法，显示动态时间效果
      let timer = setTimeout(this.countTime, 1000)
    },
  }
}
</script>

<style scoped lang="scss">
.block {
  margin-top: 55px;
  font-weight: 400;

  .topText {
    > p {
      font-size: 21px;
      color: #050505;
      line-height: 29px;
      height: 29px;
    }

    .rightText {
      color: #050505;
      line-height: 33px;
      height: 33px;
      font-size: 24px;

      .timeDiv {
        padding-left: 23px;
        padding-right: 22px;
        font-size: 18px;
        font-weight: 600;
        background: rgba(204, 153, 51, .3);
        border-radius: 29px;

        div {
          height: 34px;
          line-height: 34px;
        }
      }
    }
  }

  .p {
    margin-top: 35px;
    margin-bottom: 25px;
    font-size: 21px;
    color: #050505;
    line-height: 29px;
    height: 29px;
  }

  .pWarning {
    margin-top: 10px;
    margin-bottom: 35px;
    font-weight: 600;
    color: #CC9933;
    line-height: 29px;
    height: 29px;
    font-size: 21px;
  }

  .Amount {
    margin-top: 8px;
    height: 130px;
    background: linear-gradient(270deg, #CC9933 0%, #E8C962 100%);
    border-radius: 4px;
    padding-top: 37px;
    padding-left: 29px;

    .span {
      color: #050505;
      line-height: 57px;
      height: 57px;
      font-size: 36px;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 960px) {
  .block {
    margin-top: 20px;

    .topText {
      > p {
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 0px;
      }

      .rightText {
        font-size: 12px;

        .timeDiv {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 12px;
          border-radius: 15px;

          div {
            height: 25px;
            line-height: 25px;
          }

          .img {
            max-width: 15px;
            max-height: 15px;
            margin-right: 5px !important;
          }
        }
      }
    }

    .p {
      margin-top: 15px;
      margin-bottom: 10px;
      font-size: 13px;
      color: #050505;
      line-height: 29px;
      height: 29px;
    }

    .pWarning {
      margin-top: 10px;
      margin-bottom: 15px;
      line-height: 29px;
      height: 29px;
      font-size: 13px;
    }

    .Amount {
      margin-top: 8px;
      height: 50px;
      padding-top: 10px;
      padding-left: 20px;
      padding-bottom: 10px;

      .div {
        height: 30px !important;
        display: flex;
        align-items: center !important;
      }

      .span {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
      }

      .img {
        max-width: 30px;
        max-height: 30px;
      }
    }
  }
}
</style>