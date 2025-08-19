<template>
  <div class="d-flex fill-height" style="min-height: 100vh">
    <v-navigation-drawer permanent
                         :class="{shownavigation:showDrawer,hidenavigation:!showDrawer}"
    >
      <v-list-item style="padding-left: 26px;padding-right: 20px;height: 53px" class="background3">
        <v-icon v-if="mini" class="ml-n3" color="fontColor" size="26" @click.stop="btnNavigationDrawer">
          mdi-arrow-right
        </v-icon>
        <v-img v-if="!mini" width="23px" src="@/assets/fake/assets/filter.png"></v-img>
        <v-list-item-title style="font-weight: bold;font-size: 20px;line-height:28px;margin-left: 2px" v-if="!mini"
                           class="navI18n--text">{{ $t("marketPlace.list") }}
        </v-list-item-title>
        <a
            @click.stop="btnNavigation"
            v-if="!mini"
        >
          <v-icon color="fontColor" size="26">mdi-arrow-left</v-icon>
        </a>
      </v-list-item>

      <v-divider class="border2" style="opacity: 0.2"></v-divider>
      <v-expansion-panels
          v-if="!mini"
          v-model="panels"
          flat
          multiple
      >
        <v-expansion-panel class="panel"
        >
          <v-expansion-panel-header style="height: 48px;padding-left: 26px;padding-right: 26px">
            <div class="navI18n--text" style="font-size: 16px;font-weight: 600;line-height: 22px">
              <v-icon class="fontColor--text">mdi-list-status
              </v-icon>
              {{ $t("marketPlace.status.status") }}
            </div>

          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content
              style="padding: 17px 26px 15px 26px"
              eager
              class="background3"
          >
            <v-chip-group
                class="px-0"
                column
                @change="selectStatus"
                :value="selectedStatus"
            >
              <v-chip active-class="btnColor btnColor--text" label outlined large
                      class="col-6 px-0 justify-center ma-0 navI18n--text" v-for="btn in btnList" :key="btn.code"
                      :value="btn" style="height: 30px;max-width: 125px">
                <div style="font-size: 14px">{{ $t(`marketPlace.status.${btn.name}`) }}</div>
              </v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
        </v-expansion-panel>

        <v-expansion-panel class="panel mt-0"
        >
          <v-expansion-panel-header style="height: 53px;padding-right: 26px;padding-left: 26px">
            <div class="navI18n--text" style="font-size: 16px;font-weight: 600;line-height: 22px">
              <v-icon class="fontColor--text" style="height: 17px;width: 10px;margin-right: 9px">mdi-currency-usd
              </v-icon>
              {{ $t("marketPlace.price.price") }}
            </div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content style="padding: 16px 26px 15px 26px" class="background3">
            <v-container>
              <v-form v-model="valid">
                <v-row class="d-flex justify-space-between">
                  <v-col cols="6" class="pa-0" style="max-width: 115px">
                    <v-text-field
                        hide-details
                        flat
                        solo
                        outlined
                        :label="$t('marketPlace.price.min')"
                        type="number"
                        v-model="minPrice"
                        class="inputPrice"
                    >{{ $t("marketPlace.price.price") }}
                    </v-text-field>
                  </v-col>
                  <span
                      class="pt-2 btnColor--text"
                  >to</span>
                  <v-col cols="6" class="pa-0" style="max-width: 115px">
                    <v-text-field
                        :label="$t('marketPlace.price.max')"
                        type="number"
                        hide-details
                        flat
                        solo
                        outlined
                        v-model="maxPrice"
                        class="inputPrice"
                        autocomplete="off"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <span class="mt-n2 caption red--text col-12"
                        v-if="!showErrorMessage">{{ $t("marketPlace.price.priceErr") }}</span>
                  <v-col class="pa-0 col-7" style="max-width: 165px">
                    <v-btn
                        :class="!showErrorMessage?'mt-n4':'mt-5'"
                        style="width: 100%;height: 40px;font-size: 14px !important;"
                        dense
                        outlined
                        :disabled="nonePriceFilter || !valid || !showErrorMessage"
                        @click="selectNFT(false)">
                      {{ $t("marketPlace.price.apply") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <v-navigation-drawer absolute v-model="smallDrawer" temporary style="width: 204px"
                         :class="{shownSmallNvigation:showSmallDrawer,hideSmallNavigation:!showSmallDrawer}"
    >
      <v-list-item style="padding-left: 14px;padding-right: 11px;height: 53px" class="background3">
        <v-img width="23px" src="@/assets/fake/assets/filter.png"></v-img>
        <v-list-item-title style="font-weight: bold;font-size: 20px;line-height:28px;margin-left: 9px" v-if="!mini"
                           class="navI18n--text">{{ $t("marketPlace.list") }}
        </v-list-item-title>
        <v-btn
            icon
            @click="smallDrawer = false"
        >
          <v-icon color="fontColor" size="26">mdi-arrow-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider class="border2" style="opacity: 0.2"></v-divider>
      <v-expansion-panels
          v-model="panels"
          multiple
          flat
      >
        <v-expansion-panel class="panel"
        >
          <v-expansion-panel-header style="height: 48px;padding-left: 14px">
            <div class="navI18n--text" style="font-size: 24px;font-weight: 600;line-height: 22px">
              <v-icon class="fontColor--text mr-n1" size="28">mdi-list-status</v-icon>
              {{ $t("marketPlace.status.status") }}
            </div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content
              style="padding: 9px 11px 1px 14px"
              eager
              class="background3"
          >
            <v-chip-group
                column
                @change="selectStatus"
                :value="selectedStatus"
            >
              <v-chip active-class="btnColor btnColor--text" label outlined large class="justify-center ma-0"
                      v-for="btn in btnList" :key="btn.code"
                      :value="btn" style="height: 37px;margin-bottom: 10px !important;">
                <div style="font-size: 20px;" class="navI18n--text">{{ $t(`marketPlace.status.${btn.name}`) }}</div>
              </v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
        </v-expansion-panel>
        <v-expansion-panel class="panel mt-0"
        >
          <v-expansion-panel-header style="height: 53px;padding-left: 8px">
            <div class="navI18n--text" style="font-size: 24px;font-weight: 600;line-height: 22px">
              <v-icon class="fontColor--text mr-n2" size="28">mdi-currency-usd</v-icon>
              {{ $t("marketPlace.price.price") }}
            </div>
          </v-expansion-panel-header>
          <v-divider class="border2" style="opacity: 0.2"></v-divider>
          <v-expansion-panel-content style="padding: 17px 11px 19px 14px" class="background3">
            <v-container>
              <v-form v-model="valid">
                <v-row class="d-flex justify-space-between">
                  <v-col cols="6" class="pa-0" style="max-width: 65px">
                    <v-text-field
                        :label="$t('marketPlace.price.min')"
                        type="number"
                        hide-details
                        flat
                        solo
                        outlined
                        v-model="minPrice"
                        class="inputPrice"
                    >{{ $t("marketPlace.price.price") }}
                    </v-text-field>
                  </v-col>
                  <span
                      class="pt-2 btnColor--text"
                  >to</span>
                  <v-col cols="6" class="pa-0" style="max-width:65px">
                    <v-text-field
                        :label="$t('marketPlace.price.max')"
                        type="number"
                        hide-details
                        flat
                        solo
                        outlined
                        v-model="maxPrice"
                        class="inputPrice"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <span class="mt-n2 caption red--text col-12"
                        v-if="!showErrorMessage">{{ $t("marketPlace.price.priceErr") }}</span>
                  <v-col class="pa-0 col-11" style="max-width: 165px">
                    <v-btn
                        :class="!showErrorMessage?'mt-n4':'mt-5'"
                        style="width: 100%;height: 40px;font-size: 14px !important;"
                        dense
                        outlined
                        :disabled="nonePriceFilter || !valid || !showErrorMessage"
                        @click="selectNFT(false)">
                      {{ $t("marketPlace.price.apply") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <v-container fluid class="rightContainer"
                 style="padding-top: 41px;padding-left: 0px;padding-right: 58px;min-width: 360px !important;">
      <v-row
          class="justify-space-between mb-5"
          no-gutters
      >
        <div class="d-flex align-self-end">
          <a @click="smallDrawer = true" class="icon ml-5 mt-2">
            <v-icon size="26">mdi-arrow-right</v-icon>
          </a>
          <v-col
              class="align-center d-flex pa-0" :class="(selectedStatus || showPriceFilterStatus)?'ml-14':'ml-2'">
            <v-chip
                label outlined
                style="font-size: 14px;height: 40px;border-radius: 4px;"
                class="d-flex justify-space-between"
                v-if="selectedStatus"
                close
                @click:close="selectStatus()"
            >
              <span class="btnColor--text">{{ $t(`marketPlace.status.${selectedStatus.name}`) }}</span>
            </v-chip>
            <v-chip
                label outlined
                style="height: 40px;border-radius: 4px;"
                v-if="showPriceFilterStatus"
                class="ma-2 btnColor--text"
                close
                @click:close="selectNFT(true)"
            >
              {{ `${$t("marketPlace.price.price")} : ${showPriceFilterInfo}` }}
            </v-chip>
            <span class="btnColor--text" :class="selectedStatus?'ml-2':'ml-14'"
                  style="font-size: 36px !important;margin-left: 15px;height: 46px">{{ dataLength }}<span
                style="font-size: 21px;margin-left: 5px">{{ $t('marketPlace.result') }}</span></span>
          </v-col>
        </div>
        <v-col
            class="d-none d-md-flex justify-end"
        >
          <div
              style="max-width: 250px;"
          >
            <v-select
                :items="items"
                hide-details
                flat
                solo
                outlined
                :label="$t('marketPlace.priceOrder')"
                :item-text="selectLabelGet"
                v-model="sortValue"
                @change="getNFTList"
            ></v-select>
          </div>
          <div
              style="max-width: 250px;margin-left: 20px;"
          >
            <v-select
                :items="timeSortItems"
                outlined
                solo
                flat
                hide-details
                :label="$t('marketPlace.timeOrder')"
                :item-text="selectLabelGet"
                v-model="timeSortValue"
                @change="getNFTList"
            ></v-select>
          </div>
        </v-col>
      </v-row>
      <div style="min-height: 75vh">
        <v-row
            id="nftlistshow"
            class="d-flex"
            v-if="(data.length !== 0)" no-gutters>
          <show-case
              class="showCase"
              style="margin-left: 58px"
              v-for="(item, idx) in data"
              :key="item.id"
              :id="`nft${idx}`"
              :item="item"></show-case>
        </v-row>
      </div>
      <v-row no-gutters v-if="(data.length !== 0)">
        <v-col cols="12">
          <v-pagination
              color="btnColor"
              v-model="page"
              :length="pageLength"
              :total-visible="7"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-row
          class="d-flex flex-column align-center my-10"
      >
        <v-col
            class="col-10 col-sm-6 justify-center py-16"
            v-if="(data.length === 0) && (!loading)"
        >
          <default-none
              type="getNothing"
          ></default-none>
        </v-col>
      </v-row>
      <overlay :loading="loading"></overlay>
    </v-container>
  </div>
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";
import {getNFTList} from "@/api/NFT";
import ShowCase from "@/components/showCase"
import DefaultNone from "@/components/DefaultNone";
import Overlay from "../../components/Overlay";

export default {
  name: "assets",
  components: {
    Overlay,
    DefaultNone,
    "show-case": ShowCase
  },
  data: () => ({
    panels: [0, 1],
    // drawer: true,
    smallDrawer: false,
    showSmallDrawer: true,
    mini: false,
    data: '',
    sortValue: '',
    timeSortValue: '-sell_info__onsale_time',
    minPrice: '',
    showDrawer: true,
    maxPrice: '',
    showMin: "",
    showMax: "",
    valid: false,
    items: [{text: 'priceOrderH2L', value: '-sell_info__price'}, {text: 'priceOrderL2H', value: 'sell_info__price'}],
    timeSortItems: [{text: 'timeOrderN2O', value: '-sell_info__onsale_time'}, {
      text: 'timeOrderO2N',
      value: 'sell_info__onsale_time'
    }],
    page: 1,
    pageLength: 1,
    limit: 2 * 3 * 4,
    rowNum: 3,
    searchInfo: null,
    loading: false,
    selectedStatus: null,
    btnList: [
      {name: 'onAuction', code: 0, info: {sell_way: 1}},
      {name: 'buyNow', code: 1, info: {sell_way: 0}},
    ],
    dataLength: 0
  }),
  created() {
    this.getNFTList()
  },
  computed: {
    ...mapGetters(["host", "user"]),
    showPriceFilterInfo() {
      if (this.showMin === "" && this.showMax !== "")
        return `< ${this.showMax}`
      if (this.showMin !== "" && this.showMax === "")
        return `> ${this.showMin}`
      return `${this.showMin} - ${this.showMax}`
    },
    nonePriceFilter() {
      return (this.minPrice === "") && (this.maxPrice === "")
    },
    showPriceFilterStatus() {
      return (this.showMax !== "") || (this.showMin !== "")
    },
    showErrorMessage() {
      // console.log(this.minPrice)
      // console.log(this.maxPrice)
      // console.log(this.minPrice <= this.maxPrice)
      if (this.minPrice === '' || this.maxPrice === '') {
        return true
      } else if (this.minPrice <= this.maxPrice) return true
      else return false
    },
    price() {
      return (index) => {
        return Number(this.data[index].price).toFixed(2)
      }
    },
  },
  watch: {
    page() {
      this.getNFTList(false)
      document.documentElement.scrollIntoView({block: 'start', behavior: 'smooth'})
    }
  },
  methods: {
    rowNumber() {
      let nftlistshowDom = document.getElementById('nftlistshow')
      let nft0Dom = document.getElementById('nft0')
      let num = nftlistshowDom && nft0Dom && (nftlistshowDom.offsetWidth / nft0Dom.offsetWidth) || 0
      num = Math.floor(num)
      this.limit = num * this.rowNum
      this.data = this.data.slice(0, this.limit);
      this.pageLength = (parseInt(this.dataLength / this.limit) + ((this.dataLength % this.limit) && 1 || 0)) || 1
    },
    selectLabelGet(a) {
      return this.$t(`marketPlace.${a.text}`)
    },
    getNFTList(resetPage = true) {
      let info = this._.cloneDeep(this.selectedStatus && this.selectedStatus.info || {})
      this.loading = true

      this.minPrice && (info.min_price = this.minPrice)
      this.maxPrice && (info.max_price = this.maxPrice)
      this.sortValue && (info.ordering = this.sortValue)
      this.timeSortValue && (info.ordering = `${info.ordering && (info.ordering + ',') || ''}${this.timeSortValue}`)

      info.limit = this.limit
      if (resetPage)
        this.page = 1
      info.offset = this.limit * (this.page - 1)
      info.status = 0 //去掉销毁的数据
      // info.is_onsale = true//取消出售状态
      info.is_expired = false
      getNFTList(info)
          .then((response) => {
            this.loading = false
            this.data = response.data.results;
            this.dataLength = response.data.count
            this.pageLength = (parseInt(response.data.count / this.limit) + ((response.data.count % this.limit) && 1 || 0)) || 1
            this.$nextTick(this.rowNumber)
          })
          .catch(() => {
            this.loading = false
          });
    },
    selectStatus(selectedStatus) {
      this.selectedStatus = selectedStatus
      this.getNFTList()
    },
    selectNFT(reset = false) {
      if (reset) {
        this.minPrice = ""
        this.maxPrice = ""
      }
      this.showMin = this.minPrice
      this.showMax = this.maxPrice
      this.getNFTList();
    },
    goNFT(_id) {
      router.push("/nft/" + _id);
    },
    btnNavigation() {
      this.mini = !this.mini
      this.showDrawer = false
    },
    btnNavigationDrawer() {
      this.mini = !this.mini
      this.showDrawer = true
    }
  }
}
</script>

<style>
.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}

.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
<style scoped>
.panel {
  background-color: rgba(0, 0, 0, 0) !important;
}

@media screen and (max-width: 960px) {
  .shownavigation {
    display: none;
  }

  .hidenavigation {
    display: none;
  }

  .shownSmallNvigation {
    display: block;
  }

  .hideSmallNavigation {
    display: none;
  }

  .icon {
    display: block;
  }

  #nftlistshow {
    justify-content: center;
  }
}

>>> [data-v-300a6045] .v-expansion-panel-content__wrap, .v-chip-group--column .v-slide-group__content {
  padding: 0px;
}

@media screen and (min-width: 960px) {
  .icon {
    display: none;
  }

}

>>> .v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {
  border-color: #424242 !important;
}

.shownavigation {
  /*width: 340px !important;*/
  min-width: 340px;
}

.hidenavigation {
  width: 48px !important;
}

>>> .v-chip-group--column .v-slide-group__content {
  justify-content: space-between;
}

>>> .v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 48px;
}

>>> .theme--light.v-btn.v-btn--disabled {
  color: #CCCCCC !important;
  background: transparent !important;
}

>>> .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: transparent;
}

