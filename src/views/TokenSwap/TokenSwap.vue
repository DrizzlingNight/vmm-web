<template>
    <div class="token-swap">

        <div class="mx-5 mx-sm-0">
            <v-card class="card" style="width:100%">
                <div class="d-flex flex-column align-center mx-6 mx-sm-9">
                    
                    <v-hover v-slot="{ hover }" class="ml-1">
                        <div class="d-flex flex-column align-center justify-center">
                            <div class="title mt-8">{{$t('tokenSwap.swap')}}</div>
                            <div class="d-flex flex-row align-end justify-center" style="width:100%;position:absolute;">
                                <v-spacer></v-spacer>
                                <v-img 
                                    v-if="hover" 
                                    class="mr-0 mb-3 mb-sm-0 d-flex align-center justify-center" 
                                    :src="isMobile ? '/static/tokenSwap/tips_pop_sm.png' : '/static/tokenSwap/tips_pop.png'" 
                                    :max-width="fitSize(200,140)" 
                                    :max-height="fitSize(56, 66)"
                                >
                                    <div class="slippage-tips px-3">
                                        {{$t('tokenSwap.slippageTips')}}
                                    </div>
                                </v-img>
                                    
                            </div>
                            <div class="d-flex flex-row align-center jsutify-center">
                                <div class="tolerance-title">{{$t('tokenSwap.slippage')}}</div>
                                <span class="tolerance-rate ml-1">{{slippageRate}}</span>
                                <button class="ml-1">
                                    <v-img src="/static/tokenSwap/tolerance_rate.png"></v-img>
                                </button>
                            </div>
                            
                        </div>
                        
                    </v-hover>

                    <v-hover v-slot="{ hover }">
                        <div class="d-flex flex-column align-center" style="width:100%;">
                            <div class="mt-5 mt-sm-10 d-flex flex-row align-center"
                            :class="tokenAmount1.length > 0 ? 'input-wrapper-has-text' : 'input-wrapper'"
                                style="width:100%;"
                                :style="{ outline: hover ? '1px solid #7d7d7d30' : ''}">
                                <v-text-field 
                                    @input="inputTokenAmount1"
                                    v-model="tokenAmount1"
                                    flat 
                                    rounded 
                                    :placeholder="$t('tokenSwap.inputAmount')" 
                                    style="flex:1;" 
                                    class="number-input"
                                >
                                </v-text-field>
                                <div style="width:1px;height:80%;background:#7D7D7D30;"></div>
                                <div v-if="!swapInToken" style="width:100px;">
                                    <v-btn 
                                        @click="showSelectToken(0)" 
                                        class="mx-2 my-2 my-sm-4" 
                                        rounded 
                                        color="#CC9933" 
                                        dark 
                                        elevation="0"
                                        :max-width="fitSize(86, 76)"
                                    >
                                        <div class="select-btn">{{$t('tokenSwap.selectToken')}}</div>
                                    </v-btn>
                                </div>
                                <button v-else @click="showSelectToken(0)" :style="{width: fitSize(100, 66)}">
                                    <div class="d-flex flex-row align-center justify-center ml-4 ml-sm-6">
                                        <v-img class="mr-2" :max-width="fitSize(40,24)" :max-height="fitSize(40,24)"
                                            :src="'/static/coin/'+ (swapInToken ? swapInToken.code : 'VMM') +'.png'"
                                            style="filter: drop-shadow(0px 0px 1px rgba(20, 20, 20, 0.04)) drop-shadow(0px 0px 8px rgba(20, 20, 20, 0.08));"
                                        >
                                        </v-img>
                                        <v-img class="mr-3 mr-sm-7" src="/static/tokenSwap/select-down.png"></v-img>
                                    </div>
                                </button>
                            </div>
                            <div class="d-flex flex-row align-end" style="width:100%">
                                <v-spacer></v-spacer>
                                <div class="balance mr-3 mr-sm-6 mt-1 mt-sm-2">{{$t('tokenSwap.balance') + '：' + tokenBalance1}}</div>
                            </div>
                        </div>
                    </v-hover>

                    <div v-if="showSwapInTips" 
                    class="d-flex flex-row align-start justify-start mt-n4 ml-5" style="width:100%;">
                        <div class="amount-tips">{{swapInAmountTips}}</div>
                    </div>

                    <v-btn plain icon elevation="0" @click="exchange" class="mt-0 mt-sm-2 mb-2">
                        <v-img src="/static/tokenSwap/swap.png"></v-img>
                    </v-btn>

                    <v-hover v-slot="{ hover }">
                        <div class="d-flex flex-column align-center" style="width:100%;">
                            <div class="d-flex flex-row align-center"
                                :class="tokenAmount2.length > 0 ? 'input-wrapper-has-text' : 'input-wrapper'"
                                style="width:100%;"
                                :style="{ outline: hover ? '1px solid #7d7d7d30' : ''}">
                                <v-text-field
                                    @input="inputTokenAmount2"
                                    v-model="tokenAmount2"
                                    flat 
                                    rounded 
                                    :placeholder="$t('tokenSwap.inputAmount')" 
                                    style="flex:1;" 
                                    class="number-input"
                                >
                                </v-text-field>
                                <div style="width:1px;height:80%;background:#7D7D7D30;"></div>
                                <div v-if="!swapOutToken" class="d-flex align-center justify-center"
                                    style="width:100px;height:100%;">
                                    <v-btn 
                                        @click="showSelectToken(1)"
                                        rounded 
                                        color="#CC9933"
                                        dark 
                                        elevation="0" 
                                        :max-width="fitSize(86, 76)" 
                                        :min-width="fitSize(86, 76)"
                                    >
                                        <div class="select-btn">{{$t('tokenSwap.selectToken')}}</div>
                                    </v-btn>
                                </div>
                                <button v-else @click="showSelectToken(1)" :style="{width: fitSize(100, 66)}">
                                    <div class="d-flex flex-row align-center justify-center ml-4 ml-sm-6">
                                        <v-img class="mr-2" :max-width="fitSize(40,24)" :max-height="fitSize(40,24)"
                                            :src="'/static/coin/'+ (swapOutToken ? swapOutToken.code : 'VMM') +'.png'"
                                            style="filter: drop-shadow(0px 0px 1px rgba(20, 20, 20, 0.04)) drop-shadow(0px 0px 8px rgba(20, 20, 20, 0.08));"
                                        ></v-img>
                                        <v-img class="mr-3 mr-sm-7" src="/static/tokenSwap/select-down.png"></v-img>
                                    </div>
                                </button>
                            </div>
                            <div class="d-flex flex-row align-end" style="width:100%">
                                <v-spacer></v-spacer>
                                <div class="balance mr-3 mr-sm-6 mt-1 mt-sm-2">{{$t('tokenSwap.balance') + '：' + tokenBalance2}}</div>
                            </div>
                        </div>
                    </v-hover>

                    <div class="d-flex flex-row align-center justify-center mt-2 mt-sm-5" style="width:100%;">
                        <div class="rate">{{swapRate}}</div>
                        <v-spacer></v-spacer>
                        <div v-if="swapFee.length > 0" class="rate">{{$t('tokenSwap.fee') + '：' + swapFee}}</div>
                    </div>

                    <v-btn 
                        :loading="swapIsLoading"
                        color="#CC9933"
                        :dark="canSwap"
                        class="mt-5 mt-8 mb-5 mb-sm-8 text--white" 
                        :height="fitSize(50, 30)" 
                        style="width:100%;"
                        @click="isShowConfirmSwap = true"
                        :disabled="!canSwap"
                    >{{swapConfirmTitle}}</v-btn>
                </div>

            </v-card>

        </div>

        <!-- 选择代币 -->
        <v-dialog v-model="isShowSelectToken" width="340px" height="440px">
            <div class="select-token-dialog pb-5">
                <div class="d-flex flex-row align-center justify-center" style="width:100%;"
                    :style="{height: fitSize(86, 70)}">
                    <div class="title ml-8">{{$t('tokenSwap.selectToken')}}</div>
                    <v-spacer></v-spacer>
                    <button @click="isShowSelectToken = false">
                        <v-img class="mr-8" :max-height="fitSize(18, 12)" :max-width="fitSize(18, 12)"
                            src="/static/tokenSwap/close.png"></v-img>
                    </button>
                </div>

                <div v-for="(token, idx) in swapTokenList" :key="token.id">
                    <v-hover v-slot="{ hover }">
                        <button @click="selectToken(token)"
                        style="width:100%"
                        :style="{background: hover ? '#f5f5f5' : '#fff'}">
                            <div class="d-flex flex-column align-start mx-8"
                                :style="{height: fitSize(48,42)}">
                                <div class="d-flex flex-row align-center justify-center" style="flex:1">
                                    <v-img max-width="20px" max-height="20px"
                                        :src="'/static/coin/'+ (token.code || 'VMM') + '.png'"></v-img>
                                    <div class="item-title ml-5">{{ token.name }}</div>
                                </div>
                                <div v-if="idx < swapTokenList.length - 1" style="height:1px;background:#7D7D7D50;width:90%;"></div>
                            </div>
                        </button>
                    </v-hover>
                </div>
            </div>
        </v-dialog>

        <!-- 确认兑换 -->
        <v-dialog v-model="isShowConfirmSwap" width="440px" height="460px">
            <div class="select-token-dialog pb-5">
                <div class="d-flex flex-row align-center justify-center" style="width:100%;"
                    :style="{height: fitSize(86, 70)}">
                    <div class="title ml-8">{{$t('tokenSwap.confirmSwap')}}</div>
                    <v-spacer></v-spacer>
                    <button @click="isShowConfirmSwap = false">
                        <v-img class="mr-8" :max-height="fitSize(18, 12)" :max-width="fitSize(18, 12)"
                            src="/static/tokenSwap/close.png"></v-img>
                    </button>
                </div>

                <div class="d-flex flex-column align-start mx-8">
                     <div class="d-flex flex-row align-center justify-center" style="width:100%">
                        <v-img max-width="20px" max-height="20px"
                            :src="'/static/coin/'+ (swapInToken ? swapInToken.code : 'VMM') +'.png'"></v-img>
                        <div class="confirm-token ml-4 ml-sm-2">{{tokenAmount1}}</div>
                        <v-spacer></v-spacer>
                        <div class="confirm-token">{{swapInToken ? (swapInToken.code || '') : ''}}</div>
                     </div>
                     <v-img class="my-5" max-width="12px" max-height="14px" src="/static/tokenSwap/swap_to.png"></v-img>

                     <div class="d-flex flex-row align-center justify-center" style="width:100%">
                        <v-img max-width="20px" max-height="20px"
                            :src="'/static/coin/'+ (swapOutToken ? swapOutToken.code : 'VMM') +'.png'"></v-img>
                        <div class="confirm-token ml-4 ml-sm-2">{{tokenAmount2}}</div>
                        <v-spacer></v-spacer>
                        <div class="confirm-token">{{swapOutToken ? (swapOutToken.code || '') : ''}}</div>
                     </div>

                     <div class="mt-5 mt-sm-8 confirm-tips">
                         {{costOrGetTips}}<span style="font-weight:600;">{{atLeastGetToken}}</span>{{cancelTips}}
                     </div>

                     <div class="mt-2" style="height:1px;background:#7D7D7D50;width:100%;"></div>

                     <div class="d-flex flex-row align-center justify-center mt-6" style="width:100%">
                         <div>{{$t('tokenSwap.price')}}</div>
                         <v-spacer></v-spacer>
                         <div>{{swapRate}}</div>
                     </div>

                     <div class="d-flex flex-row align-center justify-center mt-2" style="width:100%">
                         <div>{{$t('tokenSwap.fee')}}</div>
                         <v-spacer></v-spacer>
                         <div>{{swapFee}}</div>
                     </div>

                    <v-btn
                        :loading="swapIsLoading"
                        color="#CC9933"
                        :dark="canSwap"
                        class="mt-5 mt-8 mb-4 mb-sm-5" 
                        :height="fitSize(50, 30)" 
                        style="width:100%;"
                        @click="confirmSwap"
                        :disabled="!canSwap"
                    >{{$t('tokenSwap.confirmSwap')}}</v-btn>
                </div>
            </div>
        </v-dialog>

    </div>
