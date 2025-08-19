<template>
  <v-window
      v-model="selected"
      class="adCard"
      style="box-shadow: 0px 9px 17px 10px rgba(0, 0, 0, 0.05)"
  >
    <v-window-item
        v-for="(item,i) in items"
        :key="i"
        crycle
        class="adCard fontColor2"
        @click="goNFT(item.id)"
        style="cursor: pointer;border-radius: 10px"
    >
      <v-card
          style="border-radius: 10px"
          class="adCard fontColor2"
          width="100%"
      >
        <!--        <v-row-->
        <!--            no-gutters-->
        <!--            class="fill-height"-->
        <!--            align="center"-->
        <!--            justify="center"-->
        <!--        >-->
        <v-img
            contain
            width="100%"
            height="319px"
            class="adImg"
            :src="item.files
              ? (item.files.indexOf('http') === 0 && item.files || (host + item.files[0]))
              : 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
              "
        ></v-img>
        <!--        </v-row>-->
        <div class="navI18n">
          <v-card-text
              class="text-truncate background--text pl-7"
              style="font-size: 21px;font-weight: 500;"
          >
            {{ selectedItem.name }}
          </v-card-text>
          <v-card-text class="fontColor2--text pl-7">
            {{ selectedItem.user.username }}
          </v-card-text>
        </div>
      </v-card>
    </v-window-item>
  </v-window>
</template>
<script>
import {mapGetters} from "vuex";
import {getNFTList} from "@/api/NFT";

export default {
  name: "NftAd",
  computed: {
    ...mapGetters(["host"]),
    selectedItem() {
      return this.items[this.selected]
    }
  },
  data: () => {
    return {
      items: [],
      selected: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.next()
    }, 6000)
    this.getNFTList()
  },
  methods: {
    getNFTList() {
      let info = {}
      info.status = 0 //去掉销毁的数据
      info.is_recommend = true
      getNFTList(info).then((res) => {
        this.items = res.data.results
      }).catch((err) => {
        console.error(err)
      })
    },
    goNFT(_id) {
      this.$router.push("/nft/" + _id);
    },
    next() {
      if (this.selected >= this.items.length - 1)
        this.selected = 0
      else
        this.selected++
    }
  }
}
</script>

<style scoped>
/*>>>.v-window__container{*/
/*  transition: 50s;*/
/*}*/
/*>>>.v-responsive__sizer{*/
/*  transition:padding-bottom 10s cubic-bezier(0.25, 0.8, 0.5, 1)*/
/*}*/
@media (max-width: 1024px) {
  .adImg {
    height: 221px !important;
    width: 330px !important;
  }

  .adCard {
    height: 329px !important;
    width: 330px !important;
  }
}

@media (min-width: 1024px) {
  .adImg {
    height: 319px !important;
    width: 430px !important;
  }

  .adCard {
    height: 427px !important;
    width: 430px !important;
  }
}
</style>
