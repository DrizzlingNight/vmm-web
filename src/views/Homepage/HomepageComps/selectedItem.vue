<template>
  <v-card style="padding: 23px 18px 27px 19px;" class="card">
    <v-row no-gutters class="d-flex justify-space-between">
      <v-col
          class="d-none d-md-flex align-center"
          style="width: 647px;"
      >
        <!-- <v-img
            aspect-ratio="1.3018"
            max-width="647px"
            min-width="323px"
            style="border-radius: 4px;"
            v-if="item"
            :src="
            (item.files.indexOf('http') === 0 ? item.files : (host + item.files[0]))
            "
        >
        </v-img> -->
        <!-- <v-img v-else contain width="231px" height="71px" src="@/assets/defaultPage.png">
        </v-img> -->

            <SpliceNFT v-if="(item ? (item.cover_type || 0) : 0) === 10" :rule="(item ? (item.cover_img || '') : '')" maxWidth="380px" style="width:100%;min-height:380px;"></SpliceNFT>
            <v-img
                aspect-ratio="1.3018"
                max-width="647px"
                min-width="323px"
                style="border-radius: 4px;"
                v-else-if="item"
                :src="face"
            >
            </v-img>
            <v-img v-else contain width="231px" height="71px" src="@/assets/defaultPage.png">
            </v-img>
      </v-col>
      <v-col class="d-flex d-md-none" v-if="item" cols="12">
        <!--        <v-carousel hide-delimiter-background :show-arrows="false" continuous>-->
        <!--          <v-carousel-item-->
        <!--              v-for="(item,i) in imgList"-->
        <!--              :key="i"-->
        <!--              :src="host + item"-->
        <!--          ></v-carousel-item>-->
        <!--        </v-carousel>-->
        <v-col
            flat
            class="pa-0"
            v-if="item"
            cols="12"
        >
          <v-window
              v-model="onboarding"
              style="width: 100%"
          >
            <v-window-item
                v-for="n in imgList"
                :key="`card-${n}`"
                style="width: 100%;"
            >
              <v-img :src="host + n" class="lunImg"
                     aspect-ratio="1.3"
                     style="overflow: hidden"
              ></v-img>
            </v-window-item>
          </v-window>
          <v-card-actions class="d-flex justify-center"
                          style="position: relative;top: -23px;height: 20px;line-height: 20px">
            <v-item-group
                v-model="onboarding"
                class="text-center"
                mandatory
            >
              <v-item
                  v-for="(n,index) in imgList.length"
                  :key="`btn-${n}`"
                  v-slot="{ active, toggle }"
              >
                <v-btn
                    :input-value="active"
                    icon
                    @click="toggle"
                >
                  <v-icon @click="clickIcon" size="18" style="height: 10px;width: 10px"
                          :class="onboarding === index ? 'activeBtn' : 'btn'">mdi-record
                  </v-icon>
                </v-btn>
              </v-item>
            </v-item-group>
          </v-card-actions>
        </v-col>
      </v-col>
      <v-col
          class="d-flex flex-column ml-md-5 align-content-space-around rightCol" style="max-width: 556px;">
        <div class="d-none d-md-flex justify-space-between">
          <v-img
              v-if="item"
              aspect-ratio="1.059"
              style="border-radius: 4px;max-width: 268px"
              :src="secondImg"
          >
          </v-img>
          <v-img
              aspect-ratio="1.059"
              v-if="item"
              style="border-radius: 4px;max-width: 268px"
              :src="thirdImg"
          >
          </v-img>
        </div>
        <v-spacer></v-spacer>
        <simple-user-card
            style="margin-bottom: 35px"
            class="userCard"
            :name="item ? item.name : '--'"
            :username="item ? item.user.username:'--'"></simple-user-card>
        <span
            style="line-height:20px;font-weight: 400;"
            class="navI18n--text span"
        >{{ item ? item.description : '--' }}</span>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import {mapGetters} from "vuex";
