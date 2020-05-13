<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <div class="submenu">
      <div class="menu-item">
        <div class="item-box" :class="codeList.length && 'dropdown'">
          <div class="title" :class="channelCode === 'video' && 'active'">
            <span @click="chooseTab(0)">{{$t('video')}}</span>
            <!-- <span class="daq-icon" v-if="codeList.length">&#xe6af;</span> -->
          </div>
          <!-- <ul v-if="codeList.length">
            <li
              :class="item.active && 'active'"
              v-for="(item, i) in codeList"
              :key="item.id"
              @click="chooseVideoItem(item, i)"
            >{{item.name}}</li>
          </ul> -->
        </div>
      </div>
      <div class="menu-item">
        <div class="item-box" :class="codeList.length && 'dropdown'">
          <div class="title" :class="channelCode === 'picture' && 'active'">
            <span @click="chooseTab(1)">{{$t('gallery')}}</span>
            <!-- <span class="daq-icon" v-if="codeList.length">&#xe6af;</span> -->
          </div>
          <!-- <ul v-if="picCodeList.length">
            <li
              :class="item.active && 'active'"
              v-for="(item, i) in picCodeList"
              :key="item.id"
              @click="choosePicItem(item, i)"
            >{{item.name}}</li>
          </ul> -->
        </div>
      </div>
    </div>
    <div class="list-container main" v-if="channelCode === 'video'">
      <scroll-load 
        requestName="getVideoList" 
        :limit="9" 
        :params="params" 
        @list="getList"
      >
        <ul class="list-wrapper" slot="list">
          <li v-for="item in list" :key="item.id" @click="playVideo(item)">
            <a href="javascript:;">
              <span class="img-box">
                <img v-if="item.coverpictureFourToThree" :src="item.coverpictureFourToThree" />
              </span>
              <h3 :title="item.title">{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </scroll-load>
    </div>
    <div class="list-container main" v-else>
      <scroll-load 
        requestName="getPicList" 
        :limit="9" 
        :params="picParams"
        @list="getPicList"
      >
        <ul class="list-wrapper" slot="list">
          <li v-for="(item, index) in picList" :key="item.id" @click="playPic(item, index)">
            <a href="javascript:;">
              <span class="img-box">
                <img v-if="item.url" :src="item.url" />
              </span>
              <h3 :title="item.title">{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </scroll-load>
    </div>
    <Footer />
    <!-- 视频弹框 -->
    <div class="media-popup" @click.self="closeVideo" v-show="isShow">
      <div class="media-hd media-close" @click="closeVideo">
        <a></a>
      </div>
      <div class="media-content">
        <div class="media-wrap" id="media-wrap">
          <video
            id="currVideo"
            width="100%"
            height="100%"
            controls
            loop
            preload="auto"
            :poster="videoParams.mediaImg"
          >
            <!--<source :src="videoParams.mediaUrl" type="video/mp4">-->
            <!--<p style="padding: 50px;color:#fff;text-align: center">您的浏览器不支持 HTML5 video 标签。</p>-->
          </video>
        </div>
      </div>
    </div>
    <!-- 图片弹框 -->
    <div class="media-popup" @click.self="closePic" v-show="picShow">
      <div class="media-hd media-close" @click="closePic">
        <a></a>
      </div>
      <div class="dialog-bd">
        <img :src="picUrl" />
        <p>{{picTitle}}</p>
      </div>
      <div class="dialog-ft">
        <a href="javascript:;" class="prev daq-icon opacity" @click="lastImg"></a >
        <a href="javascript:;" class="next daq-icon opacity" @click="nextImg"></a >
      </div>
    </div>
  </div>
</template>

<script>
import scrollAnimate from "@/mixins/scroll_animate";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import ScrollLoad from "@/components/scrollLoad";
import tools from "@/utils/tools";
import Ajax from "@/service";
export default {
  components: {
    Header,
    Footer,
    ScrollLoad
  },
  mixins: [scrollAnimate],
  data() {
    return {
      channelCode: tools.getUrlParams("code"),
      codeList: [],
      picCodeList: [],
      videoFlag: false,
      picFlag: false,
      tabIndex: 0,
      params: {
        typeCode: ""
      },
      picParams: {
        tag: '',
        datatype: 'sourceType_1'
      },
      list: [],
      picList: [],
      isShow: false,
      picShow: false,
      videoParams: {
        mediaUrl: "",
        mediaImg: ""
      },
      picUrl: '',
      picTitle: '',
      picIndex: 0
    };
  },
  mounted() {
    // this.getTagsByType();
  },
  methods: {
    playPic (item, index) {
      this.picUrl = item.url
      this.picTitle = item.title
      this.picIndex = index
      this.picShow = true
    },
    lastImg () {
      if (this.picIndex < 1) return
      this.picIndex--
      this.picUrl = this.picList[this.picIndex].url
      this.picTitle = this.picList[this.picIndex].title
    },
    nextImg () {
      if (this.picIndex === this.picList.length - 1) return
      this.picIndex++
      this.picUrl = this.picList[this.picIndex].url
      this.picTitle = this.picList[this.picIndex].title
    },
    playVideo(item) {
      this.videoParams = {
        mediaImg: item.coverpictureFourToThree,
        mediaUrl: item.upload
      };
      let video = document.getElementById("currVideo");
      video.pause();
      video.setAttribute("src", this.videoParams.mediaUrl);
      video.load();
      video.play();
      this.showVideo();
    },
    showVideo() {
      this.isShow = !this.isShow;
    },
    closeVideo() {
      let video = document.getElementById("currVideo");
      video.pause();
      this.isShow = !this.isShow;
    },
    closePic () {
      this.picShow = false
    },
    getList(val) {
      this.list = this.list.concat(val);
    },
    getPicList (val) {
      this.picList = this.picList.concat(val);
    },
    chooseTab (index) {
      this.tabIndex = index
      if (index === 0) {
        this.channelCode = 'video'
      } else {
        this.channelCode = 'picture'
      }
    },
    chooseVideoItem(item, index) {
      if (!item || this.params.typeCode === item.id) return;
      this.list = [];
      this.videoFlag = true
      this.channelCode = 'video'
      this.picParams.tag = ''
      this.params.typeCode = item.id;
      this.codeList.map((item, i) => {
        item.active = false
        if (i === index) {
          item.active = true
        }
      })
      this.picCodeList.map(item => {
        item.active = false
      })
    },
    choosePicItem(item, index) {
      if (!item || this.picParams.tag === item.id) return;
      this.picList = [];
      this.picFlag = true
      this.channelCode = 'picture'
      this.params.typeCode = ''
      this.picParams.tag = item.id;
      this.picCodeList.map((item, i) => {
        item.active = false
        if (i === index) {
          item.active = true
        }
      })
      this.codeList.map(item => {
        item.active = false
      })
    },

    // 获取标签分类
    getTagsByType() {
      Ajax.getTagsByType({
        type: 2
      }).then(res => {
        if (res.code === 0 && res.datas.length) {
          this.codeList = res.datas
          if (this.channelCode !== 'video') return
          if (this.codeList[0]) {
            this.params.typeCode = this.codeList[0].id
            this.codeList[0].active = true
          }
          this.videoFlag = true
        } else {
          if (this.channelCode === 'video') {
            this.videoFlag = true
          }
        }
      });
      Ajax.getTagsByType({
        type: 1
      }).then(res => {
        if (res.code === 0 && res.datas.length) {
          this.picCodeList = res.datas
          if (this.channelCode !== 'picture') return
          if (this.picCodeList[0]) {
            this.picParams.tag = this.picCodeList[0].id
            this.picCodeList[0].active = true
          }
          this.picFlag = true
        } else {
          if (this.channelCode === 'picture') {
            this.picFlag = true
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.submenu {
  margin-top: 100px;
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
        &:hover {
          border: 1px solid #e1e1e1;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
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
          transition: all 0.3s linear;
        }
      }
      ul {
        display: none;
        margin: 40px 0 0 -1px;
        padding: 0 12px 20px;
        border: 1px solid #e1e1e1;
        border-top: none;
        min-width: 100%;
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
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
      margin-right: 40px;
      width: 426px;
      margin-top: 60px;
      .img-box {
        display: block;
        width: 426px;
        height: 280px;
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
    li:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.media-popup {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVR42mKUVdHfzEAEYGIgEowqpI5CgAADAN/9ATf322RYAAAAAElFTkSuQmCC);
}
.media-hd {
  position: fixed;
  right: -100px;
  top: -100px;
  z-index: 100;
  width: 200px;
  height: 200px;
  line-height: 280px;
  text-indent: 45px;
  background: rgba(255, 255, 255, 0.2) url('../../assets/images/video-close.png')
    no-repeat;
  background-position: 25% 75%;
  border-radius: 50%;
}
.media-hd:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}
.media-content {
  max-width: 1000px;
  border-radius: 5px;
  overflow: hidden;
  border: 15px solid #fff;
}
.dialog-bd {
  position: fixed;
  left: 50%;
  top: 50%;
  overflow: hidden;
  z-index: 100;
  padding: 15px;
  width: auto;
  border-radius: 6px;
  transition: all .3s ease;
  transform: translate(-50%, -50%);
  background: #fff;
  img {
    display: block;
    max-width: 100%;
    max-height: 700px;
  }
  p {
    position: absolute;
    left: 15px;
    bottom: 15px;
    right: 15px;
    padding: 10px 0 10px 15px;
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    background: rgba(0, 0, 0, .5);
  }
}
.dialog-ft a {
  background: rgba(255, 255, 255, 0.2) url('../../assets/images/pic-row.png') no-repeat;
}
.dialog-ft a:hover{
  background-color: rgba(255, 255, 255, 0.3);
}
.dialog-ft .next, .dialog-ft .prev {
  position: fixed;
  top: 50%;
  z-index: 100;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
}
.dialog-ft .prev {
  left: 0;
  background-position: 0 -80px;
}
.dialog-ft .next {
  right: 0;
  background-position: 0 0;
}
</style>
