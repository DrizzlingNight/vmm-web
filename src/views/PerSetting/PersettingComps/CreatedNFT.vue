<template>
  <v-container fluid class="pa-0 d-md-flex justify-center" style="margin-top: 84px;margin-bottom: 84px">
    <v-col class="mr-md-5 pa-0" cols="12" md="5" lg="6" style="border-radius: 10px">
      <v-card flat class="fontColor2">
        <v-row class="d-flex justify-center px-5 px-md-16 mx-md-9" no-gutters>
          <v-col cols="12">
            <v-card-title class="px-0 mt-8 navI18n--text">
              <div style="font-size: 40px;font-weight: bold;">
                {{ $t("createNFT.title") }}
              </div>
            </v-card-title>
            <v-card-text class="px-0 mt-10">
              <p class=" mb-3 createdNFT" style="font-size: 20px">{{ $t("createNFT.imgText") }}</p>
              <p class="mb-0 createdNFT" style="font-size: 14px">
                {{ $t("createNFT.text") }}
              </p>
            </v-card-text>
            <files-input
                @update="updateFiles"
                class="pa-0 mt-2"
            >
            </files-input>
          </v-col>
          <v-col cols="12" class="mt-15">
            <v-form ref="form" v-model="valid">
              <div class="mb-2 navI18n--text" style="font-size: 12px">{{ $t("createNFT.itemName") }}*</div>
              <v-text-field
                  color="btnColor"
                  class="mt-0 pt-0 body-2"
                  v-model="name"
                  :rules="textRules"
                  :label="$t('createNFT.namePlaceholder')"
                  single-line
                  required
                  :counter="50"
                  maxlength="50"
              ></v-text-field>

              <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.serialNo") }}*</div>
              <v-text-field
                  color="btnColor"
                  class="mt-0 pt-0 body-2"
                  v-model="serialNo"
                  :rules="serialNoRules"
                  :label="$t('createNFT.noPlaceholder')"
                  single-line
                  required
                  :counter="50"
                  maxlength="50"
              ></v-text-field>

              <v-row class="mb-3 navI18n--text">
                <v-col cols="12" sm="4">
                  <div class="mb-2 mt-4" style="font-size: 12px">{{ $t("createNFT.liabillties") }}*</div>
                  <VuetifyNumberInput
                      v-model="liabilities"
                      @input="liabilitiesInput"
                      v-bind:options="liabilitiesVNIOption"
                      backgroundColor=""
                  ></VuetifyNumberInput>
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.expiration") }}*</div>
                  <v-select
                      color="btnColor"
                      class="mt-0 pt-0 body-2"
                      v-model="expiration"
                      :items="expirationitems"
                      :rules="selectRules"
                      required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.rate") }}*</div>
                  <VuetifyNumberInput
                      v-model.number="annualized"
                      v-bind:options="annualizedVNIOption"
                      backgroundColor=""
                  ></VuetifyNumberInput>
                </v-col>
              </v-row>
              <div class="mb-1 navI18n--text" style="font-size: 12px">{{ $t("createNFT.description") }}*</div>
              <v-textarea
                  color="btnColor"
                  class="mt-0 pt-0 body-2"
                  v-model="description"
                  :rules="textareaRules"
                  :label="$t('createNFT.desPlaceholder')"
                  single-line
                  required
                  auto-grow
                  rows="1"
                  :counter="200"
                  maxlength="200"
              ></v-textarea>

              <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.rating") }}*</div>
              <v-text-field
                  color="btnColor"
                  class="mt-0 pt-0 body-2"
                  v-model="rating"
                  :rules="textRules"
                  :label="$t('createNFT.ratingPlaceholder')"
                  single-line
                  required
                  :counter="50"
                  maxlength="50"
              ></v-text-field>
              <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.authentication") }}*</div>
              <v-text-field
                  color="btnColor"
                  class="mt-0 pt-0 px-0 body-2"
                  v-model="authentication"
                  :rules="textRules"
                  :label="$t('createNFT.authentPlaceholder')"
                  single-line
                  required
                  :counter="50"
                  maxlength="50"
              ></v-text-field>
              <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.archiveName") }}*</div>
              <v-text-field
                  color="btnColor"
                  class="mt-0 pt-0 body-2"
                  v-model="archiveName"
                  :rules="textRules"
                  :label="$t('createNFT.archiveNamePlaceholder')"
                  single-line
                  required
                  :counter="50"
                  maxlength="50"
              ></v-text-field>
              <div class="mb-2 mt-4 navI18n--text" style="font-size: 12px">{{ $t("createNFT.archiveAddress") }}*</div>
              <v-text-field
                  color="btnColor"
                  class="mt-0 pt-0 body-2 mb-10"
                  v-model="archiveAddress"
                  :rules="addressRules"
                  :label="$t('createNFT.archiveAddressPlaceholder')"
                  single-line
                  required
                  :counter="100"
                  maxlength="100"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <div class="px-md-4 px-2 rightDiv fontColor2" style="border-radius: 10px;padding-bottom: 50px">
      <v-card flat class="fontColor2">
        <v-col cols="12" class="mt-md-10">
          <div>
            <span class="navI18n--text" style="font-size: 20px">{{ $t("createNFT.fee") }}</span>
            <p class="mt-2 fontColor4--text" style="font-size: 14px">{{ $t("createNFT.feeText") }}</p>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between pa-0 mt-3">
          <v-col class="ETHColor" style="font-size: 16px">
            <div>{{ $t("createNFT.balance") }}</div>
            <div class="mt-2 ">{{ $t("createNFT.fee") }}</div>
          </v-col>
          <v-col class="text-right" style="font-size: 18px">
            <div v-if="lowerPrice">{{ showPrice }}{{ baseCoin.code }}</div>
            <div v-else class="errorColor">{{ showPrice }}{{ baseCoin.code }}</div>
            <div class="mt-2 btnColor--text">{{ fee }}{{ baseCoin.code }}</div>
          </v-col>
        </v-col>
        <v-col cols="12">
          <v-btn
              block
              x-large
              depressed
              height="50px"
              style="font-size: 20px"
              :disabled="!valid || !lowerPrice"
              class="mt-14 btnColor btnWhite--text"
              @click="creatNFT"
          >
            {{ $t("createNFT.btn") }}
          </v-btn>
        </v-col>
        <v-col
            v-if="!lowerPrice"
            class="d-flex justify-space-between py-0"
            style="font-size: 14px"
        >
          <span class="errorColor">{{ $t("productDetail.sellDialog.lowBalance") }}</span>
          <a class="" text color="#1E88E5" @click="goRecharge">{{
              $t("productDetail.sellDialog.recharge")
            }}
          </a>
        </v-col>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {createNFT} from "@/api/NFT";
