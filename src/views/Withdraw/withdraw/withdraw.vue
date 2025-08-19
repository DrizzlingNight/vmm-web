<template>
  <v-dialog v-model="withdraw" max-width="650" @click:outside="closeTotal">
    <v-card
      v-if="withdrawInfo"
      class="withdraw mx-auto"
      width="650"
      style="padding-bottom: 30px"
    >
      <v-card-subtitle class="text-right px-0">
        <v-btn
          @click="closeWithdraw"
          icon
          style="margin-top: 8px; margin-right: 13px"
        >
          <v-icon class="btnColor--text">close</v-icon>
        </v-btn>
      </v-card-subtitle>
      <v-card-title
        class="d-flex justify-center"
        style="font-size: 24px; padding-top: 1px; padding-bottom: 21px"
      >
        <span>{{ $t("withdraw.title") }}</span>
      </v-card-title>
      <v-card-subtitle class="d-flex justify-center">
        <span class="mt-3 fontColor7--text" style="font-size: 16px">{{
          $t("withdraw.errorText")
        }}</span>
      </v-card-subtitle>
      <v-col cols="9" class="mx-auto" style="padding-top: 10px">
        <choice-link
          :serviceType="serviceType"
          :selectedChainIndex="selectedChainIndex"
          @choiceChain="choiceChain"
        ></choice-link>
      </v-col>
      <v-form ref="login" v-model="valid" class="mt-2">
        <v-container>
          <v-row justify="center">
            <v-col cols="9" class="py-0" style="max-width: 464px">
              <v-text-field
                color="btnColor"
                v-model="address"
                :label="$t('withdraw.address')"
                required
                :rules="[addressRules]"
              ></v-text-field>
            </v-col>
            <v-col cols="9" style="max-width: 464px">
              <vuetify-number-input
                class="inputPrice"
                color="btnColor"
                v-model="price"
                :label="$t('withdraw.price')"
                v-bind:options="MoneyVNIOption"
                :rules="[priceRules]"
                @input="liabilitiesInput"
              >
              </vuetify-number-input>
            </v-col>
            <v-col
              cols="9"
              style="max-width: 464px"
              class="d-flex justify-space-between align-center mt-n7"
            >
              <div style="line-height: 18px; height: 17px">
                <span
                  class="fontColor10--text"
                  style="font-size: 16px; margin-right: 7px"
                  >{{ $t("withdraw.canPrice") }}</span
                ><span class="btnColor--text font-weight-bold"
                  >{{ allPrice }} {{ codeType }}</span
                >
              </div>
              <a text @click="AllPrice" class="fontColor11--text">
                {{ $t("withdraw.total") }}</a
              >
            </v-col>
            <v-col cols="9" class="mt-11" style="max-width: 464px">
              <v-btn
                large
                block
                depressed
                class="btnColor btnWhite--text"
                style="height: 50px; font-size: 20px"
                :disabled="isBtn"
                @click="confirmPrice"
              >
                <span class="bottomText">
                  {{ $t("withdraw.confirmPrice") }}
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-card
      v-if="withdrawDetail"
      class="withdraw text-center mx-auto"
      max-width="650"
      min-height="520"
    >
      <v-card-subtitle class="text-right pt-3 pr-3 pb-0">
        <v-btn @click="closeWithdraw" icon>
          <v-icon class="btnColor--text">close</v-icon>
        </v-btn>
      </v-card-subtitle>
      <v-card-subtitle class="text-left mt-n5">
        <v-btn @click="openWithdraw" icon>
          <v-icon class="grey--text lighten-2">mdi-arrow-left</v-icon>
        </v-btn>
      </v-card-subtitle>
      <v-card-text
        class="navI18n--text"
        style="font-size: 24px; margin-top: -10px"
      >
        {{ $t("confrimWithraw.title") }}
      </v-card-text>
      <v-card-text class="createdNFT" style="font-size: 16px">
        {{ $t("confrimWithraw.text") }}
      </v-card-text>
      <v-col cols="8" class="d-flex pb-0" style="margin-top: 22px">
        <v-col
          cols="3"
          class="text-left detailFont fontColor6--text"
          style="font-size: 16px; margin-left: 55px"
        >
          <p class="mt-1">{{ $t("confrimWithraw.count") }}:</p>
          <div class="mt-5">{{ $t("confrimWithraw.fee") }}:</div>
          <p class="mt-5">{{ $t("confrimWithraw.username") }}:</p>
          <p>{{ $t("confrimWithraw.address") }}:</p>
        </v-col>
        <v-col
          cols="12"
          class="text-left pl-0 navI18n--text"
          style="font-size: 20px"
        >
          <p>{{ showPrice }}{{ codeType }}</p>
          <p>{{ Interest }}USDT</p>
          <p style="font-size: 16px">{{ user ? user.username : "" }}</p>
          <p style="font-size: 14px">{{ address }}</p>
        </v-col>
      </v-col>
      <v-col cols="10" class="mx-auto px-0" style="max-width: 440px">
        <v-btn
          depressed
          x-large
          style="font-size: 20px; margin-top: 14px"
          block
          class="btnColor btnWhite--text"
          @click="passwordConfrimMethod"
        >
          {{ $t("confirmBtn") }}
        </v-btn>
      </v-col>
    </v-card>
    <v-card
      v-if="passwordDialog"
      class="withdraw text-center mx-auto"
      max-width="650"
      min-height="520"
    >
      <v-card-subtitle class="text-right pt-2 pr-2 pb-0">
        <v-btn @click="closeWithdraw" icon>
          <v-icon class="btnColor--text">close</v-icon>
        </v-btn>
      </v-card-subtitle>
      <v-card-text
        class="navI18n--text"
        style="font-size: 24px; margin-top: 21px"
      >
        {{ $t("confirmPassword.title") }}
      </v-card-text>
      <v-card-text style="font-size: 16px; margin-top: 18px">
        {{ $t("confirmPassword.text") }}
      </v-card-text>
      <v-form v-model="passwordVilid">
        <v-col
          cols="9"
          class="d-flex pb-0 ma-auto mt-12"
          style="max-width: 440px"
        >
          <v-text-field
            color="btnColor"
            v-model="password"
            :label="$t('confirmPassword.password')"
            :rules="[passwordRules]"
            required
            type="password"
            @input="changePassword"
          ></v-text-field>
        </v-col>
        <v-col
          cols="9"
          class="d-flex mx-auto"
          style="margin-top: 76px; max-width: 440px"
        >
          <v-btn
            depressed
            x-large
            block
            height="50px"
            style="font-size: 20px"
            class="btnColor btnWhite--text"
            :disabled="!passwordVilid"
            @click="passwordConfrim"
          >
            {{ $t("confirmBtn") }}
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
    <v-card
      v-if="withdrawSuccess"
      class="withdraw text-center mx-auto"
      max-width="605"
      min-height="503"
    >
      <div class="text-right">
        <v-card-subtitle class="d-inline-block pt-4" style="cursor: pointer">
          <v-icon class="btnColor--text" @click="close">close</v-icon>
        </v-card-subtitle>
      </div>
      <div
        @click="goTransationTotal"
        class="text-right fontColor11--text mr-12 detail"
        style="font-size: 24px"
      >
        {{ $t("drawer.detail") }}
      </div>
      <v-img
        style="margin-top: 52px"
        class="mx-auto"
        max-width="143"
        max-height="143"
        src="@/assets/fake/submit_success.png"
      ></v-img>
      <v-card-text
        class="navI18n--text"
        style="
          font-size: 24px;
          margin-top: 31px;
          font-weight: bold;
          line-height: 33px;
        "
      >
        {{ $t("confirmPassword.success") }}
      </v-card-text>
      <v-card-actions style="margin-top: 19px">
        <v-col cols="11" class="d-flex mx-auto" style="max-width: 440px">
          <v-btn
            depressed
            x-large
            height="50px"
            style="font-size: 20px"
            block
            class="btnColor btnWhite--text px-0"
            @click="close"
          >
            {{ $t("confirmBtn") }}
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import web3 from "web3";
import router from "@/router";
import { mapGetters } from "vuex";
import { postTransations } from "@/api/user";
import { formatDecimal, cutZero } from "@/utils/math";
import { isWallet } from "@/api/wallet";
import { numFormat } from "../../../utils/math";
import i18n from "@/lang";
import VuetifyNumberInput from "../../../components/VuetifyNumberInput";
import ChoiceLink from "@/components/ChoiceLink";

