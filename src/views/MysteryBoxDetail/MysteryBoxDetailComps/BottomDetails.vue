<template>
  <div class="detail">
    <div v-html="details">
    </div>
<!--    <div>{{ details }}</div>-->
  </div>
</template>

<script>
export default {
  name: "BottomDetails",
  props: ["details"]
}
</script>

<style scoped lang="scss">
.detail {
  padding-top: 39px;
}
</style>