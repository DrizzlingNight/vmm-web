<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card width="480px" class="mx-auto">
      <div class="text-right" style="height: 40px">
        <v-card-subtitle
            class="d-inline-block"
            @click="closeBidding"
        >
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-container class="mt-n6">
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-card-text class="navI18n--text text-center" style="font-size: 24px;font-weight: bold">
              {{ $t("productDetail.biddingDialog.title") }}
            </v-card-text>
            <v-col class="d-flex justify-start px-3 py-0 mt-5">
              <v-img
                  class="borderRadius"
                  max-height="67"
                  max-width="67"
                  :src="isOldImg ? host + NFTData.files : NFTData.cover_img ? host + NFTData.cover_img : NFTData.files ? host + NFTData.files[0]:require('@/assets/coinType/USDT.png')"
              ></v-img>
              <div class="ml-3 mt-2">
                <div class="description navI18n--text text-truncate" style="width: 320px">{{ NFTData ? NFTData.name : "" }}</div>
                <div class="fontColor10--text mt-1" style="font-size: 14px">
                  {{ `${NFTData ? NFTData.user.username : ""}` }}
                </div>
              </div>
            </v-col>
            <v-col class="d-flex justify-space-between pt-0 mt-8">
              <div class="fontColor6--text">{{ $t("productDetail.biddingDialog.currentPrice") }}</div>
              <div class="navI18n--text">{{ showPrice }}{{ NFTData.coin.code }}</div>
            </v-col>
            <v-col class="mt-8">
              <div class="fontColor6--text mb-1">{{ $t("productDetail.biddingDialog.ownPrice") }}</div>
              <v-row no-gutters>
                <v-col class="pa-0">
                  <v-form>
                    <VuetifyNumberInput
                        class="text-h4"
                        v-model="biddingPrice"
                        v-bind:options="biddingVNIOption"
                        :rules="[biddingRule]"
                        :placeholder="$t('productDetail.biddingDialog.bidddingPlaceholder')"
                        backgroundColor=""
                        hide-details
                    >
                    </VuetifyNumberInput>
                  </v-form>
                </v-col>
              </v-row>
              <div class="d-flex float-right align-top mt-n8">
                <v-avatar size="18" style="margin-top: 2px">
                  <img :src="require('@/assets/coinType/'+NFTData.coin.code+'.png')" />
                </v-avatar>
                <p class="ml-1 ETHColor">{{ NFTData.coin.code }}</p>
              </div>
              <v-col class="d-flex justify-end pa-0 mt-3">
<!--                <span class="fontColor6&#45;&#45;text" style="font-size: 12px">≈ ${{ cash }}</span>-->
                <div>
                  <form class="radio" @change="btnPrice" style="font-size: 14px">
                    <input type="radio" v-model="selectBtn" name="p_1" value="2" id="p_1"><label
                      style="border-radius: 6px" for="p_1">2x</label>
                    <input type="radio" v-model="selectBtn" name="p_1" value="5" id="p_2"><label
                      style="border-radius: 6px" for="p_2">5x</label>
                    <input type="radio" v-model="selectBtn" name="p_1" value="10" id="p_a"><label
                      style="border-radius: 6px" for="p_a">10x</label>
                  </form>
                </div>
              </v-col>
            </v-col>
            <v-col class="d-flex justify-space-between pa-0 mt-8">
              <v-col class="fontColor6--text">
                <div>{{ $t("productDetail.sellDialog.balance") }}</div>
<!--                <div class="my-1">{{ $t("productDetail.sellDialog.formalities") }}</div>-->
                <div>{{ $t("productDetail.sellDialog.willPay") }}</div>
              </v-col>
              <v-col class="text-right">
                <div v-if="!biddingLowerPrice" class="navI18n--text" style="font-size: 13px">{{ showBalance }}{{ NFTData.coin.code }}</div>
                <div v-else class="errorColor" style="font-size: 13px">{{ showBalance }}{{ NFTData.coin.code }}</div>
<!--                <div class="my-1 btnColor&#45;&#45;text">{{ showFee }}ETH</div>-->
                <div class="navI18n--text font-weight-bold">{{ biddingWillpay }}{{ NFTData.coin.code }}</div>
              </v-col>
            </v-col>
            <div style="margin-bottom: 14px">
              <v-col style="margin-top: 30px">
                <div class="hintText mb-4" style="font-size: 12px"><span class="hintText">{{
                    $t("productDetail.sellDialog.text")
                  }}</span>
                  <a @click="goService" text class="pa-0 fontColor11--text" height="17px">
                    {{ $t("productDetail.sellDialog.textService") }}
                  </a>
                </div>
                <v-btn
                    large
                    depressed
                    block
                    style="font-size: 20px"
                    class="btnColor btnWhite--text"
                    :disabled=" biddingPricePay || biddingLowerPrice"
                    @click="showPasswordPage"
                >
                  {{ $t("confirmBtn") }}
                </v-btn>
              </v-col>
              <v-col
                  v-if="biddingLowerPrice"
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
import i18n from "@/lang";
import VuetifyNumberInput from "@/components/VuetifyNumberInput";
import {formatDecimal, numFormat,cutZero} from "@/utils/math"
import {bidNFT} from "../../../api/NFT";

