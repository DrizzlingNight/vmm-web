<template>
  <div class="mysteryBox1_wrapper">
    <div class="mysteryBox_content">
      <div class="d-flex justify-space-between topTitle">
        <div class="text">{{ $t("mysteryBox.fontPage.hotRecommend") }}</div>
        <div class="learnMore" @click="goMysteryBoxMarket">
          {{ $t("mysteryBox.fontPage.learnMore") }}
        </div>
      </div>
      <div v-if="mysteryBoxList1.length">
        <v-row class="d-flex row" no-gutters>
          <mystery-box-card
            @click.native="goMysteryBox(item)"
            class="mysteryBox_card"
            v-for="(item, idx) in mysteryBoxList1"
            :key="idx"
            :item="item"
          ></mystery-box-card>
        </v-row>
      </div>
      <div v-else class="default">
        <v-row class="d-flex justify-space-between" no-gutters>
          <div class="mx-auto" style="max-width: 90%">
            <default-none></default-none>
<!--            <v-img-->
<!--              contain-->
<!--              max-height="475"-->
<!--              max-width="612"-->
<!--              src="@/assets/fake/defaultnull.png"-->
<!--            ></v-img>-->
<!--            <p style="font-size: 36px; color: #959595; text-align: center">-->
<!--              {{ $t("getNothing") }}-->
<!--            </p>-->
          </div>
        </v-row>
      </div>
      <div class="goMarket">
        <v-btn
          @click="goMysteryBoxMarket"
          depressed
          block
          style="height: 50px; font-size: 24px"
          class="btnColor btnWhite--text"
        >
          <span style="font-size: 16px">{{
            $t("mysteryBox.fontPage.goMysteryBoxMarket")
          }}</span>
        </v-btn>
      </div>
    </div>
    <div class="mysteryBox_contentId">
      <div class="d-flex justify-space-between topTitle">
        <div class="text">{{ $t("mysteryBox.fontPage.text") }}</div>
        <div class="learnMore" @click="goMysteryBoxMarket2">
          {{ $t("mysteryBox.fontPage.learnMore") }}
        </div>
      </div>
      <div v-if="mysteryBoxList2.length">
        <v-row class="d-flex justify-space-between" no-gutters>
          <mystery-box-card
            @click.native="goMysteryBox(item)"
            class="mysteryBox_card"
            v-for="(item, idx) in mysteryBoxList2"
            :key="idx"
            :item="item"
          ></mystery-box-card>
        </v-row>
      </div>
      <div v-else class="default">
        <v-row class="d-flex justify-space-between" no-gutters>
          <div class="mx-auto" style="max-width: 90%">
            <default-none></default-none>

<!--            <v-img-->
<!--              contain-->
<!--              max-height="475"-->
<!--              max-width="612"-->
<!--              src="@/assets/fake/getNothing.png"-->
<!--            ></v-img>-->
<!--            <p style="font-size: 36px; color: #959595; text-align: center">-->
<!--              {{ $t("getNothing") }}-->
<!--            </p>-->
          </div>
        </v-row>
      </div>
      <div class="goMarket">
        <v-btn
          @click="goMysteryBoxMarket2"
          depressed
          block
          style="height: 50px; font-size: 24px"
          class="btnColor btnWhite--text"
        >
          <span style="font-size: 16px">{{
            $t("mysteryBox.fontPage.goMysteryBoxMarket")
          }}</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MysteryBoxCard from "@/views/MysteryBox/MysteryBoxComps/mysteryBoxCard";
import router from "@/router";
import { getNFTList } from "@/api/NFT";
import { getBlindbox } from "@/api/mysteryBox";
import DefaultNone from "@/components/DefaultNone";

