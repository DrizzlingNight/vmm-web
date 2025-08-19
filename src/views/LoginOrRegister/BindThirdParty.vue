<template>
    <div style="height: 1200px;">
        <v-dialog v-model="isShowBind" persistent width="600px">
            <v-card>
                <div class="d-flex flex-column align-center justify-center">
                    <v-img class="mt-11" src="@/assets/bind/bindInfo.png" :max-height="infoImgSize" :max-width="infoImgSize"></v-img>
                    <div class="tips-title mt-6" :style="{ fontSize: textFontSize }">{{$t('bind.tips')}}</div>
                    <div class="mt-7 d-flex align-center flex-column" :style="{height : bgImgHeight}">
                        <v-img class="bg-img mx-10 mx-sm-12" src="@/assets/bind/bindBg.png" :height="bgImgHeight" style="z-index:0"></v-img>
                        <v-img class="mt-sm-8 mt-4" :src="avatar" :max-width="avatarImgSize" :max-height="avatarImgSize" style="z-index:1;"></v-img>
                        <div class="username mt-2" :style="{ fontSize: textFontSize }" style="z-index:1;">{{username}}</div>
                    </div>
                    <div class="d-flex align-center justify-center" style="width:100%;">
                        <v-btn 
                            plain 
                            class="my-6 my-sm-10 mr-2 mr-sm-5 cancel-btn ml-10 ml-sm-12" 
                            style="flex:1" 
                            :height="btnHeight"
                            @click="cancel"
                        >
                            {{$t('bind.cancel')}}
                        </v-btn>
                        <v-btn 
                            class="btnColor my-6 my-sm-10 ml-2 ml-sm-5 mr-10 mr-sm-12" 
                            style="color: #fff;flex:1" 
                            :height="btnHeight"
                            @click="confirm"
                            :loading="isLoading"
                        >
                            {{$t('bind.confirm')}}
                        </v-btn>
                    </div> 
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import {mapGetters} from "vuex";
import { bindApp } from '@/api/user';

export default {
    name: 'Bindthirdparty',

    data() {
        return {
            params: {},
            isLoading: false,
        };
    },
    mounted () {

        this.params = this.$route.query
        if (this.user) {
            const apps = this.user.profile.app
            if (apps.length > 0 && apps.indexOf(Number(this.params.app)) != -1) {
                this.$toast.success(this.$t('bind.alreadyBind'))
                this.$router.replace({ name: 'MysteryBox'})
                return
            } 
            this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", 4);
        }
    },
    computed: {
        ...mapGetters(["showingBindDialogType", "user", "loginStatus"]),
        isShowBind() {
            return this.showingBindDialogType === 4
        },
        avatar() {
            return this.user ? (this.user.profile.avatar || '/static/people.png')  : '/static/people.png'
        },
        username() {
            return this.user ? (this.user.username || '') : ''
        },
        textFontSize(){ return this.$vuetify.breakpoint.name === 'xs' ? '16px' : '24px' },
        infoImgSize() { return this.$vuetify.breakpoint.name === 'xs' ? '43px' : '90px' },
        bgImgHeight () { return this.$vuetify.breakpoint.name === 'xs' ? '100px' : '200px' },
        avatarImgSize() { return this.$vuetify.breakpoint.name === 'xs' ? '40px' : '75px' },
        btnHeight() { return this.$vuetify.breakpoint.name === 'xs' ? '40px' : '50px'}
    },
    beforeDestroy() {
        this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", -1);
    },


    methods: {
        cancel() {
            this.$router.replace({ name: 'MysteryBox'})
        },
        confirm() {
            if (this.user && this.params.pub_key && this.params.sign && this.params.user_id && this.params.app && this.params.nonce) {
                this.bind()
            } else {
                this.$toast.error(this.$t('bind.paramIncomplete'))
            }
        },
        bind() {
            this.isLoading = true
            bindApp(this.params).then( res => {
                this.isLoading = false
                if (res.code === 0) {
                    this.$toast.success(this.$t('bind.success'))
                    this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", -1);
                    this.$router.replace({ name: 'MysteryBox'})
                } else {
                    this.toasterErr(res.code)
                }
            }).catch( err => {
                this.isLoading = false
                this.toasterErr(String(err))
            })
        }
    },
    watch: {
        "user":{
            handler:function(newVal){
                if (newVal) {
                    const apps = newVal.profile.app
                    if (apps.length > 0 && apps.indexOf(Number(this.params.app)) != -1) {
                        this.$toast.success(this.$t('bind.alreadyBind'))
                        this.$router.replace({ name: 'MysteryBox'})
                    } else {
                        this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", 4);
                    }
                }
            },
            deep: true,
            immediate: true
        },
        "loginStatus": {
            handler:function(newVal){
                if (newVal === 'isLogin')  {
                    if (this.user) {
                        const apps = this.user.profile.app
                        if (apps.length > 0 && apps.indexOf(Number(this.params.app)) != -1) {
                            this.$toast.success(this.$t('bind.alreadyBind'))
                            this.$router.replace({ name: 'MysteryBox'})
                        } else {
                            this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", 4);
                        }
                    }
                } if (newVal === 'notLogin') {
                    this.$store.commit("ui/SET_SHOWING_BIND_DIALOG_TYPE", 1);
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>

.tips-title {
    color:#050505;
    font-weight: 500;
}

.bg-img {
    // background-image: url('../.././assets/bind/bindBg.png');
    border-radius: 12px;
    width: 80%;
    object-fit: fill;
    position: absolute;
    overflow: hidden;
}

.username {
    font-weight: 500;
    color: #050505;
    text-decoration: underline;
}

.cancel-btn {
    outline: 1px solid #CC9933;
    border-radius: 4px;
    color: #CC9933;
}

</style>