<template>
  <div>
    <Header />
    <!-- 栏目banner -->
    <PageBanner channelCode="lxs" />
    <div class="daq-list-wrap">
      <div class="main">
        <scroll-load
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
                <p><span class="daq-icon">&#xe652;</span><span class="txt">{{$t('travel.licenseno')}}：{{item.licenseno}}</span></p>
                <p><span class="daq-icon">&#xe677;</span><span class="txt">{{$t('travel.type')}}：{{item.resourceLevel}}</span></p>
                <p :title="item.address"><span class="daq-icon">&#xe667;</span><span class="txt">{{$t('travel.address')}}：{{item.address}}</span></p>
              </div>
            </li>
          </ul>
        </scroll-load>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
  import Header from '@/widgets/header'
  import Footer from '@/widgets/footer'
  import PageBanner from '@/widgets/page-banner.vue'
  import ScrollLoad from '@/components/scrollLoad'
  export default {
    components: {
      Header,
      Footer,
      PageBanner,
      ScrollLoad
    },
    data () {
      return {
        list: [],
        params: {
          region: 510000
        }
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
    .daq-icon {
      margin-right: 6px;
    }
    p {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      
    }
    .txt {
      flex: 1;
      @include ellipsis();
    }
  }
}
</style>
