<template>
  <v-card
      flat
      tile
      class="card_wrapper"
  >
    <v-window v-model="onboarding">
      <v-window-item
          v-for="(n,index) in carouselList"
          :key="index"
          class="windowItem"
          @click="goMysteryBoxDetail(n)"
      >
        
        <v-img height="570px" class="backImg" :src="n.cover_url"></v-img>
        <v-img height="350px" class="backImg-h5" :src="n.cover_url"></v-img>
        <div class="bgColor"></div>
        <v-card
            color="transparent"
            class="currentCard d-flex justify-center align-center"
        >
          <div class="card_detail">
            <p>VMM NFT X {{ n.sub_title }}</p>
            <p>{{ n.name || '' }}</p>
            <div class="sellStart" v-if="isShowPage(n.start_time,n.end_time, n.current_store) === 1">
              <div class="startTime">{{ $t("mysteryBox.fontPage.sellStartTime") }}</div>
              <div class="d-flex sellTime">
                <sell-time :startTime="n.start_time"></sell-time>
                <!--                <div>{{ currentUTCDay(n.start_time) }}<span>{{ $t("mysteryBox.fontPage.day") }}</span></div>-->
                <!--                <div>{{ currentUTCHours(n.start_time) }}<span>{{ $t("mysteryBox.fontPage.hour") }}</span></div>-->
                <!--                <div>{{ currentUTCMinutes(n.start_time) }}<span>{{ $t("mysteryBox.fontPage.minute") }}</span></div>-->
                <!--                <div class="lastSellTime">{{ currentUTCSeconds(n.start_time) }}<span>{{-->
                <!--                    $t("mysteryBox.fontPage.second")-->
                <!--                  }}</span></div>-->
              </div>
            </div>
            <div class="sellEnd" v-if="isShowPage(n.start_time,n.end_time, n.current_store) === 3">{{
                $t("mysteryBox.fontPage.sellEnd")
              }}
            </div>
            <div class="hotEnd" v-if="isShowPage(n.start_time,n.end_time,n.current_store) === 2">
              <div class="text">{{ $t("mysteryBox.fontPage.hotEnd") }}</div>
              <div class="remainingAmount">
                {{ $t("mysteryBox.fontPage.remainingAmount") }}
                :{{ n.current_store }}/{{ n.total_store }}
              </div>
            </div>
            <div class="d-flex amount justify-center">
              <div class="sellAmount">{{ $t("mysteryBox.fontPage.sellAmount") }}:{{ n.total_store }}</div>
              <div class="sellPrice d-flex">
                <div>{{ $t("mysteryBox.fontPage.sellPrice") }}</div>
                <img class="coin"
                     :src="'static/coin/' + iconUrl(n.coin) + '.png'"/>
                <div>{{ currentPrice(n.price) }} {{ baseCoin ? baseCoin.code : "" }}</div>
              </div>
            </div>
          </div>
        </v-card>
      </v-window-item>
    </v-window>
    <v-card-actions class="justify-center circleBtn">
      <v-item-group
          v-model="onboarding"
          class="text-center"
          mandatory
      >
        <v-item
            v-for="(n,index) in carouselList.length"
            :key="`btn-${n}`"
            v-slot="{ active, toggle }"
        >
          <v-btn
              class="btn"
              :class="(onboarding === index) ? 'activeBtn' : ''"
              :input-value="active"
              plain
              height="4px"
              @click="toggle"
          >
          </v-btn>
        </v-item>
      </v-item-group>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import {getBlindbox} from "@/api/mysteryBox"
import {formatStrPrice, numFormat, cutZero} from "@/utils/math"
import moment from 'moment'
import SellTime from "@/views/MysteryBox/MysteryBoxComps/sellTime";
import router from "@/router";

