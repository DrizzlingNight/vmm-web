<template>
  <v-card
    max-width="300px"
    min-width="300px"
    style="margin-top: 14px; margin-bottom: 40px"
    flat
    @click.stop="goNFT(item.id)"
  >
    <SpliceNFT v-if="item.cover_type === 10" :rule="item.cover_img" maxWidth="300px" style="width:100%;min-height:300px;"></SpliceNFT>
    <video preload="auto" v-else-if="face.indexOf('mp4') > -1" class="lunImg my-auto" playsinline autoplay muted loop style="height: 100%;width: 100%;">
      
      <div
          class="d-flex"
          :class="(isExpired || isFreeze) ? 'justify-space-between' : 'justify-end'"
      >
        <div v-if="isExpired" class="d-inline-block">
          <div class="triangle-topleft"></div>
          <div class="transform-to-left-top">{{ $t("showCase.expired") }}</div>
        </div>
        <div v-if="isFreeze" class="d-inline-block">
          <div class="triangle-topleft" style="border-top: 78px solid #0091FF;"></div>
          <div class="transform-to-left-top">{{ $t("showCase.freeze") }}</div>
        </div>
      </div>
      <source :src="face" type="video/mp4">
    </video>
    <v-img
        v-else
      :src="face"
      class="white--text rounded cardBackground"
      style="border-radius: 4px; position: relative"
      aspect-ratio="0.986"
    >
      <div
          class="d-flex"
          :class="(isExpired || isFreeze) ? 'justify-space-between' : 'justify-end'"
      >
        <div v-if="isExpired" class="d-inline-block">
          <div class="triangle-topleft"></div>
          <div class="transform-to-left-top">{{ $t("showCase.expired") }}</div>
        </div>
        <div v-if="isFreeze" class="d-inline-block">
          <div class="triangle-topleft" style="border-top: 78px solid #0091FF;"></div>
          <div class="transform-to-left-top">{{ $t("showCase.freeze") }}</div>
        </div>
      </div>
    </v-img>
    <div>
      <PopUp
          :type="type"
          :tab="tab"
          :item="item"
          :isOldImg="isOldImg"
          v-if="
          isRouter &&
          isExpiredOrDestory &&
          isMinePersonalCenter &&
          !isCreator &&
          !(isFreeze)
        "
          style="position: absolute; left: 21px; top: 16px"
      ></PopUp>
      <collection-icon
          v-if="tab === 'myCollect'"
          :nft="item"
      ></collection-icon>
      <collection-btn
          style="margin-right: 14px; margin-top: 14px !important"
          v-if="this.$route.path === '/assets'"
          :n-f-t="item"
      ></collection-btn>
    </div>
    <v-container style="padding: 16px 9px 22px 13px;">
      <div class="d-flex justify-space-between">
        <div
          class="title text-truncate fontColor--text"
          style="line-height: 18px;"
        >
          {{ item.name }}
        </div>
        <img
          class="auction"
          v-if="item.is_onsale && item.sell_way === '1'"
          src="@/assets/fake/auction.png"
        />
      </div>
      <div class="d-flex justify-space-between">
        <p
          class="key fontColor4--text"
          style="padding-top: 16px"
          v-if="item.sell_way === '1'"
        >
          {{ $t("showCase.currentPrice") }}
        </p>
        <p class="key fontColor4--text" style="padding-top: 16px" v-else>
          {{ $t("showCase.price") }}
        </p>
        <show-price
          :nft-price="
            (item.is_onsale &&
              (item.sell_way === '1' ? item.current_price : item.price)) ||
            null
          "
          :coin="item.coin"
        ></show-price>
      </div>
      <div class="d-flex justify-space-between">
        <div class="key fontColor4--text" style="padding-top: 5px">
          {{ $t("showCase.user") }}
        </div>
        <simple-show-user-info
          :nft-price="item.current_price"
          :coin="item.coin"
          :user="item.user"
        ></simple-show-user-info>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ShowPrice from "@/components/ShowPrice";
import SimpleShowUserInfo from "@/components/simpleShowUserInfo";
import PopUp from "@/views/PerSetting/PersettingComps/PopUp";
import CollectionIcon from "../views/PerSetting/PersettingComps/CollectionIcon";
import CollectionBtn from "./CollectionBtn";
import SpliceNFT from "../views/SpliceNFT/SpliceNFT";

export default {
  name: "ShowCase",
  components: {
    CollectionBtn,
    CollectionIcon,
    PopUp,
    SimpleShowUserInfo,
    ShowPrice,
    SpliceNFT,
  },
  props: ["item", "tab", "type"],
  created() {
    this.route = this.$route.path;
  },
  computed: {
    ...mapGetters(["host", "user", "getCoinById"]),
    face() {
      return (this.item.cover_img && (this.host + this.item.cover_img))
          || this.item.files && ((typeof this.item.files === 'string' && (this.host + this.item.files)) || (this.host + this.item.files[0])) || ""
    },
    isRouter() {
      return this.route.substring(0, 5) === "/user";
    },
    isExpiredOrDestory() {
      return this.tab === 0 || this.tab === 2 || this.tab === 3;
    },
    //返回true是金库
    isCreator() {
      return this.user && this.user.profile && this.user.profile.is_creator;
    },
    //判断是否是自己的个人中心
    isMinePersonalCenter() {
      return this.user && Number(this.$route.params.id) === this.user.id;
    },
    //图片匹配老数据
    isOldImg() {
      // if(this.item.files){
      //   console.log(1)
      // }
      // if (this.item) {
        if (typeof this.item.files === "string") {
          return true;
        } else return false;
      // } else return true;
    },
    price() {
      return Number(this.item.price).toFixed(2);
    },
    like() {
      if (this.item.favorite)
        return (this.item.like || 0) + (this.favorite ? 0 : -1);
      else return (this.item.like || 0) + (this.favorite ? 1 : 0);
    },
    coin() {
      if (this.item) return this.getCoinById(this.item.coin.id);
      else return null;
    },
    isExpired() {
      let now = this.moment();
      let expired = this.moment(this.item.expiration);
      return expired.diff(now) < 0;
    },
    isFreeze() {
      if (this.item) return (this.item.is_freeze || false)
      return false
    }
  },
  data: () => {
    return {
      favorite: false,
      route: "",
    };
  },
  mounted() {
    this.favorite = this.item.favorite;
  },
  methods: {
    goNFT(_id) {
      this.$router.push("/nft/" + _id);
    },
    // likeNft(_id){
    //   this.favorite = !this.favorite
    // }
  },
};
</script>

<style scoped>
.title {
  font-size: 18px !important;
  font-weight: bold;
  line-height: 38px;
  margin: 0;
}

.auction {
  height: 25px;
  width: 25px;
  border-radius: 50%;
}

.key {
  font-size: 12px;
}

.triangle-topleft {
  width: 0;
  height: 0;
  border-top: 78px solid #9b9b9b;
  border-right: 78px solid transparent;
  margin-bottom: 201px;
}

.transform-to-left-top {
  transform: rotate(-45deg);
  position: absolute;
  top: 17px;
  left: 4px;
  font-size: 16px;
}

@media (max-width: 980px) {
  .cardImg {
    width: calc(100% - 20px) !important;
    /*height: 100% !important;*/
  }
}
</style>
