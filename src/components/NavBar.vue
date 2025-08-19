<template>
  <div v-if="route.indexOf('/bind') == -1">
    <v-app-bar color="background" app height="72px">
      <!-- //! 960px以上顯示 -->
      <div
        class="d-none d-md-flex align-center fill-height lg-navbar-content"
        style="width: 100%"
      >
        <!-- // ! LOGO 按鈕 -->
        <v-btn
          text
          @click="goFrontPage"
          class="px-0 logo-btn"
        >
          <v-img
            alt="Vmm Logo"
            max-width="100px"
            max-height="28px"
            src="../assets/lightLogo.png"
            transition="scale-transition"
          />
        </v-btn>
        <!-- //! 搜尋列 -->
        <search style="margin-left: 225px" class="search" v-if="0"></search>

        <!-- //! 遊戲NFT按鈕 -->
        <button
          class="game-nft-btn"
          :class="$route.name === 'MysteryBox' ? 'activeBtn' : ''"
          @click="goMysteryBoxMarket"
        >
          {{ $t("navibar.mysteryBox") }}
        </button>

        <!-- //! 實物NFT按鈕 -->
        <a
          text
          @click="goHome"
          class="entity-nft-btn"
          :class="$route.name === 'Home' ? 'activeBtn' : ''"
        >
          <span>{{ $t("navibar.luxury") }}</span>
        </a>

        <v-spacer></v-spacer>

        <!-- //! 交易市場按鈕 -->
        <a
          text
          @click="goMarketPlace"
          class="marketplace-btn"
        >
          <span
            :class="marketPlace ? 'activeBtn' : ''"
            >{{ $t("navibar.marketplace") }}</span
          >
        </a>

        <!-- //! 挖礦按鈕 -->
        <a
          @click="$router.push({ name: 'mining' })"
          class="mining-btn"
        >
          <span
            :class="route.search('/mining') != -1 ? 'activeBtn' : ''"
            >{{ $t("mining.mining") }}</span
          >
        </a>

        <!-- //! 兌換按鈕&右上角紅點 -->
        <v-badge
          dot
          :color="isShowSwapRedPoint ? 'red' : 'transparent'"
          class="d-flex align-center justify-center swap-btn-badge"
        >
          <!-- //! 兌換按鈕 -->
          <a
            text
            @click="goSwap"
            class="swap-btn"
            :class="$route.name === 'TokenSwap' ? 'activeBtn' : ''"
          >
            <span>{{ $t("navbar.tokenSwap") }}</span>
          </a>
        </v-badge>

        <!-- //! 推薦按鈕 -->
        <a
          @click="goInvitation"
          class="invitation-btn"
        >
          <span
            :class="route.search('/invitation') != -1 ? 'activeBtn' : ''"
            >{{ $t("invitation.recommend") }}</span
          >
          </a>

        <!-- //! 語言選擇器 -->
        <div class="text-center" style="margin-right: 32px; z-index: 999">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
                class="px-0 lang-btn"
              >
                <v-avatar size="24px" class="mr-6 mr-lg-2">
                  <v-img class="img" :src="selectedLanguage.imgUrl"></v-img>
                </v-avatar>
                <span
                  class="mr-6 d-none d-lg-block navI18n--text"
                  style="font-size: 14px; font-weight: bold"
                  >{{ selectedLanguage.imgName }}</span
                >
                <v-img
                  class="ml-n4"
                  height="7px"
                  width="13px"
                  src="@/assets/fake/arrow.png"
                ></v-img>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item
                v-for="(item, index) in language"
                :key="index"
                @click="choiceLanguage(item)"
                class="px-1 navI18n--text"
                style="min-height: 40px"
              >
                <v-img
                  class="img"
                  width="30px"
                  height="30px"
                  :src="item.imgUrl"
                ></v-img>
                <v-list-item-title class="ml-4">{{
                  item.imgName
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <!-- //! 登入與註冊鈕 -->
        <div v-if="!this.user" class="d-flex">
          <v-btn
            @click="showLogin"
            color="btnColor"
            outlined
            class="login-btn"
            style="margin-right: 15px; width: 80px; height: 32px"
            ><span style="font-size: 16px; font-weight: bold">{{
              $t("navibar.login")
            }}</span>
          </v-btn>
          <v-btn
            elevation="0"
            @click="showRegister"
            class="mr-7 d-none d-lg-block register-btn"
            color="btnColor"
            style="width: 80px; height: 32px"
            ><span
              class="background--text"
              style="font-size: 16px; font-weight: bold"
              >{{ $t("login.register") }}</span
            >
          </v-btn>
        </div>

        <!-- //! 用戶下拉選單 -->
        <div v-else style="margin-right: 20px; z-index: 999">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
                class="px-0 user-btn"
              >
                <v-icon large class="d-xl-none">mdi-account</v-icon>
                <div class="d-none d-xl-flex align-center">
                  <v-avatar size="24px" class="mr-2">
                    <v-img v-if="user.profile.avatar" :src="user.profile.avatar"></v-img>
                    <v-icon v-else large>mdi-account</v-icon>
                  </v-avatar>
                  <div
                    class="d-none d-md-flex fontColor--text"
                    style="font-size: 14px; font-weight: bold; max-width: 94px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                  >
                    {{ username }}
                  </div>
                  <v-img
                    class="d-none d-md-flex ml-4"
                    width="14px"
                    height="8px"
                    src="@/assets/fake/arrow.png"
                  ></v-img>
                </div>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item
                v-for="(item, index) in items"
                style="min-height: 40px"
                :key="index"
                class="px-2 navI18n--text"
                @click="goDifferPage(index)"
              >
                <v-icon size="22px">{{ item.icon }}</v-icon>
                <v-list-item-title class="ml-6" style="font-size: 14px">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-divider vertical class="border" style="position: relative; min-height: 36px; height: 36px; top: 50%; transform: translate(0%, -50%);"></v-divider>

        <!-- //! 錢包按鈕 -->
        <div
          @click="goPersonalAccount"
          style="width: 68px"
          class="purse purse-btn"
        >
          <v-img
            width="24px"
            height="24px"
            class="ma-auto"
            src="@/assets/fake/purse.png"
          ></v-img>
        </div>
      </div>

      <!-- //! 960px以下顯示 -->
      <div
        class="d-flex d-md-none justify-space-between align-center"
        style="width: 100%"
      >
        <!-- //! 登入鈕 -->
        <div v-if="!this.user">
          <v-btn class="btnColor ml-5" @click="showLogin"
            ><span class="smallRegister btnWhite--text">{{
              $t("navibar.login")
            }}</span>
          </v-btn>
        </div>
        <!-- //! 用戶下拉選單 -->
        <div v-else style="z-index:999">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
                class="px-0"
                style="margin-left: 20px"
              >
                <v-avatar size="30px">
                  <v-img v-if="user.profile.avatar" :src="user.profile.avatar || require(`@/assets/fake/people.png`)"></v-img>
                  <v-icon v-else large>mdi-account</v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item
                v-for="(item, index) in items"
                style="min-height: 40px"
                :key="index"
                class="px-2"
                @click="goDifferPage(index)"
              >
                <v-icon size="22px">{{ item.icon }}</v-icon>
                <v-list-item-title class="ml-6" style="font-size: 14px">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- //! LOGO按鈕 -->
        <v-btn text @click="goFrontPage">
          <div class="d-flex flex-column align-center">
            <v-img
              alt="Vmm Logo"
              max-width="86px"
              max-height="23px"
              src="../assets/lightLogo.png"
              transition="scale-transition"
            />
            <v-img
              class="mt-3"
              src="../assets/logoText.png"
              transition="scale-transition"
              max-height="9px"
              max-width="129px"
            ></v-img>
          </div>
        </v-btn>
        <!-- //! 錢包按鈕 -->
        <div @click="goPersonalAccount" class="purse">
          <v-img
            class="mr-5"
            width="21px"
            height="22px"
            src="@/assets/fake/purse.png"
          ></v-img>
        </div>
      </div>
    </v-app-bar>
    <!-- //! 960px以下的 手機版導航下方橫條區塊 -->
    <div
      class="d-flex d-md-none justify-space-between px-5 bottomText"
      style="margin-top: 72px"
    >
      <!-- //! 橫條區塊左側的 hamburger -->
      <div>
        <v-app-bar-nav-icon
          max-width="24px"
          @click.stop="drawer = !drawer"
          color="#CC9933"
        ></v-app-bar-nav-icon>

        <!--        <v-menu offset-y>-->
        <!--          <template v-slot:activator="{ on, attrs }">-->
        <!--            <v-btn-->
        <!--                color="#CC9933"-->
        <!--                text-->
        <!--                class="pa-0"-->
        <!--                v-bind="attrs"-->
        <!--                v-on="on"-->
        <!--            >-->
        <!--              <v-icon>mdi-menu</v-icon>-->
        <!--            </v-btn>-->
        <!--          </template>-->
        <!--          <v-list class="pa-0">-->
        <!--            <v-list-item-->
        <!--                v-for="link in links"-->
        <!--                :key="link.id"-->
        <!--                @click="navLinkOnclick(link.linkName)"-->
        <!--                class="px-1"-->
        <!--                style="min-height: 40px"-->
        <!--            >-->
        <!--              <v-list-item-title class="ml-4 mr-2"-->
        <!--                                 style="color: #424242;">{{ $t(`navibar.${link.name}`) }}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item>-->
        <!--          </v-list>-->
        <!--        </v-menu>-->
      </div>

      <!--      <a text @click="goMarketPlace" class="marketPlace navI18n&#45;&#45;text">-->
      <!--        <span class="d-inline-block mt-3" style="font-size: 14px">{{-->
      <!--            $t("navibar.marketplace")-->
      <!--          }}</span>-->
      <!--      </a>-->

      <!-- //! 橫條區塊右側的語言選擇器 -->
      <div class="text-center mt-1">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text class="pa-0">
              <span style="font-size: 14px">{{
                selectedLanguage.imgName
              }}</span>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item
              v-for="(item, index) in language"
              :key="index"
              @click="choiceLanguage(item)"
              class="px-1"
              style="min-height: 40px"
            >
              <v-img
                class="img"
                width="30px"
                height="30px"
                :src="item.imgUrl"
              ></v-img>
              <v-list-item-title class="ml-4">{{
                item.imgName
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <!-- //! 左側滑出的導航drawer -->
    <v-navigation-drawer
      v-model="drawer"
      color="#F6F5F3"
      absolute
      style="width: 83%"
    >
      <v-icon
        style="margin-top: 130px; margin-left: 28px"
        size="25"
        color="#CC9933"
        @click.stop="drawer = !drawer"
      >
        mdi-arrow-left
      </v-icon>
      <v-list style="margin-top: 5px">
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="link in links"
            :key="link.id"
            @click="navLinkOnclick(link.linkName)"
            class="px-1"
            style="min-height: 40px"
          >
            <v-list-item-title
              style="
                color: #424242;
                font-size: 18px;
                font-weight: 600;
                padding-left: 28px;
              "
            >
              {{ $t(`navibar.${link.name}`) }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="logOutDialog" width="606px">
      <log-out v-if="logOut" @closeLogOut="closeLogOut"></log-out>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

import i18n from "../lang";
import * as _ from "lodash";
import Search from "./Search";
import LogOut from "./logOut";

export default {
  name: "NavBar",
  components: { LogOut, Search },
  data: () => ({
    selectedItem: 0,
    logOut: false,
    drawer: false,
    group: null,
    links: [
      {
        id: 1,
        name: "marketplace",
        linkName: "MysteryBoxMarket",
      },
      {
        id: 2,
        name: "mining",
        linkName: "mining",
      },
      {
        id: 3,
        name: "invitation",
        linkName: "invitation",
      },
    ],
  }),
  computed: {
    ...mapGetters([
      "name",
      "user",
      "isShowDrawerDialog",
      "isShowLoginDialog",
      "showingBindDialogType",
      "isShowSwapRedPoint",
    ]),
    logOutDialog() {
      return this.logOut;
    },
    route() {
      return this.$route.path;
    },
    marketPlace() {
      let path = this.$route.fullPath;
      if (
        path === "/mystery_box/market" ||
        path === "/mystery_box/market?type=game" ||
        path === "/mystery_box/market?type=blindBox"
      ) {
        return true;
      }
      return false;
    },
    items() {
      return [
        {
          icon: "mdi-account",
          text: i18n.t("navibar.account"),
        },
        {
          icon: "mdi-file-document",
          text: i18n.t("navibar.history"),
        },
        {
          icon: "mdi-logout",
          text: i18n.t("navibar.logout"),
        },
      ];
    },
    language: {
      get() {
        let res = Object.keys(i18n.messages);
        return res.map((l) => ({
          imgUrl: `static/language/${l}.png`,
          imgName: i18n.messages[l]["language"],
          lang: l,
        }));
      },
      set() {},
    },
    selectedLanguage: {
      get() {
        let selected = i18n.locale;
        let res = _.find(this.language, (lang) => lang.lang === selected);
        return res || this.language[0];
      },
      set() {},
    },
    username() {
      if (this.user && this.user.username && this.user.username.length > 10) {
        return this.user.username.substr(0, 10) + "...";
      }
      return this.user.username;
    },
  },
  created() {
    // window.i18n = i18n
  },
  methods: {
    showLogin() {
      this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", false);
      this.$store.commit("ui/SET_IS_REGISTER_DIALOG", false);
      this.$store.commit("ui/SET_IS_PASSWORD_DIALOG", false);
      this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", true);
    },
    showRegister() {
      this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", false);
      this.$store.commit("ui/SET_IS_REGISTER_DIALOG", false);
      this.$store.commit("ui/SET_IS_PASSWORD_DIALOG", false);
      this.$store.commit("ui/SET_IS_REGISTER_DIALOG", true);
    },
    goUserHome() {
      if (this.$route.path != `/user/${this.user.id}/`)
        router.push(`/user/${this.user.id}/`);
    },
    goFrontPage() {
      if (this.$route.path != `/mystery_box`) router.push("/mystery_box");
    },
    //前往首页
    goHome() {
      if (this.$route.path != `/home`) router.push("/home");
    },
    goSwap() {
      if (this.$route.path != `/token_swap`) router.push("/token_swap");
    },
    //前往交易市场
    goMarketPlace() {
      if (this.$route.path != `/mystery_box/market`)
        router.push("/mystery_box/market");
    },
    //前往盲盒交易市场
    goMysteryBoxMarket() {
      if (this.$route.path != `/mystery_box`) router.push("/mystery_box");
    },
    //前往奢侈品交易市场
    goLuxuryMarket() {
      if (this.$route.path != `/mystery_box/market`)
        router.push({
          path: "/mystery_box/market",
          query: {
            type: "luxury",
          },
        });
    },
    goInvitation() {
      if (this.user) {
        this.$router.push({ name: "invitation" });
      } else {
        this.showLogin();
      }
    },
    //选择多语言
    choiceLanguage(item) {
      let app = document.getElementById("app");
      this.selectedLanguage = item;
      i18n.locale = item.lang;
      localStorage.setItem("language", item.lang);
      if (i18n.locale === "ko-KR") {
        app.style.fontFamily = "GmarketSans";
      } else {
        app.style.fontFamily = "";
      }
    },
    goDifferPage(index) {
      if (index === 0) {
        if (this.$route.path != `/user/${this.user.id}/`)
          router.push(`/user/${this.user.id}/`);
      } else if (index === 1) {
        if (this.$route.path != `/trade/`) router.push(`/trade/`);
      } else if (index === 2) {
        this.logOut = true;
        // logOut();
        // this.$store.commit("user/SET_USER", null);
        // if (this.$route.path != "/") router.push("/");
      }
    },
    goPersonalAccount() {
      let drawer = this.isShowDrawerDialog;
      this.$store.commit("ui/SET_IS_SHOW_DRAWER_DIALOG", !drawer);
    },
    closeLogOut() {
      this.logOut = false;
    },
    navLinkOnclick(linkName) {
      this.$router.push({ name: linkName });
    },
  },
};
</script>

<style lang="scss" scoped>
.purse {
  cursor: pointer;
}

.marketPlace {
  color: #ebebeb;
}

::v-deep .v-toolbar__content,
.v-toolbar__extension {
  padding: 0;
}

.bottomText {
  position: fixed;
  z-index: 2;
  width: 100%;
}

.activeBtn {
  color: #cc9933 !important;
}

.lg-navbar-content {
  .logo-btn {
    margin-left: 16px;
    margin-right: 40px;
  }
  .game-nft-btn {
    font-size: 20px;
    font-weight: 600;
    margin-right: 32px;
  }
  .entity-nft-btn {
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .marketplace-btn {
    margin-right: 32px;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .mining-btn {
    margin-right: 32px;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .swap-btn-badge {
    margin-right: 32px;
    .swap-btn {
      span {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .invitation-btn {
    margin-right: 32px;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 1904px) {
  
}

@media screen and (max-width: 1264px) {
  
}

@media screen and (max-width: 960px) {
  .btnColor {
    width: 40px !important;
    min-width: 40px !important;
    height: 22px !important;
    border-radius: 2px !important;
  }

  .smallRegister {
    width: 40px !important;
    height: 22px !important;
    font-size: 12px !important;
    transform: scale(0.9);
    font-weight: 500 !important;
    line-height: 22px !important;
  }
}

@media screen and (max-width: 600px) {
  
}

::v-deep .v-btn:not(.v-btn--round).v-size--default {
  min-width: 30px;
}

/*.img {*/
/*  -webkit-filter: grayscale(100%); !* Chrome, Safari, Opera *!*/
/*  filter: grayscale(100%);*/
/*}*/
</style>
