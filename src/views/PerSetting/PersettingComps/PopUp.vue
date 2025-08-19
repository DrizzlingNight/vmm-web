<template>
  <div v-if=" !isExpired && !isOnSale">
    <v-menu offset-x nudge-right="4">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            min-width="28px"
            style="height: 29px"
            class="pa-0"
            color="rgba(204, 153, 51, .5)"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list class="pa-0 btnColor">
        <v-list-item @click="showTransferOut">
          <v-img width="14px" src="@/assets/fake/persetting/redemption.png"></v-img>
          <v-list-item-title class="ml-3 btnWhite--text" style="font-size: 14px"
          >{{ $t("persetting.tab.transferOut") }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="showRedemption" v-if="!type">
          <v-img width="14px" src="@/assets/fake/persetting/transferOut.png"></v-img>
          <v-list-item-title class="ml-3 btnWhite--text" style="font-size: 14px"
          >{{ $t("persetting.tab.redemption") }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
        v-model="persettingDialog"
        @click:outside="close"
        class="d-flex justify-center align-center"
        width="480px"
    >
      <!-- 赎回-->
      <redemption
          v-if="redemption"
          @closeDialog="closeDialog"
          @showSuccess="showSuccess"
          @showPasswordPage="showPasswordPage"
          :item="item"
          :isOldImg="isOldImg"
      ></redemption>
      <!--      转出-->
      <transfer-out
          v-if="transferOut"
          @closeDialog="closeDialog"
          @showSuccess="showSuccess"
          @showPasswordPage="showPasswordPage"
          @showTransferOutConfirm="showTransferOutConfirm"
          :item="item"
          :isOldImg="isOldImg"
      ></transfer-out>

      <transfer-out-confirm 
        v-if="isShowTransferOutConfirm"
        @close="closeDialog"
        @showPasswordPage="showPasswordPage"
        :item="transferOutConfitmItem"
        >
        </transfer-out-confirm>
    </v-dialog>
    <v-dialog
        @click:outside="close"
        v-model="persettingSuccessDialog"
        class="d-flex justify-center align-center"
        width="650px"
    >
      <!--      赎回成功-->
      <persetting-success
          v-if="success"
          @closeDialog="closeDialog"
          :tab="tab"
          :successTitle="successTitle"
          :successText="successText"
          :successUser="successUser"
      ></persetting-success>
      <!--      密码验证-->
      <password
          v-if="password"
          :request-func="requestFunc"
          :request-params="requestParams"
          @closeDialog="closeDialog"
          @successDialog="successDialog"
      >
      </password>
    </v-dialog>

    
  </div>
</template>
<script>
import Redemption from "./Redemption";
import PersettingSuccess from "./PersettingSuccess";
import TransferOut from "./transferOut";
import Password from "./Password";
import TransferOutConfirm from './TransferOutConfirm.vue';

export default {
  name: "PopUp",
  data() {
    return {
      redemption: false,
      success: false,
      transferOut: false,
      password: false,
      isShowTransferOutConfirm: false,

      successTitle: "",
      successText: "",
      successUser: "",
      requestFunc: "",
      requestParams: "",
      buySuccessTitle: "",
      buySuccessBody: "",
      buySuccessToPath: "",

      transferOutConfitmItem: {},
    }
  },
  props: ["item", "tab", "isOldImg","type"],
  components: {
    Password,
    TransferOut,
    PersettingSuccess,
    Redemption,
    TransferOutConfirm
  },
  computed: {
    persettingDialog: {

      get(){
        return this.redemption || this.transferOut || this.isShowTransferOutConfirm
      },
      set(val) {
        if (val == false) {
          this.redemption = false
          this.transferOut = false
          this.isShowTransferOutConfirm = false
        }
      }
    },
    persettingSuccessDialog() {
      return this.success || this.password
    },
    //判断是否过期
    isExpired() {
      let now = this.moment();
      let expired = this.moment(this.item ? this.item.expiration : "");
      return expired.diff(now) < 0;
    },
    //返回true在售卖
    isOnSale() {
      return this.item && this.item.is_onsale;
    },
  },
  methods: {
    close() {
      this.redemption = false;
      this.success = false;
      this.transferOut = false;
      this.password = false
      this.isShowTransferOutConfirm = false
    },
    closeDialog() {
      this.redemption = false;
      this.success = false;
      this.transferOut = false;
      this.isShowTransferOutConfirm = false
      this.password = false
    },
    showPasswordPage(title, body, toUser, requestFunc, requestParams) {
      this.successTitle = title;
      this.successText = body;
      this.successUser = toUser;
      this.requestFunc = requestFunc;
      this.requestParams = requestParams;
      this.redemption = false;
      this.success = false;
      this.transferOut = false;
      this.isShowTransferOutConfirm = false
      this.password = true
    },
    showRedemption() {
      this.redemption = true;
    },
    showTransferOut() {
      this.$store.commit("ui/SET_CONNECTED_WALLET_ACCOUNT", '')
      this.transferOut = true;
    },
    showTransferOutConfirm(item) {
      this.transferOutConfitmItem = item
      this.transferOut = false
      this.isShowTransferOutConfirm = true
    },
    successDialog() {
      this.redemption = false;
      this.transferOut = false;
      this.password = false
      this.isShowTransferOutConfirm = false
      this.success = true
    },
    //打开成功
    showSuccess(title, text, user) {
      (this.success = true),
          (this.successTitle = title),
          (this.successText = text),
          (this.successUser = user);
    },
  },
};
</script>
<style scoped>
>>> .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover {
  background-color: #E7B34B;
}
.btnColor{
  min-width: 143px;
}
</style>