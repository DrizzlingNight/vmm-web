<template>
  <div>
    <v-card-title class="fontColor2 navI18n--text"
                  style="font-size: 18px !important;height: 80px;border-radius: 4px 4px 0px 0px;font-weight: bold">
      <!--      <v-col cols="2" v-for="tab in tabItem" :key="tab">{{ $t(`trade.${tab}`) }}</v-col>-->
      <v-col cols="2" class="ml-n1">{{ $t("trade.coinType") }}</v-col>
      <v-col cols="3" class="ml-4">{{ $t("trade.type") }}</v-col>
      <v-col cols="2" class="ml-n3">{{ $t("trade.amount") }}</v-col>
      <v-col cols="3" class="ml-9">{{ $t("trade.balance") }}</v-col>
      <v-col class="ml-n12">{{ $t("trade.date") }}</v-col>
    </v-card-title>
    <v-col cols="12" class="mx-auto pa-0">
      <v-card flat v-if="data.length !== 0">
        <div style="height:680px">
          <v-row v-for="(item) in data" :key="item.id "
                 class="align-center d-flex justify-space-between pl-6 pr-4 tabRow" no-gutters style="height: 68px">
            <v-col cols="2">
              <v-avatar size="29">
                <v-img :src="'/static/coin/'+item.coin.code+'.png'"></v-img>
              </v-avatar>
              <span style="font-size: 14px" class="ml-2">{{item.coin.code}}</span>
            </v-col>
            <v-col cols="3" class="ml-n6" style="max-width: 190px">
              <div class="d-flex align-center">
                <div class="ml-2" style="font-size: 14px">{{ $t(`trade.recordType.${item.type}`) }}
                </div>
              </div>
            </v-col>
            <v-col cols="2" class="ml-5">
              <div v-if="isJust(item.changed)" class="desposit" style="font-size: 16px">+{{
                  price(item.changed)
                }}
              </div>
              <div v-else class="errorColor" style="font-size: 16px">{{ price(item.changed) }}</div>
            </v-col>
            <v-col cols="2" class="pr-8">
              <div style="font-size: 16px">{{ price(item.current) }}
              </div>
            </v-col>
            <v-col cols="2">
              <div style="font-size: 14px">{{ switchTimeFormat(item.created_time) }}</div>
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
import {getRecord} from "@/api/user";
import {formatDecimal} from "@/utils/math"
import Overlay from "../../../components/Overlay";
import {numFormat,cutZero} from "../../../utils/math";
import {utcTimeStringToLocalTimeString} from "@/utils/date";

export default {
  name: "accountChange",
  components: {Overlay},
  data: () => ({
    data: '',
    page: 1,
    length: 0,
    limit: 10,
    loading: false,
    tabItem: ['coinType', 'useType', 'amount', 'address', 'date']
  }),
  created() {
    this.getRecord()
  },
  computed: {
    ...mapGetters([
      'name', 'user', 'config', "getRate"
    ]),
    // rate() {
    //   return function (item) {
    //     return this.getRate(item.coin.id, Number(process.env.VUE_APP_RATE_TO_COIN_ID))
    //   }
    // },
    // //现金价值
    // cash() {
    //   return function (item) {
    //     return formatDecimal(Number(this.rate(item).rate) * Number(this.price(item.changed)), 4)
    //   }
    // },
    //余额现金价值
    balance() {
      return function (item) {
        return formatDecimal(Number(this.rate(item).rate) * Number(this.price(item.current)), 4)
      }
    },
    price() {
      return function (amount) {
        return cutZero(numFormat(formatDecimal(amount, 4)))
      }
    },
    isJust() {
      return function (just) {
        if (Number(just) < 0) {
          return false
        } else return true

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
      this.getRecord()
    }
  },
  methods: {
    getRecord() {
      this.loading = true
      let info = {}
      info.limit = this.limit
      info.offset = this.limit * (this.page - 1)
      getRecord(info).then((response) => {
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

.desposit {
  color: #20A763;
}

.tabRow:nth-child(even) {
  background-color: #F6F5F3;
}

#list::-webkit-scrollbar {
  display: none;
}
</style>