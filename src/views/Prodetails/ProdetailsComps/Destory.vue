<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card class="text-center mx-auto" width="606" height="463">
      <div class="text-right">
        <v-card-subtitle
            class="d-inline-block pt-3"
            @click="closeDestory"
        >
          <v-icon class="btnColor--text">close</v-icon>
        </v-card-subtitle>
      </div>
      <v-img
          style="margin-top: 9px"
          class="mx-auto"
          max-width="143"
          max-height="143"
          src="@/assets/fake/offShelf.png"
      ></v-img>
      <v-card-text cclass="navI18n--text pa-0"
                   style="font-size: 24px;margin-top:15px;font-weight: bold;line-height: 33px;"> {{ $t("productDetail.destoryDialog.confirmDestory") }}
      </v-card-text>
      <v-col cols="9" class="fontColor9--text text-left mx-auto" style="font-size: 16px">
        {{ $t("productDetail.destoryDialog.text") }}
      </v-col>
      <div class="d-flex justify-space-around px-4">
        <v-col cols="6" class="px-0" style="max-width: 260px">
          <v-btn depressed large block class="btnColor btnWhite--text" @click="showPasswordPage" style="height: 50px;font-size: 20px">
            {{ $t("confirmBtn") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="px-0" style="max-width: 260px">
          <v-btn depressed large outlined block color="btnColor" @click="closeDestory" style="height: 50px;font-size: 20px">
            {{ $t("cancelBtn") }}
          </v-btn>
        </v-col>
      </div>
    </v-card>
  </div>

</template>

<script>
import {deleteNFT} from "@/api/NFT";
import router from "@/router";
import {mapActions, mapGetters} from "vuex";
import i18n from '@/lang'
export default {
  name: "Destory",
  data: () => ({
    closeDestroyDialog : false
  }),
  props: [
    "NFTData",
  ],
  computed: {
    ...mapGetters(["name", "user", "host"]),
  },
  methods: {
    ...mapActions('alert',['showAlert']),
    closeDestory() {
      location.reload()
      this.$emit("closeDialog")
    },
    showPasswordPage() {
      this.$emit("showPasswordPage",
          this.$t("productDetail.buyDialog.titleBid"),
          '',
          "/nft/" + this.user.id + '/',
          deleteNFT,
          {id:this.NFTData.id},
          true
      )
    },
    //销毁
    confirmDestory() {
      deleteNFT(this.NFTData.id)
          .then((response) => {
            if(response.code === 0) {
              this.showAlert(i18n.t("productDetail.destoryDialog.closeDestory"))
              router.push("/user/" + this.user.id)
            }
          })
          .catch(() => {
          })
    },
  }
}
</script>

<style scoped>
.close {
  z-index: 999999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
