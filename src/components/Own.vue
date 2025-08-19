<template>
  <v-card-actions class="pa-0">
    <v-list-item class="grow px-0">
      <v-list-item-avatar size="86">
        <v-img contain src="@/assets/fake/people.png"></v-img>
      </v-list-item-avatar>
      <div class="ml-2">
        <div class="userFont btnWhite--text" style="font-size: 24px">{{
            user ? user.username : "--"
          }}
        </div>
<!--        <div class="btnWhite&#45;&#45;text mt-1" style="font-size: 12px;opacity: 0.7">{{ user ? showCodeUrl : '&#45;&#45;'}}</div>-->
      </div>
    </v-list-item>
  </v-card-actions>
</template>

<script>
import {mapGetters} from "vuex";
import {getUserWallet} from '@/api/wallet'

export default {
  name: "Own",
  data: () => ({
    QRcodeUrl: ''
  }),
  created() {
    if(this.user) {
      this.getUserWallet({coin: 1, user: this.user.id})
    }
  },
  computed: {
    ...mapGetters(["name", "user"]),
    showCodeUrl() {
        const forward = this.QRcodeUrl.substring(0, 5)
        const Rear = this.QRcodeUrl.substring(this.QRcodeUrl.length-4)
        return forward +'...'+Rear
    }
  },
  watch: {
    user() {
      if(this.user) {
        this.getUserWallet({coin: 1, user: this.user.id})
      }
    }
  },
  methods: {
    getUserWallet(info) {
      getUserWallet(info)
          .then((response) => {
            this.QRcodeUrl = response.data.address
          })
          .catch(() => {
          })
    }
  }
}
</script>

<style scoped>
.userFont {
  width: 157px;
  font-size: 24px;
  font-family: Arial-BoldMT, Arial;
  font-weight: normal;
  line-height: 28px;
}
</style>