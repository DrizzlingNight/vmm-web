import * as _ from "lodash";


const getters = {
    language: state => state.app.language,
    size: state => state.app.size,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    user: state => state.user.user,
    balance: state => state.user.balance,
    getBalanceById: state => id => (_.find(state.user.balance, balance => (balance.coin === id))),
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    // errorLogs: state => state.errorLog.logs,

    showAlert: state => state.alert.showAlert,
    alertData: state => state.alert.alertData,

    host: state => state.ui.host,
    isShowLoginDialog: state => state.ui.isShowLoginDialog,
    isRegisterDialog: state => state.ui.isRegisterDialog,
    isPasswordDialog: state => state.ui.isPasswordDialog,
    showingBindDialogType: state => state.ui.showingBindDialogType,
    isShowRechargeDialog: state => state.ui.isShowRechargeDialog,
    isShowDepositNFTDialog: state => state.ui.isShowDepositNFTDialog,
    
    isShowSelectNFTNetworkDialog: state => state.ui.isShowSelectNFTNetworkDialog,
    isShowLinkToWalletDialog: state => state.ui.isShowLinkToWalletDialog,
    isShowTransferInNFTDialog: state => state.ui.isShowTransferInNFTDialog,
    connectedWalletAccount: state => state.ui.connectedWalletAccount,
    isNFTTransferIn: state => state.ui.isNFTTransferIn,
    isMetaMask: state => state.ui.isMetaMask,
    

    isShowDrawerDialog: state => state.ui.isShowDrawerDialog,
    isShowCopyDialog: state => state.ui.isShowCopyDialog,
    isShowCopyDialogState: state => state.ui.isShowCopyDialogState,
    isUserTab: state => state.ui.isUserTab,
    isServicePageDialog: state => state.ui.isServicePageDialog,

    isShowSwapRedPoint: state => state.ui.isShowSwapRedPoint,
    isShowHomeBanner: state => state.ui.isShowHomeBanner,

    currentCode: state => state.coin.currentCode,
    coinList: state => state.coin.coinList,
    referenceCoin: state => (_.find(state.coin.coinList, coin => (coin.reference))),
    stakeCoin: state => (_.find(state.coin.coinList, coin => (coin.stake))),
    getCoinById: state => id => (_.find(state.coin.coinList, coin => (coin.id === id))),
    config: state => state.user.config,
    rateList: state => state.coin.rateList,
    getRate: state => (from, to) => {
        let res = _.find(state.coin.rateList, rate => (
            (rate.from_coin.id === from) && (rate.to_coin.id === to)
        ))
        if (res)
            return res
        res = _.find(state.coin.rateList, rate => (
            (rate.from_coin.id === to) && (rate.to_coin.id === from)
        ))
        if (res)
            res.rate = 1 / res.rate
        return res
    },

    loginStatus: state => state.user.loginStatus
}
export default getters