export default {
  name: "withdraw",
  components: { ChoiceLink, VuetifyNumberInput },
  data: () => ({
    valid: false,
    address: "",
    price: "",
    password: "",
    coinList: "",
    chain: "",
    exists: false,
    withdrawInfo: true,
    withdrawDetail: false,
    passwordDialog: false,
    passwordVilid: false,
    passwordJudge: false,
    withdrawSuccess: false,
    MoneyVNIOption: {
      locale: i18n.locale,
      length: 12,
      fixed: 4,
      suffix: "ETH",
    },
    selectedChainIndex : 0
  }),
  props: {
    // withdraw: {
    //   type: Boolean,
    //   default: false
    // },
    codeType: {
      type: String,
    },
  },
  created() {
    this.MoneyVNIOption.suffix = this.codeType;
    this.chain = this.coin.service_type[0].block_chain;
  },

  computed: {
    ...mapGetters([
      "name",
      "user",
      "getCoinById",
      "currentCode",
      "getBalanceById",
    ]),
    isBtn() {
      if (this.address === "" || this.price === "") {
        return true;
      } else if (this.chain !== "BEP20") {
        return false;
      } else if (!web3.utils.isAddress(this.address)) {
        return true;
      }
      return false;
    },

    withdraw() {
      return (
        this.withdrawInfo ||
        this.withdrawDetail ||
        this.passwordDialog ||
        this.withdrawSuccess
      );
    },
    totalPrice() {
      let balance = this.getBalanceById(this.currentCode);
      return (balance && formatDecimal(balance.amount, 4)) || "0";
    },
    passwordRules(val) {
      if (val.password === "") {
        return false;
      }
      if (this.passwordJudge) {
        return this.$t("confirmPassword.errorPassword");
      }
      return true;
    },
    //现在只有一种币种ETH
    coin() {
      return this.getCoinById(this.currentCode);
    },
    allPrice() {
      return cutZero(numFormat(this.totalPrice));
    },
    showPrice() {
      return cutZero(numFormat(this.price));
    },
    Interest() {
      if (this.exists) {
        return 0;
      } else
        return cutZero(numFormat(formatDecimal(this.coin.withdraw_fee, 4)));
    },
    serviceType() {
      return this.coin && this.coin.service_type;
    },
  },
  methods: {
    closeTotal() {
      // this.$emit('showWithdraw')
      // this.$emit('showWithdrawDialog')
      this.withdrawInfo = false;
      this.withdrawDetail = false;
      this.passwordDialog = false;
      this.withdrawSuccess = false;
    },
    goTransationTotal() {
      this.$emit("showWithdraw");
      this.withdrawDetail = false;
      this.passwordDialog = false;
      this.withdrawSuccess = false;
      router.push("/trade");
    },
    AllPrice() {
      this.price = this.totalPrice;
    },
    changePassword() {
      this.passwordJudge = false;
    },
    //輸入框只能輸入數字
    handleInput() {
      this.price = this.price.replace(/[^\d.]/g, "");
    },
    addressRules(val) {
      if (this.chain !== "BEP20") {
        return true;
      }
      if (!web3.utils.isAddress(this.address) || val === "") {
        return this.$t("withdraw.errorAddress");
      }
      return true;
    },
    liabilitiesInput(number) {
      if (this.price === number) {
        this.price = "";
        this.$nextTick(() => {
          this.price = number;
        });
      } else this.price = number;
    },
    //选择链后
    choiceChain({item,index}) {
      this.chain = item.block_chain;
      this.selectedChainIndex = index
    },
    priceRules(val) {
      if (isNaN(val)) {
        if (Number(this.price) > this.totalPrice || val === "") {
          return this.$t("withdraw.errorPrice");
        }
        return true;
      } else {
        if (Number(val) > this.totalPrice || val === "") {
          return this.$t("withdraw.errorPrice");
        }
        return true;
      }
    },
    openWithdraw() {
      this.withdrawDetail = false;
      this.withdrawInfo = true;
    },
    confirmPrice() {
      isWallet({ address: this.address })
        .then((response) => {
          this.exists = response.data.exists;
        })
        .catch(() => {});
      // this.$emit('showWithdraw', false)
      this.withdrawInfo = false;
      this.withdrawDetail = true;
    },
    closeWithdraw() {
      this.toasterErr(this.$t("withdraw.errorRecharge"));
      this.$emit("showWithdraw");
      this.withdrawDetail = false;
      this.passwordDialog = false;
    },
    close() {
      this.$emit("showWithdraw");
    },
    passwordConfrimMethod() {
      this.withdrawDetail = false;
      this.passwordDialog = true;
    },
    passwordConfrim() {
      postTransations({
        abs_amount: this.price,
        //根据币种不同在传入后端时，将price*不同的位数
        // amount: this.price * this.schedule,
        coin: this.currentCode,
        address: this.address,
        password: this.password,
        service_type: this.chain,
      })
        .then((response) => {
          if (response.code != 0) {
            this.passwordJudge = true;
            this.toasterErr(response.code);
          } else {
            this.passwordDialog = false;
            this.withdrawSuccess = true;
          }
        })
        .catch(() => {});
    },
    goTransation() {
      if (this.$route.path !== "/transation") {
        router.push("/transation");
      }
    },
  },
};
</script>
<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}

.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
<style scoped>
input:-webkit-autofill {
  -webkit-text-fill-color: red !important;
}

>>> .v-input input {
  max-height: 50px;
}

.detail {
  cursor: pointer;
}
/deep/ .v-dialog {
  box-shadow: 0 0px 0px transparent !important;
}
</style>