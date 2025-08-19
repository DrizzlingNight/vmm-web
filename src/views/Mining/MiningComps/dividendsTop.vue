<template>
  <div class="block">
    <div class="d-flex justify-space-between align-end topText">
      <div class="left">
        <p class="title">{{ $t("mining.dividendsPage.currentDividend") }}</p>
        <p class="pWarning">
          {{ $t("mining.dividendsPage.warningDividend")
          }}{{ divPoolDailyDivrate * 100 }}%{{
            $t("mining.dividendsPage.warningDividend2")
          }}
        </p>
      </div>
      <div class="d-flex align-center justify-space-between rightText">
        <div>{{ $t("mining.dividendsPage.nextDividend") }}</div>
        <div class="d-flex align-center timeDiv">
          <v-img
            class="img"
            width="20px"
            height="20px"
            style="margin-right: 9px"
            src="@/assets/mining/time.png"
          ></v-img>
          <div>{{ d }}:{{ h }}:{{ m }}:{{ s }}</div>
        </div>
      </div>
    </div>
    <div class="Amount d-flex justify-space-between">
      <div>
        <v-img
          class="img"
          width="66px"
          height="66px"
          style="margin-bottom: 12px"
          src="@/assets/mining/V.png"
        ></v-img>
        <span class="span">{{ showTotal }}</span>
        <div class="todayDividend">
          {{ $t("mining.dividendsPage.todayDividend") }}{{ todayDividend }}
          {{ dividendsCoin ? dividendsCoin.code : "" }}
        </div>
      </div>
      <div class="d-flex flex-column justify-space-between align-end">
        <div class="text-right right">
          <span>{{ $t("mining.dividendsPage.estimateIncome") }}</span>
          <div>
            {{ user ? estimateIncome : "--" }}
            <span>{{ dividendsCoin ? dividendsCoin.code : "" }}</span>
          </div>
        </div>
        <div class="text-right right">
          <span>{{ $t("mining.dividendsPage.VMMEstimateIncome") }}</span>
          <div>
            {{ VMMEstimateIncome }}
            <span>{{ dividendsCoin ? dividendsCoin.code : "" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDivPool } from "@/api/mining";
import * as _ from "lodash";
import { numFormat, formatStrPrice, cutZero } from "@/utils/math";
import { mapGetters } from "vuex";
import { getStakeInfo, getStakePool } from "@/api/mining";
// import moment from 'moment'

export default {
  name: "dividendsTop",
  data: () => ({
    d: "",
    h: "",
    m: "",
    s: "",
    data: "",
    stakePool: "",
    amount: "",
  }),
  props: ["dividendsCoin"],
  created() {
    this.getDivPool();
    this.getStakePool();
    this.getStakeInfo();
  },
  watch: {
    data() {
      this.countTime();
    },
  },
  computed: {
    ...mapGetters(["config", "user", "getCoinById", "coinList"]),
    showTotal() {
      return cutZero(formatStrPrice(numFormat(this.data.total), 4));
    },
    divPoolDailyDivrate() {
      return this.config.divpool_daily_divrate;
    },
    todayDividend() {
      return cutZero(
        formatStrPrice(numFormat(this.data.total * this.divPoolDailyDivrate), 4)
      );
    },
    estimateIncome() {
      return cutZero(
        formatStrPrice(
          numFormat(
            (this.data.total * this.divPoolDailyDivrate * this.amount) /
              this.stakePool
          ),
          4
        )
      );
    },
    VMMEstimateIncome() {
      return cutZero(
        formatStrPrice(
          numFormat(
            (this.data.total * this.divPoolDailyDivrate * 10000) /
              (Number(this.stakePool) + 10000)
          ),
          4
        )
      );
    },
  },
  methods: {
    getStakePool() {
      getStakePool()
        .then((response) => {
          this.stakePool = response.data.results[0].total;
        })
        .catch({});
    },
    getStakeInfo() {
      getStakeInfo()
        .then((response) => {
          this.amount = response.data.stake ? response.data.stake.amount : 0;
        })
        .catch({});
    },
    getDivPool() {
      getDivPool()
        .then((response) => {
          _.forEach(response.data.results, (item) => {
            if (item.coin.id === 4) {
              this.data = item;
            }
          });
        })
        .catch(() => {});
    },
    countTime: function () {
      //获取当前时间
      let timeNow = new Date().getTime();
      let localTimeOffset = new Date().getTimezoneOffset() * 60000;

      // let utcTime = localTime + localTimeOffset
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
      // let time = this.data.settle_time
      // let year = time.substring(0, 4)
      // let month = time.substring(5, 7)
      // let day = time.substring(8, 10)
      // let hours = time.substring(11, 13)
      // let minutes = time.substring(14, 16)
      // let seconds = time.substring(17, 19)
      // let endTime = [year, month, day, hours, minutes, seconds]
      // let end = Date.UTC(...endTime)
      let end = new Date(this.data.settle_time).getTime();
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

<style scoped lang="scss">
.block {
  margin-top: 29px;

  .topText {
    p {
      font-weight: 600;
    }

    .title {
      color: #050505;
      line-height: 29px;
      margin-bottom: 1px;
      height: 29px;
      font-size: 21px;
    }

    .pWarning {
      color: #cc9933;
      line-height: 25px;
      height: 25px;
      margin-bottom: 0px;
      font-size: 18px;
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
        background: rgba(204, 153, 51, 0.3);
        border-radius: 29px;

        div {
          height: 34px;
          line-height: 34px;
        }
      }
    }
  }

  .Amount {
    margin-top: 25px;
    background: linear-gradient(315deg, #e6b045 0%, #ffe383 100%);
    border-radius: 4px;
    padding: 22px 37px 23px 28px;

    .span {
      font-weight: 600;
      color: #050505;
      line-height: 33px;
      height: 33px;
      font-size: 24px;
    }

    .todayDividend {
      margin-top: 23px;
      font-weight: 600;
      color: #cc9933;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
    }

    .right {
      span {
        font-weight: 600;
        color: #ffffff;
        font-size: 16px;
      }

      div {
        color: #050505;
        line-height: 33px;
        height: 33px;
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .block {
    margin-top: 20px;

    .topText {
      display: flex;
      flex-wrap: wrap-reverse;

      .left {
        .title {
          margin-bottom: 1px;
          font-size: 14px !important;
        }

        .pWarning {
          color: #cc9933;
          line-height: 25px;
          height: 25px;
          margin-bottom: 0px;
          font-size: 12px;
        }
      }

      .rightText {
        width: 100% !important;
        font-size: 14px;

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

    .Amount {
      margin-top: 10px;
      padding: 18px 11px !important;

      .img {
        max-height: 37px;
        max-width: 37px;
        margin-bottom: 0px !important;
      }

      .span {
        line-height: 33px;
        height: 33px;
        font-size: 18px;
      }

      .todayDividend {
        margin-top: 0px;
        font-size: 12px;
      }

      .right {
        span {
          font-size: 12px;
        }

        div {
          font-size: 18px;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>