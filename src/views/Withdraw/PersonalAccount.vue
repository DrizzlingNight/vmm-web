<template>
  <div style="z-index: 205">
    <v-navigation-drawer
        right
        fixed
        temporary
        v-model="drawer"
        style="padding-top: 70px"
        width="500px"
        class="navigation"
    >
      <v-app-bar flat v-if="user">
        <div class="d-flex align-center">
          <span class="fontColor--text" style="font-size: 16px;margin-left: 15px">{{ user ? user.username : '' }}</span>
          <v-btn
              class="px-0"
              text
              x-small
              v-clipboard:copy="user ? user.username : ''"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
          >
            <v-img
                class="d-inline-block"
                max-height="13"
                max-width="14"
                src="@/assets/fake/copy.png"
            ></v-img>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div class="text-right">
          <v-btn
              text class="btnColor--text" style="font-size: 20px" @click="goTransation"
          >{{ $t("drawer.detail") }}
          </v-btn>
        </div>
      </v-app-bar>
      <v-app-bar flat height="70" class="fontColor2" v-else>
        <span class="fontColor--text" style="font-size: 16px;margin-left: 15px">{{ $t("drawer.account") }}</span>
      </v-app-bar>
      <v-row no-gutters v-if="user" class="d-flex justify-center" style="padding-top: 20px">
        <v-col cols="11" class="balance">
          {{ $t("drawer.balance") }}
        </v-col>
        <v-col cols="12" v-for="item in coinList" :key="item.id">
          <v-col cols="11" v-if="item.is_crypto && item.active" :class="code === item.id ? 'btnCol':''"
                 class="colBalance mx-auto pa-0"
                 style="height: 88px;margin-bottom: 10px;border-radius: 4px;"
          >
            <v-btn @click="choiceCode(item)" elevation="0" block height="100%" width="100%"
                   :class="code === item.id ? 'btn':''"
                   style="background: linear-gradient(315deg, #E6B045 0%, #FFE383 100%);border-radius: 4px;">
              <div style="width: 100%;" class="d-flex justify-space-between">
                <div class="my-auto">
                  <v-img class="imgSrc" width="50px" height="50px"
                         :src="'/static/coin/'+item.code+'.png'"></v-img>
                </div>
                <div class="my-auto">
                  <span class="span1" style="font-size: 24px;font-weight: 600;margin-right: 24px">{{
                      totalPrice(item.id)
                    }}</span>
                  <span class="span2" style="font-size: 21px">{{ item.code }}</span>
                </div>
              </div>
            </v-btn>
          </v-col>
        </v-col>
        <v-col style="height:35vh;"></v-col>
        <v-col cols="11" style="margin-bottom: 20px">
          <v-btn
              depressed
              large
              block
              class="btnColor btnWhite--text"
              style="height: 50px;font-size: 16px"
              @click="goRecharge"
          >
            {{ $t("drawer.recharge") }}
          </v-btn>
        </v-col>
        <v-col cols="11" style="margin-bottom: 36px">
          <v-btn
              depressed
              outlined
              large
              block
              style="height: 50px;font-size: 16px"
              color="btnColor"
              @click="goWithdraw"
          >
            {{ $t("drawer.withdraw") }}
          </v-btn>
        </v-col>


         <div>
            <button class="select-nft mb-5"
            @click="selectNFTNetwork">
              {{ $t("drawer.depositNFT") }}
            </button>
            <v-divider></v-divider>
         </div>


      </v-row>
      <v-row no-gutters v-else>
        <v-col class="text-center errorlogin" style="font-size: 14px">
          <p class="mt-6 fontColor--text">{{ $t("drawer.text") }}</p>
        </v-col>
      </v-row>
    </v-navigation-drawer>
      <withdraw v-if="withdraw" :codeType="codeType" @showWithdraw="showWithdraw"
      ></withdraw>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Withdraw from "./withdraw/withdraw";
import router from "@/router";
import {formatDecimal, numFormat, cutZero} from "@/utils/math";
import i18n from '@/lang'

