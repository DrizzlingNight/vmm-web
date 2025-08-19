<template>
  <v-card style="padding-top: 42px;">
    <div class="btnColor--text text-center" style="font-size: 24px;font-weight: 600;line-height: 33px;height: 33px">{{$t("productDetail.purchaseNotes.title")}}</div>
    <v-divider class="mx-auto" style="margin-top: 10px;width: 382px;border-image: linear-gradient(270deg, rgba(200, 200, 200, 0), rgba(176, 176, 176, 0.49), rgba(151, 151, 151, 0)) 1 1;"></v-divider>
    <div style="font-size: 18px;max-width: 582px;font-weight: 400;line-height: 28px;margin-top: 34px;padding-bottom: 44px" class="navI18n--text mx-auto text-center">
    <li>{{$t("productDetail.purchaseNotes.text1")}}</li>
    <div>{{$t("productDetail.purchaseNotes.text2")}}</div>
    <div>{{$t("productDetail.purchaseNotes.text3")}}</div>
    <li>{{$t("productDetail.purchaseNotes.text4")}}</li>
    <div>{{$t("productDetail.purchaseNotes.text5")}}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PurchaseNotes"
}
</script>

<style scoped>

</style>