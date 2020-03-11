<template>
  <div>
    <Header />
    <!-- 栏目banner -->
    <SubPageBanner channelCode="dycx" title="导游" />
    <!-- 面包屑导航 -->
    <Crumbs :lv2="crumbsLv2" :lv4="crumbsLv4" />
    <div class="daq-list-wrap">
      <div class="main">
        <div class="title-box">
          <div>
            <p class="daq-list-title">用爱向导 愉悦旅行</p>
            <p class="daq-list-slogan">在线自由选，体验个性化私人订制服务，带给你不一样的旅行体验</p>
          </div>
        </div>
        <daq-scroll-load
          requestName="getGuideList"
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
              <span class="img-box" v-if="item.photo">
                <img :src="item.photo" />
              </span>
              <div class="word-box">
                <p class="name">
                  <span :title="item.name">{{item.name | elipsisName}}</span>
                  <span class="daq-icon icon1" v-if="item.sex === '男性'">&#xe636;</span>
                  <span class="daq-icon icon2" v-if="item.sex === '女性'">&#xe637;</span>
                </p>
                <p>导游等级：{{item.level}}</p>
                <p>导游证号：{{item.identification}}</p>
                <p :title="item.language">语言种类：{{item.language | elipsisLang}}</p>
                <!-- <p>所属公司：{{item.company}}</p> -->
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
        crumbsLv4: '导游查询'
      }
    },
    filters: {
      elipsisName (val) {
        let str = val
        if (str.length > 10) {
          str = val.slice(0, 10) + '...'
        }
        return str
      },
      elipsisLang (val) {
        let str = val
        if (str.length > 30) {
          str = val.slice(0, 30) + '...'
        }
        return str
      },
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
  padding: 30px;
  float: left;
  display: flex;
  width: 426px;
  height: 190px;
  border: 1px solid #ececec;
  &~&:not(:nth-child(3n+1)) {
    margin-left: 41px;
  }
  .img-box {
    margin-right: 20px;
    width: 100px;
    height: 130px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .word-box {
    flex: 1;
    p {
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
    }
    .name {
      margin: 8px 0 20px;
      font-size: 18px;
      color: #555;
      .daq-icon {
        margin-left: 10px;
        font-size: 20px;
      }
      .icon1 { color: #00a0ed; }
      .icon2 { color: #f12a79; }
    }
  }

}
</style>
