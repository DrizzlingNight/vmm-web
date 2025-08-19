<template>
  <div class="block">
    <h2>{{ $t("mining.dividendsPage.dividendRecord") }}</h2>
    <div class="time">
      <div class="time_block">
        <div class="choiceTime">
          <span>{{ $t("mining.dividendsPage.choiceTime") }}</span>
        </div>
        <div class="year">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  plain
                  v-bind="attrs"
                  v-on="on"
                  color="#050505"
              >
                <div class="textTime">{{ formData.year }}</div>
                <div v-if="attrs['aria-expanded'] === 'false'" class="div" style="margin-left: 5px"></div>
                <div v-else class="div2" style="margin-left: 5px"></div>
              </v-btn>
            </template>
            <v-list max-height="500">
              <v-list-item
                  v-for="(item, index) in years"
                  :key="index"
                  class="white"
                  @click="choiceYear(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="month">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  plain
                  v-bind="attrs"
                  v-on="on"
              >
                <div class="textTime">{{ formData.month }}</div>
                <div v-if="attrs['aria-expanded'] === 'false'" class="div" style="margin-left: 5px"></div>
                <div v-else class="div2" style="margin-left: 5px"></div>
              </v-btn>
            </template>
            <v-list max-height="500">
              <v-list-item
                  v-for="(item, index) in months"
                  :key="index"
                  class="white"
                  @click="choiceMonth(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="day">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  plain
                  v-bind="attrs"
                  v-on="on"
              >
                <div class="textTime">{{ formData.day }}</div>
                <div v-if="attrs['aria-expanded'] === 'false'" class="div" style="margin-left: 5px"></div>
                <div v-else class="div2" style="margin-left: 5px"></div>
              </v-btn>
            </template>
            <v-list max-height="500">
              <v-list-item
                  v-for="(item, index) in days"
                  :key="index"
                  class="white"
                  @click="choiceDay(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="leftData">
        <p>{{ $t("mining.dividendsPage.platformDividend") }} ({{ dividendsCoin ? dividendsCoin.code : "" }})</p>
        {{ showPoolDivs }}
      </div>
      <div class="rightData">
        <p>{{ $t("mining.dividendsPage.ownDividend") }} ({{ dividendsCoin ? dividendsCoin.code : "" }})</p>
        {{ showUserDivs }}
      </div>
    </div>
  </div>
</template>

<script>
import {getStakeDivRecord} from "@/api/mining"
import {formatStrPrice, numFormat, cutZero} from "@/utils/math";

export default {
  name: "dividendRecord",
  data: () => ({
    years: [],
    months: [],
    days: [],
    poolDivs: "",
    userDivs: "",
    formData: {
      year: "",
      month: "",
      day: ""
    },
  }),
  props: ["dividendsCoin"],
  created() {
    this.init()
    this.formData.year = new Date().getFullYear()
    this.formData.month = new Date().getMonth() + 1
    this.formData.day = new Date().getDate()
    // this.getStakeDivRecord()

  },
  computed: {
    choiceTime() {
      return this.formData.year + '-' + this.formData.month + '-' + this.formData.day
    },
    showPoolDivs() {
      return cutZero(formatStrPrice(numFormat(Math.abs(this.poolDivs)), 4))
    },
    showUserDivs() {
      return cutZero(formatStrPrice(numFormat(this.userDivs), 4))
    }
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.years = []
        this.months = []
        this.days = []
        this.getYear();
        this.getMonth();
        this.getDay();
        this.getStakeDivRecord()
      }
    }
  },
  methods: {
    init() {
      this.getYear();
      this.getMonth();
      this.getDay();
    },
    getYear() {//获取年
      let date = new Date;
      let current_year = date.getFullYear();
      for (let i = 0; i < 30; i++) {
        let y = current_year - i;
        this.years.push(y);
      }
    },
    getMonth() {//获取月
      for (let i = 1; i < 13; i++) {
        this.months.push(i);
      }
    },
    getDay() {//获取日
      this.day = [];
      let day = this.getDaysInMonth(this.formData.year, this.formData.month)
      for (let i = 1; i <= day; i++) {
        this.days.push(i);
      }
    },
    getDaysInMonth(year, month) {//获取某个月的天数
      month = parseInt(month, 10);
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    //选择年
    choiceYear(item) {
      this.formData.year = item
    },
    //选择月
    choiceMonth(item) {
      this.formData.month = item
    },
    //选择日
    choiceDay(item) {
      this.formData.day = item
    },
    getStakeDivRecord() {
      getStakeDivRecord({date: this.choiceTime}).then((response) => {
        this.poolDivs = response.data.pool_divs.length ? response.data.pool_divs[0].changed_amount : 0
        this.userDivs = response.data.user_divs.length ? response.data.user_divs[0].div_amount : 0
      }).catch(() => {
      })
    }
  },
}
</script>

