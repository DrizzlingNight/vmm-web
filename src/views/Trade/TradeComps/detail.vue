<template>
  <div>
    <v-card-title
        class="title d-flex justify-space-between navI18n--text"
        style="font-size: 16px !important; height: 80px;border-radius: 4px 4px 0px 0px;font-weight: bold"
    >
      <v-col cols="2" >{{ $t("trade.number") }}</v-col>
      <v-col cols="2" >{{ `NFT${$t("trade.name")}` }}</v-col>
      <v-col cols="2" >{{ $t("trade.id") }}</v-col>
      <v-col cols="2" >{{ $t("trade.account") }}</v-col>
      <v-col cols="1" >{{ $t("trade.state") }}</v-col>
      <v-col cols="1" >{{ $t("trade.type") }}</v-col>
      <v-col cols="2" >{{ $t("trade.date") }}</v-col>
    </v-card-title>
    <v-col cols="12" class="mx-auto pa-0">
      <v-card flat v-if="data.length !== 0">
        <div style="height:680px">
          <v-row
              v-for="(item) in data"
              :key="item.id"
              class="align-center d-flex justify-space-between pl-6 pr-4  tabRow"
              no-gutters
              style="height: 68px"
          >
            <v-col cols="2" style="padding: 4px">
              <div style="font-size: 14px">
                {{ item.request_id }}
              </div>
            </v-col>
            <v-col cols="2" style="padding: 4px">
              <div style="font-size: 14px">{{item.token.name}}</div>
            </v-col>
            <v-col cols="2" style="padding: 4px">
              <div
                  style="font-size: 16px"
              >
                {{ item.token.token_id }}
              </div>
            </v-col>
            <v-col cols="2" style="padding: 4px">
              <div style="font-size: 14px">
                {{ item.source_address }}
              </div>
            </v-col>
            <v-col style="font-size: 14px; padding: 4px" cols="1" >
              <div v-if="item.status === 0 || item.status === 1" style="font-size: 14px;color: rgba(30, 136, 229, 1)">
                {{ $t(`trade.states.${showStatus(item.status)}`)}}
              </div>
              <div class="desposit" v-if="item.status === 2" style="font-size: 14px">
                {{ $t(`trade.states.${showStatus(item.status)}`) }}
              </div>
              <div class="errorText" v-if="item.status === 3" style="font-size: 14px">
                {{ $t(`trade.states.${showStatus(item.status)}`) }}
              </div>
              <!-- <span>{{ $t(`trade.states.${showStatus(item.status)}`) }}</span> -->
            </v-col>
            <v-col style="font-size: 14px; padding: 4px" cols="1">
              <div style="font-size: 14px">
                {{ $t(`trade.states.type.${showType(item.type)}`)}}
              </div>
              <!-- <span>{{ $t(`trade.states.${showStatus(item.status)}`) }}</span> -->
            </v-col>
            <v-col cols="2" style="padding: 4px">
              <div style="font-size: 14px">
                {{ switchTimeFormat(item.created_time) }}
              </div>
            </v-col>
          </v-row>
        </div>
        <v-pagination
            class="fontColor2 pt-4 pagination"
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
import {getTransaction} from "@/api/user";
import {formatDecimal} from "@/utils/math";
import Overlay from "../../../components/Overlay";
import {numFormat,cutZero} from "../../../utils/math";
import {utcTimeStringToLocalTimeString} from "@/utils/date";

export default {
  name: "Detail",
  components: {Overlay},
  data() {
    return {
      data: "",
      page: 1,
      length: 0,
      limit: 10,
      loading: false,
      TRANSACTIONS_TYPE: {
        TransactionIn: 0, //充值
        TransactionOut: 1, //提现
      },
      tabItem: [
        "orderNumber",
        "coinType",
        "amount",
        "type",
        "peopleType",
        "date",
      ],
    };
  },
  created() {
    this.getTransaction();
  },
  computed: {
    ...mapGetters(["name", "user", "config", "getRate"]),
    // rate() {
    //   return function (item) {
    //     return this.getRate(
    //         item.coin.id,
    //         Number(process.env.VUE_APP_RATE_TO_COIN_ID)
    //     );
    //   };
    // },
    showStatus() {
      return function (status) {
        switch (status) {
          case 0:
            return 'inited'
          case 1:
            return 'inpending'
          case 2:
            return 'completed'
          case 3:
            return 'feiled'
        }
      }
    },
    showType() {
      return function (status) {
        switch (status) {
          case 0:
            return 'mint'
          case 1:
            return 'transferIn'
          case 2:
            return 'transferOut'
        }
      }
    },

    //返回true是购买
    isBuy() {
      return function (item) {
        return this.user.id === item.buyer.id
      };
    },
    //现金价值
    // cash() {
    //   return function (item) {
    //     return formatDecimal(
    //         Number(this.rate(item).rate) * Number(this.price(item.amount)),
    //         4
    //     );
    //   };
    // },
    //余额现金价值
    balance() {
      return function (item) {
        return formatDecimal(
            Number(this.rate(item).rate) * Number(this.price(item.current)),
            4
        );
      };
    },
    price() {
      return function (amount) {
        return cutZero(numFormat(formatDecimal(amount, 4)));
      };
    },
    isJust() {
      return function (just) {
        if (Number(just) < 0) {
          return false;
        } else return true;
      };
    },
    switchTimeFormat() {
      return function (time) {
        return utcTimeStringToLocalTimeString(time)
      }
    }
  },
  watch: {
    page() {
      this.getBill()
    }
  },
  methods: {
    getTransaction() {
      this.loading = true
      let info = {}
      info.limit = this.limit
      info.offset = this.limit * (this.page - 1)
      getTransaction(info)
          .then((response) => {
            // console.log(response)
            this.loading = false
            this.data = response.data.results;
            this.length = parseInt(Number(response.data.count) / 10) + 1
          })
          .catch(() => {
          });
    },
  },
};
</script>

<style scoped>
.desposit {
  color: #20a763;
}

.tabRow:nth-child(even) {
  background-color: #F6F5F3;
}

#list::-webkit-scrollbar {
  display: none;
}
/* .card{
  position: relative;
}
.pagination{
  position: absolute;
  bottom: 50px;
} */
</style>
