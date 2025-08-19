<template>
  <v-container fluid class="pa-0">
    <home-info></home-info>
<!--    <hot-nft></hot-nft>-->
    <home-light-nft></home-light-nft>
    <path-home></path-home>
    <new-nft></new-nft>
    <self-action></self-action>
  </v-container>
</template>
<script>
import HomeInfo from "./HomepageComps/homeInfo";
import SelfAction from "./HomepageComps/selfAction"
// import HotNft from "@/views/Homepage/HomepageComps/hotNft";
import NewNft from "@/views/Homepage/HomepageComps/newNft";
import HomeLightNft from "./HomepageComps/homeLightNft";
import PathHome from "./HomepageComps/pathHome";

export default {
  name: "homepage",
  components: {
    PathHome,
    HomeLightNft,
    NewNft,
    // HotNft,
    HomeInfo,
    SelfAction,
  },

}
</script>

<style scoped>

</style>
