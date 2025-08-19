<template>
  <v-container fluid class="pa-0 px-5 background2 container" style="margin-top: 106px;">
    <v-row
        no-gutters
        class="row d-none d-md-flex"
        style="padding-top: 94px;margin-bottom: 105px"
    >
      <v-col class="d-flex align-center justify-center">
        <span class="createdNFT" style="font-size: 48px;height: 67px;line-height: 67px">{{
            $t("homepage.path.title")
          }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters style="padding-bottom: 155px">
      <v-col>
        <v-img class="mx-auto d-none d-md-flex" max-width="1260px" :src="'/static/home/'+imgURL+'.png'"></v-img>
        <v-img class="mx-auto d-flex d-md-none" :src="'/static/home/'+imgURLSmall+'.png'"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import i18n from "../../../lang";

export default {
  name: "pathHome",
  computed: {
    imgURL() {
      return i18n.locale
    },
    imgURLSmall() {
      return i18n.locale + 'Small'
    }
  }
}
</script>

<style scoped>
@media (max-width: 960px) {
  .container{
    margin-top: 30px !important;
  }
  .row{
    padding-top: 25px !important;
    padding-bottom: 0px !important;
    margin-bottom: 0px !important;
  }
  .createdNFT{
    font-size: 18px !important;
  }
}
</style>