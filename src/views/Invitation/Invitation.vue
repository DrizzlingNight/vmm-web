<template>
  <div class="invitation-wrapper">
    <div class="invitation-content">
      <div class="title">{{ $t("invitation.recommend") }}</div>
      <div class="block">
        <div class="title">
          <p>{{ $t("invitation.which") }}{{ data.round }}/{{ data.round_total }}{{ $t("invitation.wheel") }}</p>
<!--          <v-btn class="btn" elevation="0" height="41px">-->
<!--            {{ $t("invitation.detail") }}-->
<!--          </v-btn>-->
        </div>
        <p class="amount">{{ $t("invitation.amount") }}</p>
        <div class="showAmount">{{ currentMiningTotal }} {{ invitationCoin ? invitationCoin.code : "" }}</div>
        <v-progress-linear
            class="progress_linear"
            height="21px"
            background-color="white"
            :value="progressValue"
            rounded
        ></v-progress-linear>
        <div class="title2">
          <div>{{ showProgressValue }}%</div>
          <div>{{ $t("invitation.remaining") }}<span>{{ remainingTotal }} {{
              invitationCoin ? invitationCoin.code : ""
            }} </span></div>
        </div>
      </div>
      <div class="link_title">{{ $t("invitation.linkTitle") }}</div>
      <div class="link_block">
        <div class="title text-truncate">{{ invitationLink }}</div>
        <v-btn class="btn" elevation="0" height="41px" v-clipboard:copy="invitationLink"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">{{ $t("invitation.cloneLink") }}
        </v-btn>
      </div>
      <invitation-link></invitation-link>
      <div class="award_block">
        <h2>{{ $t("invitation.recommendAward") }}</h2>
        <p>{{ $t("invitation.shareText") }}</p>
        <div class="block_div">
          <div>
            {{ $t("invitation.rateText1") }}
          </div>
          <p>1 {{ baseCoin ? baseCoin.code : "" }} : {{ showCoinRate1 }} {{
              invitationCoin ? invitationCoin.code : ""
            }}</p>
          <div>
            {{ $t("invitation.rateText2") }}
          </div>
          <p>1 {{ baseCoin ? baseCoin.code : "" }} : {{ showCoinRate2 }}
            {{ invitationCoin ? invitationCoin.code : "" }}</p>
        </div>
        <p>{{ $t("invitation.textBottom1") }}{{ currentMiningTotal }} {{
            invitationCoin ? invitationCoin.code : ""
          }}。{{ $t("invitation.textBottom2") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import InvitationLink from "./invitationComps/invitationLink";
import {getInvitaionCurrentMining} from "@/api/mining"
import * as _ from "lodash";
import {mapGetters} from "vuex";
import {formatStrPrice, numFormat, cutZero} from "@/utils/math";

export default {
  name: "Invitation",
  components: {InvitationLink},
  data: () => ({
    data: "",
    coinRate: "",

  }),
  created() {
    this.getInvitaionCurrentMining()
  },
  computed: {
    ...mapGetters(["user", "config", "getCoinById", "coinList"]),
    progressValue() {
      if (this.data) {
        return ((this.data.referral_total / this.data.current_referral_total) * 100)
      } else return 0
    },
    //默认币种
    baseCoin() {
      return this.getCoinById(this.config.base_coin)
    },
    //可推荐币种
    invitationCoin() {
      return _.find(this.coinList, (coin) => (coin.referral))
    },
    showProgressValue() {
      return cutZero((this.progressValue).toFixed(4))
    },
    currentMiningTotal() {
      return cutZero(formatStrPrice(numFormat(this.data.current_referral_total), 4))
    },
    remainingTotal() {
      return cutZero(formatStrPrice(numFormat(this.data.remaining_total), 4))
    },
    invitationLink() {
      if (this.user) {
        return `${window.location.origin}/#/home?referral=${this.user.profile.invitation_code}`
      }
      return ""
    },
    showCoinRate1() {
      if (this.coinRate != "") {
        return cutZero(formatStrPrice(numFormat(this.coinRate * this.config.referal_minerate_by_level[0]), 4))
      }
      return 0
    },
    showCoinRate2() {
      if (this.coinRate != "") {
        return cutZero(formatStrPrice(numFormat(this.coinRate * this.config.referal_minerate_by_level[1]), 4))
      }
      return 0
    }
  },
  methods: {
    onCopy() {
      this.$toast.success(this.$t('invitation.copySuccess'))
    },
    onError() {
    },
    getInvitaionCurrentMining() {
      getInvitaionCurrentMining({})
          .then((response) => {
            this.data = response.data
            _.forEach(response.data.rate_list, (value) => {
              if (value.coin === response.data.coin) {
                this.coinRate = value.rate
              }
            });
          })
          .catch(() => {
          });
    }
  }
}
</script>

<style scoped lang="scss">
.invitation-wrapper {
  width: 100%;
  padding: 0px 330px;

  .invitation-content {
    max-width: 1260px;
    padding-top: 55px;
    margin: auto;

    .title {
      font-size: 24px !important;
      line-height: 33px;
      height: 33px;
      font-weight: 600;
    }

    .block {
      width: 100%;
      background-color: rgba(204, 153, 51, .3);
      margin-top: 25px;
      border-radius: 4px;
      padding: 24px 20px 32px 20px;

      .title {
        display: flex;
        justify-content: space-between;

        p {
          margin-top: 9px;
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
        margin-top: 18px;
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

    .link_title {
      font-size: 21px;
      height: 29px;
      font-weight: 400;
      color: #050505;
      line-height: 29px;
      margin-top: 40px;
    }

    .link_block {
      width: 100%;
      background-color: rgba(204, 153, 51, .3);
      margin-top: 20px;
      border-radius: 4px;
      padding: 44px 44px 44px 36px;
      display: flex;
      justify-content: space-between;
      font-weight: 600;

      .title {
        color: #050505;
        line-height: 33px;
        height: 33px;
        font-size: 24px;
        margin: auto 0;
      }

      .btn {
        background: #CC9933;
        height: 56px !important;
        line-height: 56px !important;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        padding-left: 35px;
        padding-right: 35px;
        font-size: 18px !important;
      }
    }

    .award_block {
      margin-top: 40px;
      font-weight: 600;
      margin-bottom: 95px;

      h2 {
        color: #050505;
        line-height: 33px;
        height: 33px;
        font-size: 24px;
        margin-bottom: 20px;
      }

      > p {
        color: #CC9933;
        line-height: 25px;
        font-size: 18px;
        margin-bottom: 15px;
      }

      .block_div {
        font-size: 18px;
        color: #666666;
        line-height: 15px;
        margin-bottom: 30px;

        div {
          font-weight: normal;
          color: #CC9933;
          line-height: 25px;
          font-size: 18px;
          margin-bottom: 5px;
        }

        p {
          line-height: 25px;
          font-size: 18px;
          margin-bottom: 15px;
        }
      }
    }
  }
}

@media screen and (max-width: 1564px) {
  .invitation-wrapper {
    padding: 0 130px;
  }
}

@media screen and (max-width: 960px) {
  .invitation-wrapper {
    padding: 0 20px;
  }
}

//@media screen and (max-width: 600px) {
//  .invitation-wrapper {
//    padding: 0 20px;
//  }
//}

@media screen and (max-width: 960px) {
  .invitation-wrapper {
    .invitation-content {
      padding-top: 20px;

      .title {
        font-size: 16px !important;
      }

      .block {
        padding: 18px 11px !important;
        margin-top: 10px;

        .title {
          align-items: end;
          margin-bottom: 10px;

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
          margin-top: 0px;
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

      .link_title {
        font-size: 16px;
        margin-top: 20px;
      }

      .link_block {
        margin-top: 10px;
        padding: 18px 11px;

        .title {
          font-size: 16px;
        }

        .btn {
          height: 30px !important;
          line-height: 30px !important;
          padding-left: 17px;
          padding-right: 17px;
          font-size: 13px !important;
        }
      }

      .award_block {
        margin-top: 10px;

        h2 {
          font-size: 16px;
          margin-top: 20px;
          margin-bottom: 6px;
        }

        > p {
          font-size: 12px;
          margin-bottom: 10px;

          .p {
            font-size: 12px;
          }
        }

        .block_div {
          font-size: 12px;
          margin-bottom: 10px;

          div {
            font-size: 12px;
          }

          p {
            font-size: 12px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

}
</style>