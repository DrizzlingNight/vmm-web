<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center mx-auto" width="606" height="463">
      <div class="text-right">
        <v-card-subtitle class="d-inline-block" @click="goDetail">
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-img
          style="margin-top: 24px"
          class="mx-auto"
          max-width="143"
          max-height="143"
          src="@/assets/fake/submit_success.png"
      ></v-img>
      <v-card-text class="navI18n--text pa-0"
                   style="font-size: 24px;margin-top:31px;font-weight: bold;line-height: 33px;">
        {{ title }}
      </v-card-text>
      <div class="fontColor9--text pa-0" style="font-size: 16px;margin-top:18px;font-weight: bold;line-height: 22px">
        {{ body }}
      </div>
      <v-card-actions class="pa-0 d-flex justify-center" style="margin-top: 45px">
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px;margin-right: 23px">
          <v-btn depressed x-large block class="btnColor btnWhite--text" @click="goMarket"
                 style="height: 50px;font-size: 20px">
            {{ $t("listed.sellSuccess.continueBuy") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px">
          <v-btn depressed x-large block outlined color="btnColor" @click="goDetail"
                 style="height: 50px;font-size: 20px;border: 1px solid rgba(255, 193, 7, 1)">
            {{ $t("listed.sellSuccess.lookDetail") }}
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";

export default {
  name: "BuySuccess",
  props: [
    "title",
    "body",
    "toPath",
    "NFTData"
  ],
  computed: {
    ...mapGetters(["name", "user", "host"]),
  },
  methods: {
    goMarket() {
      router.push("/assets/")
    },
    goDetail() {
      if (this.$route.path === this.toPath) {
        location.reload()
      } else {
        router.push(this.toPath)
      }
    }
  }
}
</script>

<style scoped>

</style>