<template>
  <div style="box-shadow: -2px -3px 4px 0px rgba(0, 0, 0, 0.15);min-height: 94vh">
    <v-card flat class="pt-md-9 pt-5 pb-0 cardPadding" style="padding-left: 43px;padding-right: 33px;">
      <v-row class="d-flex justify-space-between" no-gutters>
        <div
            class="d-inline-block pa-0 fontColor6--text"
            style="font-size: 30px;max-width:87%"
        >
          <div class="description1">
            {{ this.NFT ? this.NFT.name : "--" }}
          </div>
        </div>
        <!--        <div style="width: 82px;height: 32px;border-radius: 4px;"-->
        <!--             class="mt-4 cellection d-flex justify-center align-center" v-if="0">-->
        <!--          <div>-->
        <!--            <v-img width="14px" height="12px" class="d-inline-block" style="margin-right: 5px"-->
        <!--                   src="@/assets/fake/nftDetail/collect.png"></v-img>-->
        <!--            <span style="font-size: 16px">{{ 12 }}</span>-->
        <!--          </div>-->
        <!--        </div>-->
        <collection-btn :n-f-t="NFTData"></collection-btn>
      </v-row>
      <v-card-text
          v-if="NFT&&NFT.type === 0"
          class="pa-0"
          style="font-size: 14px; height: 40px;margin-top: 63px;margin-bottom: 50px"
      >
        <div class="description2">
          {{ this.NFT ? this.NFT.description : "--" }}
        </div>
      </v-card-text>
      <div v-if="NFT&&NFT.type !== 0" style="margin-top: 31px;margin-bottom: 17px">
        <div class="topText">
          <div class="div"></div>
          <v-img class="logo" src="@/assets/avatar/avatar.png"></v-img>
          <span class="span">{{ NFT.blindbox ? NFT.blindbox.sub_title : "" }}</span>
        </div>
        <div class="btn"  style="margin-bottom: 17px">
          <div class="img" v-if="NFT && NFT.type == 2">
            <v-img width="32" height="24" max-width="32" src="@/assets/treasure.png"></v-img>
            <span>X 1</span>
          </div>
          <v-btn v-if="isMine && NFT.type === 2" :disabled="NFT.is_onsale" class="btnColor white--text" height="44px" style="border-radius: 6px;padding: 11px 28px 11px 29px"
                 elevation="0" @click="openBlindboxBtn">{{ $t("mysteryBox.mysteryBoxNft.open") }}
          </v-btn>
        </div>
        <div class="opened" v-if="NFT.type === 3">
          <div class="name">{{ NFT.blindbox ? NFT.blindbox.name : "" }}</div>
          <div class="detail">
            <div class="rarity">
              <img class="img" contain :src="require('@/assets/rarity/'+showImg+'.png')">
              <span>X <span>1</span></span>
            </div>
            <div class="idText">
              <p><span>ID:</span>{{ NFT.token_id}}</p>
            </div>
          </div>
        </div>
      </div>
      <nft-owner :n-f-t="NFT" class="mb-6"></nft-owner>
      <v-tabs
          v-model="tab"
          color="basil"
          grow
          active-class="font-weight-bold"
          slider-color="btnColor"
          slider-size="2"
          style="z-index: 99;"
          show-arrows
      >
        <v-tab

            style="font-size: 16px "
            v-for="item in tabItem"
            :key="item"
            :href="'#' + item"
            class="pa-0"
        >
          {{ $t(`productDetail.tabItem.${item}`) }}
        </v-tab>
      </v-tabs>
      <v-divider class="fontColor4" style="height: 1px;position: relative;top: -1px;opacity: 0.49;"></v-divider>
      <v-tabs-items v-model="tab" style="background-color: rgba(0, 0, 0, 0)">
        <v-tab-item value="info">
          <nft-info-tab :isMine="isMine" :n-f-t="NFT"></nft-info-tab>
        </v-tab-item>
        <v-tab-item value="rarity">
          <nft-rarity-tab :isMine="isMine" :n-f-t="NFT"></nft-rarity-tab>
          <!--          <nft-info-tab :isMine="isMine" :n-f-t="NFT"></nft-info-tab>-->
        </v-tab-item>
        <v-tab-item value="quotes">
          <nft-quotes-tab :n-f-t="NFT"></nft-quotes-tab>
        </v-tab-item>
        <v-tab-item value="bid">
          <n-f-t-bid-offer :nft="NFT"></n-f-t-bid-offer>
        </v-tab-item>
        <v-tab-item value="offer">
          <nft-make-offer
              :nft="NFT"
              :isMine="isMine"
              @confirmMakeOffer="confirmMakeOffer"
          ></nft-make-offer>
        </v-tab-item>
        <v-tab-item value="history">
          <nft-history-tab></nft-history-tab>
        </v-tab-item>
        <v-tab-item value="detail">
          <nft-detail-tab :nft="NFT"></nft-detail-tab>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-card elevation="0" class="px-md-9 px-5">
      <!--  金库  -->
      <v-row v-if="isCreator" no-gutters>
        <v-col cols="12" class="d-flex mt-15">
          <v-col cols="6" class="pl-0" v-if="isDeliver">
            <v-btn
                depressed
                large
                outlined
                block
                style="font-size: 20px"
                color="btnColor"
                @click="goTransferNFT(NFTData.id)"
                :disabled="!isMine"
            >
              <!--            发放-->
              {{ $t("productDetail.price.issue") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pl-0" v-else>
            <v-btn
                depressed
                outlined
                large
                block
                style="font-size: 20px"
                color="btnColor"
                @click="goTransferNFT(NFTData.id)"
                :disabled="isExpired || !isMine"
            >
              <!--            发放-->
              {{ $t("productDetail.price.issue") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-0" v-if="isDeliver">
            <v-btn
                depressed
                large
                block
                style="font-size: 20px"
                class="btnColor btnWhite--text"
                :disabled="!isMine"
                @click="destroy = true"
            >
              <!--            销毁-->
              {{ $t("productDetail.price.destroy") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-0" v-else>
            <v-btn
                depressed
                large
                block
                style="font-size: 20px"
                class="btnColor btnWhite--text"
                :disabled="isExpired || !isMine"
                @click="destroy = true"
            >
              <!--            销毁-->
              {{ $t("productDetail.price.destroy") }}
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
      <!--      不是金库，是我的-->
      <v-row v-else-if="isMine" no-gutters>
        <nft-one-price-description
            :nft="NFT"
            v-if="isOnSale && isOnePrice"
            class="mt-14"
        ></nft-one-price-description>
        <nft-own-account :nft="NFT" v-else-if="isOnSale"></nft-own-account>
        <v-col cols="12" class="d-flex mt-14" v-if="!isOnSale">
          <v-col cols="6" class="pl-0">
            <v-btn
                outlined
                depressed
                color="btnColor"
                block
                style="font-size: 20px"
                large
                :disabled="isFreeze"
                @click="goSellNFT(NFTData.id)"
            >
              <!--            售卖-->
              {{ $t("productDetail.price.sell") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-0">
            <v-btn
                depressed
                block
                large
                style="font-size: 20px"
                class="btnColor btnWhite--text"
                :disabled="makeOfferOwn || isFreeze"
                @click="makeDealDialog = true"
            >
              <!--            成交-->
              {{ $t("productDetail.price.deal") }}
            </v-btn>
          </v-col>
        </v-col>
        <v-col cols="12" class="d-flex" v-else>
          <v-col cols="6" class="pl-0" v-if="isOnePrice">
            <v-btn
                depressed
                block
                large
                style="font-size: 20px"
                outlined
                color="btnColor"
                @click="goSellNFT(NFTData.id)"
                :disabled="isFreeze"
                v-if="!isOnSale"
            >
              <!--            售卖-->
              {{ $t("productDetail.price.sell") }}
            </v-btn>
            <v-btn
                depressed
                outlined
                block
                style="font-size: 20px"
                large
                color="btnColor"
                @click="OffShelfDialog = true"
                :disabled="isFreeze"
                v-else
            >
              <!--            下架-->
              {{ $t("productDetail.price.OffShelf") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-0" v-if="isOnePrice">
            <v-btn
                depressed
                block
                style="font-size: 20px"
                large
                class="btnColor btnWhite--text"
                v-if="!isOfferUser"
                :disabled="makeOfferOwn"
                @click="makeDealDialog = true"
            >
              <!--            成交-->
              {{ $t("productDetail.price.deal") }}
            </v-btn>
            <v-btn
                depressed
                block
                style="font-size: 20px"
                large
                class="btnColor btnWhite--text"
                @click="cancelBidDialog = true"
                :disabled="isFreeze"
                v-else
            >
              <!--            取消出价-->
              {{ $t("productDetail.price.cancelBid") }}
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
      <!--      不是金库,不是我的-->
      <v-row v-else no-gutters>
        <div v-if="isOnSale" style="width: 100%">
          <nft-one-price-description
              :nft="NFT"
              v-if="isOnePrice"
          ></nft-one-price-description>
          <nft-auction-description
              :nft="NFT"
              @closeClearInterval="closeClearInterval"
              v-else
          ></nft-auction-description>
        </div>
        <v-col cols="12" :class="!isOnSale?'mt-16':''" class="d-flex pt-0">
          <v-col cols="6" class="pl-0">
            <v-btn
                depressed
                block
                large
                style="font-size: 20px"
                outlined
                color="btnColor"
                @click="goLoginOrBuy"
                :disabled="!isOnSale"
                v-if="isOnePrice"
            >
              <!--            购买-->
              {{ $t("productDetail.price.buy") }}
            </v-btn>
            <v-btn
                depressed
                block
                large
                style="font-size: 20px"
                outlined
                color="btnColor"
                @click="goLoginOrBidding"
                :disabled="!isOnSale || (isMaxBid && isClear)"
                v-else
            >
              <!--            竞价-->
              {{ $t("productDetail.price.bidding") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-0">
            <v-btn
                depressed
                block
                style="font-size: 20px"
                large
                class="btnColor btnWhite--text"
                @click="goLoginOrMakeOffer"
                :disabled="isExpired || (isOnSale && !isOnePrice)"
                v-if="isMakeOffer"
            >
              <!--            出价-->
              {{ $t("productDetail.price.bid") }}
            </v-btn>
            <v-btn
                depressed
                block
                style="font-size: 20px"
                large
                class="btnColor btnWhite--text"
                @click="cancelBidDialog = true"
                :disabled="isFreeze"
                v-else
            >
              <!--            取消出价-->
              {{ $t("productDetail.price.cancelBid") }}
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
      <v-row v-if="NFTData && NFTData.type == 0" no-gutters style="margin-top: -3px">
        <v-col cols="12" class="text-right text-decoration-underline btnColor--text"
               style="font-weight: bold;font-size: 16px">
          <div style="cursor: pointer" @click="purchaseNotesBtn">{{ $t("productDetail.purchaseNotes.title") }}</div>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog
        v-model="prodetailDialog"
        class="d-flex justify-center align-center"
        width="480px"
        @click:outside="clickDialogOutside"
    >
      <!--      购买-->
      <buy-card
          v-if="buyDialog"
          :n-f-t-data="NFT"
          :isOldImg="isOldImg"
          @closeDialog="close"
          @showPasswordPage="showPasswordPage"
      ></buy-card>
      <!--      竞拍-->
      <bidding
          v-if="biddingDialog"
          :n-f-t-data="NFT"
          :isOldImg="isOldImg"
          @closeDialog="close"
          @showPasswordPage="showPasswordPage"
      ></bidding>
      <!--      出价-->
      <offer
          v-if="offerDialog"
          :n-f-t-data="NFT"
          :isOldImg="isOldImg"
          @closeDialog="close"
          @showPasswordPage="showPasswordPage"
      ></offer>

      <!--      成交-->
      <make-deal
          v-if="makeDealDialog"
          :n-f-t-data="NFT"
          :isOldImg="isOldImg"
          :confirmOffer="confirmOffer"
          @success="success"
          @showPasswordPage="showPasswordPage"
          @closeDialog="close"
      ></make-deal>
    </v-dialog>
    <v-dialog
        v-model="prodetailPasswordDialog"
        class="d-flex justify-center align-center"
        width="650px"
        @click:outside="clickDialogOutside"
    >
      <!--      密码-->
      <password
          v-if="passwordDialog"
          :request-func="requestFunc"
          :request-params="requestParams"
          :typeFun="typeFun"
          @success="success"
          @closeDialog="close"
      ></password>

    </v-dialog>
    <v-dialog
        v-model="prodetailCenterDialog"
        class="d-flex justify-center align-center"
        width="606px"
        @click:outside="clickDialogOutside"
    >
      <!--      购买成功-->
      <buy-success
          v-if="buySuccess"
          :n-f-t-data="NFT"
          :title="buySuccessTitle"
          :body="buySuccessBody"
          :to-path="buySuccessToPath"
          @closeDialog="close"
      ></buy-success>
      <!--      下架-->
      <off-shelf
          v-if="OffShelfDialog"
          :n-f-t-data="NFT"
          @closeDialog="close"
      ></off-shelf>
      <!--      取消出价-->
      <cancel-bid
          v-if="cancelBidDialog"
          :n-f-t-data="NFT"
          @closeDialog="close"
      ></cancel-bid>
      <!--      销毁-->
      <destory v-if="destroy" :n-f-t-data="NFT" @showPasswordPage="showPasswordPage" @closeDialog="close"></destory>
    </v-dialog>
    <v-dialog
        content-class="purchaseNotesDialog"
        v-model="purchaseNotesDialog" @click:outside="clickDialogOutside" width="670px">
      <purchase-notes v-if="purchaseNotes"></purchase-notes>
    </v-dialog>
  </div>
</template>
<script>
import {getBalance} from "@/api/user";
import {mapGetters, mapActions} from "vuex";
import router from "@/router";
import {numberToCurrency} from "@/utils/money";
import {getNFTBidList} from "@/api/NFT";
import NftOwner from "@/views/Prodetails/ProdetailsComps/NftOwner";
import NftInfoTab from "@/views/Prodetails/ProdetailsComps/NftInfoTab";
import NftHistoryTab from "@/views/Prodetails/ProdetailsComps/NftHistoryTab";
import NftDetailTab from "@/views/Prodetails/ProdetailsComps/NftDetailTab";
import NftMakeOffer from "@/views/Prodetails/ProdetailsComps/NftMakeOffer";
import NftOnePriceDescription from "./NftOnePriceDescription";
import NftAuctionDescription from "./NftAuctionDescription";
import NftOwnAccount from "./NftOwnAccount";
import {formatDecimal, formatStrPrice} from "@/utils/math";
import BuyCard from "./BuyCard";
import Bidding from "./Bidding";
import BuySuccess from "./BuySuccess";
import Password from "./Password.vue";
import Offer from "./Offer.vue";
import CancelBid from "./CancelBid.vue";
import OffShelf from "./OffShelf.vue";
import MakeDeal from "./MakeDeal.vue";
import NFTBidOffer from "./NFTBidOffer";
import Destory from "./Destory";
import i18n from '@/lang'
import NftQuotesTab from "./NftQuotesTab";
import PurchaseNotes from "./PurchaseNotes";
import CollectionBtn from "../../../components/CollectionBtn";
import NftRarityTab from "@/views/Prodetails/ProdetailsComps/NftRarityTab";


const NFT_SELLWAY = {
  onePrice: 0,
  auction: 1,
};
export default {
  name: "Productdetail",
  components: {
    NftRarityTab,
    PurchaseNotes,
    NftQuotesTab,
    Destory,
    NFTBidOffer,
    BuySuccess,
    Bidding,
    "buy-card": BuyCard,
    NftOwnAccount,
    NftAuctionDescription,
    NftOnePriceDescription,
    NftMakeOffer,
    NftDetailTab,
    NftHistoryTab,
    NftInfoTab,
    NftOwner,
    Password,
    Offer,
    CancelBid,
    OffShelf,
    MakeDeal,
    CollectionBtn
  },
  filters: {
    numberToCurrency,
  },
  data: () => ({
    showOffShelf: true,
    OffShelf: false,
    tab: "info",
    showBuy: false,
    buyDialog: false,
    biddingDialog: false,
    passwordDialog: false,
    buySuccess: false,
    purchaseNotes: false,
    offerDialog: false,
    closeDialog: false,
    closeDestroyDialog: false,
    closeOffShelfDialog: false,
    closebuyPassword: false,
    OffShelfDialog: false,
    cancelBidDialog: false,
    makeDealDialog: false,
    destroy: false,
    isClear: false,
    price: 0,
    type: 0,
    e6: 4,
    coinList: "",
    rateList: "",
    totalPrice: 0,
    NFTMaxBid: 0,
    offerUserId: 0,
    makeOfferOwn: true,
    selected: "",
    confirmOffer: {},
    NFTHistoryList: [],
    buySuccessTitle: "",
    buySuccessBody: "",
    buySuccessToPath: "",
    requestFunc: null,
    requestParams: null,
    typeFun: null
  }),
  props: ["NFTData"],
  created() {
    this.getBalance();
    this.getNFTBidList();
  },
  mounted() {
    this.tab = this.$route.params.tab || 'info';
  },
  computed: {
    ...mapGetters(["name", "user", "host", "config"]),
    //图片匹配老数据
    isOldImg() {
      if (this.NFTData) {
        if (typeof this.NFTData.files === 'string') {
          return true
        } else return false
      } else return true
    },
    prodetailDialog() {
      return (
          this.buyDialog ||
          this.biddingDialog ||
          this.OffShelfDialog ||
          this.offerDialog ||
          this.makeDealDialog
      );
    },
    prodetailPasswordDialog() {
      return this.passwordDialog
    },
    prodetailCenterDialog() {
      return this.destroy || this.OffShelfDialog || this.cancelBidDialog || this.buySuccess;
    },
    purchaseNotesDialog() {
      return this.purchaseNotes
    },
    //判断是否登录
    isLogin() {
      return this.user ? true : false;
    },
    //返回true是金库
    isCreator() {
      return this.user && this.user.profile && this.user.profile.is_creator;
    },
    //返回true是本人
    isMine() {
      const isMine = this.NFTData && this.user && this.user.id === this.NFTData.user.id;
      return isMine
    },
    //返回是否自己对这个nft的出价
    isOfferUser() {
      return this.NFTData && this.user.id === this.offerUserId;
    },
    //返回true已经发放
    isDeliver() {
      return this.NFTData && this.NFTData.is_deliver === true;
    },
    //是否选择出价
    isSelected() {
      return this.NFTData && this.NFTData.is_deliver === true;
    },
    //判断是否过期
    isExpired() {
      let now = this.moment();
      let expired = this.moment(this.NFTData ? this.NFTData.expiration : "");
      return expired.diff(now) < 0;
    },
    //返回true是销毁
    isDestroy() {
      return this.NFTData && this.NFTData.status === 1;
    },
    //返回true在售卖
    isOnSale() {
      return this.NFTData && this.NFTData.is_onsale;
    },
    //返回0是一口价
    isOnePrice() {
      return this.NFTData && Number(this.NFTData.sell_way) === NFT_SELLWAY.onePrice
    },
    //返回是否他的竞价为最高竞价
    isMaxBid() {
      return this.user && this.user.id === this.NFTMaxBid;
    },
    //判断是否出价
    isMakeOffer() {
      return this.NFTData && this.NFTData.offer_id === null;
    },
    //nft购买手续费
    NFTsellFee() {
      return this.config.nft_sell_fee;
    },
    isFreeze() {
      return this.NFTData ? (this.NFTData.is_freeze || false) : false
    },
    tabItem() {
      // if (!this.NFT) return ["info", "bid", "offer", "history", "detail"];
      // if(!this.isOnSale){
      //   if (this.NFT.type === 0) {
      //     if (this.isOnePrice) {
      //       return ["info", "quotes", "offer", "history", "detail"];
      //     }
      //     return ["info", "quotes", "bid", "history", "detail"];
      //   } else {
      //     if (this.isOnePrice) {
      //       return ["info", "rarity", "quotes", "offer", "history", "detail"];
      //     }
      //     return ["info", "rarity", "quotes", "bid", "history", "detail"];
      //   }
      // }
      //实体NFT
      if(!this.NFT) return ["info", "quotes", "offer", "history", "detail"];
      if (this.NFT && this.NFT.type === 0) {
        //未出售
        if (!this.isOnSale) {
          return ["info", "quotes", "offer", "history", "detail"];
        } else {
          //出售
          if (this.isOnePrice) {
            return ["info","quotes", "offer", "history", "detail"];
          } else {
            return ["info", "quotes", "bid", "history", "detail"];
          }
        }
      } else {
        if (!this.isOnSale) {
          return ["info","rarity", "quotes", "offer", "history", "detail"];
        } else {
          //出售
          if (this.isOnePrice) {
            return ["info","rarity", "quotes", "offer", "history", "detail"];
          } else {
            return ["info", "rarity", "quotes", "bid", "history", "detail"];
          }
        }
      }
      // if (!this.isOnSale) {
      //   if (this.NFT && this.NFT.type === 0) {
      //     if (this.isOnePrice) {
      //       return ["info", "rarity", "quotes", "offer", "history", "detail"];
      //     }
      //   } else {
      //     return ["info", "rarity", "quotes", "bid", "history", "detail"];
      //   }
      // } else {
      //   if (this.NFT && this.NFT.type === 0) {
      //     if (this.isOnePrice) {
      //       return ["info", "quotes", "offer", "history", "detail"];
      //     }
      //     return ["info", "quotes", "bid", "history", "detail"];
      //   } else {
      //     if (this.isOnePrice) {
      //       return ["info", "rarity", "quotes", "offer", "history", "detail"];
      //     }
      //     return ["info", "rarity", "quotes", "bid", "history", "detail"];
      //   }
      // }
      // return ["info", "rarity", "quotes", "offer", "history", "detail"];
      // if (!this.isOnSale) return ["info", "quotes", "offer", "history", "detail"];
    },
    passwordRules(val) {
      if (val.password === "") {
        return false;
      }
      if (this.passwordJudge) {
        return "密码错误";
      }
      return true;
    },
    Interest() {
      return formatDecimal(this.NFTsellFee * this.nftPrice, 4);
    },
    lowerPrice() {
      let payablePrice = Number(this.payablePrice.replace(/[,.]/g, ""));
      let totalPrice = Number(this.totalPrice.toString().replace(/[,.]/g, ""));
      if (payablePrice > totalPrice) {
        return true;
      } else return false;
    },
    payablePrice() {
      return formatDecimal(
          Math.abs(Number(this.Interest) + Number(this.nftPrice)),
          4
      );
    },
    NFT() {
      return this.NFTData ? this.NFTData : null;
    },
    rateData() {
      return this.rate ? this.rate : null;
    },
    nftPrice() {
      return formatDecimal(Number(this.NFTData ? this.NFTData.price : ""), 4);
    },
    showImg() {
      if (!this.NFT.blindbox_item) return 'SSS'
      switch (this.NFT.blindbox_item.rarity) {
        case 0:
          return 'SSS';
        case 1:
          return 'SS';
        case 2:
          return 'S';
        case 3:
          return 'A';
        case 4:
          return 'B';
        default:
          return 'SSS'
      }
    }
  },
  methods: {
    ...mapActions("alert", ["showAlert"]),
    goTransferNFT(_id) {
      router.push("/transfernft/" + _id);
    },
    goSellNFT(_id) {
      router.push("/sell/" + _id);
    },
    success() {
      this.buySuccess = true;
    },
    //购买未登录去登录
    goLoginOrBuy() {
      if (this.isLogin) {
        this.buyDialog = true;
      } else {
        this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", true);
      }
    },
    //出价未登录去登录
    goLoginOrMakeOffer() {
      if (this.isLogin) {
        this.offerDialog = true;
      } else {
        this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", true);
      }
    },
    //竞价未登录去登录
    goLoginOrBidding() {
      if (this.isLogin) {
        this.biddingDialog = true;
      } else {
        this.$store.commit("ui/SET_IS_SHOW_LOGIN_DIALOG", true);
      }
    },
    getBalance() {
      getBalance()
          .then((response) => {
            this.totalPrice = formatStrPrice(response.data.results[0].amount, 4);
          })
          .catch(() => {
          });
    },
    //当竞价时间截止
    closeClearInterval() {
      this.isClear = true;
    },
    showPasswordPage(title, body, toPath, requestFunc, requestParams, typeFun) {
      this.buySuccessTitle = title;
      this.buySuccessBody = body;
      this.buySuccessToPath = toPath;
      this.requestFunc = requestFunc;
      this.requestParams = requestParams;
      this.typeFun = typeFun
      this.passwordDialog = true;
      this.buyDialog = false;
      this.biddingDialog = false;
      this.offerDialog = false;
      this.makeDealDialog = false;
    },
    //确定选择的成交价
    confirmMakeOffer(data) {
      if (this.user.id === data.user.id) {
        this.makeOfferOwn = true
        this.toasterErr(i18n.t("productDetail.makeDeal.errorText"))
      } else {
        this.makeOfferOwn = false
        this.confirmOffer = data;
      }
    },
    close() {
      this.buyDialog = false;
      this.biddingDialog = false;
      this.passwordDialog = false;
      this.buySuccess = false;
      this.OffShelfDialog = false;
      this.destroy = false;
      this.offerDialog = false;
      this.cancelBidDialog = false;
      this.makeDealDialog = false;
      this.destroy = false;
      // this.toasterErr(i18n.t("errorClose"))
    },
    closeTotal() {
      this.buySuccess = false;
      this.passwordDialog = false;
    },
    //购买须知
    purchaseNotesBtn() {
      this.purchaseNotes = true
    },
    goRecharge() {
      this.$store.commit("ui/SET_IS_SHOW_DRAWER_DIALOG", true);
    },
    closeBuy() {
      this.passwordDialog = false;
      this.buyDialog = false;
    },
    goMarketPlace() {
      if (this.$route.path != `/assets`) router.push("/assets");
    },
    //点击按钮判断是否还在自己手上
    // butOffShelf() {
    //   console.log(this.user.id)
    //   console.log(this.NFT.user.id)
    //   if(this.user.id === this.NFT.user.id){
    //     return this.OffShelfDialog = true
    //   }else {
    //     location.reload()
    //     return this.toasterErr(i18n.t("errorOwnCommodity"))
    //
    //   }
    // },
    //开启盲盒
    openBlindboxBtn() {
      this.$emit("clickOpenBlindbox")
    },
    //当点击弹窗之外时运行
    clickDialogOutside() {
      this.buyDialog = false;
      this.biddingDialog = false;
      this.passwordDialog = false;
      this.buySuccess = false;
      this.OffShelfDialog = false;
      this.destroy = false;
      this.offerDialog = false;
      this.cancelBidDialog = false;
      this.makeDealDialog = false;
      this.destroy = false;
      this.purchaseNotes = false
    },
    getNFTBidList() {
      getNFTBidList({
        token: this.$route.params.id,
      })
          .then((response) => {
            this.NFTMaxBid = response.data.results[0].user.id;
          })
          .catch(() => {
          });
    },
  }
  ,
}
;
</script>

<style scoped lang="scss">
> > > .purchaseNotesDialog {
  border-radius: 17px !important;
}

.description1 {
  /*word-break: normal;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*width: 100%;*/
  /*height: 42px;*/
  font-size: 30px;
  font-weight: bold;
  line-height: 34px;
}

.description2 {
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  /*display: -webkit-box;*/
  /*width: 100%;*/
  height: 60px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.topText {
  display: flex;
  align-items: center;

  .div {
    display: inline-block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #F6F5F3;
  }

  .logo {
    position: relative;
    left: -40px;
    width: 40px;
    max-width: 40px;
  }

  .span {
    position: relative;
    left: -36px;
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #050505;
    line-height: 22px;
  }
}

.btn {
  display: flex;
  margin-top: 26px;

  .img {
    background: rgba(204, 153, 51, 0.1);
    border-radius: 6px;
    height: 44px;
    width: 89px;
    display: flex;
    align-items: center;
    padding-left: 9px;
    margin-right: 11px;

    ::v-deep .v-image {
      margin-right: 9px;
    }

    span {
      font-size: 21px;
      color: #050505;
    }
  }
}

.opened {
  padding-top: 11px;

  .name {
    height: 22px;
    font-weight: 500;
    color: #2A2C38;
    font-size: 16px;
    line-height: 22px;
  }

  .detail {
    margin-top: 13px;
    display: flex;
    height: 44px;

    .rarity {
      padding: 10px 18px 10px 13px;
      background: rgba(204, 153, 51, .1);
      border-radius: 6px;
      display: flex;
      align-items: center;
      margin-right: 12px;

      .img {
        height: 24px;
        margin-right: 8px;
      }

      span {
        font-size: 16px;
        color: #050505;

        span {
          font-size: 21px;
          color: #050505;
        }
      }
    }

    .idText {
      padding: 12px 33px 10px 20px;
      background: rgba(204, 153, 51, .1);
      border-radius: 6px;

      p {
        font-weight: 500;
        color: #050505;
        font-size: 16px;

        span {
          display: inline-block;
          margin-right: 7px;
          font-weight: 500;
          color: #CC9933;
          font-size: 16px;
        }
      }
    }


  }
}

@media (max-width: 1000px) {
  .cardPadding {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

</style>
