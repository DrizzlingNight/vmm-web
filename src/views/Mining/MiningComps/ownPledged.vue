<template>
  <div class="block">
    <div class="divText">
      <span>{{ $t("mining.pledges.ownPledged") }}</span>
    </div>
    <div class="ownPledges">
      <div class="pledges_block">
        <div class="d-flex justify-space-between align-end">
          <div>
            <h2>
              {{ showStakeAmount }}
              <span>{{ pledgeCoin ? pledgeCoin.code : "" }}</span>
            </h2>
            <div class="takeUpTotal">
              {{ $t("mining.pledges.takeUpTotal") }} {{ pledgesPercentage }}%
            </div>
          </div>
          <div
            class="total"
            v-if="isShowCancel"
            style="cursor: pointer"
            @click="total"
          >
            {{ $t("mining.pledges.totalRedemption") }}
          </div>
        </div>
        <div
          class="d-flex inputHeight"
          v-if="isShowCancel"
          style="height: 88px; margin-top: 10px"
        >
          <v-form ref="form" style="width: 100%" v-model="valid">
            <vuetify-number-input
              class="input"
              v-model="totalPledged"
              v-bind:options="totalPledgedVNIOption"
              :imgSrc="true"
              :rules="[inputRules]"
              :validateOnBlur="true"
              backgroundColor="rgba(204, 153, 51, .5)"
            >
            </vuetify-number-input>
          </v-form>
          <v-btn
            height="88px"
            class="btn"
            elevation="0"
            @click="goChoiceRepurchase"
            >{{ $t("mining.pledges.redemption") }}
          </v-btn>
        </div>
      </div>
      <div class="confirm" v-if="!isShowCancel">
        <div class="comma text-center">
          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
        <div class="confirm_bottom">
          <div>
            {{ $t("mining.pledges.currentRepurchases") }}
            {{ showfreezeAmount }} {{ pledgeCoin ? pledgeCoin.code : ""
            }}{{ $t("mining.pledges.middle") }}
          </div>
          <div class="d-flex align-center timeDiv">
            <v-img
              class="img"
              contain
              max-width="20"
              width="20px"
              height="20px"
              style="margin-right: 9px"
              src="@/assets/mining/questionMark.png"
            ></v-img>
            <div>
              {{ $t("mining.pledges.countdown") }}{{ d }}:{{ h }}:{{ m }}:{{
                s
              }}
            </div>
          </div>
        </div>
        <div
          style="margin-top: 15px; padding: 0px 85px 0px 86px"
          class="mx-auto btnDiv"
        >
          <v-btn
            @click="cancelRedeem"
            block
            height="88"
            elevation="0"
            style="margin-left: 0px"
          >
            {{ $t("mining.pledges.cancelBtnRepurchase") }}
          </v-btn>
        </div>
      </div>
    </div>
    <div class="warningText">{{ $t("mining.pledges.warningText") }}</div>
    <v-dialog
      v-model="confirmpledgedDialog"
      @click:outside="confirmpledged"
      style="border-radius: 17px"
      width="607px"
    >
      <pledged-dialog
        v-if="pledgedDialog"
        :pledgeCoin="pledgeCoin"
        :totalPledged="totalPledged"
        @close="close"
        @confirmStake="confirmStake"
      ></pledged-dialog>
    </v-dialog>
  </div>
</template>

<script>
import VuetifyNumberInput from "../../../components/VuetifyNumberInput";
import i18n from "@/lang";
import { cancelRedeem } from "@/api/mining";
import PledgedDialog from "./pledgedDialog";
import { numFormat, formatStrPrice, cutZero } from "@/utils/math";

