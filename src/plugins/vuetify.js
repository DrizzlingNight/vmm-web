import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { variations: false },
        dark: false,
        themes: {
            light: {
                primary: '#181A1C',
                secondary: '#6DD400',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                background:'#ffffff',
                background2:'#FBFBFB',
                background3:'#FCFCFC',
                fontColor:'#000000',
                fontColor2:'#F6F5F3',
                fontColor3:'#333333',
                fontColor4:'#666666',
                fontColor5:'#646A7B',
                fontColor6:'#424242',
                fontColor7:'#B71C1C',
                fontColor8:'#999999',
                fontColor9:'#9E9E9E',
                fontColor10:'#959595',
                fontColor11:'#1E88E5',
                fontColor12:'#0091FF',
                fontColor13:'#CCCCCC',
                fontColor14:'#9195A2',
                searchInput:'#F6F5F3',
                navI18n:'#050505',
                btnColor:'#CC9933',
                btnWhite:'#ffffff',
                border:'#333333',
                border2:'#979797',
                border3:'#636363',

            },
        },
    },
});
