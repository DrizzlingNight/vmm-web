<template>
  <v-container
      v-if="items.length"
      style="max-width: 1300px;"
      class="px-5"
  >
    <v-row
        no-gutters
        class="row"
        style="padding-bottom: 36px;margin-right: 10px;margin-left: 10px"
    >
      <v-col class="d-flex align-center justify-center col" style="margin-top: 71px">
        <span class="fontColor--text span" style="font-size: 48px;height: 67px;line-height: 67px">{{ $t("homepage.new.text") }}</span>
      </v-col>
    </v-row>
    <v-row
        id="newnftlistshow"
        :class="rawItems.length<4?'justify-start':'justify-space-between'"
        no-gutters>
      <show-case
          v-for="(item, idx) in items"
          :key="idx"
          :id="`newnft${idx}`"
          style="margin-bottom: 10px"
          class="showCase"
          :item="item"></show-case>
    </v-row>
    <v-row
        no-gutters
        class="justify-center">
      <v-col cols="12" style="padding-left: 2px;padding-right: 2px">
        <v-btn
            class="btnBorder btnColor--text "
            elevation="0"
            style="width: 100%;height: 50px;border-radius: 4px;font-size: 16px !important;"
            :disabled="!loadBtnEnable"
            @click="rowNumber">{{ $t(loadBtnEnable ? 'homepage.new.loadBtn' : 'homepage.new.loadBtnDisable') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ShowCase from "@/components/showCase";
import {getNewNFTList} from "@/api/NFT";

export default {
  name: "newNft",
  components: {
    ShowCase,
  },
  data: () => ({
    rawItems: [],
    items: [],
    hover: null,
    colNum: 0,
    rows: 0,
    loadBtnEnable: true
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
      let nftlistshowDom = document.getElementById('newnftlistshow')
      let nft0Dom = document.getElementById('newnft0')
      let num = nftlistshowDom && nft0Dom && (nftlistshowDom.offsetWidth / nft0Dom.offsetWidth) || 0
      num = Math.floor(num)
      if (num === 0) {
        num = num + 1
      }
      this.colNum = num
      let rows = Math.floor(this.rawItems.length / num)
      if (rows === 0) {
        rows = 1
      }
      this.rows = this.rows + 2
      if (rows <= this.rows) {
        this.rows = rows
        this.loadBtnEnable = false
      }
      this.items = this.rawItems.slice(0, this.colNum * this.rows)
    },
    getNFTList() {
      // let info = {}
      // info.status = 0 //去掉销毁的数据
      // info.limit = 50
      // info.ordering = "-created_time"
      getNewNFTList().then((res) => {
        this.rawItems = res.data
        this.items = res.data
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
@media (max-width: 980px) {
  .showCase {
    width: 100% !important;
    margin: 0 auto;
    /*height: 100% !important;*/
  }
}
>>>.theme--light.v-btn.v-btn--disabled{
  border: 0px;
}
@media (max-width: 960px) {
  .row{
    /*padding-top: 25px !important;*/
    margin-bottom: 1px !important;
    padding-bottom: 0px !important;
  }
  .col{
    margin-top: 16px !important;
  }
  .span{
    height: 25px !important;
    font-size: 18px !important;
    line-height: 25px !important;
  }
}
</style>
