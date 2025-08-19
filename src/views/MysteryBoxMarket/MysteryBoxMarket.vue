<template>
  <div class="d-flex">
    <left-navigation
      ref="leftNavigation"
      @clickApplication="clickApplication"
    ></left-navigation>
    <right-content
      ref="rightNavigation"
      @changeLeftNavigation="changeLeftNavigation"
      :boxStatus="boxStatus"
      :carouselSelected="carouselSelected"
      :nftStatus="nftStatus"
      :minPrice="minPrice"
      :maxPrice="maxPrice"
    ></right-content>
  </div>
</template>

<script>
import LeftNavigation from "@/views/MysteryBoxMarket/MysteryBoxMarketComps/LeftNavigation";
import RightContent from "@/views/MysteryBoxMarket/MysteryBoxMarketComps/RightContent";

export default {
  name: "MysteryBoxMarket",
  components: { RightContent, LeftNavigation },
  data: () => ({
    // items1: [],
    // items2: "",
    boxStatus: "",
    carouselSelected: "",
    nftStatus: "",
    minPrice: "",
    maxPrice: "",
  }),
  // created() {
  //   this.getBlindbox();
  // },
  methods: {
    //获取盲盒活动信息
    // getBlindbox() {
    //   getBlindbox({})
    //     .then((response) => {
    //       this.carouselList = response.data.results;
    //     })
    //     .catch(() => {});
    // },
    changeLeftNavigation() {
      this.choiceLeftNavigation();
    },
    choiceLeftNavigation() {
      this.$refs.leftNavigation.btnNavigationDrawer();
    },
    clickApplication(
      boxStatus,
      carouselSelected,
      nftStatus,
      minPrice,
      maxPrice
    ) {
      this.boxStatus = boxStatus;
      this.carouselSelected = carouselSelected;
      this.nftStatus = nftStatus;
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;

      if (this.$refs.rightNavigation) {
        this.$nextTick(() => {
          this.$refs.rightNavigation.getNFTList();
        });
      }
    },
  },
};
</script>

<style scoped>
</style>