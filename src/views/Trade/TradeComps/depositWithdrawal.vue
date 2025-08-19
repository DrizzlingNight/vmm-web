<template>
  <div>
    <v-card-title class="title d-flex justify-space-between navI18n--text"
                  style="font-size: 18px !important;height: 80px;border-radius: 4px 4px 0px 0px;font-weight: bold">
      <!--      <v-col cols="2" v-for="tab in tabItem" :key="tab">{{ $t(`trade.${tab}`) }}</v-col>-->
      <v-col cols="2" class="ml-n1">{{ $t("trade.coinType") }}</v-col>
      <v-col class="ml-n5" cols="1">{{ $t("trade.type") }}</v-col>
      <v-col cols="2" class="ml-12">{{ $t("trade.amount") }}</v-col>
      <v-col cols="3" class="ml-n5">{{ $t("trade.address") }}</v-col>
      <v-col cols="1" class="ml-2">{{ $t("trade.state") }}</v-col>
      <v-col class="ml-15">{{ $t("trade.date") }}</v-col>
    </v-card-title>
    <v-col cols="12" class="mx-auto pa-0">
      <v-card flat v-if="data.length !== 0">
        <div style="height:680px">
          <v-row v-for="(item,index) in data" :key="item.id"
                 class="align-center d-flex justify-space-between pl-6 pr-4 tabRow" no-gutters style="height: 68px">
            <v-col cols="1">
              <v-avatar size="29">
                <v-img :src="require('@/assets/coinType/'+coinType(item.coin)+'.png')"></v-img>
              </v-avatar>
              <span style="font-size: 14px" class="ml-2">{{ coinType(item.coin) }}</span>
            </v-col>
            <v-col cols="1">
              <div class="d-flex align-center ml-2" v-if="transationSpan(index)">
                <v-avatar size="18">
                  <v-img
                      src="@/assets/fake/recharge.png"></v-img>
                </v-avatar>
                <div class="desposit ml-2" style="font-size: 16px">{{ $t("transaction.recharge") }}</div>
              </div>
              <div class="d-flex align-center ml-2" v-else>
                <v-avatar size="18">
                  <v-img
                      src="@/assets/fake/withdraw.png"></v-img>
                </v-avatar>
                <div class="withdrawal ml-2" style="font-size: 16px">{{ $t("transaction.withdraw") }}</div>
              </div>
            </v-col>
            <v-col cols="1">
              <div v-if="transationSpan(index)" class="desposit" style="font-size: 16px">{{
                  price(item.abs_amount)
                }}
              </div>
              <div v-else class="withdrawal" style="font-size: 16px">-{{ price(item.abs_amount) }}</div>
            </v-col>
            <v-col cols="3" style="max-width: 200px">
              <div style="font-size: 14px">{{ item.address }}</div>
            </v-col>
            <v-col cols="1" class="">
              <div v-if="item.status === 1 || item.status === 0" style="font-size: 14px;color: rgba(30, 136, 229, 1)">
                {{ $t(`trade.stateType.${item.status}`) }}
              </div>
              <div class="desposit" v-if="item.status === 2" style="font-size: 14px">
                {{ $t(`trade.stateType.${item.status}`) }}
              </div>
              <div class="errorText" v-if="item.status === 3" style="font-size: 14px">
                {{ $t(`trade.stateType.${item.status}`) }}
              </div>
            </v-col>
            <v-col cols="2">
              <div style="font-size: 14px">{{ switchTimeFormat(item.updated_time) }}</div>
            </v-col>
          </v-row>
        </div>
        <v-pagination
            class="fontColor2 pt-4"
            color="btnColor"
            v-model="page"
            :length="length"
            :total-visible="7"
        ></v-pagination>
      </v-card>
      <v-card height="746px" class="d-flex align-center" flat v-if="data.length === 0 && !loading">
        <div class="mx-auto">
          <v-img
              class="mx-auto"
              max-height="479"
              max-width="612"
              src="@/assets/fake/transaction.png"
          ></v-img>
          <div class="text-center fontColor10--text" style="font-size: 36px;margin-top: 29px">
            {{ $t("transaction.text") }}
          </div>
        </div>
      </v-card>
    </v-col>
    <overlay :loading="loading"></overlay>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getTransations} from "@/api/user";
import {formatDecimal} from "@/utils/math"
import Overlay from "../../../components/Overlay";
import {numFormat,cutZero} from "../../../utils/math";
import {utcTimeStringToLocalTimeString} from "@/utils/date";

export default {
  name: "depositWithdrawal",
  components: {Overlay},
  data: () => ({
    data: '',
    page: 1,
    length: 0,
    limit: 10,
    loading: false,
    TRANSACTIONS_TYPE: {
      TransactionIn: 0, //充值
      TransactionOut: 1,  //提现
    },
    tabItem: ['coinType', 'useType', 'amount', 'address', 'date']
  }),
  created() {
    this.getTransations()
  },
  computed: {
    ...mapGetters([
      'name', 'user', 'config', "getRate"
    ]),
    coinType() {
      return function (type) {
        switch (type) {
          case 1:
            return 'ETH'
          case 2:
            return 'USDT'
          case 3:
            return 'KRW'
          case 4:
            return 'VMM'
        }
      }
    },
    // rate() {
    //   return function (item) {
    //     return this.getRate(item.coin, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    //   }
    // },
    // //现金价值
    // cash() {
    //   return function (item) {
    //     return formatDecimal(Number(this.rate(item).rate) * Number(this.price(item.abs_amount)), 4)
    //   }
    // },
    price() {
      return function (amount) {
        return cutZero(numFormat(formatDecimal(amount, 4)))
      }
    },

    transationSpan() {
      return function (index) {
        let type = this.data[index].type
        if (type === this.TRANSACTIONS_TYPE.TransactionIn) {
          return true
        } else {
          return false
        }
      }
    },
    switchTimeFormat() {
      return function (time) {
        return utcTimeStringToLocalTimeString(time)
      }
    }
  },
  watch: {
    page() {
      this.getTransations()
    }
  },
  methods: {
    getTransations() {
      this.loading = true
      let info = {}
      info.limit = this.limit
      info.offset = this.limit * (this.page - 1)
      getTransations(info).then((response) => {
        this.loading = false
        this.data = response.data.results
        this.length = parseInt(Number(response.data.count) / 10) + 1
      }).catch(() => {
      })
    }
  },
}
</script>

<style scoped>
.tabRow:nth-child(even) {
  background-color: #F6F5F3;
}

.desposit {
  color: #20A763;
}

.withdrawal {
  color: #166AFA;
}

#list::-webkit-scrollbar {
  display: none;
}
</style>