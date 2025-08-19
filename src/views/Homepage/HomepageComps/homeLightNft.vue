<template>
  <v-container
      style="max-width: 1300px;margin-top: 37px;"
      class="pa-0 px-5 container"
  >
    <v-row
        class="ma-4 row"
        style="margin-bottom: 38px"
    >
      <v-col class="mt-10 d-flex align-center justify-center col">
        <span class="createdNFT" style="font-size: 48px;line-height: 67px;height: 67px">{{
            $t("homepage.hot.text")
          }}</span>
      </v-col>
    </v-row>
    <v-row
        no-gutters
        style="width: 100%;"

    >
      <v-col>
        <selected-item :item="selectedOne"
                       style="box-shadow: 0px 5px 11px 0px rgba(0, 0, 0, 0.06), 0px 2px 15px 0px rgba(0, 0, 0, 0.18);"></selected-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import ShowCase from "@/components/showCase";
import {getNFTList} from "@/api/NFT";
import SelectedItem from "@/views/Homepage/HomepageComps/selectedItem";

export default {
  name: "homeLightNft",
  components: {
    SelectedItem,

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
  methods: {
    rowNumber() {
      let nftlistshowDom = document.getElementById('nftlistshow')
      let nft0Dom = document.getElementById('nft0')
      let num = nftlistshowDom && nft0Dom && (nftlistshowDom.offsetWidth / nft0Dom.offsetWidth) || 0
      num = Math.floor(num)
      this.items = this.rawItems.slice(0, num)
    },
    selectNFT(nft) {
      if (nft) {
        this.selectedOne = nft
      }
    },
    getNFTList() {
      let info = {}
      info.status = 0 //去掉销毁的数据
      info.is_hot = true
      info.type = 0
      getNFTList(info).then((res) => {
        this.rawItems = res.data.results
        this.items = res.data.results
        this.selectNFT(this.items[0])
        this.$nextTick(this.rowNumber)
      }).catch((err) => {
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
@media (max-width: 960px) {
  .container {
    margin-top: 35px !important;
  }

  .row {
    margin-bottom: 3px !important;
  }

  .col {
    margin-top: 0px !important;
  }

  .createdNFT {
    font-size: 18px !important;
    line-height: 25px !important;
    height: 25px !important;
  }
}

</style>