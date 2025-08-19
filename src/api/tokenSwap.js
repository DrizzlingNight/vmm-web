import request from '@/utils/request'

export function getQuote(params) {
    return request({
        url: '/token_swap/quote/',
        method: 'get',
        params
    })
}

export function swap(data) {
    return request({
        url: '/token_swap/swap/',
        method: 'post',
        data
    })
}
export function getSwapToken(params) {
    return request({
        url: '/token_swap/get_swap_token/',
        method: 'get',
        params
    })
}

export function getTokenSwapPool() {
    return request({
        url: '/token_swap/',
        method: 'get'
    })
}


