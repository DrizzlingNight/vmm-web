import request from '@/utils/request'

export function getCurrentMining() {
    return request({
        url: '/mining/pool/current_mining/ ',
        method: 'get'
    })
}

export function getInvitaionCurrentMining() {
    return request({
        url: '/referral/pool/current_mining/',
        method: 'get'
    })
}

export function getDivPool() {
    return request({
        url: '/stake/div_pool/',
        method: 'get'
    })
}

export function getStakeInfo() {
    return request({
        url: '/stake/stake_pool/get_stake_info/',
        method: 'get'
    })
}

export function getStakePool() {
    return request({
        url: '/stake/stake_pool/',
        method: 'get'
    })
}

export function addStake(data) {
    return request({
        url: '/stake/stake_pool/add_stake/',
        method: 'post',
        data
    })
}

export function removeStake(data) {
    return request({
        url: '/stake/stake_pool/remove_stake/',
        method: 'post',
        data
    })
}

export function cancelRedeem() {
    return request({
        url: '/stake/stake_pool/cancel_redeem/',
        method: 'post',
    })
}

export function getAvailableStakeBonus() {
    return request({
        url: '/stake/div_pool/get_available_stake_bonus/',
        method: 'get',
    })
}

export function receiveStakeDiv() {
    return request({
        url: '/stake/div_pool/receive_stake_div/',
        method: 'post',
    })
}

export function getStakeDivRecord(params) {
    return request({
        url: '/stake/div_pool/get_stake_div_record/',
        method: 'get',
        params
    })
}

export function getBuybackPool() {
    return request({
        url: '/buyback/pool/',
        method: 'get',
    })
}

export function getBuybackInfo() {
    return request({
        url: '/buyback/pool/get_buyback_info/',
        method: 'get',
    })
}

export function addBuyback(data) {
    return request({
        url: '/buyback/pool/add_buyback/',
        method: 'post',
        data
    })
}

export function getReferralInfo() {
    return request({
        url: '/referral/pool/user_referral_info/',
        method: 'get',
    })
}
