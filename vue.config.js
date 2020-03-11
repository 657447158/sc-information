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
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'destination': 'src/pages/destination/main.js',
    'next': 'src/pages/next/main.js',
    'info': 'src/pages/info/main.js',
    'hot-activity': 'src/pages/hot-activity/main.js',
    'destination-detail': 'src/pages/destination-detail/main.js',
    'scenery-list': 'src/pages/scenery-list/main.js',
    'scenery-detail': 'src/pages/scenery-detail/main.js',
    'food-list': 'src/pages/food-list/main.js',
    'food-detail': 'src/pages/food-detail/main.js',
    'hotel-list': 'src/pages/hotel-list/main.js',
    'traffic-guide': 'src/pages/traffic-guide/main.js',
    'news-detail': 'src/pages/news-detail/main.js',
    'channel-detail': 'src/pages/channel-detail/main.js',
    'news-list': 'src/pages/news-list/main.js',
    'next-list': 'src/pages/next-list/main.js',
    'travel-agency': 'src/pages/travel-agency/main.js',
    'guide-list': 'src/pages/guide-list/main.js',
    'search': 'src/pages/search/main.js',
  }
}