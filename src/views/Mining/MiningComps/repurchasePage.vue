<template>
  <div>
    <repurchase-amount :buybackPool="buybackPool" :buybackCoin="buybackCoin"></repurchase-amount>
    <current-amount :buybackPool="buybackPool" :buybackCoin="buybackCoin" :poolData="poolData" :todayData="todayData"></current-amount>
    <div v-if="user" class="d-flex divBtn" style="height: 88px;margin-top: 10px">
      <v-form ref="form" style="width: 100%" v-model="valid">
        <vuetify-number-input
            class="numberInput"
            style="height: 88px;border-radius: 4px"
            v-model="totalPledged"
            v-bind:options="totalPledgedVNIOption"
            :rules="[inputRules]"
            :validateOnBlur="true"
            :placeholder="this.$t('mining.repurchases.inputPlaceholder')"
            backgroundColor="rgba(204, 153, 51, .5)">
        </vuetify-number-input>
      </v-form>
      <v-btn class="btn" height="88px" :loading="loading" @click="isAddBuyback" elevation="0">
        {{ $t("mining.repurchases.sell") }}
      </v-btn>
    </div>
    <div v-if="user" class="float-right bottom">
      <p class="text-right">{{ $t("mining.repurchases.balance") }}<span>{{ showBalance }} VMM</span></p>
      <div><span>{{ $t("mining.repurchases.sellMore") }}</span><a
          @click="$router.push({name:'pledge'})">{{ $t("mining.repurchases.goPledge") }}</a></div>
    </div>
  </div>
</template>

<script>
import RepurchaseAmount from "./repurchaseAmount";
import CurrentAmount from "./currentAmount";
import VuetifyNumberInput from "../../../components/VuetifyNumberInput";
import i18n from '@/lang'
import {getBuybackPool, addBuyback, getBuybackInfo} from "@/api/mining"
import {mapGetters} from "vuex";
import {numFormat, formatStrPrice, cutZero} from "@/utils/math";
import * as _ from "lodash";

export default {
  name: "repurchasePage",
  components: {CurrentAmount, RepurchaseAmount, VuetifyNumberInput},
  data: () => ({
    totalPledged: "",
    buybackPool: "",
    poolData: "",
    todayData: "",
    valid: false,
    loading: false,
    totalPledgedVNIOption: {
      locale: i18n.locale,
      length: 4,
      fixed: 4,
    },
  }),
  created() {
    this.getBuybackPool()
    this.getBuybackInfo()

  },
  computed: {
    ...mapGetters(["getCoinById", "getBalanceById", "user", "coinList"]),
    buybackCoin() {
      return _.find(this.coinList, (coin) => (coin.reference))
    },
    balance() {
      let balance = this.getBalanceById(4)
      return balance ? balance.amount : 0
    },
    showBalance() {
      return cutZero(formatStrPrice(numFormat(this.balance), 4))
    },
  },
  methods: {
    getBuybackPool() {
      getBuybackPool().then((response) => {
        this.buybackPool = response.data.results[0]
      }).catch(() => {
      })
    },
    //输入框验证规则
    inputRules(v) {
      if (!v)
        return this.$t('mining.repurchases.errorText3')
      if (Number(this.totalPledged) < Number(this.buybackCoin.min_buyback))
        return this.$t("mining.repurchases.errorText2") + ' ' + Number(this.buybackCoin.min_buyback) + ' VMM'
      if (Number(this.totalPledged) > Number(this.balance))
        return this.$t("mining.repurchases.errorText")
      return true
    },
    getBuybackInfo() {
      getBuybackInfo().then((response) => {
        this.poolData = response.data.pool_data
        this.todayData = response.data.today_data
      }).catch(() => {
      })
    },
    getBalance() {
      this.$store
          .dispatch("user/balance")
          .then(() => {
          })
          .catch(() => {
          });
    },
    isAddBuyback() {
      if (this.valid && this.totalPledged !== "") {
        this.loading = true
        addBuyback({amount: this.totalPledged}).then((response) => {
          this.loading = false
          if (response.code === 0) {
            this.$toast.success(i18n.t("mining.repurchases.successText"))
            this.totalPledged = ""
            this.getBuybackInfo()
            this.getBuybackPool()
            this.getBalance()
          } else {
            this.$toast.error(i18n.t(`errorCode.${response.code}`))
          }
        }).catch(() => {
          this.loading = false
        })
      } else {
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
.divBtn {
  margin-top: 5px;

  ::v-deep .v-text-field__slot {
    padding-left: 28px;
    padding-right: 36px;

  }


  ::v-deep .v-input input {
    height: 92px;
    font-size: 24px;
    line-height: 88px;
    max-height: 92px !important;
  }

  .btn {
    width: 226px;
    background: #CC9933;
    margin-left: 17px;
    height: 92px !important;
    color: #FFFFFF;
    font-size: 24px !important;
    font-weight: 600;
    border-radius: 8px !important;
  }

  ::v-deep .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: transparent !important;
  }

  ::v-deep .v-text-field > .v-input__control > .v-input__slot:after {
    display: none;
  }

  ::v-deep .v-text-field input::placeholder {
    color: white !important;
  }
}

.bottom {
  margin-top: 27px;
  margin-bottom: 110px;

  p {
    height: 25px;
    font-size: 18px;
    color: #050505;
    line-height: 25px;
    margin-bottom: 4px;

    span {
      font-weight: 600;
    }
  }

  div {
    line-height: 25px;
    height: 25px;
    font-size: 18px;

    a {
      font-weight: 600;
      color: #CC9933;
    }
  }
}

@media screen and (max-width: 960px) {
  .divBtn {
    margin-top: 0px !important;
    height: 45px !important;

    .numberInput {
      height: 45px !important;
    }

    ::v-deep .v-text-field__slot {
      padding-left: 10px;
      padding-right: 13px;
    }

    ::v-deep .v-input input {
      height: 45px;
      font-size: 13px;
      line-height: 88px;
      max-height: 45px !important;
    }

    .btn {
      width: 86px;
      margin-left: 4px;
      height: 45px !important;
      font-size: 13px !important;
    }
  }

  .bottom {
    margin-top: 5px;
    margin-bottom: 110px;

    p {
      height: 18px;
      font-size: 12px;
      color: #050505;
      line-height: 18px;
      margin-bottom: 0px;
    }

    div {
      line-height: 18px;
      height: 18px;
      font-size: 12px;
    }
  }
}
</style>