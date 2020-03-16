<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <page-banner :channelCode="channelCode" />
    <div class="submenu" v-if="codeList.length">
      <div 
        class="menu-item"
        v-for="(item, i) in codeList"
        :key="item.id"
      >
        <div class="item-box" :class="item.children.length && 'dropdown'">
          <div 
            class="title"
            :class="(code === item.chanelCode || index === i) && 'active'"
            @click="chooseItem(!item.children.length && item.chanelCode, i)"
          >
            <span>{{item.name}}</span>
            <span class="daq-icon" v-if="item.children.length">&#xe6af;</span>
          </div>
          <ul v-if="item.children.length">
            <li 
              :class="code === sub.chanelCode && 'active'"
              v-for="sub in item.children"
              :key="sub.id"
              @click="chooseItem(sub.chanelCode, i)"
            >{{sub.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-container main">
      <scroll-load
        requestName="getNewsList"
        :limit="4"
        :params="params"
        @list="getList"
        :pFlag="pFlag"
      >
        <ul class="list-wrapper" slot="list">
          <li
            v-for="item in list"
            :key="item.id"
          >
            <a :href="`article-detail.html?id=${item.id}`">
              <span class="img-box">
                <img :src="item.coverFourToThree" />
              </span>
              <h3 :title="item.title">{{item.title}}</h3>
              <p>{{item.summary}}</p>
            </a>
          </li>
        </ul>
      </scroll-load>
    </div>
    <Footer />
  </div>
</template>

<script>
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner";
import ScrollLoad from "@/components/scrollLoad";
import tools from "@/utils/tools";
import Ajax from "@/service";
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    ScrollLoad
  },
  mixins: [scrollAnimate],
  data() {
    return {
      channelCode: tools.getUrlParams("code"),
      codeList: [],
      code: '',
      index: 0,
      pFlag: false,
      params: {
        channelCode: ''
      },
      list: []
    };
  },
  mounted() {
    this.getTreeListByChannelCode();
  },
  methods: {
    getList (val) {
      this.list = this.list.concat(val)
    },
    chooseItem (code, index) {
      if (!code) return
      this.list = []
      this.code = code
      this.params.channelCode = code
      this.index = index
    },
    // 获取主题旅游栏目下的子栏目
    getTreeListByChannelCode() {
      Ajax.getTreeListByChannelCode({
        channelCode: this.channelCode
      }).then(res => {
        if (res.code === 0 && res.datas.length) {
          this.codeList = res.datas[0].children;
          if (this.codeList.length) {
            this.code = this.codeList[0].children.length ? this.codeList[0].children[0].chanelCode : this.codeList[0].chanelCode
          } else {
            this.code = res.datas[0].chanelCode
          }
          this.params.channelCode = this.code
          this.pFlag = true
        } else {
          this.pFlag = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.submenu {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e2e2;
  background: #f9f9f9;
  .menu-item {
    position: relative;
    display: flex;
    justify-content: center;
    min-width: 270px;
    height: 100%;
    box-sizing: border-box;
    .item-box {
      position: relative;
      z-index: 9;
      min-width: 200px;
      margin-top: 22px;
      border: 1px solid transparent;
      box-sizing: border-box;
      &:hover {
        .title {
          color: $themeColor;
          .daq-icon {
            color: $themeColor;
            transform: rotate(180deg);
          }
        }
      }
      &.dropdown {
        .title {
          cursor: default;
        }
        &:hover {
          border: 1px solid #e1e1e1;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, .1);
          background: #ffffff;
          ul {
            display: block;
          }
        }
      }
      .title {
        cursor: pointer;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
        text-align: center;
        color: #666666;
        font-size: 24px;
        &.active {
          color: $themeColor;
          .daq-icon {
            color: $themeColor;
          }
        }
        .daq-icon {
          margin-left: 12px;
          font-size: 12px;
          color: #6a6a6a;
          transition: all .3s linear;
        }
      }
      ul {
        display: none;
        margin: 40px 0 0 -1px;
        padding: 0 12px 20px;
        border: 1px solid #e1e1e1;
        border-top: none;
        min-width: 100%;
        box-shadow: 0 8px 10px rgba(0, 0, 0, .1);
        background: #fff;
        box-sizing: border-box;
        li {
          font-size: 16px;
          line-height: 36px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          &:hover,
          &.active {
            color: #dcb499;
          }
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 39px;
      width: 1px;
      height: 40px;
      right: 0;
      background: #e4e4e4;
    }
    &.noborder {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
        right: 0;
        background: transparent;
      }
    }
  }
}
.list-container {
  display: flex;
  justify-content: center;
  background: #ffffff;
  .list-wrapper {
    width: 1360px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 660px;
      margin-top: 60px;
      .img-box {
        display: block;
        width: 660px;
        height: 432px;
        // background: red;
        overflow: hidden;
        &:hover img {
          transform: scale(1.1);
        }
        img {
          width: 100%;
          height: 100%;
          transition: all 0.3s linear;
        }
      }

      h3 {
        line-height: 72px;
        font-size: 24px;
        color: #333333;
        @include ellipsis();
      }
      p {
        font-size: 16px;
        color: #666666;
      }
    }
    li:nth-child(2n) {
      margin-left: 40px;
    }
  }
}
</style>