</template>

<script>
    import {
        getQuote,
        swap,
        getSwapToken,
        getTokenSwapPool
    } from '@/api/tokenSwap';
    import { mapGetters } from 'vuex';


    export default {
        name: '',
        mounted () {
            this.getSwapToken()
            this.getTokenSwapPool()

            this.$store.commit("ui/SET_IS_SHOW_SWAP_RED_POINT", false);
        },
        computed: {
            ...mapGetters(["user", "config", "coinList", "getBalanceById"]),
            isMobile() {
                return this.$vuetify.breakpoint.name === 'xs'
            },
            canSwap() {
                return (Number(this.tokenAmount1) >= Number(this.tokenMinSwapIn) && this.user != null) &&
                Number(this.tokenAmount1) <= Number(this.tokenBalance1) && (this.swapInToken != null && this.swapOutToken != null)
            },
            swapFee() {
                let token = this.swapInToken
                if (!this.swapInToken) {
                    token = { code: 'VMM'}
                }
                if (Number(this.tokenAmount1) <= 0) {
                    return ''
                }
                if (!token) {
                    return ''
                }
                for(let i = 0;i < this.coinList.length;++i) {
                    const coin = this.coinList[i]
                    if (coin.code === token.code) {
                        token = coin
                        break
                    }
                }
                let amount = Number(this.tokenAmount1) || 0
                amount = amount * Number(token.swap_fee)
                return (amount.toFixed(2) + ' ' + token.name)
            },
            swapRate() {
                if (!this.quoteData) return ' '
                return '1 ' + (this.swapOutToken ? this.swapOutToken.name : '') + ' = ' + Number(this.quoteData.swap_rate).toFixed(2) + ' ' + this.swapInToken.name
            },
            swapInAmountTips() {
                if (this.swapInToken) {
                    if (Number(this.tokenAmount1) > Number(this.tokenBalance1)) {
                        return this.$t('tokenSwap.balanceNotEnough')
                    }
                    return this.$t('tokenSwap.swapNotLessThan') + ' ' + this.tokenMinSwapIn + ' ' + this.swapInToken.code
                }
                return ''
            },
            showSwapInTips() {
                return (Number(this.tokenAmount1) > 0 && 
                Number(this.tokenAmount1) < Number(this.tokenMinSwapIn)) ||
                Number(this.tokenAmount1) > Number(this.tokenBalance1)
            },
            slippageRate() {
                return (Number(this.config.slippage_rate || 0) * 100).toFixed(2) + '%'
            },
            atLeastGetToken() {
                if (this.swapType === 0) {
                    let amount = (Number(this.tokenAmount2) * (1 - Number(this.config.slippage_rate || 0)))
                    amount = Number(amount).toFixed(2)
                    return amount +  (this.swapOutToken ? (this.swapOutToken.code || '') : '') + ','
                } else {
                    let amount = (Number(this.tokenAmount1) * (1 + Number(this.config.slippage_rate || 0)))
                    amount = Number(amount).toFixed(2)
                    return amount +  (this.swapInToken ? (this.swapInToken.code || '') : '') + ','
                }
            },
            swapConfirmTitle() {
                if (this.swapOutToken && this.swapPoolInfo) {
                    if (this.swapOutToken.code === 'VMM') {
                        if (Number(this.tokenAmount2) > Number(this.swapPoolInfo.base_coin_amount)) {
                            return this.$t('tokenSwap.volumeNotEnough')
                        }
                    }
                    else if (this.swapOutToken.code === 'HFT') {
                        if (Number(this.tokenAmount2) > Number(this.swapPoolInfo.swap_coin_amount)) {
                            return this.$t('tokenSwap.volumeNotEnough')
                        }
                    }
                }
                return this.$t('tokenSwap.confirmSwap')
            },
            costOrGetTips() {
                if (this.swapType === 0) {
                    return this.$t('tokenSwap.atLeastGet')
                } else {
                    return this.$t('tokenSwap.atMostCost')
                }
            },
            cancelTips() {
                if (this.swapType === 0) {
                    return this.$t('tokenSwap.cancelIfLessThan')
                } else {
                    return this.$t('tokenSwap.cancelIfMoreThan')
                }
            }
        },
        data() {
            return {
                isShowSelectToken: false,

                showSelectTokenIndex: 0,
                swapInToken: null,
                swapOutToken: null,
                tokenAmount1: '',
                tokenAmount2: '',

                swapTokenList: [],

                quoteData: null,

                tokenBalance1: 0,
                tokenBalance2: 0,

                tokenMinSwapIn: '',
                tokenMinSwapOut: '',

                isShowConfirmSwap: false,

                swapIsLoading: false,

                swapPoolInfo: {},
                swapType: 0,
            }
        },
        methods: {
            getBalance() {
                if (!this.user) return
                this.$store
                    .dispatch("user/balance")
                    .then(() => {
                        if (this.swapInToken && this.swapInToken.id) {
                            this.tokenBalance1 = this.getBalanceById(this.swapInToken.id).amount || 0
                            this.tokenBalance1 = Number(this.tokenBalance1).toFixed(2)
                        }
                        if (this.swapOutToken && this.swapOutToken.id) {
                            this.tokenBalance2 = this.getBalanceById(this.swapOutToken.id).amount || 0
                            this.tokenBalance2 = Number(this.tokenBalance2).toFixed(2)
                        }
                    })
                    .catch(() => {
                    });
            },
            inputTokenAmount1(amount) {
                
                this.tokenAmount1 = amount
                if (Number(amount) > 0) {
                    const func = this.throttle(this.getQuote, 0, 500)
                    func()
                } else {
                    this.tokenAmount2 = ''
                }
            },
            inputTokenAmount2(amount) {
                this.tokenAmount2 = amount
                if (Number(amount) > 0) {
                    const func = this.throttle(this.getQuote, 1, 500)
                    func()
                } else {
                    this.tokenAmount1 = ''
                }
            },
            fitSize(big, small, isSm) {
                if (isSm && isSm === true) {
                    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
                        return (small + 'px')
                    } else {
                        return (big + 'px')
                    }
                } else {
                    return this.$vuetify.breakpoint.name === 'xs' ? (small + 'px') : (big + 'px')
                }
            },
            throttle(fn, type, delay){
                let valid = true
                return function() {
                    if(!valid){
                        return false 
                    }
                    valid = false
                    setTimeout(() => {
                        fn(type)
                        valid = true;
                    }, delay)
                }
            },
            exchange() {

                let tmp = this.tokenAmount1
                this.tokenAmount1 = this.tokenAmount2
                this.tokenAmount2 = tmp
                
                let tmpToken = this.swapInToken
                this.swapInToken = this.swapOutToken
                this.swapOutToken = tmpToken


                let minSwapIn = 0
                if (this.coinList && this.coinList.length > 0) {
                    for (let i = 0;i < this.coinList.length;++i) {
                        const coin = this.coinList[i]
                        if (this.swapInToken && coin.code === this.swapInToken.code) {
                            minSwapIn = coin.min_swap
                        } 
                    }
                }
                this.tokenMinSwapIn = Number(minSwapIn).toFixed(2)
                
                if (this.swapInToken && this.swapInToken.id) {
                    const balance = this.getBalanceById(this.swapInToken.id)
                    if (balance) {
                        this.tokenBalance1 = balance.amount || 0
                        this.tokenBalance1 = Number(this.tokenBalance1).toFixed(2)
                    } else {
                        this.getBalance()
                    }
                } else {
                    this.tokenBalance1 = 0
                }

                if (this.swapOutToken && this.swapOutToken.id) {
                    const balance = this.getBalanceById(this.swapOutToken.id)
                    if (balance) {
                        this.tokenBalance2 = balance.amount || 0
                        this.tokenBalance2 = Number(this.tokenBalance2).toFixed(2)
                    } else {
                        this.getBalance()
                    }
                } else {
                    this.tokenBalance2 = 0
                }

                this.getQuote(this.swapType === 0 ? 1 : 0)
            },
            showSelectToken(index) {
                this.showSelectTokenIndex = index   
                this.swapTokenList = []
                this.isShowSelectToken = true
                let token = index === 0 ? this.swapOutToken : this.swapInToken
                token = token == null ? {} : token
                this.getSwapToken(token)
            },
            selectToken(token) {
                this.isShowSelectToken = false

                let minSwap = 0
                if (this.coinList && this.coinList.length > 0) {
                    for (let i = 0;i < this.coinList.length;++i) {
                        const coin = this.coinList[i]
                        if (coin.code === token.code) {
                            minSwap = coin.min_swap
                        }
                    }
                }

                if (this.showSelectTokenIndex == 0) {
                    this.swapInToken = token
                    this.tokenMinSwapIn = Number(minSwap).toFixed(2)
                } else {
                    this.swapOutToken = token
                    this.tokenMinSwapOut = Number(minSwap).toFixed(2)
                }
                
                let balance = this.getBalanceById(token.id)
                if (!balance || !balance.amount) {
                    this.getBalance()
                } else {
                    balance = Number(balance.amount).toFixed(2)
                    if (this.showSelectTokenIndex == 0) {
                        this.tokenBalance1 = balance
                    } else {
                        this.tokenBalance2 = balance
                    }
                }
                this.getQuote(0)
            },
            // type 0 为兑入转对出，type1 为兑出转兑入
            getQuote(type) {
                const t = !type ? 0 : type

                if (!this.swapInToken || !this.swapOutToken) {
                    return
                }

                if (t === 0) {
                    if (Number(this.tokenAmount1) <= 0) {
                        return
                    }
                } else {
                    if (Number(this.tokenAmount2) <= 0) {
                        return
                    }
                }
            


                this.swapIsLoading = true
                const params = {
                    type: t,
                    swap_amount: t === 0 ? this.tokenAmount1 : this.tokenAmount2,
                    token_in: this.swapInToken.id,
                    token_out: this.swapOutToken.id,
                }
                this.swapType = t
                getQuote(params).then(res => {
                    this.swapIsLoading = false
                    if (res.code === 0){
                        this.quoteData = res.data
                        const data = res.data
                        if (t === 0) {
                            if (params.swap_amount === this.tokenAmount1) {
                                this.tokenAmount2 = Number(data.quote).toFixed(2)
                            }
                        } else {
                            if (params.swap_amount === this.tokenAmount2) {
                                this.tokenAmount1 = Number(data.quote).toFixed(2)
                            }
                        }
                    } else {
                        this.quoteData = null
                        if (t === 0) {
                            this.tokenAmount2 = '0'
                        } else {
                            this.tokenAmount1 = '0'
                        }
                    }
                }).catch( () => {
                    this.swapIsLoading = false
                    this.quoteData = null
                    if (t === 0) {
                        this.tokenAmount2 = '0'
                    } else {
                        this.tokenAmount1 = '0'
                    }
                })
            },
            getSwapToken(baseToken) {

                let params = {}
                if (baseToken && baseToken.id) {
                    params.base_token = baseToken.id
                }
                const self = this
                getSwapToken(params).then(res => {
                    self.swapTokenList = res.data || []
                    for (let i = 0; i < self.swapTokenList.length;++i) {
                        const t = self.swapTokenList[i]
                        if (t.name === 'VMM' && !self.swapInToken) {
                            self.swapInToken = t
                            if (t.id > 0){
                                let balance = this.getBalanceById(t.id)
                                if (balance && balance.amount) {
                                    self.tokenBalance1 = Number(balance.amount).toFixed(2)
                                } else {
                                    this.getBalance()
                                }

                                let minSwap = 0
                                if (this.coinList && this.coinList.length > 0) {
                                    for (let i = 0;i < this.coinList.length;++i) {
                                        const coin = this.coinList[i]
                                        if (coin.code === t.code) {
                                            minSwap = coin.min_swap
                                        }
                                    }
                                }
                                self.tokenMinSwapIn = Number(minSwap).toFixed(2)
                            }
                            break
                        }
                    }
                })
            },
            getTokenSwapPool() {

                getTokenSwapPool().then (res => {
                    if (res.code === 0) {
                        this.swapPoolInfo = res.data.results[0]
                    }
                })
            },
            swapToken() {
                this.swapIsLoading = true
                const data = {
                    type: this.swapType,
                    swap_amount: this.swapType === 0 ? this.tokenAmount1 : this.tokenAmount2,
                    token_in: this.swapInToken.id,
                    token_out: this.swapOutToken.id,
                    quote: this.quoteData.quote
                }
                swap(data).then(res => {
                    this.swapIsLoading = false
                    if (res.code === 0) {
                        this.isShowConfirmSwap = false
                        this.$toast.success(this.$t('tokenSwap.swapSuccess'))
                        this.tokenAmount1 = ''
                        this.tokenAmount2 = ''
                        this.swapOutToken = null
                        this.tokenBalance2 = 0
                        this.getBalance()
                    } else {
                        this.toasterErr(res.code)
                    }
                }).catch(err => {
                    this.swapIsLoading = false
                    this.toasterErr(String(err))
                })
            },
            confirmSwap() {
                this.swapToken()
            }
        }

    }
