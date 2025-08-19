<template>
  <v-footer dark class="flex-column navI18n footer">
    <v-container fluid class="pa-0">
      <!-- 最上面一列(LOGO跟contacts) -->
      <v-row no-gutters class="d-flex justify-space-between align-center mb-4 mb-md-8">
        <!-- LOGO -->
        <v-img
          class="d-inline-block"
          style="margin-right: 5px;"
          alt="Vmm Logo"
          contain
          max-width="122px"
          height="32px"
          src="/static/footer/logo_with_text.svg"
          transition="scale-transition"
        />
        <!-- 聯絡方式&社群 -->
        <div class="d-flex" style="gap: 10px;">
          <v-btn
            icon
            v-for="(connection, i) in connections"
            :key="i"
            width="24"
            height="24"
            @click="window.open(connection.link)"
          >
            <v-img contain max-width="24" max-height="24" aspect-ratio="1" :src="connection.icon"></v-img>
          </v-btn>
        </div>
      </v-row>
      <!-- divider -->
      <v-divider class="mb-4 mb-md-8"></v-divider>
      <!-- 合作夥伴標題 -->
      <v-row no-gutters class="mb-3">
        <v-col style="font-size: 12px" class="fontColor5--text">{{
          $t("footer")
        }}</v-col>
      </v-row>
      <!-- 合作夥伴 LOGO -->
      <v-row no-gutters class="d-flex mb-4 mb-md-8" style="gap: 24px;">
        <div v-for="(partner, i) in footImage" :key="i">
          <img
            @click="goTab(partner.links)"
            :src="host + partner.thumb"
            height="20px"
          />
        </div>
      </v-row>
      <!-- copyright -->
      <v-row
        no-gutters
        class="text-caption"
        style="color:rgba(100, 106, 123, 1);"
        >© 2021 VMM. All rights reserved.
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
import { mapGetters } from "vuex";
import * as _ from "lodash";

export default {
  name: "Footer",
  data: () => ({
    partners: [
      "/static/footer/tokenpocket.png",
      "/static/footer/huobi.png",
      "/static/footer/math.png",
      "/static/footer/et.png",
      "/static/footer/hufu.png",
      "/static/footer/newdex.png",
      "/static/footer/meet.png",
    ],
    connections: [
      {
        icon: "/static/footer/discord.png",
        link: "https://discord.gg/ZuX27C5kn7",
      },
      {
        icon: "/static/footer/twitter.png",
        link: "https://twitter.com/vmm_official",
      },
      {
        icon: "/static/footer/telegram.png",
        link: "https://t.me/vmm_official",
      },
      {
        icon: "/static/footer/medium.png",
        link: "https://medium.com/@vmm_official",
      },
    ],
    window: window,
  }),
  computed: {
    ...mapGetters(["config", "host"]),
    footImage() {
      return _.values(this.config.links);
    },
  },
  methods: {
    toTop() {
      document.documentElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
    goTab(pash) {
      this.$router.push(pash);
    },
    goAbout() {
      this.$router.push("/about");
    },
  },
};
</script>

<style lang="scss" scoped>

.footer {
  width: 100%;
  padding: 16px 160px 16px 160px; 
}

@media screen and (max-width: 1264px) {
  .footer {
    padding: 16px 100px 16px 100px;
  }
}

@media screen and (max-width: 960px) {
  .footer {
    padding: 16px 16px 16px 16px;
  }
}

</style>
