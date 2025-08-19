<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card width="480" class="mx-auto">
      <div class="text-right">
        <v-card-subtitle
            class="d-inline-block"
            @click="closeBuy"
        >
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-container class="mt-n9">
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-card-text class="navI18n--text text-center" style="font-size: 24px;font-weight: bold">
              {{ $t("productDetail.sellDialog.title") }}
            </v-card-text>
            <v-col class="d-flex justify-start px-3 py-0 mt-8">
              <v-img
                  class="borderRadius"
                  max-height="63"
                  max-width="63"
                  :src="isOldImg ? host + NFTData.files : NFTData.cover_img ? host + NFTData.cover_img : NFTData.files ? host + NFTData.files[0]:require('@/assets/coinType/USDT.png')"
              ></v-img>
              <div class="ml-3 mt-1">
                <div class="description navI18n--text text-truncate" style="width: 320px">
                  {{ this.NFTData ? this.NFTData.name : "" }}
                </div>
                <div class="fontColor10--text mt-1" style="font-size: 14px">
                  {{ `拥有者: ${NFTData ? NFTData.user.username : ""}` }}
                </div>
              </div>
            </v-col>
            <v-col class="mt-7">
              <div class="fontColor6--text">
                {{ $t("marketPlace.price.price") }}
              </div>
              <v-row no-gutters>
                <v-col class="pa-0 mt-1">
                  <VuetifyNumberInput
                      v-model.number="nftPrice"
                      backgroundColor=""
                      disabled
                  >
                  </VuetifyNumberInput>
                </v-col>
              </v-row>
              <div class="d-flex float-right mt-n14">
                <v-avatar size="18" style="margin-top: 2px">
                  <img :src="require('@/assets/coinType/'+NFTData.coin.code+'.png')"/>
                </v-avatar>
                <p class="ml-1 fontColor6--text">{{ NFTData.coin.code }}</p>
              </div>
              <v-col class="ETHColor pa-0 mt-n3" style="font-size: 12px">
<!--                <span class="fontColor6&#45;&#45;text" style="font-size: 12px">≈ ${{ cash }}</span>-->
              </v-col>
            </v-col>
            <v-col class="d-flex justify-space-between pa-0 mt-6">
              <v-col class="fontColor6--text">
                <div>{{ $t("productDetail.sellDialog.balance") }}</div>
<!--                <div class="my-1">{{ $t("productDetail.sellDialog.formalities") }}</div>-->
                <div>{{ $t("productDetail.sellDialog.willPay") }}</div>
              </v-col>
              <v-col class="text-right">
                <div v-if="!lowerPrice" class="navI18n--text" style="font-size: 13px">{{ showBalance }}{{
                    NFTData.coin.code
                  }}
                </div>
                <div v-else class="errorColor" style="font-size: 13px">{{ showBalance }}{{ NFTData.coin.code }}</div>
                <!--                <div class="my-1 btnColor&#45;&#45;text">{{ showFee }} ETH</div>-->
                <div class="navI18n--text font-weight-bold">{{ payablePrice }}{{ NFTData.coin.code }}</div>
              </v-col>
            </v-col>
            <div style="margin-bottom: 13px">
              <v-col cols="12" class="mx-auto mt-5 pb-2">
                <div class="hintText mb-4" style="font-size: 12px"><span class="hintText">{{
                    $t("productDetail.sellDialog.text")
                  }}</span>
                  <a @click="goService" text class="pa-0 fontColor11--text" height="17px" style="font-size: 12px">
                    {{ $t("productDetail.sellDialog.textService") }}
                  </a>
                </div>
                <v-btn
                    block
                    depressed
                    class="btnColor btnWhite--text"
                    @click="showPasswordPage"
                    :disabled="lowerPrice"
                    style="height: 50px;font-size: 20px"
                >
                  {{ $t("confirmBtn") }}
                </v-btn>
              </v-col>
              <v-col
                  v-if="lowerPrice"
                  class="d-flex justify-space-between py-0"
                  style="height: 20px"
              >
                <span class="errorColor">{{ $t("productDetail.sellDialog.lowBalance") }}</span>
                <v-btn text color="#1E88E5" height="20px" @click="goRecharge">{{
                    $t("productDetail.sellDialog.recharge")
                  }}
                </v-btn>
              </v-col>
            </div>

          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {formatDecimal, numFormat, cutZero} from "@/utils/math";
import VuetifyNumberInput from "@/components/VuetifyNumberInput";
import {buyNFT} from "../../../api/NFT";
import i18n from "@/lang";

export default {
  name: "BuyCard",
  components: {VuetifyNumberInput},
  data: () => ({}),
  props: [
    "NFTData",
    "isOldImg"
  ],
  created() {
    this.getBalance();
  },
  computed: {
    ...mapGetters(["name", "user", "host", "getRate", "config", "getBalanceById", "getCoinById"]),
    //余额
    totalPrice() {
      if (this.config) {
        let balance = this.getBalanceById(this.config.base_coin)
        return balance && cutZero(formatDecimal(balance.amount, 4) || "0")
      } else
        return null
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    showBalance() {
      return cutZero(numFormat(this.totalPrice))
    },
    //手续费比率
    NFTsellFee() {
      return this.config.nft_sell_fee
    },
    // rate() {
    //   return this.getRate(this.NFTData.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    // },
    payablePrice() {
      return cutZero(numFormat(formatDecimal(Math.abs(Number(this.nftPrice)), 4)))
    },
    nftPrice() {
      return cutZero(formatDecimal(Number(this.NFTData ? this.NFTData.price : ""), 4))
    },
    Interest() {
      return formatDecimal((this.NFTsellFee * this.nftPrice), 4)
    },
    showFee() {
      return numFormat(this.Interest)
    },
    lowerPrice() {
      let payablePrice = Number(this.payablePrice.replace(/[,.]/g, ''))
      let totalPrice = Number(this.totalPrice.toString().replace(/[,.]/g, ''))
      if (payablePrice > totalPrice) {
        return true;
      } else return false;
    },
    //现金价值
    // cash() {
    //   return cutZero(formatDecimal(Number(this.rate.rate) * Number(this.nftPrice), 4))
    // },
  },
  methods: {
    goService() {
      this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", true);
    },
    showPasswordPage() {
      this.$emit("showPasswordPage",
          this.$t("productDetail.buyDialog.titleBuy"),
          this.$t("productDetail.buyDialog.textBuy"),
          "/nft/" + this.NFTData.id + '/info',
          buyNFT,
          {abs_amount: this.nftPrice, token: this.$route.params.id}
      )
    },
    closeBuy() {
      location.reload()
      this.$emit("closeDialog")
      this.toasterErr(i18n.t("errorClose"));
    },
    goRecharge() {
      this.$store.commit("ui/SET_IS_SHOW_DRAWER_DIALOG", true);
    },
    getBalance() {
      this.$store
          .dispatch("user/balance")
          .then(() => {
          })
          .catch(() => {
          });
    },
  }
}
</script>

<style scoped>
>>> .theme--light.v-input input, .theme--dark.v-input textarea {
  font-size: 36px;
}

>>> .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: rgba(102, 102, 102, 1) !important;
}

>>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
  display: none;
}

>>> .v-input input {
  max-height: 50px;
}

</style>
