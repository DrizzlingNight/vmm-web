<template>
  <div class="text d-flex align-center" style="height: 100%">
    <div>{{ amount }}</div>
  </div>
</template>

<script>
export default {
  name: "Amount",
  props: ["amount"]
}
</script>

<style scoped>
.text {
  color: #050505;
  font-size: 16px;
}
</style>