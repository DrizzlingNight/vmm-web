<template>
  <div>
    <v-container style="max-width: 641px" class="px-5">
      <v-row>
        <v-col class="topMargin" cols="12" style="margin-top: 100px">
          <span class="font-weight-bold" style="font-size: 40px;line-height: 20px">{{ $t("listed.title") }}</span>
        </v-col>
      </v-row>
      <v-row style="margin-top: 26px">
        <v-col cols="12" md="6" style="padding-right: 10px">
          <v-btn block outlined
                 :color="this.isPrice ?  'btnColor':'border3' "
                 @click="isPrice = true">
            <div>
              <div class="mb-1" style="font-size: 16px;font-weight: bold;line-height: 22px;height: 22px">
                {{ $t("listed.btn.onePrice") }}
              </div>
              <span style="font-size: 12px;height: 17px;line-height: 17px">{{ $t("listed.btn.onePriceText") }}</span>
            </div>
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" style="padding-left: 10px">
          <v-btn block outlined :color="
                  this.isPrice ? 'border3' : 'btnColor'" @click="isPrice = false">
            <div>
              <div class="mb-1" style="font-size: 16px;font-weight: bold;line-height: 22px;height: 22px">
                {{ $t("listed.btn.auction") }}
              </div>
              <span style="font-size: 12px;height: 17px;line-height: 17px">{{ $t("listed.btn.auctionText") }}</span>
            </div>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider style="margin-top: -3px" class="border"></v-divider>
        </v-col>
        <v-col cols="12">
          <v-card class="btnBackColor" flat v-if="isPrice">
            <v-form ref="form" v-model="validOnePrice">
              <p class="mb-1 mt-3 fontColor--text">{{ $t("listed.onePriceSelect.setPrice") }}</p>
              <VuetifyNumberInput
                  class="mt-n2"
                  v-model.number="price"
                  v-bind:options="annualizedVNIOption"
                  :placeholder="$t('listed.onePriceSelect.setPricePlaceholder')"
                  backgroundColor=""
                  type="number"
                  hide-details
                  :rules="inputRules"
              ></VuetifyNumberInput>
              <div class="d-flex justify-space-between" style="margin-top: 6px">
                <div class="caption grey--text lighten-5 pb-0">{{ $t("listed.onePriceSelect.title") }}</div>
                <div style="font-size: 12px;height: 17px;line-height: 17px" class="btnColor--text">
                  {{ $t("listed.fee") }}{{ config.nft_sell_fee * 100 }}%
                </div>
              </div>

            </v-form>
            <div style="margin-top: 38px" v-if="NFT && NFT.type == 0">
              <span style="font-size: 16px" class="fontColor--text">{{ $t("listed.onePriceSelect.expireDate") }}</span>
              <span style="font-size: 14px"
                    class="btnColor--text ml-n2">{{ this.NFT ? endDate(this.NFT.expiration) : '--' }}</span>
              <span style="font-size: 12px" class="fontColor7--text ml-1">({{
                  $t("listed.onePriceSelect.errorText")
                }})</span>
            </div>
            <v-col cols="12" md="10" class="mx-auto px-0" style="margin-top: 62px">
              <div>
                <v-btn
                    block
                    depressed
                    class="btnColor btnWhite--text"
                    style="height: 50px"
                    @click="success"
                    :disabled="(NFT && NFT.type === 0) ? !this.DateDiffer(this.NFT ? this.NFT.expiration:'') || !this.validOnePrice : !this.validOnePrice"
                >
                  {{ $t("listed.confirmBtn") }}
                </v-btn>
              </div>
            </v-col>
          </v-card>
          <v-card class="btnBackColor" flat v-else>
            <v-form ref="form2" v-model="validAuction">
              <v-col cols="12" class="pa-0 mt-3">
                <div style="font-size: 16px">{{ $t("listed.auction.start") }}</div>
                <VuetifyNumberInput
                    class="text-body-1"
                    v-model.number="price"
                    v-bind:options="annualizedVNIOption"
                    :placeholder="$t('listed.auction.startPricePlaceholder')"
                    backgroundColor=""
                    type="number"
                    hide-details
                    :rules="inputRules"
                ></VuetifyNumberInput>
                <div class="d-flex justify-space-between" style="margin-top: 6px">
                  <div class="caption grey--text lighten-5" style="font-size: 12px">
                    {{ $t("listed.auction.startText") }}
                  </div>
                  <div style="font-size: 12px;height: 17px;line-height: 17px" class="btnColor--text">
                    {{ $t("listed.fee") }}{{ config.nft_sell_fee * 100 }}%
                  </div>
                </div>
              </v-col>
              <v-col cols="12" class="pa-0" style="margin-top: 47px">
                <div class="mb-0">{{ $t("listed.auction.end") }}</div>
                <v-select
                    color="btnColor"
                    class="pt-0 mt-0"
                    v-model="date"
                    :items="showSelectDate"
                    :placeholder="$t('listed.auction.endPlaceholder')"
                    required
                    hide-details
                    :rules="inputRules"
                ></v-select>
              </v-col>
              <div class="d-flex justify-space-between" style="margin-top: 6px">
                <v-col cols="7" class="pa-0">
                  <div style="font-size: 12px">{{ $t("listed.auction.endText") }}</div>
                </v-col>
                <v-spacer></v-spacer>

                <v-col cols="4" class="pa-0" v-if="NFT && NFT.type == 0">
                  <div style="font-size: 12px" class="text-right">
                    <span style="font-size: 12px;" class="fontColor--text">{{ $t("listed.auction.endDate") }}：</span>
                    <span class="btnColor--text" v-if="DateDiffer(this.NFT ? this.NFT.expiration:'')">{{
                        this.NFT ? endDate(this.NFT.expiration) : '--'
                      }}</span>
                    <span v-else class="fontColor7--text">{{ this.NFT ? endDate(this.NFT.expiration) : '--' }}</span>
                  </div>
                </v-col>
              </div>
            </v-form>
            <v-col cols="12" md="10" class="mx-auto pa-0" style="max-width: 440px;margin-top: 71px">
              <v-btn
                  block
                  depressed
                  style="height: 50px"
                  class="btnColor btnWhite--text"
                  @click="auction = true"
                  :disabled="(NFT.type === 0) ? !this.DateDiffer(this.NFT ? this.NFT.expiration:'') || !this.validAuction : !this.validAuction"
              >
                {{ $t("listed.confirmAuction") }}
              </v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="auctionDialog" width="480px">
      <auction v-if="auction" @closeDialog="closeDialog" :raw_price_date="raw_price_date" :imgUrl="imgUrl"
               :config="config" :n-f-t="NFT" :date="date" :price="price" @autionSuccess="autionSuccess"></auction>
    </v-dialog>
    <v-dialog v-model="successDialog" width="606px">
      <sell-success v-if="sellSuccess"></sell-success>
    </v-dialog>
  </div>