export default {
  name: "topCarousel",
  components: {SellTime},
  data: () => ({
    length: 3,
    onboarding: 0,
    carouselList: [],
    nowUTC: "",
    d: '',
    h: '',
    m: '',
    s: '',
  }),
  created() {
    this.getBlindbox()
  },
  computed: {
    ...mapGetters(["getCoinById", "config"]),
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    currentPrice() {
      return function (price) {
        return cutZero(formatStrPrice(numFormat(price), 4))
      }
    },
    iconUrl() {
      return function (coinId) {
        const coin = this.getCoinById(coinId)
        return coin ? (coin.name || '') : ''
      }
    },
    isShowPage() {
      return function (startTime, endTime, current_store) {
        let current = moment(new Date()).utc()
        let start = moment.utc(startTime)
        let end = moment.utc(endTime)
        if (start.diff(current) > 0) {
          return 1
        }
        if (start.diff(current) < 0 && current.diff(end) < 0) {
          if (current_store <= 0 )
            return 3
          return 2
        }
        return 3
      }
    },

  },
  methods: {
    //获取盲盒活动信息
    getBlindbox() {
      getBlindbox({}).then(response => {
        this.carouselList = response.data.results
        this.length = response.data.count
        // this.$emit("blindboxId",response.data.results[0].id)
      })
          .catch(() => {
          })
    },
    //去盲盒活动详情
    goMysteryBoxDetail(n) {
      router.push("/mysteryBox/" + n.id);
    },
    next() {
      this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
    }
    ,
    prev() {
      this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
    },
    // //天
    // currentUTCDay() {
    //   return function (startTime) {
    //     let current = moment(new Date()).utc()
    //     let start = moment(startTime)
    //     return current.diff(start, 'days')
    //   }
    // },
    // //小时
    // currentUTCHours() {
    //   return function (startTime) {
    //     let current = moment(new Date()).utc()
    //     let start = moment(startTime)
    //     return current.diff(start, 'hours')
    //   }
    // },
    // //分钟
    // currentUTCMinutes() {
    //   return function (startTime) {
    //     let current = moment(new Date()).utc()
    //     let start = moment(startTime)
    //     return current.diff(start, 'minutes')
    //   }
    // },
    // //秒
    // currentUTCSeconds() {
    //   return function (startTime) {
    //     let current = moment(new Date()).utc()
    //     let start = moment(startTime)
    //     return current.diff(start, 'seconds')
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped >
.card_wrapper {
  .windowItem {
    position: relative;

    .bgColor {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 2;
    }

    .backImg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .backImg-h5 {
      display: none;
    }


    .currentCard {
      height: 570px;
      z-index: 3;

      .card_detail {
        color: #FFFFFF;
        width: 80%;
        text-align: center;
        //position: absolute;
        //top: 50%;
        //left: 50%;
        //transform: translate(-50%, -50%);
        p:nth-child(1) {
          font-size: 18px;
          height: 25px;
          line-height: 25px;
          margin-bottom: 17px;
        }

        p:nth-child(2) {
          height: 50px;
          font-size: 36px;
          font-weight: 600;
          line-height: 50px;
          margin-bottom: 0px;
        }

        .sellStart {
          margin-top: 26px;

          .startTime {
            line-height: 25px;
            height: 25px;
            font-size: 18px;
            margin-bottom: 39px;
          }

          .sellTime {
            display: flex;
            justify-content: center;
            margin-bottom: 65px;

            //div {
            //  height: 50px;
            //  font-size: 36px;
            //  line-height: 50px;
            //  margin-right: 45px;
            //
            //  span {
            //    height: 20px;
            //    font-size: 14px;
            //    line-height: 20px;
            //    margin-left: 9px;
            //  }
            //
            //  &.lastSellTime {
            //    margin-right: 0px;
            //  }
            //}
          }
        }

        .sellEnd {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
          line-height: 67px;
          height: 67px;
          font-size: 48px;
          margin-bottom: 72px;
          margin-top: 66px;
        }

        .hotEnd {
          margin-bottom: 56px;
          margin-top: 46px;

          .text {
            line-height: 67px;
            height: 67px;
            font-size: 48px;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .remainingAmount {
            height: 25px;
            font-size: 18px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 25px;
            margin-top: 9px;
          }
        }

        .amount {
          .sellAmount {
            font-weight: 600;
            line-height: 25px;
            height: 25px;
            font-size: 18px;
            margin-right: 37px;
          }

          .sellPrice {
            vertical-align: center;
            font-weight: 600;
            line-height: 25px;
            height: 25px;
            font-size: 18px;

            .coin {
              width: 25px;
              margin: 0 5px 0 5px;
            }
          }
        }
      }
    }
  }

  .circleBtn {
    position: relative;
    top: -90px;
    z-index: 3;

    .btn {
      margin-right: 14px;
      background: #666666;
      min-width: 20px;

      &.activeBtn {
        width: 60px;
        background: #CC9933;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .card_wrapper {
    .windowItem {

      .backImg {
        display: none;
      }

      .backImg-h5 {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }

      .currentCard {
        height: 350px;
        .card_detail {

          p:nth-child(1) {
            font-size: 12px;
            height: 16.8px;
            line-height: 16.8px;
            margin-bottom: 4px;
          }

          p:nth-child(2) {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            margin-bottom: 0px;
          }

          .sellStart {
            margin-top: 16px;

            .startTime {
              font-size: 12px;
              height: 16.8px;
              line-height: 16.8px;
              margin-bottom: 16px;
            }

            .sellTime {
              margin-bottom: 16px;
            }
          }

          .sellEnd {
            line-height: 28px;
            height: 28px;
            font-size: 20px;
            margin-bottom: 16px;
            margin-top: 16px;
          }

          .hotEnd {
            margin-bottom: 16px;
            margin-top: 16px;

            .text {
              line-height: 28px;
              height: 28px;
              font-size: 20px;
            }

            .remainingAmount {
              height: 16.8px;
              font-size: 12px;
              line-height: 12px;
              margin-top: 4px;
            }
          }

          .amount {
            .sellAmount {
              height: 20px;
              font-size: 12px;
              line-height: 20px;
              margin-right: 28px;
            }

            .sellPrice {
              height: 20px;
              font-size: 12px;
              line-height: 20px;

              .coin {
                width: 20px;
                height: 20px;
                margin: 0 4px 0 4px;
              }
            }
          }
        }
      }
    }

    .circleBtn {
      position: relative;
      top: -90px;
      z-index: 3;

      .btn {
        margin-right: 14px;
        background: #666666;
        min-width: 20px;

        &.activeBtn {
          width: 60px;
          background: #CC9933;
        }
      }
    }
  }
}

</style>