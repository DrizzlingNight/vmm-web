<template>
  <v-container fluid style="width: 100%;" class="pa-0 container">
    <div class="iconLeft">
      <v-img @click="goBack" src="@/assets/left.png"></v-img>
    </div>
    <v-row class="d-flex justify-space-between pa-0 background3" no-gutters>
      <v-col cols="12" md="4" lg="5" class="d-flex align-center mx-auto justify-center">
        <div style="width:100%;">
          <v-card
              color="rgba(0,0,0,0)"
              v-if="!isOldImg && NFT"
              flat
          >
            <v-window
                v-model="onboarding"
            >
              <v-window-item
                v-if="NFT && NFT.cover_type == 10"
              >
                <v-card
                    flat
                    color="rgba(0,0,0,0)"
                    max-height="700"
                    class="img d-flex align-center"
                    style="width:100%;"
                >
                  <div class="lunImg" style="width:100%;height:100%;">
                    <SpliceNFT style="width:100%;height:100%;" :rule="NFT ? NFT.cover_img : ''" max-height="700px" maxWidth="700px"></SpliceNFT>
                  </div>
                </v-card>
              </v-window-item>
              <v-window-item
                  v-else
                  v-for="n in imgList"
                  :key="`card-${n}`"
              >
                <v-card
                    flat
                    color="rgba(0,0,0,0)"
                    max-height="700"
                    class="img d-flex align-center"
                    style="width:100%;"
                >
                  <video preload="auto" v-if="n.indexOf('mp4') > -1" class="lunImg my-auto" playsinline autoplay muted loop style="height: 100%;width: 100%;">
                    <source :src="host + n" type="video/mp4">
                  </video>
                  <v-img v-else contain :src="host + n" class="lunImg my-auto"
                         max-height="700px" max-width="700px"
                         style="border-radius: 10px"
                  ></v-img>
                </v-card>
              </v-window-item>
            </v-window>
<!--            <v-window-->
<!--                v-model="onboarding"-->
<!--                v-else-->
<!--            >-->
<!--              <v-window-item-->
<!--              >-->
<!--                <v-card-->
<!--                    flat-->
<!--                    color="rgba(0,0,0,0)"-->
<!--                    width="700"-->
<!--                    max-height="700"-->
<!--                    class="img d-flex align-center"-->
<!--                >-->
<!--                  <v-img contain :src="NFT.cover_img" class="lunImg my-auto"-->
<!--                         max-height="700px" max-width="700px"-->
<!--                         style="border-radius: 10px"-->
<!--                  ></v-img>-->
<!--                </v-card>-->
<!--              </v-window-item>-->
<!--            </v-window>-->
            <v-card-actions class="justify-center mt-3 cardAction">
              <v-item-group
                  v-model="onboarding"
                  class="text-center"
                  mandatory
                  active-class="amber--text accent-3"
              >
                <v-item
                    v-for="n in imgList.length"
                    :key="`btn-${n}`"
                    v-slot="{ active, toggle }"
                >
                  <v-btn
                      :input-value="active"
                      icon
                      @click="toggle"
                  >
                    <v-icon size="20px">mdi-record</v-icon>
                  </v-btn>
                </v-item>
              </v-item-group>
            </v-card-actions>
            <div class="d-flex" style="position: relative;top: -30px">
              <v-btn :disabled="NFT.is_onsale" @click="openBlindboxBtn" v-if="isMine && NFT.type === 2" class="btnColor white--text mx-auto"
                     height="66px"
                     style="border-radius: 4px;padding: 16px 76px 17px 77px;margin-bottom:20px;font-size:24px !important"
                     elevation="0">{{ $t("mysteryBox.mysteryBoxNft.open") }}
              </v-btn>
            </div>
          </v-card>
        </div>
        <!--        <v-carousel-->
        <!--            dark-->
        <!--            cycle-->
        <!--            interval="60000"-->
        <!--            style="max-width: 814px;"-->
        <!--            v-if="!isOldImg && NFT"-->
        <!--            :show-arrows="false"-->
        <!--            show-arrows-on-hover-->
        <!--            hide-delimiter-background-->
        <!--        >-->
        <!--          <v-carousel-item-->
        <!--              cover-->
        <!--              style="max-height: 845px;max-width: 100%;"-->
        <!--              active-class=""-->
        <!--              v-for="(item,i) in imgList"-->
        <!--              :key="i"-->
        <!--              :src="host + item"-->
        <!--          >-->
        <!--          </v-carousel-item>-->
        <!--        </v-carousel>-->
        <v-img
            v-if="isOldImg && NFT"
            contain
            max-width="700"
            class="oldImg"
            height="700"
            style="border-radius: 10px"
            :src="imgUrl"></v-img>
        <v-img v-if="!NFT" contain width="231px" height="71px" src="@/assets/defaultPage.png">
        </v-img>
      </v-col>
      <v-card flat style="height: 100%" class="rightCard">
        <productdetail ref="productdetail" :NFTData="NFT" @clickOpenBlindbox="clickOpenBlindbox"></productdetail>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import {getNFT} from "@/api/NFT";
