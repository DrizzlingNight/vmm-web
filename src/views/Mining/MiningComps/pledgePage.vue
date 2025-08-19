<template>
  <div>
    <pledge-amount :stakeInfo="stakeInfo" :stakePool="stakePool" :pledgeCoin="pledgeCoin"></pledge-amount>
    <own-pledges v-if="user" :stake="stake" :maxStake="maxStake" :balance="balance" :smallStake="smallStake"
                 :bigStake="bigStake" :pledgeCoin="pledgeCoin" @getBalance="getBalance" @chooseStake="chooseStake"></own-pledges>
    <own-pledged v-if="user" :stake="stake" :pledgeCoin="pledgeCoin" :maxStake="maxStake" :balance="balance" :smallRedeem="smallStake"
                 :total="stakeInfo.total"
                 :bigStake="bigStake" @chooseStake="chooseStake" :stakePool="stakePool"></own-pledged>
    <div v-if="user" class="income">
      <h2>{{ $t("mining.pledges.income") }}</h2>
      <div class="receive_income d-flex justify-space-between">
        <div class="d-flex align-center divImg">
          <v-img class="d-inline-block img" width="52px" height="52px" style="margin-right: 26px"
                 src="@/assets/mining/V.png"></v-img>
          <span class="span">{{ showStakeBonus }} {{ pledgeCoin ? pledgeCoin.code : "" }}</span>
        </div>
        <v-btn class="btn" :disabled="isBtn" :loading="loading" @click="receiveStake">
          {{ $t("mining.pledges.receive") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import PledgeAmount from "./pledgeAmount";
import OwnPledges from "./ownPledges";
import OwnPledged from "./ownPledged";
import {getStakeInfo, getAvailableStakeBonus, receiveStakeDiv, getStakePool} from "@/api/mining"
import {mapGetters} from "vuex";
import i18n from '@/lang'
import {numFormat, formatStrPrice, cutZero} from "@/utils/math";
import * as _ from "lodash";

export default {
  name: "pledgePage",
  components: {OwnPledged, OwnPledges, PledgeAmount},
  data: () => ({
    stakeInfo: "",
    maxStake: "",
    stake: "",
    stakeBonus: "",
    loading: false,
    stakePool: ""
  }),
  created() {
    this.getStakePool()
    this.getStakeInfo()
    if (this.user) {
      this.getAvailableStakeBonus()
      this.getBalance()
    }

  },
  watch: {
    user() {
      this.getBalance()
    }
  },
  computed: {
    ...mapGetters(["getCoinById", "getBalanceById", "user", "coinList"]),
    //可质押币种
    pledgeCoin() {
      return _.find(this.coinList, (coin) => (coin.stake))
    },
    smallStake() {
      return this.pledgeCoin ? this.pledgeCoin.min_stake : 0
    },
    bigStake() {
      return this.pledgeCoin ? this.pledgeCoin.max_stake : 0
    },
    balance() {
      let balance = this.getBalanceById(4)
      return balance ? balance.amount : 0
    },
    showStakeBonus() {
      return cutZero(formatStrPrice(numFormat(this.stakeBonus), 4))
    },
    isBtn() {
      if (this.stakeBonus) {
        return false
      } else return true
    }
  },
  methods: {
    getBalance() {
      this.$store
          .dispatch("user/balance")
          .then(() => {
          })
          .catch(() => {
          });
    },
    chooseStake() {
      this.getStakePool()
      this.getStakeInfo()
    },
    getStakePool() {
      getStakePool().then(response => {
        this.stakePool = response.data.results[0].total
      }).catch(() => {
      })
    },
    getStakeInfo() {
      getStakeInfo().then(response => {
        this.stakeInfo = response.data.issuance_data
        this.maxStake = response.data.max_stake
        this.stake = response.data.stake
      }).catch(() => {
      })
    },
    getAvailableStakeBonus() {
      getAvailableStakeBonus().then((response) => {
        this.stakeBonus = response.data.length ? response.data[0].div_total : 0
      }).catch(() => {
      })
    },
    receiveStake() {
      this.loading = true
      receiveStakeDiv().then((response) => {
        if (response.code === 0) {
          this.stakeBonus = 0
          this.$toast.success(i18n.t("mining.pledges.receiveAwardSuccess"))
        } else {
          this.$toast.error(i18n.t(`errorCode.${response.code}`))
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.income {
  margin-top: 50px;
  margin-bottom: 110px;

  h2 {
    color: #050505;
    line-height: 33px;
    height: 33px;
    font-size: 24px;
  }

  .receive_income {
    margin-top: 25px;
    height: 130px;
    background: linear-gradient(270deg, #CC9933 0%, #E8C962 100%);
    border-radius: 4px;
    padding: 35px 65px 35px 31px;

    .btn {
      width: 140px;
      height: 60px;
      background: #050505;
      border-radius: 4px;
      color: #FFFFFF;
      font-size: 18px !important;
    }

    .span {
      font-weight: 600;
      color: #050505;
      line-height: 33px;
      height: 33px;
      font-size: 24px;
    }
  }
}

@media screen and (max-width: 960px) {
  .income {
    margin-top: 10px;
    margin-bottom: 110px;

    h2 {
      font-size: 13px;
    }

    .receive_income {
      margin-top: 6px;
      height: 50px;
      padding: 8px 17px 8px 17px;

      .divImg {
        height: 34px;
        line-height: 34px;

        .img {
          max-width: 30px;
          max-height: 30px;
        }
      }

      .btn {
        width: 60px;
        height: 30px;
        margin-top: 2px;
        font-size: 13px !important;
      }

      .span {
        font-size: 15px;
      }
    }
  }
}
</style>