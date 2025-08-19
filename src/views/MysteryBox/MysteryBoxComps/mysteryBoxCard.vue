<template>
  <v-card
      width="300px"
      style="margin-top: 14px;margin-bottom: 40px;"
      flat
      @click.stop="goNFT(item.id)">
    <SpliceNFT v-if="item.cover_type === 10" :rule="item.cover_img" maxWidth="100%" style="width:100%;min-height:100px;"></SpliceNFT>
    <v-img
        v-else
        :src="isOldImg ? host + item.files : item.cover_img ? host + item.cover_img : item.files ? host + item.files[0]:require('@/assets/coinType/USDT.png')"
        class="white--text rounded cardBackground"
        style="border-radius: 4px;position: relative"
        aspect-ratio="0.986"
    >
    </v-img>
    <v-container style="padding: 16px 9px 22px 13px;">
      <div class="d-flex justify-space-between">
        <div class="title text-truncate">{{ item.name }}</div>
        <img
            class="auction"
            v-if="(item.is_onsale) && (item.sell_way === '1')"
            src="@/assets/fake/auction.png">
      </div>
      <div class="d-flex justify-space-between">
        <!--        <div class="d-flex justify-space-between">-->
        <p class="key fontColor4--text" style="padding-top: 16px">
          {{ $t('mysteryBox.fontPage.currentPrice') }}</p>
        <show-price :nft-price="item.price"
                    :coin="item.coin"></show-price>
      </div>
      <!--      </div>-->
      <div class="d-flex justify-space-between">
        <div class="key fontColor4--text" style="padding-top: 5px">{{ $t('mysteryBox.fontPage.own') }}</div>
        <simple-show-user-info :coin="item.coin"
                               :user="item.user"></simple-show-user-info>
      </div>

    </v-container>
  </v-card>
</template>

<script>
import ShowPrice from "@/components/ShowPrice";
import SimpleShowUserInfo from "@/components/simpleShowUserInfo";
import {mapGetters} from "vuex";
import SpliceNFT from '../../SpliceNFT/SpliceNFT.vue'

export default {
  name: "mysteryBoxCard",
  props: [
    'item',
  ],
  components: {SimpleShowUserInfo, ShowPrice, SpliceNFT},
  computed: {
    ...mapGetters(["host"]),

    //图片匹配老数据
    isOldImg() {
      if (this.item) {
        if (typeof this.item.files === 'string') {
          return true
        } else return false
      } else return true
    }
  },
  methods: {
    goNFT(_id) {
      const route = "/nft/" + _id
      this.$router.push(route);
    }
  }

}
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