>>> .v-input__control > .v-input__slot {
  min-height: 42px !important;
  line-height: 42px !important;
}

>>> .mdi-close-circle::before {
  width: 12px;
  height: 12px;
  background-image: url(../../assets/fake/assets/close.png);
  background-position: center;
}

>>> .mdi-close-circle::before {
  background-color: transparent;
  color: transparent;
}

>>> .v-expansion-panel-content__wrap {
  padding: 0px !important;
}

>>> .v-expansion-panel-header {
  padding: 12px 11px 12px 11px;
}

>>> .v-text-field--outlined.v-input--dense .v-label {
  color: #959595;
}

>>> .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  text-align: center;
}

@media (max-width: 980px) {
  .showCase {
    width: calc(100% - 40px) !important;
    margin-left: 20px !important;
    margin-right: 20px;
  }

  .rightContainer {
    padding: 10px 0px !important;
  }
}

@media screen and (min-width: 980px) and (max-width: 1400px) {
  .showCase {
    width: calc((100% - 116px) / 2) !important;
  }
}

@media (min-width: 1401px) and (max-width: 1820px) {
  .showCase {
    width: calc((100% - 177px) / 3) !important;
  }
}

@media (min-width: 1821px) and (max-width: 2220px) {
  .showCase {
    width: calc((100% - 232px) / 4) !important;
  }
}

@media (min-width: 2221px) and (max-width: 2620px) {
  .showCase {
    width: calc((100% - 290px) / 5) !important;
  }
}

@media (min-width: 2621px) and (max-width: 2820px) {
  .showCase {
    width: calc((100% - 348px) / 6) !important;
  }
}

@media (min-width: 2821px) and (max-width: 3221px) {
  .showCase {
    width: calc((100% - 406px) / 7) !important;
  }
}
</style>
