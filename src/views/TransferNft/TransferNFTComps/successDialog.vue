<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center" width="606px" height="463px">
          <div class="text-right">
            <v-card-subtitle class="d-inline-block pt-3 pr-3" @click="NFTsuccess">
              <v-icon class="btnColor--text">close</v-icon>
            </v-card-subtitle>
          </div>
      <v-img
          style="margin-top: 23px"
          class="mx-auto"
          max-width="143"
          max-height="143"
          src="@/assets/fake/submit_success.png"
      ></v-img>
      <v-card-text class="navI18n--text pa-0" style="font-size: 24px;margin-top:31px;font-weight: bold;line-height: 33px;">
        {{ $t("transferNFT.successTransfer") }}
      </v-card-text>
      <v-card-text class="fontColor6--text pa-0" style="font-size: 16px;margin-top:18px;font-weight: bold;line-height: 22px">
        {{ $t("transferNFT.successText") }}：{{ receiverUsername }}
      </v-card-text>
      <v-card-actions class="pa-0 d-flex justify-center" style="margin-top: 45px">
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px;margin-right: 23px">
          <v-btn
              depressed
              x-large
              block
              class="btnColor btnWhite--text"
              style="height: 50px;font-size: 20px"
              @click="NFTsuccess"
          >
            {{ $t("confirmBtn") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px">
          <v-btn
              outlined
              color="btnColor"
              depressed
              x-large
              block
              style="height: 50px;font-size: 20px"
              @click="NFTCreated"
          >
            {{ $t("transferNFT.continueTransfer") }}
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
  name: "successDialog",
  props: ["receiverUsername"],
  computed: {
    ...mapGetters(["host", "user"]),
  },
  methods: {
    // closeDialog() {
    //   this.$emit("closeDialog")
    // },
    NFTsuccess() {
      this.$emit("closeDialog")
      router.push(`/user/${this.user.id}/1`)
    },
    NFTCreated() {
      this.$emit("closeDialog")
      router.push(`/creatednft/`)
    },
  }
}
</script>

<style scoped>

</style>