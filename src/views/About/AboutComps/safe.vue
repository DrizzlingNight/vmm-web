<template>
  <div class="pt-9">
    <p class="mt-11 navI18n--text" style="font-size: 36px">{{ $t("about.safe.title") }}</p>
    <p style="font-size: 22px" class="fontColor6--text mt-12">{{$t("about.safe.text1")}}</p>
    <p style="font-size: 22px" class="fontColor6--text mt-7">{{$t("about.safe.text2")}}</p>
    <p style="font-size: 22px" class="fontColor6--text mt-7">{{$t("about.safe.text3")}}</p>
    <v-col class="d-flex justify-space-around mt-7 px-0">
      <v-img src="@/assets/fake/about/safe.png"></v-img>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "safe"
}
</script>

<style scoped>

</style>