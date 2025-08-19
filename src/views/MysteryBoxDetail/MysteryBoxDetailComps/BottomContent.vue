<template>
  <div class="bottom_content">
    <v-tabs
        v-model="tab"
        active-class="font-weight-bold"
        slider-color="btnColor"
        slider-size="2"
        style="z-index: 99;"
        show-arrows
    >
      <v-tab
          style="font-size: 20px"
          v-for="item in tabItem"
          :key="item"
          class="pa-0"
      >
        {{ $t(`mysteryBox.mysteryBoxDetail.tabs.${item}`) }}
      </v-tab>
    </v-tabs>
    <v-divider class="fontColor4" style="height: 1px;position: relative;top: -1px;opacity: 0.49;"></v-divider>
    <v-tabs-items v-model="tab" style="background-color: rgba(0, 0, 0, 0)">
      <v-tab-item>
        <bottom-details :details="data.detail"></bottom-details>
      </v-tab-item>
      <v-tab-item>
        <bottom-rarity :blindBoxId="data.id"></bottom-rarity>
      </v-tab-item>
      <v-tab-item>
        <bottom-detail :detail="data"></bottom-detail>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import BottomDetail from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/BottomDetail";
import BottomDetails from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/BottomDetails";
import BottomRarity from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/BottomRarity";

export default {
  name: "BottomContent",
  components: {BottomRarity, BottomDetails, BottomDetail},
  props: ["data"],
  data: () => ({
    tab: "",
    tabItem: ['details', 'rarity', 'detail']
  }),
}
</script>

<style scoped lang="scss">
.bottom_content {
  margin-top: 93px;
}
</style>