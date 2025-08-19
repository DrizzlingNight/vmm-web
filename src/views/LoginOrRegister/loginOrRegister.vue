<template>
  <v-dialog v-model="loginOrRegisterDialog" width="650px" @click:outside="clickDialogOutside" :persistent="isBind" :hide-overlay="isBind">
    <login v-if="login" @closeDialog="closeDialog" @showPassword="showPassword" @showRegister="showRegister"></login>
    <register v-if="register" @closeDialog="closeDialog" @showLogin="showLogin"></register>
    <password v-if="password" @closeDialog="closeDialog" @showLogin="showLogin"></password>
  </v-dialog>
</template>

<script>
import Login from "./LoginOrRegisterComps/Login";
import Register from "./LoginOrRegisterComps/Register";
import Password from "./LoginOrRegisterComps/Password";
import {mapGetters} from "vuex";

export default {
  name: "loginOrRegister",
  components: {Password, Register, Login},
  data: () => ({
    // login: false,
    // register: false,
    // password: false,
  }),
  computed: {
    ...mapGetters(["isShowLoginDialog", "isRegisterDialog","isPasswordDialog", "showingBindDialogType"]),
    isBind() {
      return this.showingBindDialogType > 0
    },
    loginOrRegisterDialog: {
      get() {
        return this.login || this.register || this.password || this.showingBindDialogType > 0
      },
      set() {
      }
    },
    login: {
      get() {
        return this.isShowLoginDialog || this.showingBindDialogType === 1;
      },
      set(val) {
        this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", val);
        if (this.bindType > 0 && val === true) {
          this.bindType = 1
        }
      },
    },
    register: {
      get() {
        return this.isRegisterDialog || this.showingBindDialogType === 3;
      },
      set(val) {
        this.$store.commit("ui/SET_IS_REGISTER_DIALOG", val);
        if (this.bindType > 0 && val === true) {
          this.bindType = 3
        }
      },
    },
    password: {
      get() {
        return this.isPasswordDialog || this.showingBindDialogType === 2;
      },
      set(val) {
        this.$store.commit("ui/SET_IS_PASSWORD_DIALOG", val);
        if (this.bindType > 0 && val === true) {
          this.bindType = 2
        }
      },
    },
    bindType: {
      get() {
        return this.showingBindDialogType;
      },
      set(val) {
        this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", val);
        if (val > 0) {
          this.register = false
          this.login = false
          this.password = false
        }
      }
    }
  },
  methods: {
    //全部关闭
    closeDialog() {
      if (this.showingBindDialogType > 0) return

      this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", false);
      this.login = false
      this.register = false
      this.password = false
      
    },
    clickDialogOutside() {
      if (this.showingBindDialogType > 0) return
      this.$store.commit("ui/SET_IS_PASSWORD_DIALOG", false);
      this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", false);
      this.$store.commit("ui/SET_IS_REGISTER_DIALOG", false);
    },
    showPassword() {
      this.login = false
      this.register = false
      this.password = true
    },
    showRegister() {
      this.login = false
      this.register = true
      this.password = false
    },
    showLogin() {
      this.login = true
      this.register = false
      this.password = false
    }
  }

}
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
  ::v-deep .v-dialog {
    box-shadow: none;
  }
}
</style>