export default {
  name: "ownPledged",
  components: { PledgedDialog, VuetifyNumberInput },
  props: [
    "stake",
    "maxStake",
    "smallRedeem",
    "bigRedeem",
    "balance",
    "stakePool",
    "pledgeCoin",
  ],
  data: () => ({
    totalPledged: "",
    valid: "",
    d: "",
    h: "",
    m: "",
    s: "",
    pledgedDialog: false,
    totalPledgedVNIOption: {
      locale: i18n.locale,
      suffix: "VMM",
      length: 4,
      fixed: 4,
    },
  }),
  computed: {
    pledgesPercentage() {
      return this.stake
        ? cutZero(((this.stake.amount / this.stakePool) * 100).toFixed(4))
        : 0;
    },
    showStakeAmount() {
      return this.stake
        ? cutZero(formatStrPrice(numFormat(this.stake.amount), 4))
        : 0;
    },
    showfreezeAmount() {
      return this.stake
        ? cutZero(formatStrPrice(numFormat(this.stake.freeze_amount), 4))
        : 0;
    },
    confirmpledgedDialog() {
      return this.pledgedDialog;
    },
    isShowCancel() {
      if (this.stake && Number(this.stake.freeze_amount)) {
        return false;
      } else return true;
    },
  },
  created() {
    this.countTime();
  },
  watch: {
    pledgeCoin() {
      this.totalPledgedVNIOption.suffix = this.pledgeCoin.code;
    },
  },
  methods: {
    total() {
      this.totalPledged = this.stake.amount;
      this.$refs.form.validate();
    },
    //输入框验证规则
    inputRules() {
      if (!this.totalPledged) return this.$t("mining.pledges.redemptionError1");
      if (Number(this.totalPledged) < Number(this.smallRedeem))
        return (
          this.$t("mining.pledges.redemptionError3") +
          " " +
          Number(this.smallRedeem) +
          " " +
          this.pledgeCoin.code
        );
      // if (Number(this.totalPledged) > Number(this.bigRedeem)) {
      //   return (
      //     this.$t("mining.pledges.redemptionError4") +
      //     " " +
      //     Number(this.bigRedeem) +
      //     " " +
      //     this.pledgeCoin.code
      //   );
      // }
      if (Number(this.totalPledged) > Number(this.stake.amount))
        return this.$t("mining.pledges.redemptionError2");
      return true;
    },
    confirmpledged() {
      this.pledgedDialog = false;
    },
    //关闭弹窗
    close() {
      this.pledgedDialog = false;
    },
    goChoiceRepurchase() {
      if (this.valid) {
        this.pledgedDialog = true;
      } else
      this.$refs.form.validate();
       return;
    },
    confirmStake() {
      this.$refs.form.reset();
      this.$emit("chooseStake");
    },
    cancelRedeem() {
      cancelRedeem()
        .then(() => {
          this.$emit("chooseStake");
          this.$toast.success(i18n.t("mining.pledges.ownPledgedCancelSuccess"));
          this.totalPledged = "";
        })
        .catch(() => {
          // this.$refs.form.validate();
        });
    },
    countTime: function () {
      //获取当前时间
      let timeNow = new Date();
      let yearNow = timeNow.getUTCFullYear();
      let monthNow = timeNow.getUTCMonth() + 1;
      let dayNow = timeNow.getUTCDate();
      let hoursNow = timeNow.getUTCHours();
      let minutesNow = timeNow.getUTCMinutes();
      let secondsNow = timeNow.getUTCSeconds();
      let nowTime = [
        yearNow,
        monthNow,
        dayNow,
        hoursNow,
        minutesNow,
        secondsNow,
      ];
      let now = Date.UTC(...nowTime);

      //设置截止时间
      let time =
        this.stake && this.stake.redeem_time ? this.stake.redeem_time : "0";
      let year = time.substring(0, 4);
      let month = time.substring(5, 7);
      let day = time.substring(8, 10);
      let hours = time.substring(11, 13);
      let minutes = time.substring(14, 16);
      let seconds = time.substring(17, 19);
      let endTime = [year, month, day, hours, minutes, seconds];
      let end = Date.UTC(...endTime);

      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (
        this.s === "00" &&
        this.m === "00" &&
        this.h === "00" &&
        this.d === "00"
      ) {
        clearInterval(timer);
      }
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
        if (this.s < 10) {
          this.s = "0" + this.s;
        }
        if (this.m < 10) {
          this.m = "0" + this.m;
        }
        if (this.h < 10) {
          this.h = "0" + this.h;
        }
        if (this.d < 10) {
          this.d = "0" + this.d;
        }
      }
      //递归每秒调用countTime方法，显示动态时间效果
      let timer = setTimeout(this.countTime, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.block {
  margin-top: 40px;

  .divText {
    color: #050505;
    font-weight: 600;
    line-height: 33px;
    height: 33px;
    font-size: 24px;
  }

  ::v-deep .v-text-field__slot {
    padding-left: 35px;
    padding-right: 36px;

    .v-text-field__suffix {
      color: #050505;
      line-height: 33px;
      height: 33px;
      font-size: 24px;
    }
  }

  ::v-deep .v-input input {
    height: 88px;
    font-size: 48px;
    line-height: 88px;
    max-height: 88px !important;
  }

  .v-btn {
    width: 185px;
    background: #cc9933;
    border-radius: 4px;
    margin-left: 17px;
    color: #ffffff;
    font-weight: 600;
  }

  .ownPledges {
    margin-top: 25px;
    min-height: 266px;
    background: rgba(204, 153, 51, 0.3);
    border-radius: 4px;
    padding-bottom: 0px;

    .pledges_block {
      padding: 26px 85px 25px 86px;

      ::v-deep
        .theme--light.v-text-field
        > .v-input__control
        > .v-input__slot:before {
        border-color: transparent !important;
      }

      ::v-deep .v-text-field > .v-input__control > .v-input__slot:after {
        display: none;
      }

      ::v-deep .v-input--hide-details > .v-input__control > .v-input__slot {
        border-radius: 4px !important;
      }

      .takeUpTotal {
        margin-top: 4px;
        height: 29px;
        font-size: 21px;
        font-weight: 600;
        color: #050505;
        line-height: 29px;
      }

      .total {
        margin-top: 67px;
        line-height: 33px;
        color: #cc9933;
        height: 33px;
        font-size: 24px;
      }

      .inputHeight {
        margin-bottom: 55px;
      }
    }

    h2 {
      height: 67px;
      color: #050505;
      line-height: 67px;
      font-size: 48px;

      span {
        font-size: 30px;
      }
    }

    .confirm {
      padding-bottom: 27px;

      .comma {
        letter-spacing: 3px;
        white-space: nowrap;
        overflow: hidden;
      }

      .confirm_bottom {
        font-size: 21px;
        font-weight: 600;
        color: #050505;
        padding: 10px 85px 0px 86px;

        > div {
          line-height: 29px;
          height: 29px;
        }

        .timeDiv {
          padding-right: 11px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 29px;
          color: #cc9933;
          margin-top: 10px;

          div {
            height: 25px;
            line-height: 25px;
          }
        }
      }
    }
  }

  ::v-deep .v-messages__message {
    margin-top: 8px;
    font-weight: 600;
    color: #b71c1c;
    line-height: 25px;
    height: 25px;
    font-size: 18px;
  }

  .warningText {
    font-weight: 600;
    color: #cc9933;
    line-height: 25px;
    height: 25px;
    font-size: 18px;
    margin-top: 25px;
  }
}

@media screen and (min-width: 960px) {
  .v-btn {
    font-size: 24px !important;
  }
}

@media screen and (max-width: 960px) {
  .block {
    margin-top: 20px;
  }
  .divText {
    font-size: 13px !important;

    span {
      margin-right: 8px !important;
    }
  }
  .ownPledges {
    min-height: auto !important;
    margin-top: 5px !important;
    padding-bottom: 0px !important;

    .pledges_block {
      padding: 6px 17px 0px 17px !important;

      h2 {
        height: 25px !important;
        font-size: 18px !important;
        line-height: 25px !important;

        span {
          font-size: 12px !important;
        }
      }

      .total {
        margin-top: 6px !important;
        line-height: 14px !important;
        height: 14px !important;
        font-size: 12px !important;
      }
    }

    .confirm {
      padding-bottom: 15px !important;

      .comma {
        letter-spacing: 3px;
        white-space: nowrap;
        overflow: hidden;
      }

      .confirm_bottom {
        font-size: 16px;
        padding: 6px 17px 10px 17px !important;

        > div {
          font-size: 18px;
        }

        .timeDiv {
          margin-top: 0px !important;

          div {
            height: 25px;
            line-height: 25px;
          }
        }
      }

      .btnDiv {
        .v-btn {
          height: 40px !important;
        }
      }
    }

    .takeUpTotal {
      font-size: 12px !important;
      height: 15px !important;
      line-height: 15px !important;
    }

    .inputHeight {
      height: 32px !important;
      padding-bottom: 65px;
      margin-bottom: 0px !important;

      .btn {
        height: 32px !important;
      }
    }

    ::v-deep .v-text-field__suffix {
      font-size: 12px !important;
    }

    ::v-deep .v-input input {
      font-size: 18px !important;
      height: 32px !important;
      max-height: 32px !important;
    }

    .v-btn {
      width: 59px !important;
      margin-left: 4px !important;
      font-size: 12px !important;
    }

    ::v-deep .v-text-field__slot {
      padding-left: 6px !important;
      padding-right: 9px !important;
    }

    ::v-deep .v-messages__message {
      margin-top: 0px !important;
      height: 14px !important;
      line-height: 14px !important;
      font-size: 12px !important;
    }
  }
  .warningText {
    margin-top: 10px !important;
    font-size: 14px !important;
  }
}
</style>