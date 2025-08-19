<template>
  <v-menu open-on-hover offset-y left>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" >
        <div class="d-flex" style="height: 25px">
          <v-img max-height="24" max-width="24" src="@/assets/fake/price/ETH.png"></v-img>
          <div class="pl-1 ETHColor" style="z-index: 203">ETH</div>
        </div>
      </div>
    </template>
    <v-list min-width="97" style="background: #00322E;">
      <v-list-item
          v-for="(item, index) in coinList"
          :key="index"
          style="min-height: 46px;padding-left: 13px"
          @click="choiceCoinType(item)"
      >
        <v-img max-width="24" max-height="24" style="margin-right: 14px" class="d-inline-block"
               :src="require('@/assets/coinType/'+item.code+'.png')"></v-img>
        <span class="span" style="color: #95C6B7">{{ item.code }}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "CoinToggle",
  props:["coinList"],
  data:() =>({
    coin:"ETH",
  }),
  methods:{
    choiceCoinType(item) {
      this.coin = item.code
    }
  }
}
</script>

<style scoped>

</style>