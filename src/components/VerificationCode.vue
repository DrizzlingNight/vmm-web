<template>
  <v-col cols="9" class="py-0" style="max-width: 440px;margin-bottom: 8px">
    <v-text-field
        color="btnColor"
        v-model="code"
        :label="$t('resetPassword.verificationCode')"
        required
        :rules="[() => !!code]"
        @input="sendCode"
        autocomplete="new-password"
    ></v-text-field>
    <v-btn
        v-if="sendPassword"
        text
        class="btnColor--text d-flex float-right mt-n16 px-3"
        @click="sendVerificationCode"
        :disabled="isBtn"
    >
      <span class="bottomText">{{ $t("resetPassword.sendVerificationCode") }}</span>
    </v-btn>
    <div v-else class="btnColor--text float-right mt-n14 px-3" style="font-size: 16px">{{ time }}s</div>
  </v-col>
</template>

<script>
import {sendEmail} from "@/api/user";
export default {
  name: "VerificationCode",
  props:["email","type"],
  data:() =>({
    time: 60,
    code:null,
    sendPassword: true,
  }),
  computed:{
    isBtn() {
      return this.email === ''
    }
  },
  methods:{
    sendCode() {
      this.$emit("sendCode",this.code)
    },
    //发送验证码
    sendVerificationCode() {
      sendEmail({email: this.email, code_type: this.type}).then((res) => {
        if (res.code === 0) {
          this.sendPassword = false
          this.countTime()
          // this.$emit("resetForm")
          // this.resetForm()
          this.$toast.success(this.$t('resetPassword.successSendVerificationCode'))
        } else {
          this.toasterErr(res.code)
        }
      }).catch((err) => {
        console.error('err', err)
      })
    },
    countTime() {
      this.time = this.time - 1
      let timer = setTimeout(this.countTime, 1000)
      if (this.time === -1) {
        this.time = 60
        this.sendPassword = true
        clearTimeout(timer)
      }
    }
  }
}
</script>

<style scoped>

</style>