import SimpleUserCard from "./simpleUserCard"
// import Overlay from "@/components/Overlay";
import SpliceNFT from "../../SpliceNFT/SpliceNFT";

export default {
  name: "SelectedItem",
  props: [
    'item'
  ],
  components: {
    // Overlay,
    "simple-user-card": SimpleUserCard,
    SpliceNFT
  },
  mounted() {
    // this.interval =  setInterval(() => {
    //   this.Carousel()
    // }, 3000)
  },
  computed: {
    ...mapGetters(["host"]),
    face() {
      return this.item ? ((this.item.cover_img && (this.host + this.item.cover_img))
          || this.item.files && ((typeof this.item.files === 'string' && (this.host + this.item.files)) || (this.host + this.item.files[0])) || "") : ''
    },
    secondImg() {
      let defaultImg = '@/assets/defaultPage.png'
      return this.item ? (this.item.files ? (this.item.files.length > 1 ? this.item.files[1] : defaultImg) : defaultImg) : defaultImg
    },
    thirdImg() {
      let defaultImg = '@/assets/defaultPage.png'
      return this.item ? (this.item.files ? (this.item.files.length > 1 ? this.item.files[2] : defaultImg) : defaultImg) : defaultImg
    },
    price() {
      return this.item.price.toFixed(2)
    },
    remaining() {
      return this.moment().to(this.item && this.item.endTime || this.moment())
    },
    imgList() {
      return this.item ? (this.item.files || []) : []
    },
  },
  data: () => {
    return {
      bid: null,
      loading: true,
      onboarding: 0,
      interval:null
    }
  },
  methods: {
    goNFT(_id) {
      this.$router.push("/nft/" + _id);
    },
    next() {
      this.onboarding = this.onboarding + 1 === this.imgList.length
          ? 0
          : this.onboarding + 1
    },
    clickIcon() {
      clearInterval(this.interval)
      this.interval =  setInterval(() => {
        this.Carousel()
      }, 3000)
    },
    Carousel() {
      if (this.onboarding >= this.imgList.length - 1)
        this.onboarding = 0
      else
        this.onboarding++
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
          ? this.imgList.length - 1
          : this.onboarding - 1
    },
  }
}
</script>
<style>
v-application {
  line-height: 0;
}
</style>
<style scoped>
@media (max-width: 960px) {
  .card {
    padding: 11px 14px 14px 13px !important;
  }

  .userCard {
    margin-bottom: 5px !important;
  }

  .rightCol {
    max-width: 100% !important;
  }
  .span{
    font-size: 12px !important;
    line-height: 13px !important;
    margin-top: 5px !important;
  }
}

@media (max-width: 959px) and (min-width: 791px) {
  .lunImg {
    height: 606px !important;
  }
}

@media (max-width: 790px) and (min-width: 680px) {
  .lunImg {
    height: 578px !important;
  }
}

@media (max-width: 679px) and (min-width: 590px) {
  .lunImg {
    height: 440px !important;
  }
}

@media (max-width: 519px) and (min-width: 421px) {
  .lunImg {
    height: 287px !important;
  }
}

@media (max-width: 420px) and (min-width: 380px) {
  .lunImg {
    height: 267px !important;
    overflow: hidden !important;
  }
}

@media (max-width: 380px) {
  .lunImg {
    height: 247px !important;
    overflow: hidden !important;
  }
}

/*@media (min-width: 959px) and (max-width: 850px) {*/
/*  .window{*/
/*    height: 600px !important;*/
/*  }*/
/*}*/
>>> .v-btn--icon.v-size--default {
  width: 18px;
  height: 18px;
}

>>> .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before {
  display: none !important;
}

>>> .v-application {
  line-height: 0 !important;
}

.activeBtn {
  border: 1px solid #CC9933;
  border-radius: 50%;
  color: #CC9933 !important;
}

.btn {
  border: 1px solid #CC9933;
  border-radius: 50%;
  color: transparent !important;
}
</style>
