<template>
  <v-card class="login-card">
    <v-card-subtitle class="login-card-subtitle text-right pt-2 pr-2">
      <v-btn v-if="showingBindDialogType < 0" @click="closeDialog" icon>
        <v-icon class="btnColor--text text-right">close</v-icon>
      </v-btn>
    </v-card-subtitle>
    <div class="login-logo d-flex justify-center btnColor--text pa-0">
      <span>{{ $t("login.title") }}</span>
      <v-img contain src="@/assets/lightLogo.png" class="ml-1" max-width="81" aspect-ratio="3.37"></v-img>
    </div>
    <v-form ref="login" v-model="valid" class="login-form">
      <v-row justify="center" no-gutters>
        <v-col cols="9" class="username py-0">
          <v-text-field
              color="btnColor"
              v-model="loginForm.username"
              :label="$t('register.username')"
              :rules="[() => !!loginForm.username && loginForm.username.length >=5 && loginForm.username.length <=64 || $t('register.errorUsername')]"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="password py-0">
          <v-text-field
              color="btnColor"
              v-model="loginForm.password"
              :label="$t('loginAndResister.password')"
              type="password"
              required
              :rules="[() => !!loginForm.password && loginForm.password.length <=32 && loginForm.password.length >=6 || $t('register.errorPassword')]"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="operation-col">
          <v-btn
              text
              small
              class="forget-password btnColor--text pa-0 mt-11"
              @click="showPassword"
          >
            {{ $t("login.noPassword") }}?
          </v-btn>
          <v-btn
              depressed
              block
              class="login-btn btnColor btnWhite--text"
              @click="login"
              :loading="loading"
              :disabled="!valid"
          >
                  <span class="bottomText">
                    {{ $t("loginAndResister.login") }}
                  </span>
          </v-btn>
          <v-col cols="12" class="no-account-col">
            <v-btn
              text
              small
              class="forget-password-h5 btnColor--text pa-0"
              @click="showPassword"
          >
            {{ $t("login.noPassword") }}?
          </v-btn>
            <div class="no-account btnColor--text">
              <span>{{ $t('login.noAccount') }}</span>
              <a @click="goRegister" class="pa-0 btnColor--text text-decoration-underline font-weight-bold">
                {{ $t("login.register") }}
              </a>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-form>

  </v-card>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "Login",
  data: () => ({
    valid: false,
    loading: false,
    loginForm: {
      email: "",
      password: "",
      username: "",
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
    showPassword() {
      this.$emit("showPassword")
    },
    login() {
      this.loading = true;
      this.$store
          .dispatch("user/login", this.loginForm)
          .then(() => {
            this.loading = false;
            this.$emit("closeDialog")
          })
          .catch((error) => {
            this.toasterErr(error.code)
            this.loading = false;
          });
    },
    goRegister() {
      this.$emit("showRegister")
    },
    closeDialog() {
      this.$emit("closeDialog")
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .v-input input {
  max-height: 50px;
}

>>> .theme--dark.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before {
  border-color: rgba(102, 102, 102, .73);
}

.login-card {
  width: 650px;
  height: 544px;

  .login-logo {
    font-size: 24px;
    margin-top: 7px;
  }

  .login-form {
    margin-top: 56px;
  
    .username {
      max-width: 440px;
    }

    .password {
      max-width: 440px;
    }

    .operation-col {
      max-width: 440px;

      .forget-password {
        opacity: 0.73;
        font-size: 16px;
        margin-bottom: 30px;
      }

      .login-btn {
        height: 50px;
        font-size: 20px !important;
      }

      .no-account-col {
        display: flex;
        justify-content: center;
        margin-top: 9px;

        .forget-password-h5 {
          display: none;
        }

        .no-account {
          font-size: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .login-card {
    width: 288px;
    height: auto;
    margin: 80px auto 0px auto;

    .login-card-subtitle {
      padding-bottom: 9px;
    }
    
    .login-logo {
      font-size: 16px;
      margin-top: 0px;
    }

    .login-form {
      margin-top: 17px;

      .username {
        max-width: 256px;
        font-size: 14px;
      }

      .password {
        max-width: 256px;
        font-size: 14px;
      }

      .operation-col {
        max-width: 256px;

        .forget-password {
          display: none;
        }

        .login-btn {
          height: 38px;
          font-size: 16px !important;
        }

        .no-account-col {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 9px;

          .forget-password-h5 {
            display: block;
            opacity: 0.73;
            font-size: 12px;
          }
          .no-account {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
