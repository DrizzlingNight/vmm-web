<template>
  <div class="text d-flex align-center" style="height: 100%">
    <div>{{ showProbability }}%</div>
  </div>
</template>

<script>
import {formatStrPrice, numFormat, cutZero} from "@/utils/math";

export default {
  name: "Probability",
  props: ["probability"],
  computed: {
    showProbability() {
      return cutZero(formatStrPrice(numFormat(this.probability), 4))
    }
  }
}
</script>

<style scoped>
.text {
  color: #050505;
  font-size: 16px;
}
</style>