import VuetifyNumberInput from "@/components/VuetifyNumberInput";
import router from "@/router";
import i18n from "@/lang";
import FilesInput from "@/components/FilesInput";
import {formatDecimal, numFormat,cutZero} from "@/utils/math"

export default {
  name: "CreatedNFT",
  components: {FilesInput, VuetifyNumberInput},
  data: () => ({
    files: [],
    valid: false,
    closeCreatedNFT: false,
    expirationitems: [
      {text: "2 months", value: 60},
      {text: "3 months", value: 90},
      {text: "6 months", value: 180},
      {text: "1 years", value: 360},
      {text: "3 years", value: 1080},
      {text: "5 years", value: 1800},
    ],

    liabilitiesVNIOption: {
      locale: i18n.locale,
      prefix: "₩",
      length: 9,
      fixed: 0,
    },
    annualizedVNIOption: {
      locale: i18n.locale,
      suffix: "%",
      length: 4,
      fixed: 2,
    },
    loading: false,
    name: "",
    serialNo: "",
    description: "",
    liabilities: "",
    expiration: "",
    annualized: "",
    rating: "",
    authentication: "",
    archiveName: "",
    archiveAddress: "",
    selectRules: [(v) => !!v || i18n.t("createNFT.textRule")],
    textRules: [
      (v) => !!v || i18n.t("createNFT.textRule"),
      (v) => (v && v.length <= 50) || i18n.t("createNFT.textRules"),
    ],
    addressRules: [
      (v) => !!v || i18n.t("createNFT.addressRules"),
      (v) => (v && v.length <= 100) || i18n.t("createNFT.addressRules"),
    ],
    textareaRules: [
      (v) => !!v || i18n.t("createNFT.textRule"),
      (v) => (v && v.length <= 200) || i18n.t("createNFT.textareaRules"),
    ],
    serialNoRules: [
      (v) => /^[a-zA-Z0-9]+$/.test(v) || i18n.t("createNFT.inputRules"),
    ]
  }),
  created() {
    this.getBalance()
  },
  computed: {
    ...mapGetters(["user", "host", "getRate", "config", "getBalanceById", "getCoinById"]),
    //余额
    totalPrice() {
      if (this.config) {
        let balance = this.getBalanceById(this.config.base_coin)
        return balance && formatDecimal(balance.amount, 4) || "0"
      } else
        return ''
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    showPrice() {
      return cutZero(numFormat(this.totalPrice))
    },
    //手续费
    fee() {
      return cutZero(numFormat(formatDecimal(this.config.gasFee, 4)))
    },
    //比较余额和手续费
    lowerPrice() {
      if (this.totalPrice >= this.config.gasFee) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    updateFiles(files) {
      this.files = files
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
    liabilitiesInput(number) {
      if (this.liabilities === number) {
        this.liabilities = ''
        this.$nextTick(() => {
          this.liabilities = number
        })
      } else
        this.liabilities = number
    },
    creatNFT() {
      this.loading = true;
      createNFT({
        files: this.files,
        name: this.name,
        serialNo: this.serialNo,
        description: this.description,
        liabilities: this.liabilities,
        expiration_days: this.expiration,
        annualized: this.annualized / 100,
        rating: this.rating,
        authentication: this.authentication,
        archiveName: this.archiveName,
        archiveAddress: this.archiveAddress,
      })
          .then((response) => {
            if (response.code === 0) {
              this.$toast.success(this.$t("createNFT.successNFT"))
              router.push(`/nft/` + response.data.id);
            } else {
              this.toasterErr(response.code)
            }

          })
          .catch(() => {
            this.loading = false;
          });

    },
  }
}
</script>

<style scoped>
>>> .v-input input {
  max-height: 50px;
}

>>> .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: rgba(102, 102, 102, 1) !important;
}

>>> .theme--dark.v-text-field.v-input--is-disabled .v-input__slot::before {
  border-image: 0 !important;
}

@media screen and (min-width: 960px) {
  .rightDiv {
    width: 464px;
  }
}

@media screen and (max-width: 960px) {
  .rightDiv {
    width: 100%;
  }
}
</style>