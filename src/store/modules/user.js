import {getBalance, login, user} from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'
import { getConfig } from '@/api/coin'

const LoginStatus = {
  isLogin: "isLogin",
  notLogin: "notLogin",
  unknown: "unknown",
}

const state = {
  token: getToken(),
  balance: [],
  user:null,
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  config: {},

  loginStatus: LoginStatus.unknown,
  
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_BALANCE: (state, balance) => {
    state.balance = balance
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_CONFIG: (state, config) => {
    state.config = config
  },
  SET_LOGIN_STATUS: (state, status) => {
    state.loginStatus = status
}
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const username = userInfo.username
    const password = userInfo.password
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        if(response.code){
          reject(response)
        }else {
          const data = response.data
          commit('SET_USER', data)
          if (data != null) {
            commit('SET_LOGIN_STATUS', LoginStatus.isLogin)
          }
        }
        resolve(response)
      }).catch(error => {
        commit('SET_LOGIN_STATUS', LoginStatus.notLogin)
        reject(error)
      })
    })
  },

  //user signup
  // signup({commit}, userInfo) {
  //
  //   const email = userInfo.email
  //   const username = userInfo.username.trim()
  //   const password = userInfo.password
  //   const profile = userInfo.profile
  //   return new Promise((resolve, reject) => {
  //
  //   })
  // },

  // get userinfo by token
  user({commit}) {
    return new Promise((resolve, reject) => {
      user().then(response => {
        const data = response.data
        commit('SET_USER', data)
        if (data != null) {
          commit('SET_LOGIN_STATUS', LoginStatus.isLogin)
        }
        resolve()
      }).catch(error => {
        commit('SET_LOGIN_STATUS', LoginStatus.notLogin)
        reject(error)
      })
    })
  },
  getConfig({commit}) {
    return new Promise((resolve, reject) => {
      getConfig().then(response => {
        const data = response.data
        commit('SET_CONFIG', data)
        resolve()
      }).catch(error => {
        console.error('config', error)
        reject(error)
      })
    })
  },


  // get user balance
  balance({commit}) {
    return new Promise((resolve, reject) => {
      getBalance().then(response => {
        const {data} = response
        commit('SET_BALANCE', data.results)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