<style scoped lang="scss">
.block {
  margin-top: 40px;

  h2 {
    font-weight: 600;
    color: #050505;
    line-height: 33px;
    height: 33px;
    font-size: 24px;
  }

  .time {
    max-width: 407px;
    margin-top: 20px;
    height: 66px;
    padding: 8px 9px;
    background-color: rgba(204, 153, 51, .3);
    border-radius: 4px;

    .time_block {
      border: 2px solid #CC9933;
      height: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;

      .choiceTime {
        height: 100%;
        width: 127px;
        font-size: 21px;
        color: #FFFFFF;
        line-height: 29px;
        background-color: rgba(204, 153, 51, .8);
        border-radius: 0px 4px 4px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .year {
        margin-left: 12px;
      }

      .month {
        ::v-deep .v-btn {
          padding-left: 9px;
        }
      }

      ::v-deep .v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content {
        opacity: 1 !important;
      }

      .textTime {
        line-height: 20px;
        height: 20px;
        font-size: 21px;
      }
    }
  }

  .div {
    width: 0;
    height: 0;
    margin-left: 5px;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-top: 8px solid rgba(204, 153, 51, 1);
  }

  .div2 {
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-bottom: 8px solid rgba(204, 153, 51, 1);
  }

  .data {
    margin-top: 20px;
    background-color: rgba(204, 153, 51, .3);
    height: 165px;
    padding-top: 40px;
    padding-bottom: 34px;
    border-radius: 4px;
    display: flex;
    margin-bottom: 110px;

    p {
      height: 29px;
      font-weight: 600;
      color: #050505;
      line-height: 29px;
      font-size: 21px;
    }

    .leftData {
      width: 50%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #050505;
      font-size: 24px;
    }

    .rightData {
      width: 50%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #050505;
      font-size: 24px;
    }
  }
}

@media screen and (max-width: 960px) {
  .block {
    margin-top: 20px;

    h2 {
      font-size: 16px;
    }

    .time {
      margin-top: 0px;
      height: 47px;
      padding: 5px 6px;

      .time_block {
        .choiceTime {
          font-size: 13px;
          min-width: 60px;
        }

        .v-btn {
          padding: 0px !important;
        }

        .year {
          width: 30%;
          margin-left: 12px;
        }

        .month {
          width: 30%;

          ::v-deep .v-btn {
            padding-left: 9px;
          }
        }

        .textTime {
          line-height: 29px;
          height: 29px;
          font-size: 15px;
        }
      }
    }

    .div {
      width: 0;
      height: 0;
      margin-left: 5px;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      border-top: 8px solid rgba(204, 153, 51, 1);
    }

    .div2 {
      width: 0;
      height: 0;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      border-bottom: 8px solid rgba(204, 153, 51, 1);
    }

    .data {
      margin-top: 20px;
      height: 130px;
      padding: 20px !important;

      p {
        font-size: 18px;
        margin-bottom: 0px !important;
      }

      .leftData {
        font-size: 15px;
      }

      .rightData {
        font-size: 15px;
      }
    }
  }
}
</style>