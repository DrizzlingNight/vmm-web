<template>
  <v-card class="register-card">
    <v-card-subtitle class="register-card-subtitle text-right pt-2 pr-2">
      <v-btn v-if="showingBindDialogType < 0" @click="closeDialog" icon>
        <v-icon class="btnColor--text text-right">close</v-icon>
      </v-btn>
    </v-card-subtitle>
    <div class="register-logo d-flex justify-center btnColor--text pa-0">
      <v-img contain src="@/assets/lightLogo.png" class="mr-1" max-width="81" aspect-ratio="3.37"></v-img>
      <span>{{ $t("register.title") }}</span>
    </div>
    <v-form ref="login" v-model="valid" class="register-form">
      <v-row justify="center" no-gutters>
        <v-col cols="9" class="username py-0">
          <v-text-field
              color="btnColor"
              v-model="loginForm.username"
              :label="$t('register.username')"
              :rules="[() => !!loginForm.username && loginForm.username.length >=5 && loginForm.username.length <=16 || $t('register.errorUsername')]"
              required
              autocomplete="new-password"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="email py-0">
          <v-text-field
              color="btnColor"
              :rules="emailRules"
              v-model="loginForm.email"
              :label="$t('loginAndResister.email')"
              required
              autocomplete="new-password"
          ></v-text-field>
        </v-col>
        <verification-code :type="type" @sendCode="sendCode" :email="loginForm.email"></verification-code>
        <v-col cols="9" class="password py-0">
          <v-text-field
              color="password btnColor"
              v-model="loginForm.password"
              :label="$t('loginAndResister.password')"
              type="password"
              required
              autocomplete="new-password"
              :rules="[() => !!loginForm.password && loginForm.password.length <=32 && loginForm.password.length >=6 || $t('register.errorPassword')]"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="confirm-password py-0">
          <v-text-field
              color="btnColor"
              v-model="repeatPassword"
              :label="$t('register.againAccount')"
              type="password"
              required
              autocomplete="new-password"
              :rules="[affirmPass]"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="referral py-0">
          <v-text-field
              color="btnColor"
              v-model="loginForm.code"
              :label="$t('register.referral')"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="operation-col">
          <v-card-subtitle class="service pa-0">
            <v-checkbox
                dense
                class="service-checkbox"
                v-model="checkbox"
                hide-details
                :label="$t('register.text')"
            >
            </v-checkbox>
            <v-btn
                text
                small
                color="btnColor"
                class="mt-n2 ml-1 pa-0"
                @click="goService"
            >
              <div class="service-text">{{ $t("register.textService") }}</div>
            </v-btn>
          </v-card-subtitle>
          <v-btn
              block
              depressed
              class="create-account-btn btnColor btnWhite--text"
              @click="register"
              :loading="loading"
              :disabled="!valid || !checkbox"
          >
            <span class="bottomText">
              {{ $t("register.createAccount") }}
            </span>
          </v-btn>
        </v-col>
        <v-col cols="12" class="login-col btnColor--text">
          <div class="login-text">
            <span>{{ $t('register.haveAccount') + '?' }}</span>
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
import {signUp} from "@/api/user";
import i18n from '@/lang/index';
import VerificationCode from "../../../components/VerificationCode";
import {mapGetters} from "vuex";
// import router from "../../../router";
export default {
  name: "Register",
  components: {VerificationCode},
  data: () => ({
    valid: false,
    loading: false,
    checkbox: false,
    type: 1,
    repeatPassword: '',
    loginForm: {
      email: "",
      code: "",
      sms_code: "",
      password: "",
      username: "",
      profile: {
        phone_number: '',
        notice_url: '',
        tg_notice_chat_id: '',
      },
    },
    emailRules: [
      (v) => /.+@.+\..+/.test(v) || i18n.t("register.errorEmail"),
    ],
  }),
    computed: {
    ...mapGetters(["showingBindDialogType"]),
    },
  created() {
    if (localStorage.getItem("referral")) {
      this.loginForm.code = localStorage.getItem("referral")
    }
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
    goService() {
      this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", true);
    },
    sendCode(code) {
      this.loginForm.sms_code = code
    },
    register() {
      this.loading = true;
      let info = {...this.loginForm}
      if(!this.loginForm.code){
        delete this.loginForm.code
      }
      info.username = info.username.trim
      signUp(this.loginForm).then((res) => {
        if (res.code) {
          this.toasterErr(res.code)
          this.loading = false;
        } else {
          this.loading = false;
          this.$toast.success(this.$t("register.success"))
          this.$emit("showLogin")
        }
      }).catch((err) => {
        this.toasterErr(err.code)
        this.loading = false;
      });
    },
    goLogin() {
      this.$emit("showLogin")
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .v-input input {
  max-height: 50px;
}

>>> .v-label:nth-last-child(1) {
  font-size: 12px;
}

/*>>> .v-icon.v-icon {*/
/*  font-size: 16px;*/
/*  border-radius: 2px;*/
/*}*/

>>> .v-input--selection-controls__ripple {
  width: 0px !important;
  height: 0px !important;
}

.register-card {
  width: 650px;

  .register-logo {
    font-size: 24px;
    margin-top: 7px;
  }

  .register-form {
    margin-top: 43px;

    .username,
    .email,
    .password,
    .confirm-password,
    .referral {
      max-width: 440px;
      margin-bottom: 5px;
    }

    .referral {
      margin-bottom: 0px;
    }

    .operation-col {
      max-width: 440px;
      margin-top: 32px;

      .service {
        font-size: 12px;

        .service-checkbox {
          display: inline-block;
          font-size: 16px;
          margin-left: -4px;
        }

        .service-text {
          font-size: 12px;
        }
      }

      .create-account-btn {
        height: 50px;
        font-size: 20px !important;
        margin-top: 12px;
      }
    }

    .login-col {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 32px;

      .login-text {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .register-card {
    width: 288px;
    height: auto;
    margin: 120px auto 0px auto;

    .register-card-subtitle {
      padding-bottom: 9px;
    }
    
    .register-logo {
      font-size: 16px;
      margin-top: 0px;
    }

    .register-form {
      margin-top: 17px;

      .username,
      .email,
      .password,
      .confirm-password,
      .referral {
        max-width: 256px;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .operation-col {
        max-width: 256px;
        margin-top: 16px;

        .service {
          .service-checkbox {
            display: inline-block;
            font-size: 12px;
            margin-left: -4px;

            ::v-deep .v-label {
              font-size: 12px;
            }
          }

          .service-text {
            font-size: 12px;
          }
        }

        .create-account-btn {
          height: 38px;
          font-size: 16px !important;
          margin-top: 16px;
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

<style>
.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0px !important;
}
</style>