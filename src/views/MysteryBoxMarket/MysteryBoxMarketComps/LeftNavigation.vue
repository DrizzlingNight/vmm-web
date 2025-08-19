<template>
  <div class="leftNavigation">
    <v-navigation-drawer
      permanent
      class="navigationDrawer"
      :class="bigNavigationCss ? 'bigNavigationDrawer' : ''"
    >
      <v-list-item class="topListItem">
        <v-icon
          v-if="bigNavigationCss"
          color="fontColor"
          size="26"
          @click.stop="btnNavigationDrawer"
        >
          mdi-arrow-right
        </v-icon>
        <v-img
          v-if="!bigNavigationCss"
          class="filter"
          src="@/assets/market/filter.png"
        ></v-img>
        <v-list-item-title v-if="!bigNavigationCss" class="listItemTitle"
          >{{ $t("marketPlace.list") }}
        </v-list-item-title>
        <a v-if="!bigNavigationCss" @click.stop="btnNavigation">
          <v-icon color="fontColor" size="27">mdi-arrow-left</v-icon>
        </a>
      </v-list-item>
      <v-divider
        v-if="!bigNavigationCss"
        class="border2"
        style="opacity: 0.2"
      ></v-divider>
      <v-expansion-panels
        v-if="!bigNavigationCss"
        v-model="panels"
        flat
        multiple
        class="panels"
      >
        <v-expansion-panel class="panel">
          <v-expansion-panel-header class="panelHeader">
            <v-img class="panelImg" src="@/assets/market/mystery.png"></v-img>
            <div>{{ $t("mysteryBox.mysteryBoxMarket.type") }}</div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content eager class="background3 panelContent">
            <v-chip-group
              class="px-0 chipGroup"
              column
              multiple
              @change="selectedMysteryBoxStatus"
              :value="selectedMysteryBox"
            >
              <v-chip
                label
                outlined
                large
                v-for="(btn, index) in mysteryBoxStats"
                :key="btn.code"
                :value="btn"
                class="chip"
                active-class="chipActive"
                :class="isChipBtn.indexOf(index) != -1 ? 'chipActive' : ''"
              >
                {{ $t(`mysteryBox.mysteryBoxMarket.${btn.name}`) }}
              </v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="panel">
          <v-expansion-panel-header class="panelHeader">
            <v-img class="panelImg" src="@/assets/market/activity.png"></v-img>
            <div>{{ $t("mysteryBox.mysteryBoxMarket.activity") }}</div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content eager class="background3 panelContentList">
            <v-list max-height="300px" min-height="150px" class="list pa-0">
              <v-list-item-group
                v-model="carouselSelected"
                :mandatory="listSelect"
                style="width: 100%"
                class="listGroup"
                multiple
              >
                <template v-for="item in carouselList">
                  <v-list-item
                    :key="item.title"
                    class="listItem"
                    :value="item.id"
                  >
                    <template v-slot:default="{ active }">
                      <img :src="item.image" class="img" />
                      <span class="span">{{ item.name }}</span>
                      <v-spacer></v-spacer>
                      <v-list-item-action class="itemAction">
                        <div v-if="!active" class="disAction"></div>
                        <div v-else class="action">
                          <div></div>
                        </div>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="panel">
          <v-expansion-panel-header class="panelHeader">
            <v-img
              class="panelImg"
              src="@/assets/market/state_change.png"
            ></v-img>
            <div>{{ $t("mysteryBox.mysteryBoxMarket.state") }}</div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content eager class="background3 panelContent">
            <v-chip-group
              class="px-0 chipGroup"
              column
              @change="selectStatus"
              :value="selected"
            >
              <v-chip
                label
                outlined
                large
                v-for="btn in btnList"
                :key="btn.code"
                :value="btn"
                class="chip"
                active-class="chipActive"
              >
                {{ $t(`mysteryBox.mysteryBoxMarket.${btn.name}`) }}
              </v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="panel">
          <v-expansion-panel-header class="panelHeader">
            <v-img
              class="panelImg priceImg"
              contain
              src="@/assets/market/price.png"
            ></v-img>
            <div>{{ $t("mysteryBox.mysteryBoxMarket.price") }}</div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content class="panelContent">
            <div class="panelContentDiv">
              <div class="priceDiv">
                <v-text-field
                  hide-details
                  outlined
                  :placeholder="$t('mysteryBox.mysteryBoxMarket.minPrice')"
                  type="number"
                  v-model="minPrice"
                  class="inputPrice"
                  >{{ $t("marketPlace.price.price") }}
                </v-text-field>
              </div>
              <span class="pt-2 btnColor--text">to</span>
              <div class="priceDiv">
                <v-text-field
                  :placeholder="$t('mysteryBox.mysteryBoxMarket.maxPrice')"
                  type="number"
                  hide-details
                  outlined
                  v-model="maxPrice"
                  class="inputPrice"
                  autocomplete="off"
                ></v-text-field>
              </div>
            </div>
            <div class="applicationDiv">
            <v-btn
              block
              outlined
              class="application"
              :class="activeBtn ? 'applicationActive' : ''"
              @click="selectNFT(false)"
            >
              {{ $t("marketPlace.price.apply") }}
            </v-btn>
          </div>
          </v-expansion-panel-content>
          
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getBlindbox } from "@/api/mysteryBox";
// import router from "@/router";

