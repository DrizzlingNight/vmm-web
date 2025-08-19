<template>
  <v-col
      class="d-flex flex-column align-end pt-0"
  >
    <v-row
        style="margin-top: 5px"
        class="align-center"
    >
      <v-img
          height="18"
          width="18"
          aspect-ratio="1"
          class="rounded-circle"
          :src="user && user.profile.avatar || '/static/people.png'"
      />
      <span style="font-size: 14px;line-height: 14px;height: 16px; margin-left: 5px;" class="fontColor4--text">{{ user ? user.username:'' }}</span>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex"
import {formatStrPrice} from "@/utils/math";

export default {
  name: "SimpleShowUserInfo",
  props:[
    'user'
  ],
  data:()=>({
    coinExchangeList: "",
    rateList: '',
  }),
  computed:{
    ...mapGetters(['getRate']),
    rate(){
      return this.getRate(this.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    },
    price(){
      return formatStrPrice(this.nftPrice, 2)
    },
    cash(){
      return (Number(this.price) * Number(this.rate.rate)).toFixed(2)
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.ETHColor {
  color: rgba(153, 153, 153, 1);
}
</style>
