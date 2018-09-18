var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9999,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api":{
       // target:"http://150.109.33.205:9001",
        target:'http://54.255.244.109:9001',
       // target:'http://10.33.67.31:17000',
       // target:'10.33.67.54:17000',
       //  target:'http://10.33.67.32:17000',
        changeOrigin:true
      }
    },
    useEslint: false,
    showEslintErrorsInOverlay: false,
    cssSourceMap: false,
    autoOpenBrowser:true
  }
}
