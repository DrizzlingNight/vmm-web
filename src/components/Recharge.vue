<template>
  <div>
    <v-dialog v-model="isRecharge" max-width="650" @click:outside="closeRecharge">
      <v-card class="text-center withdraw" style="width: 650px;padding-bottom: 30px">
        <div class="text-right">
          <v-card-subtitle class="d-inline-block" style="padding-top: 20px;padding-right: 21px">
            <v-icon class="btnColor--text" @click="closeRecharge">close</v-icon>
          </v-card-subtitle>
        </div>
        <v-card-text class="fontRecharge navI18n--text pb-0"
                     style="font-size: 24px;margin-top: 5px;margin-bottom: 13px">
          {{ $t("recharge.title") }}<span style="font-weight: bold">{{isDepositCoinNotNFT ? coin ? coin.code : 0 : "NFT"}}</span>
        </v-card-text>
        <v-card-text class="fontColor9--text pb-0" style="font-size: 16px">
          {{ $t("drawer.recharge") }}{{ isDepositCoinNotNFT ? coin ? coin.code : 0 : "NFT"}}{{ $t("recharge.text") }}
        </v-card-text>
        <v-col cols="9" class="mx-auto" style="margin-top: 18px;margin-bottom: 18px">
          <choice-link :selectedChainIndex="selectedChainIndex" :serviceType="serviceType" @choiceChain="choiceChain"></choice-link>
        </v-col>
        <vue-qrcode :value="QRcodeUrl" v-if="QRcodeUrl" style="margin-top: 0px;margin-bottom: 44px;width: 114px"/>
        <v-col v-else cols="12" style="height: 114px;margin-bottom: 44px" class="d-flex align-center">
          <v-img contain width="231px" height="71px" src="@/assets/defaultPage.png"></v-img>
        </v-col>
        <v-col class="fontColor10--text pa-0 mx-auto"
               style="max-width: 305px;font-size: 12px;margin-bottom: 21px;line-height: 17px;">
          {{ $t("recharge.subText1") }}{{ isDepositCoinNotNFT ? coin ? coin.code : 0 : "NFT" }}{{ $t("recharge.subText2") }}<span
            class="fontColor6--text">{{ chain }}</span>{{ $t("recharge.subText3") }}{{ $t("recharge.subText4") }}

        </v-col>
        <v-col cols="9" class="ma-auto py-0">
          <div
              style="font-size: 14px;margin-top: 12px;background-color: rgba(204, 153, 51,0.14);color: white;min-height: 44px;border-radius: 6px;margin-bottom: 17px"
          >
              <span
                  style="display: inline-block;width: 100%;margin-top:10px;margin-bottom:10px;padding-left: 24px;padding-right: 36px;font-size: 16px;color: #050505">{{
                  QRcodeUrl
                }}</span>
          </div>
          <div class="float-right mt-n13 mr-6">
            <v-btn
                class="px-0"
                style="max-width: 16px;max-height: 15px;min-width: 16px"
                text
                :loading="isBtn"
                v-clipboard:copy="QRcodeUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">
              <v-img
                  max-width="16"
                  max-height="15"
                  src="@/assets/fake/copy.png"
              ></v-img>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="9" class="mx-auto pt-0">
          <v-btn
              depressed
              large
              block
              class="btnColor btnWhite--text"
              style="height: 50px;font-size: 16px"
              @click="closeRecharge"
          >
            {{ $t("recharge.btn") }}
          </v-btn>
        </v-col>

      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import VueQrcode from 'vue-qrcode'
import {getUserWallet} from '@/api/wallet'
import i18n from '@/lang'
import ChoiceLink from "@/components/ChoiceLink";
import _ from 'lodash'

export default {
  name: "Recharge",
  components: {
    ChoiceLink,
    VueQrcode,
  },
  data: () => ({
    QRcodeUrl: '',
    QRCodeMsg: "",
    // QRcodeUrl: "",
    AllUrl: "",
    chain: "",
    isBtn: false,
    selectedChainIndex : 0
  }),
  computed: {
    ...mapGetters(["isShowRechargeDialog","isShowDepositNFTDialog","stakeCoin", "isShowCopyDialog", 'user', "currentCode", "getCoinById"]),
    coin() {
      return this.isDepositCoinNotNFT ? this.getCoinById(this.currentCode) : this.stakeCoin
    },
    isDepositCoinNotNFT(){
      if (this.isShowRechargeDialog && this.user) {
        this.getUserWallet({coin: this.currentCode, user: this.user.id})
        return true
      }
      else if (this.isShowDepositNFTDialog && this.user) {
        this.getUserWallet({coin: this.stakeCoin.id, user: this.user.id})
        return false
      }
      return true
    },
    isRecharge: {
      get() {
        if (this.isShowRechargeDialog && this.user) {
          this.getUserWallet({coin: this.currentCode, user: this.user.id})
          return true
        }
        else if (this.isShowDepositNFTDialog && this.user) {
          this.getUserWallet({coin: this.stakeCoin.currentCode, user: this.user.id})
          return true
        }
        return false
      },
      set(val) {
        if (this.isDepositCoinNotNFT) {
          this.$store.commit("ui/SET_IS_SHOW_RECHARGE_DIALOG", val);

        } else {
          this.$store.commit("ui/SET_IS_SHOW_DEPOSITNFT_DIALOG", val);

        }
      },
    },
    serviceType() {
      return this.coin && this.coin.service_type
    },
  },
  watch: {
    chain() {
      _.find(this.AllUrl, (item) => {
        if (item.service_type === this.chain) {
          this.QRcodeUrl = item.address
        }
      })
    },
    user() {
      if (this.user === null) {
        this.isRecharge = false
      }
    },
    isRecharge(val){
      if(val){
        this.selectedChainIndex = 0
      }
    }
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    closeRecharge() {
      this.isRecharge = false
      // this.refreshPage()
    },
    onCopy() {
      this.showAlert(i18n.t("copySuccess"))
    },
    onError() {
    },
    refreshPage() {
      location.reload();
    },
    //选择链后
    choiceChain({item,index}) {
      this.chain = item.block_chain
      this.selectedChainIndex = index
    },
    getUserWallet(info) {
      this.isBtn = true
      getUserWallet(info)
          .then((response) => {
            if (response.code != 0) {
              this.$toast.error(i18n.t(`errorCode.${response.code}`))
            } else {
              this.AllUrl = response.data
              this.chain = response.data[0].service_type
            }
            this.isBtn = false
          })
          .catch(() => {
            this.isBtn = false
          })
    }
  }
}
</script>

<style scoped>
>>> .v-text-field.v-text-field--solo .v-input__control input {
  max-width: 90%;
}
</style>
