<template>
  <div class="block">
    <div class="divText">
      <span>{{ $t("mining.pledges.ownPledges") }}</span>
      <v-img
        class="img"
        max-height="24px"
        style="cursor: pointer"
        @click="pledgeDialog = true"
        max-width="24px"
        src="@/assets/mining/questionMark.png"
      ></v-img>
    </div>
    <div class="ownPledges">
      <div class="d-flex justify-space-between">
        <h2>
          {{ showBalance }} <span>{{ pledgeCoin ? pledgeCoin.code : "" }}</span>
        </h2>
        <div class="total" style="cursor: pointer" @click="total">
          {{ $t("mining.pledges.totalPledges") }}
        </div>
      </div>
      <div class="d-flex inputHeight" style="margin-top: 10px">
        <v-form ref="form" style="width: 100%" v-model="valid">
          <vuetify-number-input
            class="input"
            v-model="totalPledges"
            v-bind:options="totalPledgesVNIOption"
            :rules="[inputRules]"
            :imgSrc="true"
            :validateOnBlur="true"
            backgroundColor="rgba(204, 153, 51, .5)"
          >
          </vuetify-number-input>
        </v-form>
        <v-btn height="88px" class="btn" elevation="0" @click="addStake">
          {{ $t("mining.pledge") }}
        </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="pledgesDialogs"
      @click:outside="clickDialogOutside"
      style="border-radius: 17px"
      width="607px"
    >
      <pledge-dialog
        :pledgeCoin="pledgeCoin"
        v-if="pledgeDialog"
      ></pledge-dialog>
    </v-dialog>
  </div>
</template>

<script>
import VuetifyNumberInput from "../../../components/VuetifyNumberInput";
import i18n from "@/lang";
import PledgeDialog from "./pledgeDialog";
import { addStake } from "@/api/mining";
import { numFormat, formatStrPrice, cutZero } from "@/utils/math";

export default {
  name: "ownPledges",
  components: { PledgeDialog, VuetifyNumberInput },
  props: [
    "maxStake",
    "stake",
    "smallStake",
    "bigStake",
    "balance",
    "pledgeCoin",
  ],
  data: () => ({
    totalPledges: "",
    valid: "",
    pledgeDialog: false,
    totalPledgesVNIOption: {
      locale: i18n.locale,
      suffix: "VMM",
      length: 4,
      fixed: 4,
    },
  }),
  watch: {
    pledgeCoin() {
      this.totalPledgesVNIOption.suffix = this.pledgeCoin.code;
    },
  },
  computed: {
    pledgesDialogs() {
      return this.pledgeDialog;
    },
    showBalance() {
      return cutZero(formatStrPrice(numFormat(this.balance), 4));
    },
  },
  methods: {
    total() {
      this.totalPledges = this.balance;
      this.$refs.form.validate()
    },
    clickDialogOutside() {
      this.pledgeDialog = false;
    },
    //输入框验证规则
    inputRules() {
      if (!this.totalPledges) return this.$t("mining.pledges.pledgesError2");
      if (Number(this.totalPledges) < Number(this.smallStake)) {
        return (
          this.$t("mining.pledges.pledgesError1") +
          " " +
          Number(this.smallStake) +
          " " +
          this.pledgeCoin.code
        );
      }
      if (Number(this.totalPledges) > Number(this.maxStake)) {
        return (
          this.$t("mining.pledges.pledgesError4") +
          " " +
          Number(this.maxStake) +
          " " +
          this.pledgeCoin.code
        );
      }
      if (
        Number(this.totalPledges) >
        Number(this.balance - (this.stake ? this.stake.amount : 0))
      ) {
        return this.$t("mining.pledges.pledgesError3");
      }
      
      return true;
    },
    addStake() {
      if (this.valid) {
        addStake({ amount: this.totalPledges })
          .then((response) => {
            if (response.code === 0) {
              this.$toast.success(i18n.t(`mining.pledges.ownPledgesSuccess`));
              this.$refs.form.reset();
              this.$emit("getBalance");
              this.$emit("chooseStake");
            } else {
              this.$toast.error(i18n.t(`errorCode.${response.code}`));
            }
          })
          .catch(() => {});
      } else {
        this.$refs.form.validate()
        return;
      }
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
    height: 33px;
    font-size: 24px;
    display: flex;
    align-items: center;

    //&::after {
    //  content: '';
    //  width: 20px;
    //  height: 20px;
    //  content: '';
    //  background-size: contain;
    //  background-position: center;
    //  background-repeat: no-repeat;
    //  background-image: url("../../../assets/mining/questionMark.png");
    //}

    span {
      margin-right: 15px;
    }
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

  ::v-deep .v-input--hide-details > .v-input__control > .v-input__slot {
    border-radius: 4px !important;
  }

  ::v-deep .v-text-field > .v-input__control > .v-input__slot:after {
    display: none;
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
    padding: 26px 85px 34px 86px;

    ::v-deep
      .theme--light.v-text-field
      > .v-input__control
      > .v-input__slot:before {
      border-color: transparent !important;
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

    .total {
      margin-top: 22px;
      line-height: 33px;
      color: #cc9933;
      height: 33px;
      font-size: 24px;
    }

    .inputHeight {
      height: 88px;
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

    .img {
      max-width: 18px !important;
      max-height: 20px !important;
    }
  }
  .ownPledges {
    padding: 6px 17px 30px 17px !important;
    min-height: auto !important;
    margin-top: 5px !important;

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

    .inputHeight {
      height: 32px !important;

      .input {
      }

      ::v-deep .v-input__control {
      }

      .btn {
        height: 32px !important;
      }
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
</style>