<template>
  <div style="margin-left: 30px;margin-right: 30px;margin-top: 105px;min-height: 500px" class="rowCard">
    <v-row id="nftlistshow" v-if="nftList.length !== 0"
    >
      <div
          v-for="(nft, i) in nftList"
          :key="i"
          class="cardImg"
      >
        <show-case
            class="showCase"
            style="margin-left: 12px"
            :id="`nft${i}`"
            :item="nft"
            :tab="tab"
        ></show-case>
      </div>
    </v-row>
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
import {getNFTList} from "@/api/NFT";
import Overlay from "../../../components/Overlay";
import ShowCase from "@/components/showCase";
import DefaultNone from "@/components/DefaultNone";
import {mapGetters} from "vuex";

export default {
  name: "Collection",
  props: ["userData","tab"],
  data: () => ({
    nftList: [],
    loading: true,
    limit: 2 * 3 * 4,
    page: 1,
    pageLength: 1,
    blankNum: 0,
    searchInfo: null,
  }),
  created() {
    this.getNFTList();
  },
  components: {
    Overlay,
    "show-case": ShowCase,
    "default-none": DefaultNone,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    page() {
      this.getNFTList(this.searchInfo, false);
    },
  },
  methods: {
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
      this.searchInfo = info;
      info.status = 0;
      info.is_like = true;
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
  }
}
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

</style>