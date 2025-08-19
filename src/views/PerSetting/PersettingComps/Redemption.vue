<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card width="480" height="590" class="mx-auto">
      <div class="text-right">
        <v-card-subtitle
            class="d-inline-block"
            @click="closeRedemption"
        >
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-container class="mt-n6">
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-card-text class="navI18n--text text-center" style="font-size: 24px;font-weight: bold">
              {{ $t("persetting.redemption.title") }}
            </v-card-text>
            <v-col class="d-flex justify-start px-3 py-0 mt-8">
              <v-img
                  class="borderRadius"
                  max-height="63"
                  max-width="63"
                  :src="isOldImg ? host + item.files : item.files ? host + item.files[0]:require('@/assets/coinType/USDT.png')"
              ></v-img>
              <div class="ml-3 mt-2">
                <div class="description navI18n--text text-truncate" style="width: 320px">
                  {{ this.item ? this.item.name : "" }}
                </div>
                <div class="fontColor10--text mt-1" style="font-size: 14px">
                  {{ `拥有者: ${item ? item.user.username : ""}` }}
                </div>
              </div>
            </v-col>
            <v-spacer style="height: 20%"></v-spacer>
            <v-col>
              <div class="ETHColor">
                {{ $t("persetting.redemption.strikePrice") }}
              </div>
              <v-col class="d-flex pa-0 mt-1">
                <VuetifyNumberInput
                    class="text-h4"
                    v-model.number="nftPrice"
                    backgroundColor=""
                    disabled
                >
                </VuetifyNumberInput>
              </v-col>
              <div class="d-flex float-right mt-n13" style="overflow: hidden">
                <v-avatar size="18" class="mt-1">
                  <img src="@/assets/fake/price/krw.png"/>
                </v-avatar>
                <div class="ml-1 ETHColor">KRW</div>
              </div>
              <div style="font-size: 14px" class="errorText float-right mt-n4">{{ $t("persetting.redemption.text") }}
              </div>
            </v-col>
            <v-col cols="12" class="mx-auto mt-8">
              <v-btn
                  depressed
                  block
                  style="height: 50px;font-size: 20px !important;"
                  class="btnColor mt-8 btnWhite--text"
                  @click="showPasswordPage"
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
import VuetifyNumberInput from "@/components/VuetifyNumberInput";
import {mapGetters} from "vuex";

import {transferNFT} from "@/api/NFT";
// import {bidNFT} from "../../../api/NFT";

export default {
  name: "Redemption",
  components: {
    VuetifyNumberInput
  },
  data: () => ({}),
  props: [
    'item',
    "isOldImg"
  ],
  computed: {
    ...mapGetters(["user", "host","config","getCoinById"]),
    nftPrice() {
      return Number(this.item.interest) + Number(this.item.liabilities) - Number(this.item.interest_paid)
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
  },
  methods: {
    closeRedemption() {
      this.$emit("closeDialog")
    },
    showPasswordPage() {
      this.$emit("showPasswordPage",
          this.$t("persetting.redemption.titleSuccess"),
          this.$t("persetting.redemption.textSuucess"),
          this.item,
          transferNFT,
          {id: this.item.id, to: this.item.creator.username}
          // {id:this.item.id, to:this.item.creator.username}
      )
    },

  }
}
</script>

<style scoped>
>>> .theme--dark.v-input input, .theme--dark.v-input textarea {
  color: rgba(255, 255, 255, 1);
}

>>> .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: rgba(102, 102, 102, 1) !important;
}

>>> .theme--light.v-input input, .theme--dark.v-input textarea {
  font-size: 36px;
}

>>> .theme--dark.v-text-field.v-input--is-disabled .v-input__slot::before {
  border-image: 0 !important;
}

>>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
  display: none;
}

>>> .v-input input {
  max-height: 50px;
}
</style>
