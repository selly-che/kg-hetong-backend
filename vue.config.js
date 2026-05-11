const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "dist",
  assetsDir: "assets",
  lintOnSave: false,
  devServer: {
    port: 8086,
    open: true,
    https: false,
    proxy: {
      "/jeecg-boot": {
        target: "http://192.168.100.76:10888",
        // target: "http://10.20.120.153:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(
          process.env.NODE_ENV === "production" ? false : true,
        ),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(
          process.env.NODE_ENV === "production" ? false : true,
        ),
      });
      return definitions;
    });
  },
});
