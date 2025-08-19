<template>
  <div class="rightContent">
    <div class="topContent">
      <a class="btnIcon" @click="rightIconClick" style="display: none">
        <v-icon color="fontColor" size="27">mdi-arrow-right</v-icon>
      </a>
      <top-chip :dataLength="dataLength"></top-chip>
      <v-spacer></v-spacer>
      <top-sort @changeSelectList="changeSelectList"></top-sort>
    </div>
    <div style="min-height: 70vh" v-if="data.length !== 0">
      <v-row id="nftlistshow" class="d-flex" no-gutters>
        <show-case
          style="margin-left: 58px"
          class="mysteryBox_card"
          :id="`nft${idx}`"
          v-for="(item, idx) in data"
          :key="idx"
          :item="item"
        ></show-case>
        <!--        <mystery-box-card ></mystery-box-card>-->
      </v-row>
    </div>
    <v-row no-gutters v-if="data.length !== 0">
      <v-col cols="12">
        <v-pagination
          color="btnColor"
          v-model="page"
          :length="pageLength"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column align-center my-10">
      <v-col
        class="col-10 col-sm-6 justify-center py-16"
        v-if="data.length === 0 && !loading"
      >
        <default-none
          type="getNothing"
        ></default-none>
      </v-col>
    </v-row>
    <overlay class="overlay" :loading="loading"></overlay>
  </div>
