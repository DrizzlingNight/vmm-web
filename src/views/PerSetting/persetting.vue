<template>
  <v-container fluid class="pa-0">
    <v-row justify="center" no-gutters>
      <v-col cols="12" class="py-0 px-0 mb-n3">
        <v-img
            class=""
            height="280px"
            src="@/assets/fake/back.png"
        >
        </v-img>
      </v-col>
      <v-col cols="12" class="text-center pt-0 mt-n16" style="z-index: 0">
        <div style="width: 142px;height:142px;border-radius: 50%" class="mx-auto">
          <v-img width="142px" src="@/assets/fake/people.png"></v-img>
        </div>
      </v-col>
      <v-col cols="12" class="text-center navI18n--text"
             style="margin-top: 24px;font-size: 24px;line-height: 33px;font-weight: bold">
        <div>
          <span class="navI18n--text">{{ userData ? userData.username : '--' }}</span>
          <v-btn
              class="pr-0"
              text
              x-small
              v-clipboard:copy="userData && userData.username"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
          >
            <v-img
                class="d-inline-block"
                max-height="13"
                max-width="14"
                src="@/assets/fake/copy.png"
            ></v-img>
          </v-btn>
        </div>
      </v-col>
      <v-col class="mt-5 pa-0 isCreator" v-if="isCreator">
        <v-col cols="12" class="pa-0">
          <v-tabs v-model="tabCreator" class="mx-auto" active-class="btnColor btnWhite--text" height="68px" fixed-tabs
                  hide-slider
                  style="max-width: 720px;border-radius: 500px !important;">
            <v-tab class="btnColor--text pa-0 tab" v-for="item in isCreatorTabItem" :key="item"
                   :href="'#' + item"
                   style="border: 1px solid #CC9933;font-size: 24px;line-height: 33px;height: 68px !important;">
              {{ $t(`persetting.${item}`) }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" class="pa-0" style="min-height: 110px">
          <v-tabs-items v-model="tabCreator">
            <v-tab-item value="createNft">
              <created-n-f-t></created-n-f-t>
            </v-tab-item>
            <v-tab-item value="checkTitle">
              <Own :userData="userData" :selectedBtn="selectedBtn" @changSidebarValue="changSidebarValue"
                   @createdNft="createdNft" @changeBtn="changeBtn"></Own>
            </v-tab-item>
            <v-tab-item value="historyTitle">
              <History></History>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-col>
      <v-col class="mt-5 pa-0 noIsCreator" v-else>
        <v-col cols="12" class="pa-0">
          <v-tabs v-model="tabNoCreator" class="mx-auto" active-class="btnColor btnWhite--text" height="68px"
                  fixed-tabs hide-slider
                  style="max-width: 720px;">
            <v-tab class="btnColor--text pa-0 tab" v-for="item in noCreatorTabItem" :key="item"
                   :href="'#' + item"
                   style="border: 1px solid #CC9933;font-size: 24px;line-height: 33px;height: 68px !important;">
              {{ $t(`persetting.${item}`) }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" class="pa-0" style="min-height: 110px">
          <v-tabs-items v-model="tabNoCreator">
            <v-tab-item value="myCollect">
              <collection v-if="userData" :userData="userData" :tab="tabNoCreator"></collection>
            </v-tab-item>
            <v-tab-item value="NFT">
              <NFT :type="true" :userData="userData" :selectedBtn="selectedBtn"></NFT>
            </v-tab-item>
            <v-tab-item value="entityNFT">
              <Own :userData="userData" :selectedBtn="selectedBtn" @changSidebarValue="changSidebarValue"
                   @createdNft="createdNft" @changeBtn="changeBtn"></Own>
            </v-tab-item>
            <v-tab-item value="blindBox">
              <blind-box :type="true" :userData="userData" :selectedBtn="selectedBtn"></blind-box>
            </v-tab-item>
            <v-tab-item value="historyTitle">
              <History></History>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";
import {mapActions, mapGetters} from "vuex";
import {getUser} from "@/api/user";
import Own from "./PersettingComps/Own"
import History from "./PersettingComps/History"
import i18n from '@/lang'
import CreatedNFT from "./PersettingComps/CreatedNFT";
import Collection from "./PersettingComps/Collection";
import NFT from "@/views/PerSetting/PersettingComps/NFT";
import BlindBox from "@/views/PerSetting/PersettingComps/blindBox";

export default {
  name: "persetting",
  components: {
    BlindBox,
    NFT,
    Collection,
    CreatedNFT,
    // Redemption,
    Own,
    History
  },
  data: () => ({
    items: [
      "Created",
      "Transferred",
      "Revoked",
      "Selling",
      "Off shelf",
      "Expired",
      "Favorites",
      "Offers",
      "Activity",
    ],
    tabCreator: "createNft",
    tabNoCreator: "myCollect",
    isCreatorTabItem: ["createNft", "checkTitle", "historyTitle"],
    noCreatorTabItem: ["myCollect", "NFT", "entityNFT", "blindBox", "historyTitle"],
    userData: null,
    drawer: true,
    mini: false,
    // redemption:true,
    selectedBtn: "",
    btnArray: [
      {name: "own"},
      {name: "collection"},
    ],
    sidebarValue: "own",
  }),
  mounted() {
    if (this.$route.params.selectedTab === 'entityNFT') {
      this.tabNoCreator = 'entityNFT'
    }else if(this.$route.params.selectedTab === 'checkTitle'){
      this.tabCreator = 'checkTitle'
    }else if(this.$route.params.selectedTab === 'NFT'){
      this.tabNoCreator = 'NFT'
    }
  },
  computed: {
    ...mapGetters(["user"]),
    isCreator() {
      return this.userData && this.user && this.userData.id === this.user.id && this.user.profile.is_creator
    },
    persettingDialog() {
      return this.redemption
    },
    // tabItem() {
    //   // if (!this.NFT) return ["info", "bid", "offer", "history", "detail"];
    //   if (this.isCreator) return ["createNft", "checkTitle", "historyTitle"];
    //   if (!this.isCreator) return ["myCollect", "ownTitle", "historyTitle"]
    //   return ["myCollect", "ownTitle", "historyTitle"]
    // },
  },
  created() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    changSidebarValue(val) {
      this.sidebarValue = val
    },
    onCopy() {
      this.showAlert(i18n.t("copySuccess"))
    },
    onError() {
    },
    createdNft() {
      router.push("/creatednft/");
    },
    getUser(id) {
      getUser(id)
          .then((response) => {
            this.userData = response.data;
          })
          .catch(() => {
          });
    },
    changeBtn(val) {
      this.selectedBtn = val
    }
  },
};
</script>

<style scoped lang="scss">
.userimage {
  border: 3px solid white;
}

> > > .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: transparent;
}

@media (max-width: 1158px) {
  .navigation {
    display: none !important;
  }
}

.tab:nth-child(1) {
  border-radius: 6px 0px 0px 6px;
}

.isCreator {
  .tab:nth-child(3) {
    border-radius: 0px 6px 6px 0px;
  }
}
.noIsCreator {
  .tab:nth-child(5) {
    border-radius: 0px 6px 6px 0px;
  }
}

</style>