export default {
  name: "bottomContent",
  components: { MysteryBoxCard, DefaultNone },
  data: () => ({
    mysteryBoxList1: [],
    mysteryBoxList2: [],
    items: [
      {
        name: "178787878787878787878787878787823",
        current_price: "1178787878787823",
        coin: "BNB",
        user: {
          profile: {
            avatar: "",
          },
          username: "1232123",
        },
      },
      {
        name: "178787878787878787878787878787823",
        current_price: "1178787878787823",
        coin: "BNB",
        user: {
          profile: {
            avatar: "",
          },
          username: "1232123",
        },
      },
      {
        name: "178787878787878787878787878787823",
        current_price: "1178787878787823",
        coin: "BNB",
        user: {
          profile: {
            avatar: "",
          },
          username: "1232123",
        },
      },
      {
        name: "178787878787878787878787878787823",
        current_price: "1178787878787823",
        coin: "BNB",
        user: {
          profile: {
            avatar: "",
          },
          username: "1232123",
        },
      },
    ],
    // id:''
  }),
  created() {
    this.getBlindbox();
    this.getMysteryBox1();
  },
  methods: {
    goMysteryBoxMarket() {
      router.push({
        path: "/mystery_box/market",
        query: {
          type: "1",
        },
      });
    },
    goMysteryBoxMarket2() {
      router.push({
        path: "/mystery_box/market",
        query: {
          type: "2",
        },
      });
    },
    goMysteryBox(item) {
      router.push("nft/" + item.id);
    },
    getMysteryBox1() {
      let info = {};
      info.type = "2,3";
      // info.sort = "-sell_info__price";
      info.is_onsale = true;
      info.is_hot = true;
      info.status = 0;
      getNFTList(info)
        .then((response) => {
          this.mysteryBoxList1 = response.data.results.slice(0, 4);
        })
        .catch(() => {});
    },
    //获取盲盒活动信息
    getBlindbox() {
      getBlindbox({})
        .then((response) => {
          // this.id = response.data.results[0].id
          this.getMysteryBox2(response.data.results[0].id);
        })
        .catch(() => {});
    },
    getMysteryBox2(id) {
      let info = {};
      info.type = "2,3";
      // info.sort = "-sell_info__price";
      info.is_onsale = true;
      info.is_hot = true;
      info.blindbox = id;
      info.status = 0;
      // console.log(info);
      getNFTList(info)
        .then((response) => {
          this.mysteryBoxList2 = response.data.results.slice(0, 4);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
.mysteryBox1_wrapper {
  width: 100%;
  padding: 0px 330px;
  margin-top: 28px;

  .mysteryBox_content {
    .topTitle {
      color: #050505;
      line-height: 50px;
      height: 50px;
      font-size: 36px;
      align-items: end;

      .learnMore {
        cursor: pointer;
        color: #cc9933;
        line-height: 33px;
        height: 33px;
        font-weight: 400;
        font-size: 24px;
      }
    }
    .mysteryBox_card {
      margin-right: 20px;
      &:last-child {
        margin-right: 0px;
      }
    }
    .goMarket {
      margin-bottom: 50px;
    }
    .default {
      margin-bottom: 30px;
    }
  }
  .mysteryBox_contentId {
    // margin-top: 20px;

    .topTitle {
      color: #050505;
      line-height: 50px;
      height: 50px;
      font-size: 36px;
      align-items: end;

      .learnMore {
        cursor: pointer;
        color: #cc9933;
        line-height: 33px;
        height: 33px;
        font-weight: 400;
        font-size: 24px;
      }
    }
    .mysteryBox_card {
      margin-right: 20px;
      &:last-child {
        margin-right: 0px;
      }
    }
    .goMarket {
      margin-bottom: 150px;
    }
    .default {
      margin-bottom: 30px;
    }
  }
}

@media (max-width: 600px) {
  .mysteryBox_card {
    width: 100% !important;
  }
}

@media (max-width: 980px) and (min-width: 600px) {
  .mysteryBox_card {
    width: calc((100% - 40px) / 2) !important;
  }
}

@media (min-width: 980px) {
  .mysteryBox_card {
    width: calc((100% - 60px) / 4) !important;
  }
}
@media screen and (max-width: 1564px) {
  .mysteryBox1_wrapper {
    padding: 0px 130px;
  }
}

@media screen and (max-width: 960px) {
  .mysteryBox1_wrapper {
    padding: 0px 20px;
  }
}
</style>