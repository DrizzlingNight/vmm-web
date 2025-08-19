const state = {
    isUserTab: -1,
    isShowLoginDialog: false,
    showingBindDialogType: -1,
    isRegisterDialog: false,
    isPasswordDialog: false,
    isShowRechargeDialog: false,
    isShowDepositNFTDialog: false,
    isShowCopyDialog: false,
    isShowCopyDialogState: true,
    isShowDrawerDialog: false,
    isServicePageDialog: false,

    
    isShowSelectNFTNetworkDialog: false,
    isShowTransferInNFTDialog: false,
    isShowLinkToWalletDialog: false,
    connectedWalletAccount: '',
    isNFTTransferIn: true,
    isMetaMask: true,

    host:'',

    isShowSwapRedPoint: true,
    isShowHomeBanner: true,
}

const mutations = {
    SET_IS_SHOW_HOME_BANNER: (state, isShow) => {
        state.isShowHomeBanner = isShow
    },
    SET_IS_SHOW_SWAP_RED_POINT: (state, isShow) => {
        state.isShowSwapRedPoint = isShow
    },
    SET_IS_SHOW_LOGIN_DIALOG: (state, isShow) => {
        state.isShowLoginDialog = isShow
    },
    SET_SHOWING_BIND_DIALOG_TYPE: (state, type) => {
        state.showingBindDialogType = type
    },
    SET_IS_REGISTER_DIALOG: (state, isRegister) => {
        state.isRegisterDialog = isRegister
    },
    SET_IS_PASSWORD_DIALOG: (state, isPassword) => {
        state.isPasswordDialog = isPassword
    },
    SET_IS_SHOW_RECHARGE_DIALOG: (state, isAtRechargeState) => {
        state.isShowRechargeDialog = isAtRechargeState
    },
    SET_IS_SHOW_DEPOSITNFT_DIALOG: (state, isAtRechargeState) => {
        state.isShowDepositNFTDialog = isAtRechargeState
    },
    SET_IS_SHOW_DRAWER_DIALOG: (state, isShowDrawerDialog) => {
        state.isShowDrawerDialog = isShowDrawerDialog
    },
    SET_IS_SHOW_COPY_DIALOG: (state, isShowCopyDialog) => {
        state.isShowCopyDialog = isShowCopyDialog
    },
    SET_IS_SHOW_COPY_DIALOG_STATE: (state, isShowCopyDialogState) => {
        state.isShowCopyDialogState = isShowCopyDialogState
    },
    SET_IS_USER_TAB: (state, isUserTab) => {
        state.isUserTab = isUserTab
    },
    SET_IS_SERVICE_PAGE_DIALOG: (state, isShow) => {
        state.isServicePageDialog = isShow
    },

    SET_IS_SHOW_TRANSFER_IN_NFT_DIALOG: (state, isShow) => {
        state.isShowTransferInNFTDialog = isShow
    },
    SET_IS_META_MASK: (state, isMetaMask) => {
        state.isMetaMask = isMetaMask
    },
    SET_CONNECTED_WALLET_ACCOUNT:(state, account) => {
        state.connectedWalletAccount = account
    },

    SET_IS_SHOW_SELECT_NFT_NETWORK_DIALOG: (state, isShow) => {
        state.isShowSelectNFTNetworkDialog = isShow
    },

    SET_IS_SHOW_LINK_TO_WALLET_DIALOG: (state, isShow) => {
        state.isShowLinkToWalletDialog = isShow
    },

    SET_IS_NFT_TRANSFER_IN: (state, isIn) => {
        state.isNFTTransferIn = isIn
    }

    

}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
