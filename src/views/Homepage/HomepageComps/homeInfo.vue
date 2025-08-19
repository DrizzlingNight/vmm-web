<template>
  <div>
    <v-img
        class="d-none d-md-flex align-center"
        style="max-height: 601px"
        src="@/assets/home/back.png"
    >
      <v-container
          fluid
          class="px-5"
          style="max-width: 1300px"
      >
        <v-row
            class="justify-space-between" no-gutters
        >
          <v-col
              class="col-12 col-md-7 pa-0 d-flex flex-column align-self-center align-center align-md-start"
          >
            <p cols="12"
               class="mt-md-16"
               style="margin-bottom: 24px;font-size: 50px; font-weight: bolder"
            >
              {{ $t("homepage.homeInfo.title") }}
            </p>
            <p cols="12"
               style="margin-bottom: 101px; font-size: 30px;"
            >
              {{ $t("homepage.homeInfo.subtitle") }}
            </p>
            <v-btn
                large
                color="btnWhite--text"
                class="navI18n px-10"
                width="180"
                height="50"
                dark
                to="/about"
                style="font-size: 20px;box-shadow: 0px 5px 13px 0px rgba(5, 5, 5, 0.19);"
            >
              {{ $t("homepage.homeInfo.button") }}
            </v-btn>
          </v-col>
          <!--        <v-col-->
          <!--            class="col-12 col-md-5 mt-16 d-flex justify-lg-end justify-center"-->
          <!--        >-->
          <!--          <nft-ad class="mt-3"></nft-ad>-->
          <!--        </v-col>-->
        </v-row>
      </v-container>
    </v-img>
    <div class="d-flex d-md-none flex-column">
      <v-img src="@/assets/home/backSmall.png"></v-img>
      <v-container
          class="pa-0"
          fluid
      >
        <v-row
            class="justify-space-between" no-gutters
        >
          <v-col
          >
            <p cols="12" class="d-flex justify-center"
               style="margin-bottom: 11px;margin-top:26px;font-size: 20px;height: 28px;line-height: 28px; font-weight: bolder"
            >
              {{ $t("homepage.homeInfo.title") }}
            </p>
            <p cols="12" class="d-flex justify-center"
               style="margin-bottom: 34px; font-size: 18px;line-height: 25px;height: 25px;"
            >
              {{ $t("homepage.homeInfo.subtitle") }}
            </p>
            <div class="d-flex justify-center">
              <v-btn
                  large
                  color="btnWhite--text"
                  class="navI18n"
                  width="140"
                  height="39"
                  to="/about"
                  style="font-size: 14px;border-radius:4px;box-shadow: 0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);"
              >
                {{ $t("homepage.homeInfo.button") }}
              </v-btn>
            </div>

          </v-col>
          <!--        <v-col-->
          <!--            class="col-12 col-md-5 mt-16 d-flex justify-lg-end justify-center"-->
          <!--        >-->
          <!--          <nft-ad class="mt-3"></nft-ad>-->
          <!--        </v-col>-->
        </v-row>
      </v-container>
    </div>
  </div>

</template>

<script>
// import NftAd from "./nftAd"

export default {
  name: "homeInfo",
  components: {
    // "nft-ad": NftAd
  }
}
</script>

<style scoped>

</style>
