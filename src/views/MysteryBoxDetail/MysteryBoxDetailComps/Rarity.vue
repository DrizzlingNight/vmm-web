<template>
  <div class="d-flex align-center justify-start" style="height: 100%">
    <img class="img" contain :src="require('@/assets/rarity/'+showImg+'.png')">
  </div>
</template>

<script>
export default {
  name: "Rarity",
  props: ["rarity"],
  computed: {
    showImg() {
      switch (this.rarity) {
        case 0:
          return 'SSS';
        case 1:
          return 'SS';
        case 2:
          return 'S';
        case 3:
          return 'A';
        case 4:
          return 'B';
        default:
          return 's'
      }
    }
  }
}
</script>

<style scoped>
.img {
  height: 29px;
}
</style>