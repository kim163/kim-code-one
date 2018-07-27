var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9999,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api":{
        target:"http://10.33.67.27:17000",
       // target:'http://10.33.67.32:17000 ',
        changeOrigin:true
      }
    },
    useEslint: false,
    showEslintErrorsInOverlay: false,
    cssSourceMap: false,
    autoOpenBrowser:true
  }
}
