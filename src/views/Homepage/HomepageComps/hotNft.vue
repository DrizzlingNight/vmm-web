<template>
  <v-container
      style="max-width: 1280px;"
      class="pa-0"
  >
    <v-row
        class="ma-4"
        style="padding-bottom: 24px"
    >
      <v-col class="mt-10 d-flex align-center justify-center">
        <v-img class="mr-3" max-width="34" max-height="36" contain src="@/assets/fake/homePage/fire.png"></v-img>
        <span class="createdNFT" style="font-size: 30px;font-weight: bold">{{ $t("homepage.hot.text") }}</span>
      </v-col>
    </v-row>
    <v-row
        no-gutters
        class="ma-3"
    >
      <v-col cols="12" class="pa-2 d-flex justify-center">
        <selected-item :item="selectedOne"></selected-item>
      </v-col>
    </v-row>
    <v-row
        id="nftlistshow"
        no-gutters
        class="justify-space-between mx-2 rowImg"
        style="max-width: 1240px">
      <div
          v-for="(item, idx) in items"
          :key="idx"
          @mouseenter="selectNFT(item)"
          :id="`nft${idx}`"
          class="cardImg"
          style="width: 100%"
      >
        <show-case
            class="show-case"
            :class="{ 'on-hover': item.id === (selectedOne && selectedOne.id) }"
            :item="item"></show-case>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import ShowCase from "@/components/showCase";
import {getNFTList} from "@/api/NFT";
import SelectedItem from "@/views/Homepage/HomepageComps/selectedItem";
export default {
  name: "HotNft",
  components: {
    SelectedItem,
    ShowCase,
  },
  data: () => ({
    rawItems: [],
    items: [],
    selectedOne: null,
    hover: null
  }),
  mounted() {
    this.getNFTList()
    window.addEventListener('resize', this.rowNumber)
  },
  destroyed() {
    window.removeEventListener('resize', this.rowNumber)
  },
  methods:{
    rowNumber(){
      let nftlistshowDom = document.getElementById('nftlistshow')
      let nft0Dom = document.getElementById('nft0')
      let num = nftlistshowDom && nft0Dom && (nftlistshowDom.offsetWidth / nft0Dom.offsetWidth) || 0
      num = Math.floor(num)
      this.items = this.rawItems.slice(0,num)
    },
    selectNFT(nft){
      this.selectedOne = nft
    },
    getNFTList(){
      let info = {}
      info.status = 0 //去掉销毁的数据
      info.is_hot = true
      getNFTList(info).then((res)=>{
        this.rawItems = res.data.results
        this.items = res.data.results
        this.selectNFT(this.items[0])
        this.$nextTick(this.rowNumber)
      }).catch((err)=>{
        console.error(err)
      })
    },
    goNFT(_id) {
      this.$router.push("/nft/" + _id);
    },
  }
}
</script>

<style scoped>
.show-case{
  transition: opacity .4s ease-in-out;
}
.show-case:not(.on-hover){
  opacity: 0.6;
}

@media (max-width: 980px) {
  .rowImg{
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .cardImg{
    margin-bottom:20px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
@media (min-width: 980px) {
  .cardImg{
    width: 289px !important;
  }
  .cardImg:last-child{
  }
}
</style>
