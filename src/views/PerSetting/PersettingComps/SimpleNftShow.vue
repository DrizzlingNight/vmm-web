<template>
  <v-row>
    <v-col style="width: 30vw !important;">
      <span class="tranfserNFT">{{ item.token.name }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SimpleNftShow",
  props: ['item'],
}
</script>

<style scoped>

</style>
