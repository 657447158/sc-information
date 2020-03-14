import ajax from './axios'

const api = {
  /**
   * [新闻资讯列表]
   */
  getNewsListRecursion (params) {
    return ajax({
      url: 'news/listRecursion',
      params: Object.assign({...params})
    })
  },
  /**
   * [新闻资讯列表]
   */
  getNewsList (params) {
    return ajax({
      url: 'news/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [新闻资讯列表]
   */
  getMultChannelNewsList (params) {
    return ajax({
      url: 'news/getRecommendByCode',
      params: Object.assign({...params})
    })
  },
  /**
   * [新闻资讯列表]
   */
  getNewsDetail (params) {
    return ajax({
      url: 'news/detail',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取目的地列表]
   */
  getDestinationList (params) {
    return ajax({
      url: 'destination/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [根据地区获取子级地区及对应的景区]
   */
  getDestinationRegionAndScenery (params) {
    return ajax({
      url: 'scenery/regionAndScenery',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取目的地基础信息]
   */
  getDestinationInfo (params) {
    return ajax({
      url: 'destination/baseInfo',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取目的地推荐景区]
   */
  getDestinationScenerys(params) {
    return ajax({
      url: 'destination/scenerys',
      params: Object.assign({...params})
    })
  },
  /**
   * [景区列表信息]
   */
  getSceneryList (params) {
    return ajax({
      url: 'scenery/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [景区列表信息]
   */
  getSceneryDetail (params) {
    return ajax({
      url: 'scenery/detailById',
      params: Object.assign({...params})
    })
  },
  /**
   * [根据是否有景区获取分类]
   */
  getSceneryTypeAndLevel (params) {
    return ajax({
      url: 'scenery/getTypeAndLevel',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取站点地区信息]
   */
  getSiteRegions (params) {
    return ajax({
      url: 'common/siteRegions',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取站点地区信息]
   */
  getSiteTags (params) {
    return ajax({
      url: 'siteTag/getTagsByType',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取栏目列表]
   */
  getChannelList (params) {
    return ajax({
      url: 'siteChannel/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [获取栏目详情]
   */
  getChannelDetail (params) {
    return ajax({
      url: 'siteChannel/detail',
      params: Object.assign({...params})
    })
  },
  /**
   * [美食列表]
   */
  getFoodList (params) {
    return ajax({
      url: 'food/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [美食详情]
   */
  getFoodDetail (params) {
    return ajax({
      url: 'food/detail',
      params: Object.assign({...params})
    })
  },
  /**
   * [宾馆酒店列表]
   */
  getHotelList (params) {
    return ajax({
      url: 'hotel/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [旅行社列表]
   */
  getTravelList (params) {
    return ajax({
      url: 'travel/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [导游列表]
   */
  getGuideList (params) {
    return ajax({
      url: 'guide/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [搜索所有]
   */
  getSearchAll (params) {
    return ajax({
      url: 'elasticsearch/searchAll',
      params: Object.assign({...params})
    })
  },
  /**
   * [按类型搜索]
   */
  getSearchByType (params) {
    return ajax({
      url: 'elasticsearch/searchPagebyType',
      params: Object.assign({...params})
    })
  },
  /**
   * [栏目面包屑]
   */
  getCrumbsList (params) {
    return ajax({
      url: 'siteChannel/channelList',
      params: Object.assign({...params})
    })
  },
  /**
   * [根据位置代码查询广告]
   */
  getAdList (params) {
    return ajax({
      url: 'siteAd/list',
      params: Object.assign({...params})
    })
  },
  /**
   * [主题活动列表]
   */
  getActivityList (params) {
    return ajax({
      url: 'activity/list',
      params: Object.assign({...params})
    })
  },
}

export default api