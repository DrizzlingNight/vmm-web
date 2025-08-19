module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: './lang',
      enableInSFC: false
    }
  },

  devServer: {
    proxy: {
      "/api": {    // 这里的`/api`是自定义的
        //target: "http://192.168.50.90:7000/", //这里是真实的接口baseURL
        target: "http://vmm-dev-backend-api.ap-southeast-2.elasticbeanstalk.com", //这里是真实的接口baseURL
        // target: "http://192.168.50.198:8000/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "/api/": "", // 这里的`^/api`也是是自定义的
        },
      },
      "/file": {    // 这里的`/api`是自定义的
        //target: "http://192.168.50.90:7000/", //这里是真实的接口baseURL
        target: "https://s3.ap-northeast-1.amazonaws.com/dev.vmm.zone/", //这里是真实的接口baseURL
        //target:"http://192.168.50.90:8888/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "/api/": "", // 这里的`^/api`也是是自定义的
        },
      }
    },
  }
}
