const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  devServer: {
    port: 8086,
    open: true,
    proxy: {
       /* 目标代理服务器地址 */
      "/jeecg-boot": {
        target: 'http://192.168.200.198:8080', //  替换真实地址
           /* 允许跨域 */
        changeOrigin: true,
        // secure: false,
        // ws: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    }
  },
  
})