</template>
<script>
import TopChip from "@/views/MysteryBoxMarket/MysteryBoxMarketComps/TopChip";
import TopSort from "@/views/MysteryBoxMarket/MysteryBoxMarketComps/TopSort";
// import MysteryBoxCard from "@/views/MysteryBox/MysteryBoxComps/mysteryBoxCard";
import { getNFTList } from "@/api/NFT";
import ShowCase from "@/components/showCase";
import Overlay from "@/components/Overlay";
import DefaultNone from "@/components/DefaultNone";
import { getBlindbox } from "@/api/mysteryBox";
export default {
  name: "RightContent",
  components: { ShowCase, TopSort, TopChip, Overlay, DefaultNone },
  props: ["boxStatus", "carouselSelected", "nftStatus", "minPrice", "maxPrice"],
  data: () => ({
    page: 1,
    pageLength: 1,
    rowNum: 3,
    data: [],
    limit: 2 * 3 * 4,
    type: "",
    dataLength: 0,
    loading: false,
    sortValue: "",
    timeSortValue: "",
    id: "",
  }),
  created() {
    // if (!this.$route.query.type) {
    // this.$nextTick(() =>{
    // this.getNFTList();
    this.getBlindbox();
    // })
    // this.getNFTList();
    // }
  },
  // mounted() {
  //   if (this.$route.query.type) {
  //     this.getNFTList();
  //   }
  // },
  watch: {
    page() {
      this.getNFTList(false);
      document.documentElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
  },
  methods: {
    //获取盲盒活动信息
    getBlindbox() {
      getBlindbox({})
        .then((response) => {
          this.id = response.data.results[0].id;
          this.getNFTList();
        })
        .catch(() => {});
    },
    rightIconClick() {
      this.$emit("changeLeftNavigation");
    },
    //选择价格时间
    changeSelectList(sortValue, timeSortValue) {
      this.sortValue = sortValue;
      this.timeSortValue = timeSortValue;
      this.getNFTList();
      // console.log(sortValue)
      // console.log(timeSortValue)
    },
    rowNumber() {
      let nftlistshowDom = document.getElementById("nftlistshow");
      let nft0Dom = document.getElementById("nft0");
      let num =
        (nftlistshowDom &&
          nft0Dom &&
          nftlistshowDom.offsetWidth / nft0Dom.offsetWidth) ||
        0;
      num = Math.floor(num);
      this.limit = num * this.rowNum;
      this.data = this.data.slice(0, this.limit);
      this.pageLength =
        parseInt(this.dataLength / this.limit) +
          ((this.dataLength % this.limit && 1) || 0) || 1;
    },
    getNFTList(resetPage = true) {
      let info = {};
      if (!this.$route.query.type) {
        info.type = "0,2,3";
      }
      if (!this.boxStatus && this.$route.query.type === "1") {
        info.type = "2,3";
      }
      if (!this.boxStatus && this.$route.query.type === "2") {
        info.type = "2,3";
        info.blindbox = this.id;
      }
      if (!this.boxStatus && this.$route.query.type === "3") {
        info.type = "0";
      }
      if (this.boxStatus) {
        this.boxStatus && (info.type = this.boxStatus);
      }
      // if(this.$route.query.type){
      //     this.boxStatus && (info.type = this.boxStatus)
      // }else {

      // }
      //类型
      // if (this.type !== this.$route.query.type && this.$route.query.type) {
      //   //刷新页面，mounted
      //   let d;
      //   switch (this.$route.query.type) {
      //     case "game":
      //       d = "3";
      //       break;
      //     case "blindBox":
      //       d = "2";
      //       break;
      //     case "luxury":
      //       d = "0";
      //       break;
      //     default:
      //       d = "1";
      //   }
      //   this.type =
      //     d === "3"
      //       ? "game"
      //       : d === "2"
      //       ? "blindBox"
      //       : d === "0"
      //       ? "luxury"
      //       : "";
      //   info.type = d;
      //   // this.type && (info.type = this.type)
      // } else if (this.boxStatus) {
      //   //点击应用
      //   this.boxStatus && (info.type = this.boxStatus);
      // } else {
      //   //没有created
      //   info.type = "0,2,3";
      // }
      //活动
      this.carouselSelected && (info.blindbox = this.carouselSelected);
      //状态
      this.nftStatus && (info.sell_way = this.nftStatus);
      //上架状态
      this.nftStatus && (info.is_onsale = true);
      //最小值
      this.minPrice && (info.min_price = this.minPrice);
      //最大值
      this.maxPrice && (info.max_price = this.maxPrice);
      // let info = this._.cloneDeep(this.selectedStatus && this.selectedStatus.info || {})
      this.loading = true;
      // this.type && (info.type = this.type)
      this.sortValue && (info.ordering = this.sortValue);
      this.timeSortValue &&
        (info.ordering = `${(info.ordering && info.ordering + ",") || ""}${
          this.timeSortValue
        }`);
      info.is_expired = false;
      info.limit = this.limit;
      if (resetPage) this.page = 1;
      info.offset = this.limit * (this.page - 1);
      info.status = 0; //去掉销毁的数据
      // info.is_onsale = true//取消出售状态
      getNFTList(info)
        .then((response) => {
          this.loading = false;
          this.data = response.data.results;
          this.dataLength = response.data.count;
          this.pageLength =
            parseInt(response.data.count / this.limit) +
              ((response.data.count % this.limit && 1) || 0) || 1;
          this.$nextTick(this.rowNumber);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.rightContent {
  padding-left: 0px;
  padding-top: 41px;
  padding-right: 58px;
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  // position: relative;
  .overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    // top: 100px;
  }
  .topContent {
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 980px) {
  .rightContent {
    padding-left: 20px;
    padding-right: 20px;
  }
  .mysteryBox_card {
    width: 100% !important;
    margin-left: 0px !important;
    margin-right: 0px;
  }
  .btnIcon {
    display: block !important;
    margin-right: 10px;
  }
}

@media screen and (min-width: 980px) and (max-width: 1400px) {
  .mysteryBox_card {
    width: calc((100% - 116px) / 2) !important;
  }
}

@media (min-width: 1401px) and (max-width: 1820px) {
  .mysteryBox_card {
    width: calc((100% - 177px) / 3) !important;
  }
}

@media (min-width: 1821px) and (max-width: 2220px) {
  .mysteryBox_card {
    width: calc((100% - 232px) / 4) !important;
  }
}

@media (min-width: 2221px) and (max-width: 2620px) {
  .mysteryBox_card {
    width: calc((100% - 290px) / 5) !important;
  }
}

@media (min-width: 2621px) and (max-width: 2820px) {
  .mysteryBox_card {
    width: calc((100% - 348px) / 6) !important;
  }
}

@media (min-width: 2821px) and (max-width: 3221px) {
  .mysteryBox_card {
    width: calc((100% - 406px) / 7) !important;
  }
}
</style>