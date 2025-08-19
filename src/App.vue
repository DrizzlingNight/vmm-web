<template>
  <v-app id="app">
    <nav-bar style="z-index: 206"></nav-bar>
    <v-main class="pa-0 mainText">
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <Footer></Footer>
    <recharge></recharge>
    <SelectNFTNetwork></SelectNFTNetwork>
    <LinkToWallet></LinkToWallet>
    <TransferInNFT></TransferInNFT>
    <personal-account></personal-account>
    <login-or-register></login-or-register>
    <service-page></service-page>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Recharge from "./components/Recharge";
import SelectNFTNetwork from "./components/SelectNFTNetwork.vue"
import LinkToWallet from "./components/LinkToWallet.vue"
import TransferInNFT from "./components/TransferInNFT.vue"
import PersonalAccount from "./views/Withdraw/PersonalAccount";
import Footer from "@/components/Footer";
import {mapGetters} from "vuex";
import LoginOrRegister from "./views/LoginOrRegister/loginOrRegister";
import i18n from "./lang";
import ServicePage from "./views/Service/servicePage";
import SwapTips from '@/components/SwapTips';
import SwapTipsIcon from '@/components/SwapTipsIcon';


export default {
  name: "App",
  components: {
    ServicePage,
    LoginOrRegister,
    PersonalAccount,
    Recharge,
    SelectNFTNetwork,
    LinkToWallet,
    TransferInNFT,
    NavBar,
    Footer,
    // SwapTips
  },
  data: () => ({}),
  mounted() {
    let app = document.getElementById("app")
    if (i18n.locale === 'ko-KR') {
      app.style.fontFamily = "GmarketSans"
    } else {
      app.style.fontFamily = ""
    }
  },
  created() {
    this.tryLogin();
    this.getCoin();
    this.getRate();
    this.getConfig();

    if (!localStorage.getItem('isShowSwapTip') || 
      localStorage.getItem('isShowSwapTip') == false || 
      localStorage.getItem('isShowSwapTip') == 'false') {
      localStorage.setItem("isShowSwapTip", true);

      // this.$toast.success('isShowSwapTip')

      this.$toast.success(SwapTips, {
        position: "top-right",
        timeout: 8000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: SwapTipsIcon,
        rtl: false
      });
    }
    
  },

  computed: {
    ...mapGetters(["showAlert", "config", "isShowLoginDialog"]),
  },
  watch:{
    $route(val) {
      if (val.query.referral) {
        let referral = val.query.referral;
        localStorage.setItem("referral", referral);
      }
    },
  },
  methods: {
    getRate() {
      this.$store
          .dispatch("coin/getCoinExchangeList")
          .then(() => {
          })
          .catch(() => {
          });
    },
    getCoin() {
      this.$store
          .dispatch("coin/getCoin")
          .then(() => {
          })
          .catch(() => {
          });
    },
    tryLogin() {
      this.$store
          .dispatch("user/user")
          .then(() => {
          })
          .catch(() => {
          });
    },
    getConfig() {
      this.$store
          .dispatch("user/getConfig")
          .then(() => {
          })
          .catch(() => {
          });
    },
  },
};
</script>
<style scoped>
@media (max-width: 960px)  {
  .mainText{
    margin-top: 110px;
  }
}
@media (min-width: 960px) {
  .mainText{
    margin-top: 70px;
  }
}
>>>.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined){
  box-shadow:0 1px 0 0 #D8D8D8 !important;
}
</style>
