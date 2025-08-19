<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center mx-auto" width="650px" height="520px">
      <v-card-subtitle class="text-right pt-2 pr-2 pb-0">
        <v-btn @click="closePassword" icon>
          <v-icon class="btnColor--text">close</v-icon>
        </v-btn>
      </v-card-subtitle>
      <v-card-text style="font-size: 24px" class="navI18n--text mt-8">{{ $t("productDetail.passwordDialog.passwordValidation") }}
      </v-card-text>
      <v-card-text style="font-size: 16px;margin-top: 18px">
        {{ $t("productDetail.passwordDialog.verifyIdentidy") }}
      </v-card-text>
      <v-form v-model="passwordVilid">
        <v-col cols="9" class="d-flex pb-0 ma-auto mt-12" style="max-width: 440px">
          <v-text-field
              color="btnColor"
              v-model="password"
              :label="$t('confirmPassword.password')"
              :rules="[passwordRules]"
              required
              type="password"
              @input="changePassword"
          ></v-text-field>
        </v-col>
        <v-col cols="9" class="d-flex mx-auto" style="margin-top: 76px;max-width: 440px">
          <v-btn
              depressed
              x-large
              block
              class="btnColor btnWhite--text"
              :disabled="!passwordVilid"
              style="height: 50px;font-size: 20px"
              @click="passwordConfrim"
          >
            {{ $t("confirmBtn") }}
          </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import i18n from '@/lang'
import {mapActions, mapGetters} from "vuex";
import router from "@/router";
export default {
  name:'Password',

  data () {
    return {
      passwordVilid: false,
      passwordJudge: false,
      password: "",
    }
  },
  props: [
    "requestFunc",
    "requestParams",
    "typeFun"
  ],
  computed: {
    ...mapGetters(["name", "user", "host"]),
  },
  methods:{
    ...mapActions('alert',['showAlert']),
    closePassword() {
      location.reload()
      this.$emit("closeDialog")
      this.toasterErr(i18n.t("errorClose"));
    },
    passwordRules(val) {
      if (!val) {
        return false;
      }
      if (this.passwordJudge) {
        return "密码错误";
      }
      return true;
    },
    changePassword() {
      this.passwordJudge = false;
    },
    passwordConfrim() {
      this.requestFunc({
        ...this.requestParams,
        password: this.password,
      }).then((response) => {
        if (response.code != 0) {
          this.passwordJudge = true;
          this.passwordJudge = true;
          this.toasterErr(response.code)
        } else {
          if(this.typeFun) {
            this.$toast.success(i18n.t("productDetail.destoryDialog.closeDestory"))
            router.push("/user/" + this.user.id + '/')
          }else {
            this.$emit("closeDialog")
            this.$emit("success")
          }

        }
      })
      .catch(() => {
      });
    },
  }
}
</script>

<style  scoped>
>>> .v-input input {
  max-height: 50px;
}

</style>
