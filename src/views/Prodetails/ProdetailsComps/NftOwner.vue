<template>
  <div class="d-flex justify-space-between">
    <v-card-actions class="pa-0">
      <v-list-item class="grow px-0" @click="goPersonalSetting">
        <v-list-item-avatar style="margin-right: 10px">
          <v-img class="elevation-6" src="@/assets/fake/people.png"></v-img>
        </v-list-item-avatar>
        <div>
          <v-list-item-title class="navI18n--text" style="font-size: 14px;font-weight: bold">{{
              NFT ? NFT.user.username : "--"
            }}
          </v-list-item-title>
          <div class="ETHColor mt-2 fontColor6--text" style="font-size: 12px;">{{ $t("productDetail.owner") }}</div>
        </div>
      </v-list-item>
    </v-card-actions>
  </div>
</template>

<script>
// import CollectionBtn from "../../../components/CollectionBtn";
import {mapGetters} from "vuex";

export default {
  name: "NftOwner",
  // components: {CollectionBtn},
  props: [
    "NFT"
  ],
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goPersonalSetting() {
      if (this.user) {
        this.$router.push(`/user/${this.NFT.user.id}`)
      } else {
        this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", true);
      }
    }
  }
}
</script>

<style scoped>

</style>
