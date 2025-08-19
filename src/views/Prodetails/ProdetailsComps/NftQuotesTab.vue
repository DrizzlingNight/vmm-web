<template>
  <v-container style="height: 430px" class="pa-0 overflow-y-auto list">
    <div v-if="this.NFT.quotes">
      <v-row>
        <v-col class="mt-1" style="font-weight: bold" cols="7">
          <div style="font-size: 14px;line-height: 20px;" class="fontColor10--text mt-5">
            {{ $t("productDetail.quote.text") }}
          </div>
          <div style="font-size: 26px;line-height: 37px;margin-top: 5px">KRW {{ quotesPrice }}</div>
        </v-col>
        <v-col cols="5" class="d-flex justify-end" style="margin-top: 30px">
          <v-btn
              fab
              plain
              depressed
              outlined
              width="51px"
              height="51px"
              :class="{'btn':choiceBtn === 0}"
              @click="choiceBtn = 0"
              style="border-radius: 50%"
          >
            <span :class="{'btn1':choiceBtn === 0}">Y</span>
          </v-btn>
          <v-btn
              fab
              plain
              depressed
              outlined
              width="51px"
              height="51px"
              :class="{'btn':choiceBtn === 1}"
              @click="choiceBtn = 1"
              style="margin-left: 16px;border-radius: 50%"
          >
            <span :class="{'btn2':choiceBtn === 1}">2Y</span>
          </v-btn>
          <v-btn
              fab
              plain
              depressed
              outlined
              width="51px"
              height="51px"
              :class="{'btn':choiceBtn === 2}"
              @click="choiceBtn = 2"
              style="margin-left: 16px;border-radius: 50%"
          >
            <span :class="{'btn3':choiceBtn === 2}">3Y</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <quotes-echart :nft="NFT" :choiceBtn="choiceBtn"></quotes-echart>
      </v-row>
    </div>
    <div v-else class="" style="margin-top: 115px">
      <v-img class="mt-8 mx-auto" max-height="160" max-width="301" src="@/assets/fake/transaction.png"></v-img>
      <p class="text-center fontColor10--text" style="font-size: 24px;margin-top: 29px">{{ $t("defaultNone") }}</p>
    </div>
  </v-container>
</template>

<script>
import QuotesEchart from "./QuotesEchart";
import * as _ from "lodash";
import {numFormat} from "../../../utils/math";

export default {
  name: "NftQuotesTab",
  components: {QuotesEchart},
  props: [
    "NFT",
  ],
  data: () => ({
    choiceBtn: 0,
  }),
  computed: {
    quotesPrice() {
      if (this.NFT.quotes) {
        let realityData = _.orderBy(this.NFT.quotes, 'date')
        return numFormat(realityData[realityData.length - 1].price)
      } else return ''
    }
  },
  watch: {}
}
</script>

<style scoped>
/*.btnGroupsActive {*/
/*  background: linear-gradient(360deg, white 0%, white 55%, white 100%) !important;*/
/*}*/

/*>>> .theme--light.v-btn-toggle:not(.v-btn-toggle--group) {*/
/*  color: transparent;*/
/*}*/

/*>>> .v-btn-toggle > .v-btn.v-btn--active {*/
/*  border: 1px solid red !important;*/
/*  background: white;*/
/*}*/

/*!*>>> .theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn {*!*/
/*!*  border: 0;*!*/
/*!*}*!*/

/*>>> .theme--light.v-btn.v-btn--has-bg {*/
/*  background-color: white;*/
/*}*/

/*>>> .v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {*/
/*  border: 1px solid red !important;*/
/*}*/
.btn {
  border: 1px solid #CC9933 !important;
}

.btn1, .btn2, .btn3 {
  color: #CC9933 !important;
}

>>> .v-btn--outlined {
  color: #959595;
  border: 1px solid #959595;
}
</style>