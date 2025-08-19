<template>
  <div class="mysteryBox_wrapper">
    <div class="mysteryBox_content">
      <v-icon size="27" color="black" @click="goBack()">mdi-arrow-left</v-icon>
      <top-content :data="data" @clickBuy="clickBuy"></top-content>
      <bottom-content :data="data"></bottom-content>
    </div>
  </div>
</template>

<script>
import TopContent from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/TopContent";
import BottomContent from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/BottomContent";
import {getBlindboxDetail} from "@/api/mysteryBox";

export default {
  name: "MysteryBoxDetail",
  components: {BottomContent, TopContent},
  data: () => ({
    data: ''
  }),
  created() {
    this.getBlindboxDetail()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    clickBuy() {
      this.getBlindboxDetail()
    },
    getBlindboxDetail() {
      getBlindboxDetail(this.$route.params.id).then((res) => {
        this.data = res.data
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mysteryBox_wrapper {
  width: 100%;
  padding: 0px 330px;
  margin-bottom: 110px;

  .mysteryBox_content {
    max-width: 1260px;
    margin: auto;
    padding-top: 55px;
  }
}

@media screen and (max-width: 1564px) {
  .mysteryBox_wrapper {
    padding: 0px 130px;
  }
}

@media screen and (max-width: 960px) {
  .mysteryBox_wrapper {
    padding: 0px 20px;
  }
}

</style>