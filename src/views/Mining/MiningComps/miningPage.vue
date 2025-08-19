<template>
  <div>
    <div class="block">
      <div class="title">
        <p>{{ $t("invitation.which") }}{{ data.round }}/{{ data.round_total }}{{ $t("invitation.wheel") }}</p>
<!--        <v-btn class="btn" elevation="0" height="41px">-->
<!--          {{ $t("mining.miningBtn") }}-->
<!--        </v-btn>-->
      </div>
      <p class="amount">{{ $t("invitation.amount") }}</p>
      <div class="showAmount">{{ currentMiningTotal }} {{ miningCoin ? miningCoin.code : "" }}</div>
      <v-progress-linear
          class="progress_linear"
          height="21px"
          background-color="white"
          :value="progressValue"
          rounded
      ></v-progress-linear>
      <div class="title2">
        <div>{{ showProgressValue }}%</div>
        <div>{{ $t("invitation.remaining") }}<span>{{ remainingTotal }} {{ miningCoin ? miningCoin.code : "" }} </span></div>
      </div>
    </div>
    <div class="award_block">
      <p class="p">{{ $t("mining.miningShare") }}</p>
      <div class="block_div">
        <div>
          {{ $t("mining.rateText1") }}
        </div>
        <p>1 {{ baseCoin ? baseCoin.code : "" }} : {{ showCoinRate1 }} {{ miningCoin ? miningCoin.code : "" }}</p>
        <!--        <div>-->
        <!--          {{ $t("mining.rateText2") }}-->
        <!--        </div>-->
        <!--        <p>1 ETH : {{ showCoinRate2 }} VMM</p>-->
      </div>
      <p>{{ $t("mining.textBottom1") }}{{ currentMiningTotal }}
        {{ miningCoin ? miningCoin.code : "" }}。{{ $t("mining.textBottom2") }}
      </p>
    </div>
  </div>
</template>

<script>
import {getCurrentMining} from "@/api/mining"
// import {mapGetters} from "vuex";
import * as _ from "lodash";
import {formatStrPrice, numFormat, cutZero} from "@/utils/math";
import {mapGetters} from "vuex";

export default {
  name: "miningPage",
  data: () => ({
    data: "",
    coinRate: ""
  }),
  created() {
    this.getMining()
  },
  computed: {
    ...mapGetters(["config", "getCoinById", "coinList"]),
    progressValue() {
      if (this.data) {
        return ((this.data.mining_total / this.data.current_mining_total) * 100)
      } else return 0
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    //可挖矿币种
    miningCoin() {
      return _.find(this.coinList, (coin) => (coin.mining))
    },
    showProgressValue() {
      return cutZero((this.progressValue).toFixed(4))
    },
    currentMiningTotal() {
      return cutZero(formatStrPrice(numFormat(this.data.current_mining_total), 4))
    },
    remainingTotal() {
      return cutZero(formatStrPrice(numFormat(this.data.remaining_total), 4))
    },
    showCoinRate1() {
      if (this.coinRate != "") {
        return cutZero(formatStrPrice(numFormat(this.coinRate), 4))
      }
      return 0
    },
    // showCoinRate2() {
    //   if (this.coinRate != "") {
    //     return cutZero(formatStrPrice(numFormat(this.coinRate * this.config.referal_minerate_by_level[1]), 4))
    //   }
    //   return 0
    // }
  },
  methods: {
    getMining() {
      getCurrentMining({}).then(response => {
        this.data = response.data
        _.forEach(response.data.rate_list, (value) => {
          if (value.coin === response.data.coin) {
            this.coinRate = value.rate
          }
        });
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  width: 100%;
  background-color: rgba(204, 153, 51, .3);
  margin-top: 30px;
  border-radius: 4px;
  padding: 24px 20px 32px 20px;

  .title {
    display: flex;
    justify-content: space-between;

    p {
      margin-top: 9px;
      margin-bottom: 8px;
      color: #050505;
      font-size: 30px;
      height: 42px;
      line-height: 42px;
    }

    .btn {
      background-color: rgba(204, 153, 51, 0.7);
      font-size: 18px !important;
      color: white;
      border-radius: 4px !important;
      line-height: 41px !important;
      padding-left: 17px;
      padding-right: 17px;
    }
  }

  .title2 {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;

    div {
      font-weight: 600;
      color: #CC9933;
      line-height: 25px;
      height: 25px;
      font-size: 18px;

      span {
        color: #050505;
      }
    }
  }

  .amount {
    color: rgba(204, 153, 51, 1);
    line-height: 25px;
    height: 25px;
    font-size: 18px;
    margin-bottom: 12px;
  }

  .showAmount {
    font-weight: 600;
    color: #050505;
    line-height: 25px;
    height: 25px;
    font-size: 18px;
  }

  .progress_linear {
    border-radius: 11px;
    background-color: white;
    margin-top: 18px;

    ::v-deep .v-progress-linear__determinate {
      border-radius: 11px;
      background: linear-gradient(270deg, #C2925F 0%, #050505 100%) !important;
    }
  }
}

.award_block {
  margin-top: 20px;
  margin-bottom: 41px;

  > p {
    line-height: 25px;
    color: #CC9933;
    font-weight: 600;
    font-size: 18px;

    .p {
      margin-bottom: 15px;
    }
  }

  .block_div {
    font-size: 18px;
    color: #666666;
    line-height: 15px;
    margin-bottom: 30px;
    font-weight: 600;

    div {
      color: #CC9933;
      line-height: 25px;
      font-size: 18px;
      margin-bottom: 5px;
      font-weight: normal;
    }

    p {
      line-height: 25px;
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
}

@media screen and (max-width: 960px) {
  .block {
    padding: 18px 11px !important;
    margin-top: 25px;

    .title {
      align-items: end;
      margin-bottom: 15px;

      p {
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        margin-bottom: 0px;

      }

      .btn {
        font-size: 13px !important;
        line-height: 24px !important;
        height: 24px !important;
        padding-left: 10px;
        padding-right: 10px;
      }
    }

    .amount {
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      margin-bottom: 5px;
    }

    .showAmount {
      font-size: 12px;
    }

    .progress_linear {
      margin-top: 5px;
      height: 10px !important;
    }

    .title2 {
      margin-top: 10px;

      div {
        font-size: 13px;
      }
    }
  }
  .award_block {
    margin-top: 10px;

    p {
      font-size: 12px;
      margin-bottom: 10px;

      .p {
        font-size: 12px;
      }
    }

    div {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
}


</style>