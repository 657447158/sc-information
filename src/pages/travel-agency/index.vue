<template>
  <div>
    <Header />
    <!-- 栏目banner -->
    <SubPageBanner channelCode="lxscx" />
    <!-- 面包屑导航 -->
    <Crumbs :lv2="crumbsLv2" :lv4="crumbsLv4" />
    <div class="daq-list-wrap">
      <div class="main">
        <div class="title-box">
          <div>
            <p class="daq-list-title">贴心服务，让旅行更简单</p>
            <p class="daq-list-slogan">佳游相伴，品质旅程，带给你无限精彩</p>
          </div>
        </div>
        <daq-scroll-load
          requestName="getTravelList"
          :limit="9"
          :params="params"
          @list="getList"
        >
          <ul class="daq-list" slot="list">
            <li
              class="daq-list-item"
              v-for="item in list"
              :key="item.id"
            >
              <p class="name" :title="item.name">{{item.name}}</p>
              <div class="info">
                <p>经营许可证：{{item.licenseno}}</p>
                <p>旅行社类型：{{item.resourceLevel}}</p>
                <!-- <p>旅行社电话：{{item.phone}}</p> -->
                <p :title="item.address">旅行社地址：{{item.address}}</p>
              </div>
            </li>
          </ul>
        </daq-scroll-load>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
  import Header from '@/widgets/header'
  import Footer from '@/widgets/footer'
  import SubPageBanner from '@/widgets/sub-page-banner'
  import Crumbs from '@/widgets/crumbs'
  import daqScrollLoad from '@/components/scrollLoad'
  export default {
    components: {
      Header,
      Footer,
      SubPageBanner,
      Crumbs,
      daqScrollLoad
    },
    data () {
      return {
        list: [],
        params: {
          region: 510000
        },
        crumbsLv2: {
          name: '实用信息',
          href: 'info.html?code=info' 
        },
        crumbsLv4: '旅行社查询'
      }
    },
    methods: {
      getList (val) {
        this.list = this.list.concat(val)
      }
    }
  }
</script>
<style lang="scss" scoped>
.daq-list-wrap {
  min-height: 840px;
  .title-box {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.daq-list-title {
  font-size: 36px;
  font-weight: bold;
}
.daq-list-slogan {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}
.daq-list {
  margin-top: 60px;
  overflow: hidden;
}
.daq-list-item {
  margin-bottom: 41px;
  padding: 30px 10px;
  float: left;
  width: 426px;
  height: 190px;
  border: 1px solid #ececec;
  &~&:not(:nth-child(3n+1)) {
    margin-left: 41px;
  }
  .name {
    padding: 0 10px 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ececec;
    @include ellipsis();
  }
  .info {
    padding: 20px 10px 0;
    color: #666;
    p {
      margin-bottom: 10px;
      @include ellipsis();
    }
  }
}
</style>
