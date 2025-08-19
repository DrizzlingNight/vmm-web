<template>
  <div class="d-flex align-center" style="height: 100%" >
    <div class="img d-flex align-center jsutify-center" v-if="item.cover_type === 10">
      <SpliceNFT maxWidth="50px" :rule="item.cover_img"></SpliceNFT>
    </div>
    <img v-else class="img" contain :src="item.cover_img">
    <span class="text">{{ item.name }}</span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import SpliceNFT from '../../SpliceNFT/SpliceNFT';

export default {
  name: "Type",
  props: ["item"],
  computed: {
    ...mapGetters(["host"])
  },
  components: {
    SpliceNFT
  }
}
</script>

<style scoped>
.img {
  width: 50px;
  height: 50px;
  margin-right: 17px;
}
.text{
  font-weight: 400;
  color: #050505;
  font-size: 16px;
}
</style>