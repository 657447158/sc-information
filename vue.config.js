const msg = require('./src/languages')
const title = msg[process.env.NODE_ENV].webTit

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/global.scss";`
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  pages: {
    'index': {
      title,
      entry: 'src/pages/index/main.js'
    },
    'article-detail': {
      title,
      entry: 'src/pages/article-detail/main.js'
    },
    'channel-detail': {
      title,
      entry: 'src/pages/channel-detail/main.js'
    },
    'list-menu':{
      title,
      entry: 'src/pages/list-menu/main.js'
    },
    'search':{
      title,
      entry: 'src/pages/search/main.js'
    },
    'travel-agency':{
      title,
      entry: 'src/pages/travel-agency/main.js'
    },
    'media-list':{
      title,
      entry: 'src/pages/media/main.js'
    },
    'sub-menu':{
      title,
      entry: 'src/pages/sub-menu/main.js'
    },
    'hotel-list':{
      title,
      entry: 'src/pages/hotel-list/main.js'
    },
    'pic-list':{
      title,
      entry: 'src/pages/pic-list/main.js'
    }
  }
}