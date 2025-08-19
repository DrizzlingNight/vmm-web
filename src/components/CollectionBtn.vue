<template>
  <v-btn @click.stop="collectionNFT" outlined style="min-width: 65px;height: 32px;border-radius: 4px;padding-top: 2px"
         class="px-0 my-auto" :class="isLike && user?'btnColor':'fontColor8'">
    <v-icon size="14" style="line-height: 32px;height: 18px;margin-right: 2px" class="white--text">mdi-heart</v-icon>
    <span style="font-size: 16px;line-height: 32px;height: 32px" class="white--text">{{ like ? like : likes }}</span>
  </v-btn>
</template>

<script>
import {mapGetters} from "vuex";
import {collectionNFT} from "@/api/NFT";
import {getNFTList} from "@/api/NFT";
export default {
  name: "CollectionBtn",
  data: () => ({
    isLike: null,
    like: null
  }),
  props: [
    "NFT"
  ],
  computed: {
    ...mapGetters(["user"]),
    likes: {
      get() {
        if (this.NFT) {
          return this.NFT.likes
        } else return '--'

      },
      set(val) {
        this.like = val
      }
    }
  },
  created() {
    this.getNFTList();
  },
  methods: {
    collectionNFT() {
      collectionNFT(this.NFT.id)
          .then((response) => {
            this.likes = response.data.likes
            this.isLike = !this.isLike
          }).catch(() => {

      })
    },
    getNFTList(info = {}) {
      info.status = 0;
      info.is_like = true;
      getNFTList(info)
          .then((response) => {
            try {
              response.data.results.forEach(item => {
                let id = this.NFT.id
                if (Number(item.id) === Number(id)) {
                  this.isLike = true
                  throw new Error()
                } else this.isLike = false
              })
            } catch (e) {
              return
            }
          })
          .catch(() => {
          });
    },
  }
}
</script>

<style scoped>

</style>