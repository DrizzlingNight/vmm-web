<template>
  <div class="block">
    <h3>{{ pledgeCoin ? pledgeCoin.code : "" }}{{ $t("mining.pledges.pledgeAmount") }}</h3>
    <v-img class="background_img" width="100%" height="100%" src="@/assets/mining/mining.png">
      <div class="banner-content d-flex flex-column justify-center align-center">
        <v-img class="img" contain max-width="106" max-height="106" src="@/assets/mining/V.png"></v-img>
        <h1 class="slogan">{{ showStakePool }} {{ pledgeCoin ? pledgeCoin.code : "" }}</h1>
        <p class="text-center">{{ $t('mining.pledges.totalAmount') }} {{ showInsureAmount }}
          {{ pledgeCoin ? pledgeCoin.code : "" }}
          {{ $t('mining.pledges.of') }} {{ pledgesPercentage }}%</p>
      </div>
    </v-img>
    <div class="d-flex justify-space-between data">
      <div>
        <p>{{ $t("mining.pledges.tradeMining") }}</p>
        <p>{{ $t("mining.pledges.invitationMining") }}</p>
        <p>{{ $t("mining.pledges.poolMining") }}</p>
<!--        <p>{{ $t("mining.pledges.operation") }}</p>-->
<!--        <p>{{ $t("mining.pledges.privatePlacement") }}</p>-->
        <p>{{ $t("mining.pledges.repurchase") }}</p>
      </div>
      <div>
        <p class="text-right">{{ miningAmout }} {{ pledgeCoin ? pledgeCoin.code : "" }}</p>
        <p class="text-right">{{ referralAmount }} {{ pledgeCoin ? pledgeCoin.code : "" }}</p>
        <p class="text-right">{{ lpPoolAmount }} {{ pledgeCoin ? pledgeCoin.code : "" }}</p>
<!--        <p class="text-right">{{ activities }} {{ pledgeCoin ? pledgeCoin.code : "" }}</p>-->
<!--        <p class="text-right">{{ privateraise }} {{ pledgeCoin ? pledgeCoin.code : "" }}</p>-->
        <p class="text-right">{{ buybackAmount }} {{ pledgeCoin ? pledgeCoin.code : "" }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import {numFormat, formatStrPrice, cutZero} from "@/utils/math";

export default {
  name: "pledgeAmount",
  props: ["stakeInfo", "stakePool", "pledgeCoin"],
  data: () => ({}),
  created() {
  },
  computed: {
    pledgesPercentage() {
      return cutZero(formatStrPrice(numFormat((this.stakePool / this.stakeInfo.insure_amount * 100)), 4))
    },
    showStakePool() {
      return cutZero(formatStrPrice(numFormat(this.stakePool), 4))
    },
    showInsureAmount() {
      return cutZero(formatStrPrice(numFormat(this.stakeInfo.insure_amount), 4))
    },
    miningAmout() {
      return cutZero(formatStrPrice(numFormat(this.stakeInfo.mining_amout), 4))
    },
    referralAmount() {
      return cutZero(formatStrPrice(numFormat(this.stakeInfo.referral_amount), 4))
    },
    lpPoolAmount() {
      return cutZero(formatStrPrice(numFormat(Math.abs(this.stakeInfo.lp_pool_amount)), 4))
    },
    activities() {
      return cutZero(formatStrPrice(numFormat(this.stakeInfo.activities), 4))
    },
    privateraise() {
      return cutZero(formatStrPrice(numFormat(this.stakeInfo.privateraise), 4))
    },
    buybackAmount() {
      return cutZero(formatStrPrice(numFormat(this.stakeInfo.buyback_amount), 4))
    }
  },
  methods: {}

}
</script>

<style scoped lang="scss">
.block {
  position: relative;

  h3 {
    margin-top: 30px;
    height: 29px;
    font-size: 21px;
    color: #050505;
    line-height: 29px;
  }

  .background_img {
    //min-height: 364px;
    height: 364px !important;
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

  .data {
    margin-top: 50px;
    font-weight: 400;
    color: #050505;
    line-height: 29px;
    font-size: 21px;

    p {
      margin-bottom: 10px;
    }
  }
}

@media screen and (max-width: 960px) {
  .block {
    h3 {
      font-size: 14px;
      margin-top: 20px;
    }

    .background_img {
      height: auto !important;
      border-radius: 16px;
      margin-top: 10px;
    }

    .banner-content {
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

    .data {
      margin-top: 20px;
      line-height: 21px;
      font-size: 13px;

      p {
        margin-bottom: 5px;
      }
    }
  }
}
</style>