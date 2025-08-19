<template>
  <v-card
      flat
      class="hotCardName"
      style="border-radius: 0"
  >
    <div style="margin-left: 10px" class="div div1">
      <span
          class="text-truncate span"
          style="font-size: 24px;height: 30px;line-height: 28px;font-weight: bold;text-shadow: 0px 5px 11px rgba(0, 0, 0, 0.06);"
      >{{ name }}</span>
    </div>
    <div class="d-flex div div2" style="margin-left: 10px;margin-top: 3px">
      <div class="my-auto">
        <v-img
            class="img"
            width="27px"
            height="27px"
            src="@/assets/fake/people.png"
        ></v-img>
      </div>
      <div
          class="navI18n--text d-inline-block my-auto ml-3 name"
          style="font-size: 14px"
      >{{ username }}
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "SimpleUserCard",
  props: [
    "username",
    "name"
  ]
}
</script>

<style scoped>
@media (max-width: 960px) {
  .span{
    height: 11px !important;
    line-height: 10px !important;
    font-size: 12px !important;
    transform: scale(0.75);
  }
  .img{
    width: 14px !important;
    height: 14px !important;
  }
  .name{
    line-height: 6px !important;
    height: 7px !important;
    font-size: 12px !important;
    transform: scale(0.75);
    margin-left: -2px !important;
  }
  .div {
    margin-left: 5px !important;
  }
  .div1{
    height: 11px !important;
    line-height: 10px !important;
  }
  .div2{
    margin-top: 7px !important;
  }
  .hotCardName{
    border-left: 3px solid #CC9933 !important;
  }
}
</style>
