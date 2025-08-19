<template>
  <v-container fluid class="pa-0">
    <v-img src="@/assets/fake/about/banner.png" max-height="447px"></v-img>
    <v-container class="mt-md-16 px-5" style="max-width: 1300px">
      <p class="mt-6 fontColor6--text" style="font-size: 22px">
        {{ $t("about.text") }}
      </p>
      <v-divider class="mt-9 border"></v-divider>
      <professional></professional>
      <safe></safe>
      <method></method>
      <v-col cols="12" md="12" class="mx-auto mt-16 pt-8 px-0 mb-16">
        <v-btn
          depressed
          block
          @click="goMarket"
          style="height: 50px; font-size: 24px"
          class="btnColor btnWhite--text"
        >
          <span style="font-size: 20px">{{ $t("about.btn") }}</span>
        </v-btn>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import Professional from "./AboutComps/professional";
import Safe from "./AboutComps/safe";
import Method from "./AboutComps/method";
import router from "@/router";
export default {
  name: "aboutPage",
  components: { Method, Safe, Professional },
  methods: {
    goMarket() {
      if (this.$route.path != `/mystery_box/market`)
        router.push({
          path: "/mystery_box/market",
          query: {
            type: "3",
          },
        });
    },
  },
};
</script>

<style scoped>
</style>