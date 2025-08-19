<template>
    <v-dialog v-model="showAd" :max-width="fitSize(400, 320)" :max-height="fitSize(568, 489)" @click:outside="closeBanner">
        <div class="d-flex flex-column align-center justify-center" style="overflow: hidden;">
            <button @click="onClickBanner" style="overflow: hidden;">
                <v-img :max-width="fitSize(400, 320)" :max-height="fitSize(568, 489)" style="border-radius:4px;" :src="imgUrl"></v-img>
            </button>
            <div class="d-flex flex-row align-center justify-center">
                <button @click="closeBanner" class="mt-15 pt-5" style="position:absolute;">
                    <v-img max-height="32px" max-width="32px" src="/static/home/banner_close.png"></v-img>
                </button>
            </div>
        </div>
    </v-dialog>
</template>

<script>

import { fetchAdBanner } from "@/api/mysteryBox";
import { mapGetters } from "vuex";
import i18n from "@/lang";

export default {
    name: 'Adbanner',

    props: [ "isShow"],

    data() {
        return {
            imgUrl: '',
            bannerData: {},
            showAd: false,
        };
    },
    computed: {
        ...mapGetters(["host"]),  
    },
    mounted() {
        this.fetchAdBanner()
    },

    methods: {
        onClickBanner() {
            if (this.bannerData.link && this.bannerData.link.length > 0) {
                this.$store.commit("ui/SET_IS_SHOW_HOME_BANNER", false);
                this.showAd = false
                window.open(this.bannerData.link)
            }
        },
        fitSize(big, small) {
            return this.$vuetify.breakpoint.name === 'xs' ? (small + 'px') : (big + 'px')        
        },
        fetchAdBanner() {
            const self = this;
            fetchAdBanner().then( res => {
                if (res.code === 0) {
                    if (res.data.results.length > 0) {
                        self.bannerData = res.data.results[0]
                        const infoList = self.bannerData.info || []
                        if (infoList.length > 0) {
                            for (let i = 0; i < infoList.length; ++i) {
                                const data = infoList[i]
                                if (data.lang === i18n.locale || infoList.length === 1) {
                                    self.imgUrl = self.host + data.thumb
                                    if (self.isShow) self.showAd = true
                                    break
                                }
                            }
                        }
                    }
                }
            })
        },
        closeBanner() {
            this.$store.commit("ui/SET_IS_SHOW_HOME_BANNER", false);
            this.showAd = false
        }
    },
};
</script>

<style lang="scss" scoped>



</style>