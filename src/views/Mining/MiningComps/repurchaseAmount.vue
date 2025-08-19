<template>
  <div class="block">
    <v-img class="background_img" width="100%" height="100%" src="@/assets/mining/mining.png">
      <div class="banner-content d-flex flex-column justify-center align-center">
        <v-img class="img" contain width="106" max-height="106px" src="@/assets/coinType/USDT.png"></v-img>
        <h3 class="slogan">{{ buybackPoolTotal }} {{ buybackCoin ? buybackCoin.code : "" }}</h3>
        <p class="text-center">{{ $t('mining.repurchases.repurchaseAmount') }}
          {{ buybackTotal }} VMM
        </p>
      </div>
    </v-img>
    <div class="warningText">
      <p>{{
          $t("mining.repurchases.warningText")
        }}{{ buyBackCashflow * 100 }}%{{ $t("mining.repurchases.warningText3") }}{{
          buyBackPoolDaily * 100
        }}%{{ $t("mining.repurchases.warningText4") }}</p>
      <p>{{ $t("mining.repurchases.warningText2") }}</p>
    </div>
  </div>
</template>

<script>
import {numFormat, formatStrPrice, cutZero} from "@/utils/math";
import {mapGetters} from "vuex";

export default {
  name: "repurchaseAmount",
  props: ["buybackPool", "buybackCoin"],
  data: () => ({}),
  computed: {
    ...mapGetters(["config"]),
    buyBackCashflow() {
      return this.config.buyback_cashflow_divrate
    },
    buyBackPoolDaily() {
      return this.config.buybackpool_daily_divrate
    },
    buybackPoolTotal() {
      return cutZero(formatStrPrice(numFormat(this.buybackPool.total), 4))
    },
    buybackTotal() {
      return cutZero(formatStrPrice(numFormat(this.buybackPool.buyback_total), 4))
    }
  }

}
</script>

<style scoped lang="scss">
.block {
  position: relative;

  .background_img {
    height: 364px !important;
    border-radius: 16px;
    margin-top: 30px;
  }

  .banner-content {
    width: 96%;
    height: 83%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 11px;
    box-shadow: 0px 2px 28px 9px #CC9A34;
    background: linear-gradient(315deg, rgba(230, 176, 69, .5) 0%, rgba(255, 227, 131, .5) 100%);

    .slogan {
      line-height: 50px;
      color: #050505;
      height: 50px;
      font-size: 36px;
      margin-top: 27px;
    }

    p {
      line-height: 33px;
      font-size: 24px;
      height: 33px;
      color: #FFFFFF;
      margin-top: 19px;
    }

  }

  .warningText {
    margin-top: 25px;

    p {
      font-weight: 600;
      color: #CC9933;
      line-height: 25px;
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}

@media screen and (max-width: 960px) {
  .block {
    position: relative;

    .background_img {
      height: auto !important;
      border-radius: 16px;
      margin-top: 25px;
    }

    .banner-content {
      width: 96%;
      height: 83%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      border-radius: 11px;
      box-shadow: 0px 2px 28px 9px #CC9A34;
      background: linear-gradient(315deg, rgba(230, 176, 69, .5) 0%, rgba(255, 227, 131, .5) 100%);

      .img {
        width: 30px;
        height: 30px;
      }

      .slogan {
        height: 28px;
        line-height: 28px;
        font-size: 18px;
        margin-top: 0px;
      }

      p {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: 0px;
      }
    }

    .warningText {
      margin-top: 15px;

      p {
        line-height: 16px;
        font-size: 12px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>