<template>
  <div>
    <dividends-top :dividendsCoin="dividendsCoin"></dividends-top>
    <dividend-record :dividendsCoin="dividendsCoin" v-if="user"></dividend-record>
  </div>
</template>

<script>
import DividendsTop from "./dividendsTop";
import DividendRecord from "./dividendRecord";
import {mapGetters} from "vuex";
import * as _ from "lodash";

export default {
  name: "dividendsPage",
  components: {DividendRecord, DividendsTop},
  computed:{
    ...mapGetters(["user","coinList"]),
    //可分红币种
    dividendsCoin() {
      return _.find(this.coinList, (coin) => (coin.stake_div))
    },
  }
}
</script>

<style scoped>

</style>