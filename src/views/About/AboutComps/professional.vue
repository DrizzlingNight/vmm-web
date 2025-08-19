<template>
  <div>
    <p class="mt-11 navI18n--text" style="font-size: 36px">{{ $t("about.professional.title") }}</p>
    <v-row class="d-flex justify-space-around mt-8 px-0">
      <v-col >
        <v-img max-width="618" src="@/assets/fake/about/professional1.png"></v-img>
      </v-col>
      <v-col>
        <v-img max-width="618" src="@/assets/fake/about/professional2.png"></v-img>
      </v-col>
    </v-row>

    <p style="font-size: 22px" class="fontColor6--text mt-7">{{$t("about.professional.text")}}</p>
  </div>
</template>

<script>
export default {
  name: "professional"
}
</script>

<style scoped>

</style>