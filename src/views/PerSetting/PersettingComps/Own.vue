<template>
  <div style="margin-top: 84px;min-height: 500px">
    <div style="border-bottom: 1px solid rgba(66, 66, 66, 0.49)">
      <v-tabs
          v-model="tab"
          background-color="transparent"
          fixed-tabs
          slider-size="1"
          slider-color="btnColor"
          color="btnColor"
          show-arrows
          centered
          height="66px"
          class="mx-auto"
          active-class="font-weight-bold"
          style="font-size: 24px;z-index: 99;max-width: 1104px;"
      >
        <template v-if="isCreator">
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">{{
              $t("persetting.own.hasSend")
            }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">
            {{ $t("persetting.own.hold") }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">
            {{ $t("persetting.own.get") }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">{{
              $t("persetting.own.expire")
            }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">{{
              $t("persetting.own.destroy")
            }}
          </v-tab>
        </template>
        <template v-else>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">
            {{ $t("persetting.own.all") }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">{{
              $t("persetting.own.onSale")
            }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">{{
              $t("persetting.own.notSold")
            }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">{{
              $t("persetting.own.expire")
            }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">
            {{ $t("persetting.own.offer") }}
          </v-tab>
          <v-tab class="text-capitalize" style="font-weight: bold;font-size: 24px">
            {{ $t("persetting.own.bid") }}
          </v-tab>
        </template>
      </v-tabs>
    </div>
    <div style="margin-left: 30px;margin-right: 30px;margin-top: 22px" class="rowCard">
      <v-row id="nftlistshow" v-if="nftList.length !== 0"
      >
        <div
            v-for="(nft, i) in nftList"
            :key="i"
            class="cardImg"
        >
          <show-case
              class="showCase"
              :tab="tab"
              style="margin-left: 12px"
              :id="`nft${i}`"
              :item="nft"
              v-if="isOwnOffer(i)"
          ></show-case>
        </div>
      </v-row>
    </div>
    <v-row>
      <v-col v-if="nftList.length === 0 && !loading">
        <default-none></default-none>
      </v-col>
    </v-row>
    <overlay :loading="loading"></overlay>
    <v-row no-gutters v-if="nftList.length !== 0">
      <v-col cols="12" class="d-flex justify-center my-10">
        <v-pagination color="btnColor" :total-visible="7" v-model="page" :length="pageLength"></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ShowCase from "@/components/showCase";
import DefaultNone from "@/components/DefaultNone";
import {mapGetters} from "vuex";
import {getNFTList} from "@/api/NFT";
import moment from "moment";
import Overlay from "../../../components/Overlay";

function getNow() {
  return moment().format("YYYY-MM-DD");
}

