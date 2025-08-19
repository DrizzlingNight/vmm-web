<template>
  <div>
    <v-list class="overflow-y-auto list" height="430px" @scroll.native="historyScroll">
      <v-timeline v-if="NFTHistoryList.length !== 0" dense>
        <v-timeline-item color="btnWhite" small fill-dot v-for="(history, index) in NFTHistoryList" :key="index">
          <template v-slot:icon>
            <v-img v-if="index === 0" src="@/assets/fake/nftDetail/history1.png"></v-img>
            <v-img v-else src="@/assets/fake/nftDetail/history2.png"></v-img>
          </template>
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex justify-space-between align-center btnColor--text"
                 style="font-size: 14px;font-weight: bold">
              <v-img class="d-inline-block mr-2" max-width="40" max-height="41"
                     src="@/assets/fake/people.png"></v-img>
              <div v-if="history.opt === 1">
                <span class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.you") }}</span>{{
                  ' ' + history.user.username + ' '
                }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.create") }}</span>
              </div>
              <div v-if="history.opt === 2">
                <span class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.you") }}</span>{{
                  ' ' + history.user.username + ' '
                }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.deliver") }}</span>
              </div>
              <div v-if="history.opt === 3">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.onSale") }}</span>
              </div>
              <div v-if="history.opt === 4">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{
                  $t("productDetail.history.cancelSale")
                }}</span></div>
              <div v-if="history.opt === 5">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{
                  $t("productDetail.history.makeOffer")
                }}</span>
                <div class="fontColor--text">{{
                    price(history.detail.price)
                  }}{{ history.token.coin ? history.token.coin.code : '' }}
                </div>
              </div>
              <div v-if="history.opt === 6">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.bid") }}</span>
                <div class="fontColor--text">{{
                    price(history.detail.price)
                  }}{{ history.token.coin ? history.token.coin.code : '' }}
                </div>
              </div>
              <div v-if="history.opt === 7">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.bought") }}</span>
                <div class="fontColor--text">{{
                    price(history.detail.price)
                  }}{{ history.token.coin ? history.token.coin.code : '' }}
                </div>
              </div>
              <div v-if="history.opt === 8">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.redeem") }}</span>
                <div class="fontColor--text">{{
                    price(history.detail.price)
                  }}{{ history.token.coin ? history.token.coin.code : '' }}
                </div>
              </div>
              <div v-if="history.opt === 9">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{ $t("productDetail.history.destory") }}</span>
              </div>
              <div v-if="history.opt === 10">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{
                  $t("productDetail.history.cancelOffer")
                }}</span></div>
              <div v-if="history.opt === 11">{{ history.user.username + ' ' }}<span
                  class="fontColor8--text" style="font-weight: normal">{{
                  $t("productDetail.history.transferOut")
                }}</span></div>
              <div v-if="history.opt === 12"><span style="font-weight: normal" class="fontColor8--text">{{
                  $t("productDetail.history.you") + ' '
                }}</span>{{ history.user.username + ' ' }}<span
                  class="fontColor8--text">{{ $t("productDetail.history.paidInterest") }}</span></div>
            </div>
            <div class="fontColor8--text text-right" style="font-size: 12px">{{ moment.utc(history.created_time).local().format("YYYY-MM-DD HH:mm:ss") }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <div class="ma-auto" v-if="NFTHistoryList.length === 0 && !loading">
        <v-img class="mt-8 mx-auto" max-height="160" max-width="301" src="@/assets/fake/transaction.png"></v-img>
        <p class="text-center fontColor10--text" style="font-size: 24px;margin-top: 29px">{{ $t("defaultNone") }}</p>
      </div>
      <overlay :loading="loading"></overlay>
    </v-list>
  </div>

</template>

<script>
import {formatDecimal, cutZero} from "@/utils/math";
import {getNFTHistory} from "@/api/NFT";
import Overlay from "../../../components/Overlay";
import * as _ from "lodash";
import {numFormat} from "../../../utils/math";

export default {
  name: "NftHistoryTab",
  components: {Overlay},
  data: () => ({
    NFTHistoryList: [],
    loading: true,
    limit: 10,
    page: 0,
    count: 0,
  }),
  created() {
    this.getNFTHistory();
  },
  computed: {
    date() {
      return function (time) {
        let current = time.replace(/-/g, "/").replace(/T/g, " ").split(/\./g)[0];
        return current;
      };
    },
    price() {
      return function (price) {
        let currentPrice = price.split(/E/g)[0];
        return cutZero(numFormat(formatDecimal(currentPrice, 4)));
      };
    },
  },
  methods: {
    //下拉加载更多
    historyScroll(e) {
      //向上滚动高度
      let scrollTop = e.srcElement.scrollTop
      //内容总高度
      let scrollHeight = e.srcElement.scrollHeight
      //内容可视区域大小
      let clientHeight = e.srcElement.clientHeight
      //内容距离底部多少距离
      let height = scrollHeight - scrollTop - clientHeight
      // console.log('内容总高度',scrollHeight)
      // console.log('向上滚动高度',scrollTop)
      // console.log('内容可视区域大小',clientHeight)
      // console.log('内容距离底部多少距离',scrollHeight-scrollTop-clientHeight)
      if (!height) {
        this.getNFTHistory();
      }
    },
    //获取某一nft历史记录
    getNFTHistory() {
      if (this.limit * this.page - this.count > 0) return false
      getNFTHistory({
        token: this.$route.params.id,
        offset: this.limit * this.page
      })
          .then((response) => {
            this.page = this.page + 1
            this.loading = false
            this.count = response.data.count
            this.NFTHistoryList = _.concat(this.NFTHistoryList, response.data.results)
          })
          .catch(() => {
          });
    },
  },
};
</script>

<style scoped>
.list::-webkit-scrollbar {
  display: none;
}

>>> .v-timeline--dense:not(.v-timeline--reverse):before {
  height: calc(100% - 86px) !important;
  position: absolute !important;
  top: 49px !important;
  left: 10px !important;
  background-color: #979797 !important;
}

>>> .v-timeline-item {
  justify-content: left !important;
}

>>> .v-timeline-item__divider {
  min-width: 20px !important;
  margin-right: 24px !important;
}

>>> .v-timeline-item {
  width: 107% !important;
}

>>> .theme--light.v-timeline .v-timeline-item__dot {
  box-shadow: 0 0 0 0 !important;
  width: 20px !important;
  height: 20px !important;
  z-index: 1 !important;
}

>>> .btnWhite {
  width: 14px !important;
  margin-left: 4px !important;
  background-color: white !important;
}
</style>
