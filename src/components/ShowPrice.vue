<template>
  <v-col
      class="d-flex flex-column align-end pt-0"
  >
    <v-row
        class="align-center mt-4 justify-end"
    >
      <v-img
          v-if="price"
          width="18px"
          height="18px"
          max-width="18px"
          max-height="18px"
          aspect-ratio="1"
          class="rounded-circle"
          :src="require('@/assets/coinType/'+(coin ? coin.code : referenceCoin.code)+'.png')"/>
      <span style="font-size: 14px; font-weight: bold; margin-left: 7px;line-height: 15px;max-width: 80%"
            class="btnColor--text">{{ `${showPrice || '--'} ${showPrice && coin && coin.code || ''}` }}</span>
    </v-row>
    <v-row>
      <!--      <span class="fontColor8&#45;&#45;text" style="font-size: 9px;" v-if="price">≈ ${{ cash }}</span>-->
    </v-row>
  </v-col>
</template>

<script>
import {mapGetters} from "vuex"
import {formatStrPrice, numFormat, cutZero} from "@/utils/math";

export default {
  name: "ShowPrice",
  props: [
    'nftPrice',
    'coin'
  ],

  data: () => ({
    coinExchangeList: "",
    rateList: '',
  }),
  computed: {
    ...mapGetters(['getRate','referenceCoin']),
    // rate() {
    //   if (this.coin)
    //     return this.getRate(this.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    //   return null
    // },
    price() {
      if (this.nftPrice)
        return formatStrPrice(this.nftPrice, 4)
      return null
    },
    showPrice() {
      if (this.price) {
        return cutZero(numFormat(this.price))
      }
      return null
    },
    // cash() {
    //   if (this.price && this.rate) {
    //     return cutZero(numFormat(formatDecimal((Number(this.price)) * (Number(this.rate.rate)), 4)))
    //   }
    //   return null
    // }
  },
  methods: {}
}
</script>

<style scoped>
.ETHColor {
  color: rgba(153, 153, 153, 1);
}
</style>
