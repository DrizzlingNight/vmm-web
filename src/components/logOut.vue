<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center mx-auto" width="606" height="463">
      <v-img
          style="margin-top: 66px"
          class="mx-auto"
          max-width="143"
          max-height="143"
          src="@/assets/fake/offShelf.png"
      ></v-img>
      <v-card-text class="navI18n--text pa-0" style="font-size: 24px;margin-top:31px;font-weight: bold;line-height: 33px;">
        {{$t("logOut.title")}}
      </v-card-text>
      <v-card-text class="fontColor6--text pa-0" style="font-size: 16px;margin-top:18px;font-weight: bold;line-height: 22px">
        {{$t("logOut.text")}}
      </v-card-text>
      <v-card-actions class="pa-0 d-flex justify-center" style="margin-top: 45px">
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px;margin-right: 23px">
          <v-btn x-large depressed block class="btnWhite--text btnColor" @click="openLogOut" style="height: 50px;font-size: 20px">
            {{ $t("confirmBtn") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex pa-0" style="max-width: 260px">
          <v-btn depressed outlined color="btnColor" x-large block @click="closeLogOut"
                 style="height: 50px;font-size: 20px">
            {{ $t("cancelBtn") }}
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {logOut} from "../api/user";
import router from "@/router";

export default {
  name: "logOut",
  methods: {
    openLogOut() {
      logOut();
      this.$store.commit("user/SET_USER", null);
      if (this.$route.path != "/") router.push("/");
      this.$emit("closeLogOut")
    },
    closeLogOut() {
      this.$emit("closeLogOut")
    }
  }
}
</script>

<style scoped>

</style>