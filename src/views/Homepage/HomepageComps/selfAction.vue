<template>
  <div style="padding-top: 83px;margin-top:50px;padding-bottom: 131px" class="background2 div">
    <v-container
        style="max-width: 1400px;"
        class="pa-0"
    >
      <v-row no-gutters>
        <v-col class="pa-0 px-4 d-flex justify-center">
          <p class="createdNFT text-center" style="font-size:40px;max-width: 750px;">{{
              $t('homepage.selfAction.title')
            }}</p>
        </v-col>
      </v-row>

      <v-row
          class="no-gutters justify-center justify-md-space-between row"
          style="margin-top: 87px"
      >
        <div
            style="width: 335px"
            v-for="(item, i) in items"
            :key="i"
            class="d-flex flex-column align-center align-self-start"
        >
          <v-img
              :src="item.icon"
              width="80"
              height="75"
              class="ma-3"
              contain
          ></v-img>
          <div  style="height: 66px;margin-top: 18px" class="text-center d-flex flex-column justify-center">
            <div
                class="span"
                style="font-size: 24px;font-weight: bold;"
            >{{ $t(item.title) }}
            </div>
            <div
                v-if="i === 0"
                class="mt-n1 span"
                style="font-size: 24px;font-weight: bold"
            >{{ $t('homepage.selfAction.buyTitle2') }}
            </div>
          </div>
          <div
              class="spanSmall"

              style="font-size: 21px;font-weight: 400;margin-top: 24px"
          >
            <p
                class="fontColor4--text text-center"
                v-text="$t(item.body)"
            ></p>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "SelfAction",
  components: {},
  computed: {
    normalItems() {
      return this.items.slice(1)
    }
  },
  data: () => ({
    items: [
      {
        icon: "/static/home/wallet.png",
        title: "homepage.selfAction.buyTitle1",
        body: "homepage.selfAction.buyBody"
      },
      {
        icon: "/static/home/star.png",
        title: "homepage.selfAction.collectTitle",
        body: "homepage.selfAction.collectBody"
      },
      {
        icon: "/static/home/image.png",
        title: "homepage.selfAction.createTitle",
        body: "homepage.selfAction.createBody"
      },
      {
        icon: "/static/home/tag.png",
        title: "homepage.selfAction.sellTitle",
        body: "homepage.selfAction.sellBody"
      },
    ]
  })
}
</script>

<style scoped>
@media (max-width: 960px) {
  .div{
    margin-top: 17px !important;
    padding-top: 37px !important;
    padding-bottom: 46px !important;
  }
  .createdNFT{
    font-size: 18px !important;
  }
  .row {
    margin-top: 18px !important;
  }
  .spanSmall{
    font-size: 19px !important;
  }
  .span{
    font-size: 22px !important;
  }
}
</style>
