<template>
  <div
      style="z-index: 2;min-width: 65px;height: 26px;line-height:26px;background: rgba(204, 153, 51, 0.5);border-radius: 4px;margin-top: 19px;margin-right: 12px"
      class="d-inline-block d-flex align-center justify-center">
    <v-icon size="15" style="margin-right: 4px;" class="btnWhite--text">mdi-heart</v-icon>
    <span class="white--text" style="font-size: 18px">{{ nft.likes }}</span></div>
</template>

<script>
export default {
  name: "CollectionIcon",
  props:["nft"]
}
</script>

<style scoped>

</style>