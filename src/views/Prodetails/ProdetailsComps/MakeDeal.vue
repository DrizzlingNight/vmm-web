<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="mx-auto" width="480px" height="592px">
      <div class="text-right">
        <v-card-subtitle class="d-inline-block" @click="closeMakeDeal">
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-container class="mt-n6">
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-card-text class="navI18n--text text-center" style="font-size: 24px">
              {{ $t("productDetail.makeDeal.title") }}
            </v-card-text>
            <v-col class="d-flex">
              <v-img
              class="borderRadius"
                  max-height="67"
                  max-width="67"
              :src="isOldImg ? host + NFTData.files : NFTData.cover_img ? host + NFTData.cover_img : NFTData.files ? host + NFTData.files[0]:require('@/assets/coinType/USDT.png')"
              ></v-img>
              <v-col >
                <div class="description navI18n--text text-truncate" style="width: 320px">{{ NFTData ? NFTData.name : "" }}</div>
                <div class="fontColor10--text mt-1">
                  {{ `${NFTData ? NFTData.user.username : ""}` }}
                </div>
              </v-col>
            </v-col>
            <v-col class="d-flex justify-space-between mt-6">
              <div class="fontColor6--text">
                {{ $t("marketPlace.price.price") }}
              </div>
              <div>{{ price }}{{ NFTData.coin.code }}</div>
            </v-col>
            <v-col class="mt-9">
              <p class="ETHColor">
                {{ $t("productDetail.makeDeal.text") }}
              </p>
              <v-col class="d-flex pa-0 mt-n3">
                <VuetifyNumberInput
                    class="text-h4"
                    v-model.number="makeDealPrice"
                    backgroundColor=""
                    disabled
                >
                </VuetifyNumberInput>
              </v-col>
              <div class="d-flex float-right mt-n14">
                <v-avatar size="18" style="margin-top: 2px">
                  <img :src="require('@/assets/coinType/'+NFTData.coin.code+'.png')" />
                </v-avatar>
                <p class="ml-1 ETHColor">{{ NFTData.coin.code }}</p>
              </div>
              <v-col class="ETHColor pa-0 mt-n5" style="font-size: 12px">
<!--                <span>≈ ${{ cash }}</span>-->
              </v-col>
            </v-col>
            <v-col cols="12" class="mx-auto mt-12">
              <div class="hintText mb-4" style="font-size: 12px"><span class="hintText">{{
                  $t("productDetail.sellDialog.text")
                }}</span>
                <a @click="goService" text class="pa-0 fontColor11--text" height="17px">
                  {{ $t("productDetail.sellDialog.textService") }}
                </a>
              </div>
              <v-btn
                  large
                  block
                  depressed
                  style="font-size: 20px"
                  class="btnColor btnWhite--text"
                  @click="confirmMakeDeal"
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
import { mapGetters } from "vuex";
import VuetifyNumberInput from "@/components/VuetifyNumberInput";
import { formatDecimal,cutZero } from "@/utils/math";
import {OfferDeal} from "../../../api/NFT";
import i18n from '@/lang'
export default {
  name: "",
  components: {VuetifyNumberInput},
  data() {
    return {};
  },
  props: ["NFTData", "NFTsellFee", "confirmOffer","isOldImg"],
  computed: {
    ...mapGetters(["name", "user","config", "host", "getRate","getCoinById"]),
    // rate() {
    //   if(!this.NFTData.coin) {
    //     return this.getRate(this.config.coin, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    //   }else {
    //     return this.getRate(this.NFTData.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    //   }
    // },
    makeDealPrice() {
      return this.confirmOffer.price
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    //当前价格
    price() {
      return cutZero(formatDecimal(this.NFTData.price, 4))
    },
    //现金价值
    // cash() {
    //   return cutZero(formatDecimal(Number(this.rate.rate) * Number(this.makeDealPrice), 4))
    // },
  },
  methods:{
    goService() {
      this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", true);
    },
    closeMakeDeal() {
      location.reload()
      this.$emit("closeDialog")
      this.toasterErr(i18n.t("errorClose"));
    },
    confirmMakeDeal() {
      this.$emit("showPasswordPage",
          this.$t("productDetail.buyDialog.titleTrade"),
          this.$t("productDetail.buyDialog.textTrade"),
          "/user/" + this.user.id,
          OfferDeal,
          {id: this.confirmOffer.id}
      )
    }
  }
}
</script>

<style  scoped>
>>> .theme--dark.v-input input, .theme--dark.v-input textarea {
  color: rgba(255, 255, 255, 1);
}

>>> .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: rgba(102, 102, 102, 1) !important;
}

>>> .theme--dark.v-text-field.v-input--is-disabled .v-input__slot::before {
  border-image: 0 !important;
}

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