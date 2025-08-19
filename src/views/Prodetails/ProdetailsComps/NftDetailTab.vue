<template>
  <div class="detail" style="height: 430px">
    <div v-if="nft">
      <div class="detail_content" v-if="nft.type !== 0">
        <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.publisher") }}</div>
        <div>
          <!-- <div class="div"></div> -->
          <v-img class="logo" src="@/assets/logo1.png"></v-img>
          <span class="span">{{ nft.creator.username }}</span></div>
      </div>
      <div class="detail_content" v-if="nft.type !== 0">
        <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.publishAmount") }}</div>
        <div>{{ nft.blindbox.total_store }}</div>
      </div>
      <div class="detail_content" v-if="nft.type !== 0">
        <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.publishDate") }}</div>
        <div>{{ nft.blindbox.start_time.split('T')[0] }}</div>
      </div>
      <div class="detail_content">
        <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.address") }}</div>
        <div>{{ nft.contract ? nft.contract.address : '--' }}</div>
      </div>
      <div class="detail_content">
        <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.id") }}</div>
        <div>{{ '--' }}</div>
      </div>
      <div class="detail_content">
        <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.blockchain") }}</div>
        <div>{{ nft.contract ? nft.contract.block_chain : "--" }}</div>
      </div>
    </div>
    <overlay v-else></overlay>
  </div>
  <!--  <v-list height="430px" class="overflow-y-auto list d-flex align-top pt-5">-->
  <!--    <div v-if="nft">-->
  <!--      <v-list-item two-line class="pl-0">-->
  <!--        <v-list-item-content style="padding-bottom: 10px;padding-top: 10px">-->
  <!--          <v-list-item-title class="fontColor6&#45;&#45;text mb-0" style="font-size: 14px;line-height: 20px"-->
  <!--          >{{ $t("detailTab.address") }}-->
  <!--          </v-list-item-title>-->
  <!--          <v-list-item-subtitle class="navI18n&#45;&#45;text" style="font-weight: bold;line-height: 25px"-->
  <!--          > Ethereum-->
  <!--          </v-list-item-subtitle>-->
  <!--        </v-list-item-content>-->
  <!--        <v-list-item-content style="padding-bottom: 10px;padding-top: 10px">-->
  <!--          <v-list-item-title class="fontColor6&#45;&#45;text mb-0" style="font-size: 14px;line-height: 20px"-->
  <!--          >{{ $t('detailTab.id') }}-->
  <!--          </v-list-item-title>-->
  <!--          <v-list-item-subtitle class="navI18n&#45;&#45;text" style="font-weight: bold;line-height: 25px"-->
  <!--          > Ethereum-->
  <!--          </v-list-item-subtitle>-->
  <!--        </v-list-item-content>-->
  <!--        <v-list-item-content style="padding-bottom: 10px;padding-top: 10px">-->
  <!--          <v-list-item-title class="fontColor6&#45;&#45;text mb-0" style="font-size: 14px;line-height: 20px"-->
  <!--          >{{ $t('detailTab.blockchain') }}-->
  <!--          </v-list-item-title>-->
  <!--          <v-list-item-subtitle class="navI18n&#45;&#45;text" style="font-weight: bold;line-height: 25px"-->
  <!--          > Ethereum-->
  <!--          </v-list-item-subtitle>-->
  <!--          &lt;!&ndash;          <div class="navI18n&#45;&#45;text" style="font-weight: bold;line-height: 25px"&ndash;&gt;-->
  <!--          &lt;!&ndash;          ><span>{{ detail.subtitle ? detail.subtitle : '__' }}</span>&ndash;&gt;-->
  <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
  <!--        </v-list-item-content>-->
  <!--      </v-list-item>-->
  <!--      &lt;!&ndash;      <v-list-item two-line class="pl-0">&ndash;&gt;-->
  <!--      &lt;!&ndash;        <v-list-item-content style="padding-bottom: 10px;padding-top: 10px">&ndash;&gt;-->
  <!--      &lt;!&ndash;          <v-list-item-title class="navI18n&#45;&#45;text" style="font-size: 14px;line-height: 20px"&ndash;&gt;-->
  <!--      &lt;!&ndash;          >{{ $t("detailTab.blockchain") }}&ndash;&gt;-->
  <!--      &lt;!&ndash;          </v-list-item-title>&ndash;&gt;-->
  <!--      &lt;!&ndash;          <v-list-item-subtitle class="navI18n&#45;&#45;text" style="font-weight: bold;line-height: 25px"&ndash;&gt;-->
  <!--      &lt;!&ndash;          > Ethereum&ndash;&gt;-->
  <!--      &lt;!&ndash;          </v-list-item-subtitle>&ndash;&gt;-->
  <!--      &lt;!&ndash;        </v-list-item-content>&ndash;&gt;-->
  <!--      &lt;!&ndash;      </v-list-item>&ndash;&gt;-->
  <!--    </div>-->
  <!--    <overlay v-else></overlay>-->
  <!--  </v-list>-->
</template>

<script>
// import i18n from "@/lang";
import Overlay from "../../../components/Overlay";

export default {
  name: "NftDetailTab",
  data: () => ({}),
  props: ["nft"],
  components: {Overlay},
  computed: {
    // files() {
    //   if (this.nft.block_chain_info !== null) {
    //     return [
    //       {
    //         subtitle: this.nft.block_chain_info.contract_address,
    //         title: i18n.t("detailTab.address"),
    //       },
    //       {
    //         subtitle: this.nft.block_chain_info.owner,
    //         title: i18n.t("detailTab.id"),
    //       },
    //       // {
    //       //   subtitle: this.nft.block_chain_info.block_server,
    //       //   title: i18n.t("detailTab.blockchain"),
    //       // },
    //     ];
    //   } else return [
    //     {
    //       subtitle: '_ _',
    //       title: i18n.t("detailTab.address"),
    //     },
    //     {
    //       subtitle: '_ _',
    //       title: i18n.t("detailTab.id"),
    //     },
    //     // {
    //     //   subtitle: '_ _',
    //     //   title: i18n.t("detailTab.blockchain"),
    //     // },
    //   ];
    // },
  },
};
</script>

<style scoped lang="scss">
.detail {
  padding-top: 30px;

  .detail_content {
    display: flex;
    margin-bottom: 40px;

    & > div:nth-child(1) {
      font-weight: 400;
      color: #2A2C38;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
      min-width: 64px;
      margin-right: 51px;
    }

    & > div:nth-child(2) {
      font-weight: 600;
      color: #2A2C38;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
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
        // position: relative;
        // left: -40px;
        // width: 45px;
        max-width: 45px;
        margin-right: 5px;
        // height: 18px;
      }

      .span {
        // position: relative;
        // left: -36px;
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: #050505;
        line-height: 22px;
      }
    }
  }
}

.tabItemSub {
  color: #fafafa !important;
}

.list::-webkit-scrollbar {
  display: none;
}
</style>
