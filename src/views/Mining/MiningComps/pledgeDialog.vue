<template>
  <v-card>
    <div class="text-center titleDiv">{{ $t("mining.pledges.titleDialog") }}{{ pledgeCoin ? pledgeCoin.code : "" }}</div>
<!--    <div class="comma text-center">-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
    <div class="comma mx-auto"><v-img src="@/assets/line.png"></v-img></div>
    <div class="textDiv text-center">{{ $t("mining.pledges.textDialog") }}</div>
  </v-card>
</template>

<script>

export default {
  name: "pledgeDialog",
  props:["pledgeCoin"]
}
</script>

<style scoped>
::v-deep.v-card {
  padding-top: 43px;
  padding-bottom: 81px;
  border-radius: 17px;
}

.titleDiv {
  font-weight: 600;
  color: #CC9933;
  line-height: 33px;
  height: 33px;
  font-size: 24px;
}

.comma {
  /*letter-spacing: 3px;*/
  /*white-space: nowrap;*/
  /*overflow: hidden;*/
  width: 70%;
  margin-top: 10px;

}

.textDiv {
  color: #424242;
  line-height: 28px;
  margin-top: 53px;
  margin-left: 49px;
  margin-right: 48px;
  font-size: 18px;
}

@media screen and (max-width: 960px) {
  ::v-deep.v-card {
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 17px;
  }

  .titleDiv {
    line-height: 24px;
    height: 24px;
    font-size: 18px;
  }

  .comma {
    /*margin-right: 40px;*/
    /*margin-left: 40px;*/
  }

  .textDiv {
    margin-top: 10px;
    font-size: 14px;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>