export default {
  name: "PersonalAccount",
  components: {Withdraw},
  data: () => ({
    username: '',
    withdraw: false,
    withdrawPage: false,
    code: -1,
    codeType: ''
  }),
  created() {
    this.username = this.user ? this.user.username : ''
  },
  computed: {
    ...mapGetters([
      'name', 'user', 'isShowDrawerDialog', 'config', "getBalanceById", "coinList"
    ]),
    //余额
    totalPrice() {
      return function (code) {
        let balance = this.getBalanceById(code)
        return cutZero(numFormat(balance && formatDecimal(balance.amount, 4) || "0"))
      }
    },
    drawer: {
      get() {
        if (this.user) {
          this.getBalance()
        }
        return this.isShowDrawerDialog;
      },
      set(val) {
        this.$store.commit("ui/SET_IS_SHOW_DRAWER_DIALOG", val);
      },
    },
  },
  watch: {
    user() {
      if (this.user === null) {
        this.withdrawPage = false
      }
    }
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    //选择币种
    choiceCode(item) {
      this.code = item.id
      this.codeType = item.code
      this.$store.commit("coin/SET_CURRENT_CODE", item.id);
    },
    onCopy() {
      this.showAlert(i18n.t("copySuccess"))
    },
    onError() {
    },
    goWithdraw() {
      if (this.code < 0) {
        this.$toast.error(i18n.t("drawer.errorText"))
        return
      }
      this.withdraw = true
      this.withdrawPage = true
      this.$store.commit('ui/SET_IS_SHOW_DRAWER_DIALOG', false)
    },
    goRecharge() {
      if (this.code < 0) {
        this.$toast.error(i18n.t("drawer.errorText"))
        return
      }
      this.$store.commit("ui/SET_IS_SHOW_RECHARGE_DIALOG", true);
      this.$store.commit('ui/SET_IS_SHOW_DRAWER_DIALOG', false)
    },
    selectNFTNetwork() {
      this.$store.commit("ui/SET_IS_SHOW_SELECT_NFT_NETWORK_DIALOG", true);
      this.$store.commit('ui/SET_IS_SHOW_DRAWER_DIALOG', false)
    },
    showWithdraw() {
      this.withdraw = false
    },
    showWithdrawDialog() {
      this.withdrawPage = false
    },
    goTransation() {
      if (this.$route.path !== '/trade') {
        router.push('/trade')
      }
    },
    getBalance() {
      this.$store
          .dispatch("user/balance")
          .then(() => {
          })
          .catch(() => {
          });
    },
  }
}
</script>

<style scoped land="scss">

@import "../../scss/theme.scss";

.balance {
  font-weight: 400;
  color: #050505;
  line-height: 28px;
  height: 28px;
  font-size: 20px;
  margin-bottom: 17px;
}

.errorlogin {
  color: rgba(235, 235, 235, 1);
}

.select-nft {
  font-size: 16px;
  /* color: $mainColor; */
  color: #CC9933;
}

/*.colBalance{*/
/*  margin-left: 15px;*/
/*  margin-right: 15px;*/
/*}*/

@media screen and (max-width: 960px) {
  .navigation {
    padding-top: 110px !important;
    width: 256px !important;
  }

  .colBalance {
    padding: 0px !important;
    height: 55px !important;
    margin-bottom: 10px !important;
  }

  .imgSrc {
    max-height: 37px !important;
    max-width: 37px !important;
  }

  .span1 {
    font-size: 12px !important;
    margin-right: 5px !important;
  }

  .span2 {
    font-size: 12px !important;
  }

  .balance {
    margin-bottom: 10px;
  }
}

.colBalance {
  background: linear-gradient(315deg, #E6B045 0%, #FFE383 100%);
  border-radius: 4px;
  /*background: linear-gradient(315deg, rgba(230, 176, 69, 1), rgba(255, 227, 131, 1)) 2 2;*/
}

.btnCol {
  background: linear-gradient(315deg, #E6B045 0%, #FFE383 100%);
  border-radius: 4px;
  padding: 2px !important;

  /*border: 2px solid #ddd;*/
  /*border-image: linear-gradient(315deg, rgba(230, 176, 69, 1), rgba(255, 227, 131, 1)) 2 2;*/
  /*padding: 2px;*/
}

.btn {
  /*background: linear-gradient(315deg, #E6B045 0%, #FFE383 100%);border-radius: 4px*/
  background: white !important;
}

/* 整个滚动条 */
>>> .v-navigation-drawer__content::-webkit-scrollbar {
  width: 9px;
  height: 10px;
  background-color: #232323;
}

/* 滚动条上的滚动滑块. */
>>> .v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background-color: #424242;
  border: 3px solid #232323;
  border-radius: 5px;
}

/* 当同时有垂直滚动条和水平滚动条时交汇的部分. */
>>> .v-navigation-drawer__content::-webkit-scrollbar-corner {
  background: transparent;
}
</style>