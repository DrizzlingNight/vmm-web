<template>
  <v-row>
    <v-col>
      <span class="tranfserNFT">{{ time }}</span>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  name: "HistoryTime",
  props: ['item'],
  computed: {
    ...mapGetters(["user", "host"]),
    date() {
      return function (time) {
        let current = time
            .replace(/-/g, "/")
            .replace(/T/g, " ")
            .split(/\./g)[0];
        return current;
      };
    },
    time() {
      return moment.utc(this.item).local().format("YYYY-MM-DD HH:mm:ss")
    }
  }
}
</script>

<style scoped>

</style>