<template>
  <v-overlay color="primary--text" :value="loading" absolute>
    <v-img src="@/assets/fake/loading/loading.svg"></v-img>
  </v-overlay>
</template>

<script>
export default {
  name: "Overlay",
  props:["loading"]
}
</script>

<style scoped>

</style>