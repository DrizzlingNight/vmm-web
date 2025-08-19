<template>
  <v-card class="card">
    <div class="text-center titleDiv">{{ $t("mining.pledges.confirmPledge") }}{{ showTotalPledged }}
      {{ pledgeCoin ? pledgeCoin.code : "" }}
    </div>
    <div class="btn d-flex justify-space-between">
      <v-btn elevation="0" outlined color="#CC9933" @click="$emit('close')">{{ $t("mining.pledges.cancelBtn") }}</v-btn>
      <v-btn elevation="0" color="#CC9933" class="white--text" @click="removeStake">{{
          $t("mining.pledges.confirm")
        }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {removeStake} from "@/api/mining"
import i18n from '@/lang'
import {numFormat, formatStrPrice, cutZero} from "@/utils/math";

export default {
  name: "pledgedDialog",
  data: () => ({
    confirmRepurchase: ""
  }),
  props: ["totalPledged", "pledgeCoin"],
  computed: {
    showTotalPledged() {
      return cutZero(formatStrPrice(numFormat(this.totalPledged), 4))
    }
  },
  methods: {
    removeStake() {
      removeStake({amount: this.totalPledged}).then(response => {
        this.$emit('close')
        if (response.code === 0) {
          this.$emit("confirmStake")
          this.$toast.success(i18n.t(`mining.pledges.ownPledgedSuccess`))
        } else {
          this.$toast.error(i18n.t(`errorCode.${response.code}`))
        }
      }).catch(() => {
      })
    },
  }
}
</script>

<style scoped lang="scss">
.card {
  padding-top: 54px;
  padding-bottom: 38px;
  border-radius: 17px;

  .titleDiv {
    font-weight: 600;
    color: #050505;
    line-height: 33px;
    height: 33px;
    font-size: 24px;

  }

  .btn {
    margin-top: 66px;
    padding-left: 63px;
    padding-right: 64px;

    .v-btn {
      height: 50px;
      font-size: 20px !important;
      width: 220px !important;
      border-radius: 4px;
    }
  }
}

@media screen and (max-width: 960px) {
  .card {
    .btn {
      margin-top: 40px;

      .v-btn {
        width: 170px !important;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .card {
    .btn {
      padding-left: 20px;
      padding-right: 20px;

      .v-btn {
        width: 110px !important;
      }
    }
  }
}
</style>