export default {
  name: "LeftNavigation",
  data: () => ({
    panels: [0, 1, 2, 3],
    // clickList: [],
    minPrice: "",
    maxPrice: "",
    boxStatus: null,
    nftStatus: null,
    selectedMysteryBox: [],
    selected: null,
    activeBtn: true,
    bigNavigationCss: false,
    carouselList: [],
    // btnAction:true,
    isChipBtn: "",
    carouselSelected: [],
    listSelect: false,
    mysteryBoxStats: [
      { name: "game", value: "3" },
      { name: "blindBox", value: "2" },
      { name: "luxury", value: "0" },
    ],
    btnList: [
      { name: "buyNow", code: 1, info: { sell_way: "0" } },
      { name: "onAuction", code: 0, info: { sell_way: "1" } },
    ],
  }),
  created() {
    this.getBlindbox();
    setTimeout(() => {
      this.listSelect = false;
    }, 5000);
    // this.isChip();
  },
  mounted() {
    let d;
    if (this.$route.query.type === "1" || this.$route.query.type === "2") {
      this.boxStatus = [
        { name: "game", value: "3" },
        { name: "blindBox", value: "2" },
      ];
    }
    switch (this.$route.query.type) {
      case "1":
        d = "0,1";
        break;
      case "2":
        d = "0,1";
        break;
      case "3":
        d = "0";
        break;
      default:
        d = "5";
    }
    if (this.$route.query.type === "2") {
      // this.carouselSelected = [0];
      this.listSelect = true;
    }
    this.isChipBtn = d;
  },
  computed: {},

  methods: {
    // isChip() {
    //   switch (this.$route.query.type) {
    //     case "1":
    //       this.isChipBtn = "0,1";
    //       break;
    //     default:
    //       this.isChipBtn = "5";
    //   }
    // },
    isChip2() {
      // let m;
      switch (this.boxStatus) {
        case [
          { name: "game", value: "3" },
          { name: "blindBox", value: "2" },
          { name: "luxury", value: "0" },
        ]:
          this.isChipBtn = "0,1,2";
          break;
        case [
          { name: "game", value: "3" },
          { name: "blindBox", value: "2" },
        ]:
          this.isChipBtn = "0,1";
          break;
        case [
          { name: "blindBox", value: "2" },
          { name: "game", value: "3" },
        ]:
          this.isChipBtn = "0,1";
          break;
        case [
          { name: "luxury", value: "0" },
          { name: "game", value: "3" },
        ]:
          this.isChipBtn = "0,1";
          break;
        case [
          { name: "game", value: "3" },
          { name: "luxury", value: "0" },
        ]:
          this.isChipBtn = "0,1";
          break;

        case [
          { name: "blindBox", value: "2" },
          { name: "luxury", value: "0" },
        ]:
          this.isChipBtn = "0,1";
          break;
        case [
          { name: "luxury", value: "0" },
          { name: "blindBox", value: "2" },
        ]:
          this.isChipBtn = "0,1";
          break;
        case [{ name: "luxury", value: "0" }]:
          this.isChipBtn = "2";
          break;
        case [{ name: "blindBox", value: "2" }]:
          this.isChipBtn = "1";
          break;
        case [{ name: "game", value: "3" }]:
          this.isChipBtn = "0";
          break;
        default:
          this.isChipBtn = "5";
      }
      // if (m != this.$route.query.type) {
      //   this.isChipBtn = 10;
      // }
    },
    //点击左
    btnNavigation() {
      this.bigNavigationCss = true;
    },
    //点击右
    btnNavigationDrawer() {
      this.bigNavigationCss = false;
    },
    selectedMysteryBoxStatus(selectedMysteryBoxStatus) {
      this.boxStatus = selectedMysteryBoxStatus ? selectedMysteryBoxStatus : "";
      this.isChip2();
    },
    selectStatus(selectedStatus) {
      this.nftStatus = selectedStatus ? selectedStatus.info.sell_way : "";
    },
    //获取盲盒活动信息
    getBlindbox() {
      getBlindbox({})
        .then((response) => {
          this.carouselList = response.data.results;
        })
        .catch(() => {});
    },
    selectNFT() {
      this.activeBtn = true;
      // const query = JSON.parse(JSON.stringify(this.$route.query))
      // query.type = this.boxStatus.name;//state 修改的参数
      // router.push({path: this.$route.path, query})
      // router.replace({
      //   path: "/mystery_box/market",
      //   query: {
      //     state: this.boxStatus.name
      //   }
      // })
      // window.location.hash = this.$route.path + '?type=' + this.boxStatus.name
      // if (this.boxStatus) {
      //   history.replaceState(
      //     {},
      //     "",
      //     this.$route.path + "?type=" + this.boxStatus.name
      //   );
      // } else {
      //   history.replaceState({}, "", this.$route.path);
      // }
      let x = "";
      if (!this.boxStatus || !this.boxStatus.length) {
        x = "0,2,3";
      } else {
        for (let i = 0; i < this.boxStatus.length; i++) {
          if (i != this.boxStatus.length - 1) {
            x = x + this.boxStatus[i].value + ",";
          } else {
            x = x + this.boxStatus[i].value;
          }
        }
      }

      this.$emit(
        "clickApplication",
        x,
        this.carouselSelected.toString(),
        this.nftStatus,
        this.minPrice,
        this.maxPrice
      );
    },
  },
};
</script>

