<template>
  <v-list
      height="430px"
      width="100%"
      style="padding-top: 18px;"
      class="overflow-y-auto list px-0"
  >
    <div v-if="NFT">
      <div v-if="NFT.type ===0">
        <v-list-item v-for="(file,index) in files" :key="file.id" class="px-0 pb-1" style="min-height: 40px">
      <span class="d-inline-block text-break " style="font-size: 14px">
        <span
            class="fontColor6--text"
        >{{ file.title }} ：</span> <span class="navI18n--text" style="font-weight: bold">{{ file.subtitle }}</span>
      </span>
          <div v-if="index === 5 && isExpired()"
               style="line-height: 19px;font-size: 14px;font-weight: bold;margin-left: 11px"
               class="mt-n1 fontColor7--text">{{ $t("persetting.own.expire") }}
          </div>
          <!--        提示框-->
          <div>
            <v-tooltip content-class="tooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-img v-bind="attrs" v-on="on" v-if="isLock(index)" class="d-inline-block mt-1 ml-1"
                       style="width: 14px;height: 14px"
                       contain
                       src="@/assets/fake/infoTab/lock.png"></v-img>
                <v-img v-bind="attrs" v-on="on"
                       v-if="index === 1 || index === 2 || index === 3 || index === 4 || index === 5"
                       class="d-inline-block mt-1 ml-1" style="width: 20px;height: 20px;" contain
                       src="@/assets/fake/infoTab/hint.png"></v-img>
              </template>
              <div class="text-justify" style="font-family: PingFangSC-Regular, PingFang SC;font-size: 12px"
                   v-html="$t(`productDetail.infoHint.${index}`)"></div>
              <div class="tooltipNext"></div>
            </v-tooltip>
          </div>
        </v-list-item>
      </div>
      <div v-else-if="NFT.type === 2">
        <div class="img" v-html="NFT.blindbox.detail"></div>
      </div>
      <div v-else-if="NFT.type === 3">
        <div>{{NFT.description}}</div>
      </div>
    </div>
    <overlay v-else></overlay>
  </v-list>
</template>

<script>
import i18n from "@/lang";
import Overlay from "../../../components/Overlay";

export default {
  name: "NftInfoTab",
  components: {Overlay},
  props: [
    "NFT",
    "isMine"
  ],
  data: () => ({
    xx: false
  }),
  computed: {
    //判断是否过期
    isExpired() {
      return function () {
        let now = this.moment();
        let expired = this.moment(this.NFT.expiration);
        return expired.diff(now) < 0;
      }
    },
    files() {
      if (this.NFT) {
        return [
          {
            subtitle: this.NFT.serialNo_encry,
            title: i18n.t("createNFT.serialNo"),
          },
          {
            subtitle: 'KRW ' + this.numFormat(parseInt(Number(this.NFT.interest) + Number(this.NFT.liabilities) - Number(this.NFT.interest_paid))),
            title: i18n.t("createNFT.liabillties"),
          },
          {
            subtitle: 'KRW ' + this.numFormat(this.NFT.liabilities),
            title: i18n.t("createNFT.principal"),
          },
          {
            subtitle: Number(this.NFT.annualized * 100).toFixed(2) + "%",
            title: i18n.t("createNFT.rate"),
          },
          {
            subtitle: this.NFT.rating,
            title: i18n.t("createNFT.sore"),
          },
          {
            subtitle: this.NFT.expiration,
            title: i18n.t("createNFT.expiration"),
          },
          {
            subtitle: this.NFT.authentication,
            title: i18n.t("createNFT.authentication"),
          },
          {
            subtitle: this.NFT.archiveName,
            title: i18n.t("createNFT.achiveNameInfo"),
          },
          {
            subtitle: this.NFT.archiveAddress_encry,
            title: i18n.t("createNFT.archiveAddress"),
          },
        ];
      } else return [];
    },
  },
  methods: {
    isLock(index) {
      return index === 0 && !this.isMine || index === 8 && !this.isMine
    },
    numFormat(num) {
      var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ",";
        });
      })
      return res;
    }
  }
}
</script>

<style scoped lang="scss">
.list::-webkit-scrollbar {
  display: none;
}

.tooltip {
  max-width: 330px;
  background: #CC9933;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 17px;
  border-radius: 2px;
  padding: 1px 10px;
  text-align: center;
  border: 1px solid #CC9933;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);*/
}

.tooltip:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 12px 12px 12px;
  border-color: #CC9933 transparent transparent transparent;
  position: absolute;
  margin-top: 1px;
  margin-left: -12px;

}

.tooltipNext:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 12px 12px 12px;
  border-color: #CC9933 transparent transparent transparent;
  position: absolute;
  margin-top: 2px;
  margin-left: -12px;
}

.img {
  overflow: hidden;

  ::v-deep p {
    img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
