<template>
  <div class="d-flex flex-row">
    <div class="tips-content">{{tipsContent}}</div>
    <button
      class="action"
      @click="clicked"
    ><div class="go">{{goNow}}</div></button>
  </div>
</template>

<script>

import router from "@/router";
import i18n from "./../lang";

export default {
  computed: {
    tipsContent() {
      return i18n.t('swapTips.tipsContent')
    },
    goNow() {
      return i18n.t('swapTips.goNow')
    }
  },
  methods: {
    clicked() {
        router.push("/token_swap")
    }
  }
};
</script>

<style scoped lang="scss">

.tips-content {
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}

.go {
    font-weight: 600;
    font-size: 16px;
    text-decoration-line: underline;
    color: #FFAF0F;
}

</style>