import {mapGetters} from "vuex";
import Productdetail from "./ProdetailsComps/Productdetail";
import {openBlindbox} from "@/api/mysteryBox";
import SpliceNFT from '../SpliceNFT/SpliceNFT.vue';

export default {
  name: "prodetails",
  components: {Productdetail, SpliceNFT},
  data: () => ({
    onboarding: 0,
    NFT_id: null,
    NFT: null,
    imgUrl: null,
    imgList: null
  }),
  mounted() {
    setInterval(() => {
      // if (this.imgList && this.imgList.length > 0) {
      this.Carousel()
      // }
    }, 6000)
  },
  computed: {
    ...mapGetters([
      'host', 'user'
    ]),
    //返回true是本人
    isMine() {
      return this.NFT && this.user && this.user.id === this.NFT.user.id;
    },
    //详情图片匹配老数据
    isOldImg() {
      if (this.imgList) {
        if (typeof this.imgList === 'string') {
          return true
        } else return false
      } else return true
    }
  },
  created() {
    this.NFT_id = this.$route.params.id
    if (Number(this.NFT_id) > 0) {
      this.getNFTInfo() 
    }
  },
  methods: {
    next() {
      this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
    },
    Carousel() {
      if (this.onboarding >= this.imgList.length - 1)
        this.onboarding = 0
      else
        this.onboarding++
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
    },
    getNFTInfo() {
      getNFT(this.NFT_id)
          .then(response => {
            this.NFT = response.data
            if (response.data.files) {
              this.imgUrl = this.host + response.data.files
              this.imgList = response.data.files
            } else {
              this.imgUrl = '@/assets/coinType/USDT.png'
              this.imgList = []
            }

          })
          .catch(() => {
          });
    },
    goBack() {
      this.$router.go(-1)
    },
    clickOpenBlindbox() {
      this.openBlindboxBtn()
    },
    openBlindboxBtn() {
      openBlindbox(this.$route.params.id).then((response) => {
        if (response.code === 0) {
          this.$toast.success(this.$t('mysteryBox.mysteryBoxNft.success'))
          this.$router.push("/nft/" + response.data.id)

        } else {
          this.toasterErr(response.code)
        }
      }).catch(() => {
      })
      this.getNFTInfo()
    }
  }
}
</script>

<style scoped lang="scss">
.rightColor {
  background-color: #1E1E1E;
}

.container {
  position: relative;

  .iconLeft {
    /*position: relative;*/
    position: absolute;
    top: 63px;
    left: 107px;
    cursor: pointer;
    z-index: 59;
  }
}


.btnColor {
  background-color: rgba(255, 193, 7, 1);
}

> > > .theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before {
  opacity: 0;
}

> > > .v-btn--icon.v-size--default {
  width: 26px;
  height: 26px;
}

.cardAction {
  position: relative;
  top: -70px;
}

@media (min-width: 960px) {
  .rightCard {
    width: 638px;
  }

  .img {
    height: 814px;
  }

  .oldImg {
    height: 814px
  }


}


@media (max-width: 960px) {

  .container {
    .iconLeft {
      top: 34px;
      left: 37px;
    }
  }

  .rightCard {
    width: 100%;
  }

  .img {
    min-height: 456px;
    width: 100% !important;
    height: 100%;
  }

  .oldImg {
    /*width: 200px !important;*/
    height: 340px !important;
    margin: 10px 20px 25px 20px;
  }

  .lunImg {
    height: 425px !important;
    width: 375px !important;
  }

}
</style>
