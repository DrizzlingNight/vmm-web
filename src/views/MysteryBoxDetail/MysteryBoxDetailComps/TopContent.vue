<template>
  <div class="wrapper">
    <div class="leftImg d-flex justify-center align-center">
      <v-img class="img" :src="data.image"></v-img>
    </div>
    <top-detail class="topDetail" :data="data" @clickBuy="clickBuy"></top-detail>
  </div>
</template>

<script>
import TopDetail from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/TopDetail";

export default {
  name: "TopContent",
  props:["data"],
  components: {TopDetail},
  methods:{
    clickBuy() {
      this.$emit("clickBuy")
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding-top: 40px;
  display: flex;
  justify-content: space-between;

  .leftImg {
    margin-right: 100px;
    width: 566px;
    height: 566px;
    border: 1px solid #cccccc;
    border-radius: 8px;

    .img {
      max-width: 566px;
      max-height: 566px;
    }
  }
}

@media screen and (max-width: 960px) {
  .wrapper {
    display: block;

    .leftImg {
      width: 100%;
      margin-right: 0px;

      .img {
        margin: 0 auto;
        width: 100%;
      }
    }

    .topDetail {

      margin-top: 50px;
    }
  }
}
</style>