export default {
  name: "Own",
  props: ["userData", "selectedBtn"],
  components: {
    Overlay,
    "show-case": ShowCase,
    "default-none": DefaultNone,
  },
  watch: {
    user() {
      this.getNFTList();
    },
    userData() {
      this.getNFTList();
    },
    tab() {
      this.getNFTList();
    },
    page() {
      this.getNFTList(this.searchInfo, false);
    },
  },
  computed: {
    ...mapGetters(["user"]),
    isCreator() {
      return (
          this.userData &&
          this.user &&
          this.userData.id === this.user.id &&
          this.user.profile.is_creator
      );
    },
    //判断是否过期
    isExpired() {
      return function (time) {
        let now = this.moment();
        let expired = this.moment(time ? time.expiration : "");
        return expired.diff(now) < 0;
      }
    },
    isOwnOffer() {
      return function (i) {
        if (this.tab === 4 || this.tab === 5) {
          if (!this.isExpired(this.nftList[i])) {
            return true
          } else return false
        } else {
          return true
        }
      }
    },
    tabNum() {
      return {
        creator: [
          {is_deliver: true, is_redeem: false, status: 0}, //"hasSend",
          {is_deliver: false, is_redeem: false, status: 0}, //"hold",
          {is_redeem: true, status: 0}, //"get",
          {expiration: getNow, status: 0}, //"expire",
          {status: 1}, //"destroy",
        ],
        notCreator: [
          {status: 0}, //"all",
          {is_onsale: true, status: 0, is_expired: false}, //"onSale",
          {is_onsale: false, status: 0}, //"notSold",
          {is_onsale: false, expiration: getNow, status: 0}, //"expire",
          {tabs: 'offers', is_redeem: false, offer_user: this.$route.params.id, status: 0, is_expired: false}, //"offer",
          {
            tabs: 'bids',
            is_redeem: false,
            is_onsale: true,
            sell_way: '1',
            bid_user: this.$route.params.id,
            status: 0,
            is_expired: false
          }, //"bid"
        ],
      }
    }
  },
  data: () => ({
    tab: 0,
    nftList: [],
    loading: true,
    limit: 2 * 3 * 4,
    page: 1,
    pageLength: 1,
    searchInfo: null,
    blankNum: 0,
  }),
  mounted() {
    this.getNFTList();
    if (!isNaN(this.$route.params.selectedTab)) {
      this.tab = Number(this.$route.params.selectedTab);
    }
  },
  methods: {
    //手机端返回的创建，拥有，历史方法
    createdNft() {
      this.$emit('createdNft')
    },
    changSidebarValue(val) {
      this.$emit('changSidebarValue', val)
    },
    rowNumber() {
      let nftlistshowDom = document.getElementById("nftlistshow");
      let nft0Dom = document.getElementById("nft0");
      let num =
          (nftlistshowDom &&
              nft0Dom &&
              nftlistshowDom.offsetWidth / nft0Dom.offsetWidth) ||
          0;
      num = num.toFixed();
      this.blankNum = num - (this.nftList.length % num || num);
    },
    getNFTList(info = {}, resetPage = true) {
      if (!(this.user && this.userData)) return;
      this.loading = true;
      // 分页
      info.limit = this.limit;
      if (resetPage) this.page = 1;
      info.offset = this.limit * (this.page - 1);
      info.type = 0
      this.searchInfo = info;
      // 用户
      if (this.isCreator) {
        info.creator = this.user.id;
        info = {...info, ...this._.cloneDeep(this.tabNum.creator[this.tab])};
      } else {
        if (this.tab !== 4 && this.tab !== 5) {
          info.user = this.$route.params.id;
        }
        info = {
          ...info,
          ...this._.cloneDeep(this.tabNum.notCreator[this.tab]),
        };
      }
      let keys = Object.keys(info);
      keys.forEach((k) => {
        if (typeof info[k] === "function") info[k] = info[k]();
      });
      getNFTList(info)
          .then((response) => {
            this.loading = false;
            this.nftList = response.data.results;
            this.pageLength =
                parseInt(response.data.count / this.limit) +
                ((response.data.count % this.limit && 1) || 0);
            this.pageLength || (this.pageLength = 1);
            this.$nextTick(() => {
              this.rowNumber();
            });
          })
          .catch(() => {
            this.loading = false;
          });
    },
  },
};
</script>

<style scoped>
@media (max-width: 980px) {
  .showCase {
    width: 100% !important;
  }

  .cardImg {
    width: 100% !important;
  }

  .rowCard {
    margin-left: 20px !important;
    margin-right: 45px !important;
  }
}

@media (min-width: 980px) and (max-width: 1400px) {
  .showCase {
    width: calc((100vw - 113px) / 3) !important;
  }
}

@media (min-width: 1401px) and (max-width: 1820px) {
  .showCase {
    width: calc((100vw - 122px) / 4) !important;
  }
}

/*@media (min-width: 1821px) and (max-width: 2220px) {*/
/*  .showCase {*/
/*    width: calc((100vw - 120px) / 4) !important;*/
/*  }*/
/*}*/

@media (min-width: 1821px) and (max-width: 2620px) {
  .showCase {
    width: calc((100vw - 130px) / 5) !important;
  }
}

/*@media (min-width: 2621px) and (max-width: 2820px) {*/
/*  .showCase {*/
/*    width: calc((100vw - 146px) / 6) !important;*/
/*  }*/
/*}*/

@media (min-width: 2621px) and (max-width: 3221px) {
  .showCase {
    width: calc((100vw - 165px) / 7) !important;
  }
}

@media (min-width: 3222px) {
  .showCase {
    width: calc((100vw - 188px) / 9) !important;
  }
}

>>> .v-slide-group__prev {
  min-width: 24px !important;
}

>>> .v-slide-group__next {
  min-width: 24px !important;
}

>>> .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover {
  background-color: #E7B34B;
}
</style>
