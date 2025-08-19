<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center mx-auto" width="606" height="463">
      <div class="text-right">
        <v-card-subtitle class="d-inline-block" @click="goNft">
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-img
          style="margin-top: 13px"
          class="mx-auto"
          max-width="143"
          max-height="143"
          src="@/assets/fake/submit_success.png"
      ></v-img>
      <v-card-text class="navI18n--text pa-0" style="font-size: 24px;margin-top:31px;font-weight: bold;line-height: 33px;">
        {{ $t("listed.sellSuccess.title") }}
      </v-card-text>
      <v-card-actions class="pa-0 d-flex justify-center" style="margin-top: 85px">
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px;margin-right: 23px">
          <v-btn x-large depressed block  class="btnColor btnWhite--text" @click="goMarketPlace" style="height: 50px;font-size: 20px">
            {{ $t("listed.sellSuccess.continueSell") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px">
          <v-btn depressed outlined color="btnColor" x-large block @click="goNft" style="height: 50px;font-size: 20px">
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
  name: "SellSuccess",
  computed: {
    ...mapGetters([
      'name', 'user', 'host'
    ]),
  },
  methods:{
    goMarketPlace() {
      router.push("/user/"+this.user.id+'/2')
    },
    goNft() {
      router.push("/nft/" + this.$route.params.id + '/info')
    }
  }
}
</script>

<style scoped>

</style>