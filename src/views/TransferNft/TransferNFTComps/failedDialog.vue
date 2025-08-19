<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center mx-auto" width="606px" height="463px">
      <div class="text-right">
        <v-card-subtitle class="d-inline-block pt-3 pr-3" @click="NFTfailed">
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-img
          style="margin-top: 43px"
          class="mx-auto"
          max-width="143"
          max-height="143"
          src="@/assets/fake/submit_failed.png"
      ></v-img>
      <v-card-text class="navI18n--text pa-0" style="font-size: 24px;margin-top:31px;font-weight: bold;line-height: 33px;">
        {{ $t("transferNFT.errorTransfer") }}
      </v-card-text>
      <v-card-actions class="mt-8">
        <v-col cols="10" class="mx-auto">
          <v-btn
              x-large
              block
              depressed
              style="font-size: 20px"
              class="btnColor btnWhite--text"
              @click="NFTfailed"
          >
            {{ $t("transferNFT.backTransfer") }}
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
  name: "failedDialog",
  computed: {
    ...mapGetters(["host", "user"]),
  },
  methods: {
    // closeDialog() {
    //   this.$emit("closeDialog")
    // },
    NFTfailed() {
      this.$emit("closeDialog")
      router.push(`/user/${this.user.id}/1`)
    }
  }
}
</script>

<style scoped>

</style>