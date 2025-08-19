import Vue from 'vue'
import VueRouter from 'vue-router'
// import goTo from "vuetify/lib/services/goto";

const HomeView = () => import('../views/Homepage/homepage')
const ProDetails = () => import('../views/Prodetails/prodetails')
const CreateNft = () => import('../views/CreateNft/createnft')
const TransferNft = () => import('../views/TransferNft/transfernft')
const Prodetails = () => import('../views/Prodetails/prodetails')
const Assets = () => import('../views/Assets/assets')

const PerSetting = () => import('../views/PerSetting/persetting')

const Listed = () => import('../views/Listed/listed')


const Trade = () => import('../views/Trade/Trade')

const About = () => import('../views/About/aboutPage')

const Search = () => import('../views/Search/search')


const Mining = () => import('../views/Mining/Mining')
const MiningPage = () => import('../views/Mining/MiningComps/miningPage')
const Dividends = () => import('../views/Mining/MiningComps/dividendsPage')
const Pledge = () => import('../views/Mining/MiningComps/pledgePage')
const Repurchase = () => import('../views/Mining/MiningComps/repurchasePage')

const Invitation = () => import('../views/Invitation/Invitation')

const MysteryBox = () => import('../views/MysteryBox/MysteryBox')
const MysteryBoxMarket = () => import('../views/MysteryBoxMarket/MysteryBoxMarket')
// const MysteryBoxDetail = () =>import('../views/MysteryBoxDetail/MysteryBoxDetail')
const MysteryBoxDetail = () => import('../views/MysteryBoxDetail/MysteryBoxDetail')

const BindThirdParty = () => import('../views/LoginOrRegister/BindThirdParty')

const TokenSwap = () => import('../views/TokenSwap/TokenSwap')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/mystery_box'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    // {
    //     path: '/service',
    //     name: 'Service',
    //     component: Service
    // },
    {
        path: '/assets',
        name: 'assets',
        component: Assets
    },
    {
        path: '/vmm',
        name: 'homeView',
        component: HomeView
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade
    },
    {
        path: '/treasury_detail',
        name: 'ProDetails',
        component: ProDetails
    },
    {
        path: '/creatednft',
        name: 'Creatednft',
        component: CreateNft,
        meta: {requireAuth: true}

    },
    {
        path: '/nft/:id',
        name: 'NFT',
        component: Prodetails
    },
    // {
    //     path: '/nft/mysteryBox/:id',
    //     name: 'MysteryBox',
    //     component: Prodetails
    // },
    {
        path: '/nft/nft/:id',
        name: 'NFTTab',
        component: Prodetails,
        redirect: '/nft/:id'
    },
    {
        path: '/transfernft/:id',
        name: 'transfernft',
        component: TransferNft
    },
    {
        path: '/user/:id/',
        name: 'perSetting',
        component: PerSetting,
    },
    {
        path: '/user/:id/:selectedTab',
        name: 'perSettingTab',
        component: PerSetting,
    },
    {
        path: '/sell/:id',
        name: 'listed',
        component: Listed
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/mining',
        name: 'minings',
        component: Mining,
        children: [
            {
                path: 'miningInfo',
                name: 'mining',
                component: MiningPage,
            }, {
                path: 'dividends',
                name: 'dividends',
                component: Dividends,
            }, {
                path: 'pledge',
                name: 'pledge',
                component: Pledge,
            }, {
                path: 'repurchase',
                name: 'repurchase',
                component: Repurchase,
            },
        ]
    },
    {
        path: '/invitation',
        name: 'invitation',
        component: Invitation
    },
    {
        path: '/mystery_box',
        name: 'MysteryBox',
        component: MysteryBox,
        // children: [
        //     {
        //         path: 'market',
        //         name: 'MysteryBoxMarket',
        //         component: MysteryBoxMarket,
        //     },{
        //         path: 'id',
        //         name: 'MysteryBoxDetail',
        //         component: MysteryBoxDetail,
        //     }
        // ]
    },
    {
        path: '/mystery_box/market',
        name: 'MysteryBoxMarket',
        component: MysteryBoxMarket
    },
    {
        path: '/mysteryBox/:id',
        name: 'MysteryBoxDetail',
        component: MysteryBoxDetail
    },
    {
        path: '/bind',
        name: 'bind',
        component: BindThirdParty 
    },
    {
        path: '/token_swap',
        name: 'TokenSwap',
        component: TokenSwap
    }
]

const router = new VueRouter({
    // mode:'history',
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})


const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router
