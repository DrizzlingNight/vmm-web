<template>
  <v-row
      class="d-flex flex-wrap">
    <show-case
        v-for="(item, idx) in nftList"
        :key="item.id"
        :id="`nft${idx}`"
        class="mr-4"
        :item="item"></show-case>
  </v-row>
</template>

<script>
// import Overlay from "../../../components/Overlay";
import ShowCase from "@/components/showCase"
// import DefaultNone from "@/components/DefaultNone";
import {getNFTList} from "@/api/NFT";

export default {
  name: "SearchNFT",
  components: {
    // Overlay,
    // DefaultNone,
    "show-case": ShowCase
  },
  data: () => ({
    nftList: '',
  }),
  created() {
    this.getNFTList();
  },
  methods: {
    //获取nft列表
    getNFTList() {
      let info = {}
      info.limit = 10
      info.search = this.$route.query.query
      getNFTList(info).then((response) => {
        this.nftList = response.data.results
      })
          .catch(() => {

          });
    }
  }
}
</script>

<style scoped>

</style>