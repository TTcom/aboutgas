const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const Timestamp = new Date().getTime() //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳

module.exports = {
  devServer: {
    port: 8089,
    liveReload: false,
    disableHostCheck: true,
    proxy: {
      '/gas/': {
        target: 'https://testjiayou.56pingtai.net',
        // target: 'http://192.168.71.24:8082',
        ws: false,
      },
      "/serapi/": {
        target: "https://h5utdev.56pingtai.net/serapi/",
        changeOrigin: true,
        pathRewrite: {
          "^/serapi": ""
        }
      }
    }
    // proxy: {
    //   "/serapi/": {
    //     target: "http://192.168.1.158:1878/serapi/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/serapi": ""
    //     }
    //   }
    // }
  },
  css: {
    extract: {
      //打包后的css带版本号，不改变文件名
      filename: "css/[name].[" + Timestamp + "].css",
      chunkFilename: "css/[name].[" + Timestamp + "].css"
    },
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/mixin.scss";`
      }
    }
  },
  configureWebpack: {
    //关闭 webpack 的性能提示
    //       performance: {
    //           hints: false
    //       },
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `js/[name].${process.env.VUE_APP_CURRENTMODE}.${Timestamp}.js`,
      chunkFilename: `js/[name].${process.env.VUE_APP_CURRENTMODE}.${Timestamp}.js`
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true, //是否需要map文件
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) //忽略 moment 的本地化内容
    ],
    externals: {
      AMap: "AMap"
    }
  },
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .loader("eslint-loader")
      .tap(options => {
        options.fix = true //设置自动修复eslint
        return options
      })
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/"
}