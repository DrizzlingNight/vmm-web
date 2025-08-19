<template>
  <div class="d-flex justify-start">
    <!--    <v-btn-toggle-->
    <!--        v-model="btnIndex"-->
    <!--        background-color="transparent"-->
    <!--        mandatory-->
    <!--        class="btnToggle"-->
    <!--        style="height: 46px;margin-top: 20px;margin-bottom: -2px;width:100%"-->
    <!--    >-->
    <v-btn elevation="0" class="btnType" :class="(index === selectedChainIndex) ? 'activeBtn':''"
           v-for="(item, index) in serviceType" :key="index" @click="serviceBtn(item,index)" height="56">
      {{ item.block_chain }}
    </v-btn>
    <!--    </v-btn-toggle>-->
  </div>
</template>

<script>
export default {
  name: "ChoiceLink",
  props: ["serviceType","selectedChainIndex"],
  data: () => ({
  }),
  methods: {
    //切换链
    serviceBtn(item, index) {
      this.$emit("choiceChain",{item,index})
    },
  }
}
</script>

<style scoped lang="scss">
.btnType {
  width: 100px;
  margin-right: 10px;
  background: linear-gradient(135deg, #EEEEEE 0%, #D8D8D8 100%);

  &.activeBtn {
    background: linear-gradient(315deg, #E6B045 0%, #FFE383 100%);
  }

  ::v-deep span {
    font-size: 18px;
    font-weight: bold;
    color: #050505;
  }
}
</style>