</template>

<script>

import {getNFT, sellNFT} from "@/api/NFT";
import VuetifyNumberInput from "@/components/VuetifyNumberInput";

import i18n from "@/lang";
import {getConfig} from "@/api/coin";
import {mapGetters} from "vuex";
import Auction from "./ListedComps/Auction";
import SellSuccess from "./ListedComps/SellSuccess";

export default {
  name: "listed",
  components: {SellSuccess, Auction, VuetifyNumberInput},
  data: () => ({
    dialog: false,
    validOnePrice: false,
    validAuction: false,
    sellSuccess: false,
    price: '',
    auction: false,
    date: '',
    NFT_id: '',
    NFT: null,
    imgUrl: null,
    isPrice: true,
    config: '',
    price_date: [],
    raw_price_date: null,
    annualizedVNIOption: {
      locale: i18n.locale,
      suffix: "USDT",
      length: 10,
      fixed: 4,
      placeholder: i18n.t("listed.onePriceSelect.title")
    },
    inputRules: [(v) => !!v || ""],
  }),
  created() {
    this.NFT_id = this.$route.params.id
    this.getNFTInfo()
    this.getConfig()
  },
  computed: {
    ...mapGetters([
      'name', 'user', 'host'
    ]),
    auctionDialog() {
      return this.auction || this.sellSuccess
    },
    successDialog() {
      return this.sellSuccess
    },
    endDate() {
      return function (time) {
        let data = new Date(time).toJSON();
        if (data != null) {
          let current = data.split(/T/g)[0]
          let chinaDate1 = new Date(current.replace(/-/g, '/'))
          let china2 = chinaDate1.toUTCString()
          let chinaDateArray = china2.split(' ')
          let displayDate = `${chinaDateArray[1]}， ${chinaDateArray[2]},${chinaDateArray[3]}`
          return displayDate
        }

      }
    },
    DateDiffer() {
      return function (time) {
        //date1结束时间
        let date1 = new Date(time);
        //date2当前时间
        let date2 = new Date();
        date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diff = date1.getTime() - date2.getTime(); //目标时间减去当前时间
        const diffDate = diff / (24 * 60 * 60 * 1000);  //计算当前时间与结束时间之间相差天数
        if (diffDate < this.config.nft_sell_end_time_limit) {
          return false
        }
        return true
      }
    },
    showSelectDate() {
      let selectDate = []
      let timeList = []
      //过期时间
      let expiration = new Date(this.NFT ? this.NFT.expiration : '')
      //当前时间
      let current = new Date();
      expiration = new Date(expiration.getFullYear(), expiration.getMonth(), expiration.getDate());
      current = new Date(current.getFullYear(), current.getMonth(), current.getDate());
      const diff = expiration.getTime() - current.getTime(); //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000);  //计算当前时间与结束时间之间相差天数
      const diffDateExprient = diffDate - this.config.nft_sell_expired_time_limit //截止时间-当前时间-规定的1天间隔
      for (let i in this.price_date) {
        let time = Number(this.price_date[i].split(' ')[0])
        timeList.push(time)
      }
      for (let i = 0; i < timeList.length; i++) {
        if (timeList[i] < diffDateExprient && this.NFT.type === 0) {
          selectDate.push(this.price_date[i])
        } else {
          selectDate.push(this.price_date[i])
        }
      }
      return selectDate
    }
  },
  methods: {
    goDetail() {
      this.$router.push('/nft/' + this.NFT_id)
    },
    closeDialog() {
      this.auction = false
    },
    autionSuccess() {
      this.auction = false
      this.sellSuccess = true
    },
    getNFTInfo() {
      getNFT(this.NFT_id)
          .then(response => {
            this.NFT = response.data
            this.imgUrl = response.data.files
          })
          .catch(() => {
          });
    },
    success() {
      sellNFT(this.NFT_id, {'coin': 2, 'price': this.price, 'sell_way': 0})
          .then((response) => {
            if (response.code === 0) {
              this.sellSuccess = true
            } else {
              this.toasterErr(response.code)
            }
          })
          .catch(() => {

          })
    },

    getConfig() {
      getConfig()
          .then((response) => {
            this.config = response.data
            this.raw_price_date = response.data.nft_sell_end_time_days
            for (let i in response.data.nft_sell_end_time_days) {
              this.price_date.push(i)
            }
          })
          .catch(() => {
          });
    },
  }
}
</script>

<style scoped>
.btnBackColor {
  background-color: rgba(0, 0, 0, 0) !important;
}

.close {
  z-index: 999999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

>>> .theme--dark.v-divider {
  height: 2px;
  border: 1px solid #333333;
}

>>> .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #333333 !important;
}

>>> .theme--dark.v-text-field.v-input--is-disabled .v-input__slot::before {
  border-image: 0 !important;
}

>>> .v-btn:not(.v-btn--round).v-size--default {
  height: 80px;
}

>>> .v-input__slot {
  margin-bottom: 6px;
}

@media (max-width: 980px) {
  .topMargin {
    margin-top: 75px !important;
  }
}
</style>