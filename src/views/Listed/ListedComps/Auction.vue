<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card width="480px" height="564px" class="mx-auto">
      <div class="text-right" style="height: 40px">
        <v-card-subtitle
            class="d-inline-block"
            @click="closeAuction"
        >
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-container class="mt-n6">
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-card-text class="navI18n--text text-center" style="font-size: 24px;font-weight: bold">
              {{ $t("productDetail.sellDialog.title") }}
            </v-card-text>
            <v-col class="d-flex justify-start align-center">
              <v-img
                  class="borderRadius"
                  max-height="63"
                  max-width="63"
                  :src="isOldImg ? host + NFT.files : NFT.cover_img ? host + NFT.cover_img : NFT.files ? host + NFT.files[0]:require('@/assets/coinType/USDT.png')"
              ></v-img>
              <div class="ml-4">
                <div class="text-truncate navI18n--text" style="width: 320px">{{ this.NFT ? this.NFT.name : "" }}</div>
                <span class="fontColor10--text mt-1">
                    {{ `拥有者: ${NFT ? NFT.user.username : ""}` }}
                  </span>
              </div>
            </v-col>
            <v-col class="mt-4">
              <span class="fontColor6--text">{{ $t("listed.auction.expiration") }}</span>
              <span>{{ date }}</span>
            </v-col>
            <v-col class="mt-4">
              <div class="ETHColor">
                {{ $t("listed.auction.startAuction") }}
              </div>
              <v-col class="d-flex pa-0">
                <VuetifyNumberInput
                    class="text-h4"
                    v-model.number="price"
                    backgroundColor=""
                    disabled
                >
                </VuetifyNumberInput>
              </v-col>
              <div class="d-flex float-right mt-n14">
                <v-avatar size="18" style="margin-top: 2px">
                  <img :src="require('@/assets/coinType/'+baseCoin.code+'.png')" />
                </v-avatar>
                <p class="ml-1 ETHColor">{{ baseCoin.code }}</p>
              </div>
              <v-col class="ETHColor pa-0 mt-n5" style="font-size: 12px">
<!--                <span>≈ ${{ cash }}</span>-->
              </v-col>
            </v-col>
            <v-col>
              <div class="text-center errorColor py-3">{{ $t("listed.auction.errorAccount") }}</div>
            </v-col>
            <v-col cols="12" class="mx-auto">
              <div class="hintText mb-4" style="font-size: 12px"><span >{{
                  $t("productDetail.sellDialog.text")
                }}</span>
                <a @click="goService" text  class="pa-0 fontColor11--text" height="17px">
                  {{ $t("productDetail.sellDialog.textService") }}
                </a>
              </div>
              <v-btn
                  depressed
                  large
                  block
                  style="font-size: 20px"
                  class="btnColor btnWhite--text"
                  @click="accountSuccess"
              >
                {{ $t("confirmBtn") }}
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>

</template>

<script>
import {sellNFT} from "@/api/NFT";
import {mapGetters} from "vuex";
import VuetifyNumberInput from "@/components/VuetifyNumberInput";
import i18n from "@/lang";
// import {formatDecimal, numFormat,cutZero} from "@/utils/math"
export default {
  name: "Auction",
  components: {VuetifyNumberInput},
  data: () => ({}),
  props: [
    "imgUrl",
    "NFT",
    "date",
    "price",
    "config",
    "raw_price_date"
  ],
  computed: {
    ...mapGetters([
      'name', 'user', 'host', "getRate","getCoinById"
    ]),
    //图片匹配老数据
    isOldImg() {
      if (this.imgUrl) {
        if (typeof this.imgUrl === 'string') {
          return true
        } else return false
      } else return true
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    // rate() {
    //   return this.getRate(1, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    // },
    // cash() {
    //   return cutZero(numFormat(formatDecimal(Number(this.price || 0) * Number(this.rate && this.rate.rate || 0),4)))
    // }
  },
  methods: {
    goService() {
      this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", true);
    },
    closeAuction() {
      this.$emit("closeDialog")
      this.toasterErr(i18n.t("errorClose"));
    },
    accountSuccess() {
      sellNFT(this.$route.params.id, {
        'coin': 2,
        'price': this.price,
        'sell_way': 1,
        'end_days': this.raw_price_date[this.date]
      })
          .then((response) => {
            if (response.code === 0) {
              this.$emit("autionSuccess")
            } else {
              this.toasterErr(response.code)
            }
          })
          .catch(() => {

          })
    },
  }

}
</script>

<style scoped>

>>> .v-input input {
  max-height: 50px;
}
>>> .theme--light.v-input input, .theme--dark.v-input textarea {
  font-size: 36px;
}
>>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
  display: none;
}
</style>