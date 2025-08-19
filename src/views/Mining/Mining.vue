<template>
  <div class="mining_wrapper">
    <div class="mining_content">
      <h2>{{ $t("mining.mining") }}</h2>
      <v-tabs v-model="tab" class="tabs" active-class="btnColor--text" color="btnColor" height="28px">
        <v-tab @click="$router.push({name:item})" class="tab" v-for="item in items" :key="item.id">
          <span>{{ $t(`mining.${item}`) }}</span>
        </v-tab>
      </v-tabs>
      <v-divider class="divider"></v-divider>
      <div>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mining",
  data: () => ({
    tab: 0,
    items: ['mining', 'dividends', 'pledge', 'repurchase']
  }),
  created() {
    let path = this.$route.path
    if (path.indexOf('/mingInfo') !== -1) {
      this.tab = 0
    } else if (path.indexOf('/dividends') !== -1) {
      this.tab = 1
    } else if (path.indexOf('/pledge') !== -1) {
      this.tab = 2
    } else if (path.indexOf('/repurchase') !== -1) {
      this.tab = 3
    }
  }
}
</script>

<style scoped lang="scss">
.mining_wrapper {
  width: 100%;
  padding: 0px 330px;
  margin-bottom: 110px;

  .mining_content {
    max-width: 1260px;
    margin: auto;
    padding-top: 65px;

    h2 {
      font-size: 24px;
      color: #050505;
      line-height: 33px;
      height: 33px;
      margin-bottom: 20px;
    }

    .tab {
      min-width: auto;
      margin-right: 26px;
      font-size: 18px !important;
      width: auto !important;
      height: 25px !important;
      padding: 0px !important;
      font-weight: normal !important;
      span{
        font-weight: 400 !important;
      }
    }

    .divider {
      color: #F6F5F3 !important;
      margin-top: -1px;
      position: relative;
    }
  }
}

@media screen and (max-width: 1564px) {
  .mining_wrapper {
    padding: 0px 130px;
  }
}

@media screen and (max-width: 960px) {
  .mining_wrapper {
    padding: 0px 20px;
  }
}

//@media screen and (max-width: 600px) {
//  .mining_wrapper {
//    padding: 0px 20px;
//  }
//}

@media screen and (max-width: 960px) {
  .mining_wrapper {
    .mining_content {
      padding-top: 20px;

      h2 {
        font-size: 15px;
        margin-bottom: 5px;
      }

      ::v-deep .v-tabs-bar {
        height: 20px !important;
      }

      .tab {
        margin-right: 20px;
        font-size: 13px !important;
        width: auto !important;
        height: 20px !important;
        padding: 0px !important;
      }

      .divider {
        margin-top: -1px;
        position: relative;
      }
    }
  }

}
</style>