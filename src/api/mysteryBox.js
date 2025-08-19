import request from '@/utils/request'

export function getBlindbox() {
    return request({
        url: '/nft/blindbox/',
        method: 'get',
    })
}

export function getBlindboxDetail(id) {
    return request({
        url: '/nft/blindbox/' + id + '/',
        method: 'get',
    })
}

export function buyBlindbox(id, data) {
    return request({
        url: '/nft/blindbox/' + id + '/buy/',
        method: 'post',
        data
    })
}

export function openBlindbox(id, data) {
    return request({
        url: '/nft/token/' + id + '/open/',
        method: 'post',
        data
    })
}

export function fetchAdBanner() {
    return request({
        url: '/advertise/banner/',
        method: 'get'
    })
}