</script>

<style lang="scss">
    .token-swap {
        background: linear-gradient(105.99deg, rgba(204, 153, 51, 0) -0.21%, rgba(204, 153, 51, 0.2) 33.54%, rgba(204, 153, 51, 0.5) 71.79%);
        width: 100%;
        height: 95vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .card {
            background: #FFFFFF;
            border: 1px solid #F6F5F3;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            min-width: 500px;
            max-width: 500px;

            .title {
                font-weight: 500;
                font-size: 24px;
                line-height: 34px;
                color: #050505;
            }

            .tolerance-title {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #7D7D7D;
            }

            .tolerance-rate {
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;
                color: #050505;
            }

            .input-wrapper {
                background: #F6F5F3;
                border-radius: 6px;
                height: 70px;

                .v-text-field input {
                    font-size: 20px;
                }

                .number-input {
                    font-weight: 500;
                    line-height: 45px;
                    color: #7D7D7D;
                    font-size: 32px !important;
                }

                .select-btn {
                    font-weight: 400;
                    font-size: 14px;
                    color: #fff;
                }
            }

            .input-wrapper-has-text {
                background: #F6F5F3;
                border-radius: 6px;
                height: 70px;

                .v-text-field input {
                    font-size: 32px;
                }

                .number-input {
                    font-weight: 500;
                    line-height: 45px;
                    color: #7D7D7D;
                    font-size: 32px !important;
                }

                .select-btn {
                    font-weight: 400;
                    font-size: 14px;
                    color: #fff;
                }
            }

            .balance {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #7D7D7D;
            }

            .amount-tips {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #B71C1C;
            }

            .rate {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #000000;
            }

            .slippage-tips {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #7D7D7D;
            }
        }
    }

    .select-token-dialog {

        background: #fff;
        border-radius: 10px;

        .title {
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            color: #050505;
        }

        .item-title {
            font-weight: 400;
            font-size: 20px;
            line-height: 28px;
            text-align: right;
            color: #050505;
        }

        .confirm-token {
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            color: #050505;
        }

        .confirm-tips {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #050505;
        }
    }

    @media screen and (max-width: 599px) {

        .token-swap {

            .card {
                border-radius: 10px;
                min-width: 100vw - 10;
                max-width: 100vw - 10;

                .title {
                    font-size: 24px;
                    line-height: 34px;
                }

                .tolerance-title {
                    font-size: 14px;
                    line-height: 20px;
                }

                .tolerance-rate {
                    font-size: 16px;
                    line-height: 22px;
                }

                .input-wrapper {
                    height: 42px;

                    .v-text-field input {
                        font-size: 14px;
                    }

                    .number-input {
                        line-height: 22px;
                    }

                    .select-btn {   
                        font-size: 12px;
                        line-height: 17px;
                    }
                }

                .input-wrapper-has-text {
                    height: 42px;

                    .v-text-field input {
                        font-size: 16px;
                    }

                    .number-input {
                        line-height: 22px;
                    }

                    .select-btn {   
                        font-size: 12px;
                        line-height: 17px;
                    }
                }

                .amount-tips {
                    font-size: 12px;
                    line-height: 17px;
                }

                .rate {
                    font-size: 12px;
                    line-height: 17px;
                }

                .slippage-tips {
                    font-size: 12px;
                    line-height: 17px;
                }
            }
        }


        .select-token-dialog {
            .title {
                font-size: 20px;
                line-height: 28px;
            }

            .item-title {
                font-size: 16px;
                line-height: 22px;
            }

            .confirm-token {
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
            }

            .confirm-tips {
                font-size: 12px;
                line-height: 17px;
            }
        }
    }
</style>