<style scoped lang="scss">
.leftNavigation {
  height: 90vh;

  .navigationDrawer {
    width: 340px !important;

    &.bigNavigationDrawer {
      width: 60px !important;
      border-right: 1px solid rgba(151, 151, 151, 0.2);
    }

    ::v-deep.v-navigation-drawer__border {
      background-color: transparent;
    }

    .topListItem {
      height: 53px;
      padding-left: 24px;
      padding-right: 24px;

      .filter {
        width: 20px;
        margin-right: 3px;
      }

      .listItemTitle {
        height: 28px;
        font-size: 20px;
        font-weight: 600;
        color: #050505;
        line-height: 28px;
      }
    }

    .panels {
      .panel {
        margin-top: 0px;

        .panelHeader {
          min-height: 48px;
          font-size: 14px;
          color: #050505;

          .panelImg {
            max-width: 16px;
            margin-right: 6px;

            &.priceImg {
              width: 10px;
              height: 14px;
            }
          }
        }

        .panelContent {
          padding: 17px 26px 5px 24px;

          ::v-deep .v-expansion-panel-content__wrap {
            padding: 0;
          }

          ::v-deep .v-slide-group__content {
            padding: 0;
          }

          ::v-deep .theme--light.v-chip--active:focus::before {
            opacity: 0;
          }

          .chipGroup {
            .chip {
              margin: 0 0 10px 0;
              height: 30px;
              font-size: 14px;
              color: #050505;
              width: 125px;
              text-align: center;
              display: inline-block;

              &.chipActive {
                color: #cc9933;
                background: white !important;
                border-color: #cc9933;
              }

              &:nth-child(1) {
                margin-right: 40px;
              }

              &:nth-child(3) {
                margin-right: 40px;
              }
            }
          }
        }

        .panelContentDiv {
          display: flex;
          justify-content: space-between;

          .priceDiv {
            width: 125px !important;
            height: 40px;
            min-height: 40px;
            margin-bottom: 15px;

            & ::v-deep .v-input--is-label-active {
              color: #cc9933 !important;
            }

            ::v-deep .v-input__slot {
              min-height: 40px;
            }
          }
        }

        .panelContentList {
          //padding-left:23px;
          //padding-right:23px;

          ::v-deep .v-expansion-panel-content__wrap {
            padding: 0;
          }

          ::v-deep .v-slide-group__content {
            padding: 0;
          }

          ::v-deep .theme--light.v-chip--active:focus::before {
            opacity: 0;
          }

          .list {
            .listGroup {
              .listItem {
                padding-left: 23px;
                padding-right: 23px;
                height: 50px;

                .img {
                  height: 32px;
                  margin-right: 14px;
                }

                .span {
                  height: 22px;
                  font-size: 16px;
                  font-weight: 400;
                  color: #050505;
                  line-height: 22px;
                }

                .itemAction {
                  .disAction {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid rgba(238, 238, 238, 1);
                    background-color: rgba(246, 245, 243, 1);
                  }

                  .action {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid rgba(204, 153, 51, 1);

                    div {
                      z-index: 99;
                      height: 12px;
                      border-radius: 50%;
                      width: 12px;
                      position: relative;
                      top: 3px;
                      left: 3px;
                      background-color: rgba(204, 153, 51, 1);
                    }
                  }
                }
              }
            }
          }
        }

        .applicationDiv {
          // padding: 10px 26px 5px 24px;

          .application {
            height: 40px;
            color: #cccccc;

            &.applicationActive {
              color: #cc9933;
              background: white !important;
              border-color: #cc9933;
            }
          }
        }
      }
    }
  }
}

::v-deep .v-btn.v-size--default {
  font-size: 14px !important;
}

@media (max-width: 980px) {
  .leftNavigation {
    .navigationDrawer {
      position: fixed;
      z-index: 999;
      width: 204px !important;
      margin-top: 110px;

      &.bigNavigationDrawer {
        width: 0px !important;
        border-right: 1px solid transparent;
      }
    }
  }
}
.theme--light.v-list-item--active:hover::before,
.theme--light.v-list-item--active::before {
  opacity: 0;
}
</style>