
import {getCoin, getCoinExchangeList} from "@/api/coin";


const state = {
    coinList:[],
    rateList:[],
    currentCode:1
}

const mutations = {
    SET_STATE_LIST: (state, coinList) => {
        state.coinList = coinList
    },
    SET_RATE_LIST: (state, rateList) => {
        state.rateList = rateList
    },
    SET_CURRENT_CODE:(state, currentCode) => {
        state.currentCode = currentCode
    },
}

const actions = {
    getCoin({commit}) {
        return new Promise((resolve, reject) => {
            getCoin().then(response => {
                const data = response.data.results
                commit('SET_STATE_LIST', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getCoinExchangeList({commit}) {
        return new Promise((resolve, reject) => {
            getCoinExchangeList().then(response => {
                const data = response.data
                commit('SET_RATE_LIST', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