export default {
  name: "Bidding",
  components: {VuetifyNumberInput},
  data: () => ({
    biddingForm: false,
    selectBtn: "",
    biddingPrice: '',
    biddingVNIOption: {
      locale: i18n.locale,
      length: 12,
      fixed: 4,
    },
  }),
  props: [
    "NFTData",
    "isOldImg"
  ],
  created() {
    this.getBalance()
  },
  computed: {
    ...mapGetters(["name", "user", "host", "getRate", "config", "getBalanceById", "getCoinById"]),
    // rate() {
    //   return this.getRate(this.NFTData.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    // },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    //余额
    totalPrice() {
      if (this.config) {
        let balance = this.getBalanceById(this.config.base_coin)
        return balance && formatDecimal(balance.amount, 4) || "0"
      } else
        return null
    },
    showBalance() {
      return cutZero(numFormat(this.totalPrice))
    },
    //手续费比率
    NFTsellFee() {
      return this.config.nft_sell_fee
    },
    //输入判断
    biddingPricePay() {
      if(!this.biddingPrice)
        return true
      if(this.biddingPrice === '0.0000')
        return true
      return false
    },
    biddingLowerPrice() {
      if (this.totalPrice) {
        let totalPrice = Number(this.totalPrice.replace(/[,.]/g, ""))
        let biddingWillpay = Number(this.biddingWillpay.replace(/[,.]/g, ""))
        if (biddingWillpay > totalPrice) {
          return true
        }
      }
      return false
    },
    //当前价格
    price() {
      return formatDecimal(this.NFTData.current_price, 4)
    },
    showPrice() {
      if (this.price) {
        return cutZero(numFormat(this.price))
      }
      return null
    },
    //竞拍将付
    biddingWillpay() {
      return cutZero(numFormat(formatDecimal(Math.abs(Number(this.biddingPrice)), 4)))
    },
    //现金价值
    // cash() {
    //   return cutZero(numFormat(formatDecimal(Number(this.rate.rate) * Number(this.biddingPrice), 4)))
    // },
    //竞价手续费
    biddingInterest() {
      return formatDecimal((this.NFTsellFee * this.biddingPrice), 4)
    },
    showFee() {
      return numFormat(this.biddingInterest)
    }
  },
  methods: {
    goService() {
      this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", true);
    },
    getBalance() {
      this.$store
          .dispatch("user/balance")
          .then(() => {
          })
          .catch(() => {
          });
    },
    //竞价输入验证
    biddingRule(val) {
      if (Number(val) <= Number(this.price)) {
        return i18n.t("productDetail.biddingDialog.bidingRules")
      } else return true
    },
    closeBidding() {
      location.reload()
      this.$emit("closeDialog")
      this.toasterErr(i18n.t("errorClose"));
    },
    btnPrice() {
      this.biddingPrice = this.selectBtn * this.price
    },
    goRecharge() {
      this.$store.commit("ui/SET_IS_SHOW_DRAWER_DIALOG", true);
    },
    showPasswordPage() {
      this.$emit("showPasswordPage",
          this.$t("productDetail.buyDialog.titleBid"),
          '',
          "/nft/" + this.NFTData.id + '/bid',
          bidNFT,
          {price: this.biddingPrice, token: this.$route.params.id}
      )
    },
  }

}
</script>

<style scoped>

.errorColor {
  color: #e02020;
}

.radio input[type="radio"] {
  display: none;
}

.radio input[type="radio"] + label {
  padding: 0.2em 0.5em;
  margin: 0.2em 0.5em;
  border: 1px solid #050505;
}

.radio input[type="radio"] + label:nth-last-child(1) {
  margin-right: 0px;
}

.radio input[type="radio"]:checked + label {
  border: 1px solid #CC9933;
  color: #CC9933;
}

>>> .v-input input {
  max-height: 50px;
  font-size: 36px;
}

>>> .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: rgba(102, 102, 102, 1) !important;
}

>>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
  border-image: 0 !important;
}
</style>
