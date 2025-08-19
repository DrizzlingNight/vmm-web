<template>
  <div class="topChip">
<!--    <div v-for="(item,index) in items1" :key="index" class="chipDiv"-->
<!--         :class="(index == (items1.length - 1))?'active':''">-->
<!--      <div>{{ $t(`mysteryBox.mysteryBoxMarket.${item.name}`) }}</div>-->
<!--      <v-icon size="10" class="btnColor&#45;&#45;text icon">close</v-icon>-->
<!--    </div>-->
<!--    <div class="chipDiv" v-if="items2 != '-' && items2 !=''">-->
<!--      <div>{{ items2 }}</div>-->
<!--      <v-icon size="10" class="btnColor&#45;&#45;text icon">close</v-icon>-->
<!--    </div>-->
    <div class="textColor"><span class="btnColor--text text">{{ dataLength }}<span class="result">{{
        $t('marketPlace.result')
      }}</span></span></div>
  </div>
</template>

<script>
export default {
  name: "TopChip",
  props: ['dataLength'],
  computed: {}
}
</script>

<style scoped lang="scss">
.topChip {
  display: flex;
  margin-left: 58px;
  align-items: unset;

  .chipDiv {
    padding: 8px 14px 15px 14px;
    min-width: 94px;
    height: 40px;
    border: 1px solid #050505;
    border-radius: 4px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-right: 20px;

    &.active {
      margin-right: 5px;
    }

    .icon {
      height: 10px;
      width: 10px;
      margin-top: 6px;
      cursor: pointer;
    }
  }

  .textColor {
    .text {
      font-size: 36px;
    }

    .result {
      font-size: 14px;
    }
  }
}
@media screen and (max-width: 980px) {
  .topChip{
    margin-left: 0px !important;
    position: relative;
    top: -10px;
  }
}
</style>