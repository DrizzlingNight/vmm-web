<template>
  <v-container fluid style="max-width: 1425px" class="mt-lg-7 pa-5 pt-0">
    <v-row class="mx-auto" style="height: 100%" no-gutters>
      <v-col cols="12" md="3">
        <div style="height: 100%">
          <v-card style="height: 100%" flat color="fontColor2">
            <own class="py-4 pl-5 btnColor"></own>
            <v-tabs
              vertical
              v-model="tab"
              class="xx"
              active-class="tabColor"
              slider-size="0"
              color="btnColor"
            >
              <v-tab
                style="font-size: 16px; max-width: 100%"
                class="justify-start"
              >
                <div class="ml-10">{{ $t("trade.depositWithdrawal") }}</div>
              </v-tab>
              <v-tab
                style="font-size: 16px; max-width: 100%"
                class="justify-start"
              >
                <div class="ml-10">{{ $t("trade.accountChange") }}</div>
              </v-tab>
              <v-tab
                style="font-size: 16px; max-width: 100%"
                class="justify-start"
              >
                <div class="ml-10">{{ $t("trade.order") }}</div>
              </v-tab>
              <v-tab
                style="font-size: 16px; max-width: 100%"
                class="justify-start"
              >
                <div class="ml-10">{{ `NFT${$t("drawer.detail")}` }}</div>
              </v-tab>
            </v-tabs>
          </v-card>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        md="9"
        class="overflow-x-auto cardMessage"
        style="max-width: 1024px"
      >
        <v-card
          flat
          color="fontColor2"
          style="height: 827px; min-width: 1024px"
        >
          <deposit-withdrawal v-if="tab === 0"></deposit-withdrawal>
          <account-change v-if="tab === 1"></account-change>
          <order v-if="tab === 2"></order>
          <detail v-if="tab === 3"></detail>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Own from "@/components/Own";
import DepositWithdrawal from "./TradeComps/depositWithdrawal";
import AccountChange from "./TradeComps/accountChange";
import Order from "./TradeComps/order";
import Detail from "./TradeComps/detail.vue";
export default {
  name: "Trade",
  components: { AccountChange, DepositWithdrawal, Own, Order, Detail },
  data: () => ({
    tab: 0,
  }),
};
</script>

<style scoped>
.tabColor {
  border: 1px solid #cc9933;
  /*background-color: #CC9933;*/
}
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #050505;
}
>>> .title[data-v-128419ee] {
  border-radius: 4px 4px 0px 0px;
}
/* 整个滚动条 */
.cardMessage::-webkit-scrollbar {
  width: 9px;
  height: 10px;
  background-color: #cc9933;
}
/* 滚动条上的滚动滑块. */
.cardMessage::-webkit-scrollbar-thumb {
  background-color: #f6f5f3;
  border: 3px solid #cc9933;
  border-radius: 25px;
}
/* 当同时有垂直滚动条和水平滚动条时交汇的部分. */
.cardMessage::-webkit-scrollbar-corner {
  background: transparent;
}
</style>