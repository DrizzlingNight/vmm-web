<template>
  <div class="mysteryBox_wrapper">
    <top-carousel></top-carousel>
    <bottom-content></bottom-content>
    <ad-banner :isShow="isShowHomeBanner"></ad-banner>
  </div>
</template>

<script>
import TopCarousel from "@/views/MysteryBox/MysteryBoxComps/topCarousel";
import BottomContent from "@/views/MysteryBox/MysteryBoxComps/bottomContent";
import { mapGetters } from "vuex";
import AdBanner from './MysteryBoxComps/AdBanner.vue';

export default {
  name: "MysteryBox",
  components: {BottomContent, TopCarousel, AdBanner },
  computed: {
    ...mapGetters(["isShowHomeBanner"]),
  },
  methods: {
    fetchAdBanner() {
      
    }
  }
}
</script>

<style scoped lang="scss">
.mysteryBox_wrapper{
  width: 100%;
  padding: 0px 0px;
  margin-bottom: 110px;
}
@media screen and (max-width: 1564px) {
  .mysteryBox_wrapper {
    padding: 0px 0px;
  }
}

@media screen and (max-width: 960px) {
  .mysteryBox_wrapper {
    padding: 0px 0px;
  }
}

//@media screen and (max-width: 600px) {
//  .mining_wrapper {
  //    padding: 0px 20px;
  //  }
//}

</style>