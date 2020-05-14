<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <div class="list-container main">
      <scroll-load 
        requestName="getPicList" 
        :limit="9" 
        :params="params"
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
export default {
  components: {
    Header,
    Footer,
    ScrollLoad
  },
  mixins: [scrollAnimate],
  data() {
    return {
      params: {
        tag: tools.getUrlParams('tag'),
        datatype: 'sourceType_1'
      },
      picList: [],
      picUrl: '',
      picTitle: '',
      picIndex: 0,
      picShow: false
    };
  },
  methods: {
    getPicList (val) {
      this.picList = this.picList.concat(val)
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
    closePic () {
      this.picShow = false
    }
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  margin-top: 100px;
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
