<template>
  <v-card class="password-card">
    <v-card-subtitle class="password-card-subtitle text-right pt-2 pr-2">
      <v-btn v-if="showingBindDialogType < 0" @click="closeDialog" icon>
        <v-icon class="btnColor--text text-right">close</v-icon>
      </v-btn>
    </v-card-subtitle>
    <div class="password-logo d-flex justify-center btnColor--text pa-0">
      <v-img contain src="@/assets/lightLogo.png" class="mr-1" max-width="81" aspect-ratio="3.37"></v-img>
      <span>{{ $t("resetPassword.title") }}</span>
    </div>
    <v-form ref="login" v-model="valid" class="password-form">
      <v-row justify="center" no-gutters>
        <v-col cols="9" class="email py-0">
          <v-text-field
              color="btnColor"
              :rules="[() => !!loginForm.email && loginForm.email.length >=6 && loginForm.email.length <=32 || $t('register.errorPassword')]"
              v-model="loginForm.email"
              :label="$t('loginAndResister.email')"
              required
              autocomplete="new-password"
          ></v-text-field>
        </v-col>
        <verification-code :type="type" @sendCode="sendCode" :email="loginForm.email"></verification-code>
        <v-col cols="9" class="password py-0">
          <v-text-field
              color="btnColor"
              v-model="loginForm.password"
              :label="$t('resetPassword.newPassword')"
              type="password"
              autocomplete="new-password"
              required
              :rules="[() => !!loginForm.password && loginForm.password.length <=32 && loginForm.password.length >=6 || $t('register.errorPassword')]"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="confirm-password py-0">
          <v-text-field
              color="btnColor"
              v-model="repeatPassword"
              :label="$t('resetPassword.confirmPassword')"
              type="password"
              required
              autocomplete="new-password"
              :rules="[affirmPass]"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="reset-password-col">
          <v-btn
              block
              depressed
              class="reset-password-btn btnColor btnWhite--text"
              @click="password"
              :loading="loading"
              :disabled="!valid"
          >
            <span class="bottomText">
              {{ $t("resetPassword.btn") }}
            </span>
          </v-btn>
        </v-col>
        <v-col cols="12" class="login-col">
          <div class="login-text btnColor--text">
            <span class="ETHColor">{{ $t('register.haveAccount') + '?' }}</span>
            <a @click="goLogin" class="pa-0 btnColor--text text-decoration-underline font-weight-bold">
              {{ $t("loginAndResister.login") }}
            </a>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import i18n from '@/lang/index';
import {resetPassword} from "@/api/user";
import VerificationCode from "../../../components/VerificationCode";
import {mapGetters} from "vuex";

export default {
  name: "Password",
  components: {VerificationCode},
  data: () => ({
    valid: false,
    repeatPassword: '',
    type:2,
    loading: false,
    time: 60,
    sendPassword: true,
    loginForm: {
      email: "",
      password: "",
      username: "",
      code: "",
      profile: {
        phone_number: '',
        notice_url: '',
        tg_notice_chat_id: ''
      },
    },
  }),
  computed: {
    ...mapGetters(["showingBindDialogType"]),
    },
  methods: {
    affirmPass(val) {
      if (val !== this.loginForm.password || val === '') {
        return i18n.t("register.errorAgainPassword")
      }
      return true;
    },
    closeDialog() {
      this.$emit("closeDialog")
    },
    goLogin() {
      this.$emit("showLogin")
    },
    sendCode(code) {
      this.loginForm.code = code
    },
    // resetForm() {
    //   this.loginForm = {
    //     email: this.loginForm.email,
    //     password: "",
    //     username: "",
    //     profile: {
    //       phone_number: '',
    //       notice_url: '',
    //       tg_notice_chat_id: ''
    //     }
    //   }
    // },
    password() {
      resetPassword({
        email: this.loginForm.email,
        new_password: this.loginForm.password,
        verify_code: this.loginForm.code
      }).then((res) => {
        if (res.code === 0) {
          this.$emit("showLogin")
          this.$toast.success(this.$t("resetPassword.setPasswordSuccess"))
        } else {
          this.toasterErr(res.code)
        }
      }).catch((err) => {
        console.error('err', err)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
>>> .v-input input {
  max-height: 50px;
}

.password-card {
  width: 650px;
  height: 717px;

  .password-logo {
    font-size: 24px;
    margin-top: 7px;
  }

  .password-form {
    margin-top: 55px;

    .email,
    .password,
    .confirm-password {
      max-width: 440px;
      margin-bottom: 8px;
    }

    .reset-password-col {
      max-width: 440px;
      margin-top: 58px;

      .reset-password-btn {
        height: 50px;
        font-size: 20px !important;
      }
    }

    .login-col {
      display: flex;
      justify-content: center;
      margin-top: 22px;

      .login-text {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .password-card {
    width: 288px;
    height: auto;
    margin: 120px auto 0px auto;

    .password-card-subtitle {
      padding-bottom: 9px;
    }
    
    .password-logo {
      font-size: 16px;
      margin-top: 0px;
    }

    .password-form {
      margin-top: 17px;

      .email,
      .password,
      .confirm-password {
        max-width: 256px;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .reset-password-col {
        max-width: 256px;
        margin-top: 16px;

        .reset-password-btn {
          height: 38px;
          font-size: 16px !important;
        }
      }

      .login-col {
        margin-top: 16px;
        margin-bottom: 16px;
        
        .login-text {
          font-size: 12px;
        }
      }
    }
  }
}

</style>