<template>
  <div id="app">
    <!-- 顶部导航 -->
    <Header />
    <!-- 列表 -->
    <div class="daq-list-wrap">
      <div class="main">
        
        <daq-scroll-load requestName="getPicList" :params="params" :limit="9" @list="getList">
          <div class="daq-waterfall" slot="list">
            <ul class="daq-list" ref="left">
              <li
                class="daq-list-item"
                v-for="(item, index) in leftList"
                :key="index"
                @click="showPop(item.index)"
              >
                <a>
                  <span class="img-box">
                    <img v-if="item.url" :src="item.url" />
                  </span>
                  <div class="word-box">
                    <p class="name" :title="item.title">{{item.title}}</p>
                  </div>
                </a>
              </li>
            </ul>
            <ul class="daq-list" ref="mid">
              <li
                class="daq-list-item"
                v-for="(item, index) in midList"
                :key="index"
                @click="showPop(item.index)"
              >
                <a>
                  <span class="img-box">
                    <img v-if="item.url" :src="item.url" />
                  </span>
                  <div class="word-box">
                    <p class="name" :title="item.title">{{item.title}}</p>
                    <!--<div class="date">-->
                    <!--<span class="daq-icon">&#xe670;</span>-->
                    <!--<span>{{item.publishtime | formatDate}}</span>-->
                    <!--</div>-->
                  </div>
                </a>
              </li>
            </ul>
            <ul class="daq-list" ref="right">
              <li
                class="daq-list-item"
                v-for="(item, index) in rightList"
                :key="index"
                @click="showPop(item.index)"
              >
                <a>
                  <span class="img-box">
                    <img v-if="item.url" :src="item.url" />
                  </span>
                  <div class="word-box">
                    <p class="name" :title="item.title">{{item.title}}</p>
                    <!--<div class="date">-->
                    <!--<span class="daq-icon">&#xe670;</span>-->
                    <!--<span>{{item.publishtime | formatDate}}</span>-->
                    <!--</div>-->
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </daq-scroll-load>
      </div>
    </div>
    <!-- 底部信息栏 -->
    <Footer />
    <!-- 图片弹窗 -->
    <div class="media-popup" id="popup" @click.self="closePop" v-show="isShow">
      <div class="media-hd media-close" @click="closePop">
        <a></a>
      </div>
      <div
        class="dialog-bd"
        :style="{
          width: (boxWidth > 0 ? (boxWidth + 'px') : 'auto'),
          height: (boxHeight > 0 ? (boxHeight + 'px') : 'auto'),
          'margin-left': (boxML + 'px'),
          'margin-top': (boxMT + 'px')
        }"
      >
        <img :src="currImageSrc" :alt="currTitle" />
        <p
          class="title mask"
          :title="currTitle"
          :style="{width: (boxWidth > 0 ? (boxWidth - 30 + 'px') : 'auto')}"
        >{{currTitle}}</p>
      </div>
      <div class="dialog-ft">
        <a href="javascript:;" class="prev daq-icon opacity" @click="lastImg"></a>
        <a href="javascript:;" class="next daq-icon opacity" @click="nextImg"></a>
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from '@/service'
import Tools from "@/utils/tools";
import daqScrollLoad from "@/components/scrollLoad";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
export default {
  components: {
    daqScrollLoad,
    Header,
    Footer,
  },
  data() {
    return {
      detail: {},
      list: [],
      totalList: [],
      code: Tools.getUrlParams("code"),
      channelCode: Tools.getUrlParams("channelCode"),
      params: {
        datatype: "sourceType_1",
        tag: Tools.getUrlParams('tag')
      },
      leftList: [],
      midList: [],
      rightList: [],
      isShow: false,
      currIndex: 0,
      currImageSrc: "",
      currTitle: "",
      currImgIndex: 0,
      boxWidth: 0,
      boxHeight: 0,
      boxML: 0,
      boxMT: 0,
      tagIndex: 0,
      tagList: [],
      pFlag: false,
    };
  },
  mounted () {
    // this.getTagsByType()
    // this.getChannelDetail()
  },
  methods: {
    // 获取分类
    getTagsByType () {
      Ajax.getTagsByType({
        type: 1
      }).then(res => {
        if (res.code === 0) {
          this.tagList = res.datas
          this.params.tag = res.datas[0].id
          this.pFlag = true
        }
      })
    },
    chooseTag (item, index) {
      if (this.tagIndex === index) return
      if (item.url) return
      this.list = []
      this.leftList = []
      this.midList = []
      this.rightList = []
      this.tagIndex = index
      this.params.tag = item.id
    },
    getChannelDetail () {
      Ajax.getChannelDetail({
        channelCode: 'mjtk'
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
        }
      })
    },
    getList(val) {
      val.map((item, index) => {
        item.index = this.currIndex + index;
      });
      this.currIndex += val.length;
      this.list = this.list.concat(val);
      this.totalList = this.totalList.concat(val);
      this.$nextTick(() => {
        this.updateWaterfall();
      });
    },
    // 瀑布流数据排序
    updateWaterfall() {
      const leftHeight = this.$refs.left.clientHeight;
      const midHeight = this.$refs.mid.clientHeight;
      const rightHeight = this.$refs.right.clientHeight;
      let item = this.list.shift();
      if (!item) return;
      const arr = [leftHeight, midHeight, rightHeight];
      const index = arr.indexOf(Math.min.apply(null, arr));
      switch (index) {
        case 0:
          this.leftList.push(item);
          break;
        case 1:
          this.midList.push(item);
          break;
        case 2:
          this.rightList.push(item);
          break;
      }
      this.$nextTick(() => {
        if (item.url) {
          const img = new Image();
          img.src = item.url;
          img.onload = () => {
            this.updateWaterfall();
          };
        } else {
          this.updateWaterfall();
        }
      });
    },
    lastImg() {
      if (this.currImgIndex > 0) {
        this.currImgIndex -= 1;
        this.currImageSrc = this.totalList[this.currImgIndex].url;
        this.currTitle = this.totalList[this.currImgIndex].title;
        this.computeImgPosition();
      }
    },
    nextImg() {
      if (this.currImgIndex < this.totalList.length - 1) {
        this.currImgIndex += 1;
        this.currImageSrc = this.totalList[this.currImgIndex].url;
        this.currTitle = this.totalList[this.currImgIndex].title;
        this.computeImgPosition();
      }
    },
    showPop(index) {
      this.currImageSrc = this.totalList[index].url;
      this.currTitle = this.totalList[index].title;
      this.currImgIndex = index;
      this.computeImgPosition();
      this.isShow = !this.isShow;
    },
    closePop() {
      this.isShow = !this.isShow;
    },
    computeImgPosition() {
      this.boxWidth = 0;
      let winH =
        document.documentElement.clientHeight || document.body.clientHeight;
      const img = new Image();
      img.src = this.currImageSrc;
      img.onload = () => {
        let imgW = img.width;
        let imgH = img.height;
        let imgScale = imgW / imgH;
        if (imgH > winH - 50) {
          imgH = winH - 50;
          imgW = parseInt(imgH * imgScale);
        }
        if (imgW >= 860) {
          imgW = 860;
          imgH = parseInt(imgW / imgScale);
        }
        this.boxWidth = imgW;
        this.boxHeight = imgH;
        this.boxML = -(imgW + 20) / 2;
        this.boxMT = -(imgH + 20) / 2;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.daq-list-wrap {
  padding-top: 100px;
  min-height: 840px;
  .main {
    width: 1360px;
  }
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .down-box {
    display: flex;
    align-items: center;
    &-item {
      margin-left: 24px;
      padding: 0 20px;
      height: 30px;
      font-size: 16px;
      color: #999;
      line-height: 30px;
      border: 1px solid #e3e3e3;
      border-radius: 15px;
      transition: all .3s linear;
      &.active,
      &:hover {
        color: $themeColor;
        border: 1px solid $themeColor;
      }
    }
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
.daq-waterfall {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.daq-list {
  margin-top: 60px;
  width: 31.4%;
  overflow: hidden;
}
.daq-list-item {
  margin-bottom: 40px;
  width: 100%;
  a {
    display: block;
    cursor: pointer;
  }
  &:hover img {
    transform: scale(1.1);
  }
  .img-box {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    background: #e2e2e2;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .word-box {
    padding: 28px 24px 30px;
    border: 1px solid #ececec;
    .name {
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      @include ellipsis();
    }
    .date {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #999;
      .daq-icon {
        margin-right: 8px;
        font-size: 18px;
      }
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
  background: rgba(255, 255, 255, 0.2)
    url("../../assets/images/video-close.png") no-repeat;
  background-position: 25% 75%;
  border-radius: 50%;
}
.media-hd:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

.dialog-bd {
  position: fixed;
  left: 50%;
  top: 50%;
  overflow: hidden;
  z-index: 100;
  width: auto;
  border-radius: 6px;
  transition: all 0.3s ease;
  /*border: 15px solid hsla(0,0%,100%,.4);*/
}
.dialog-bd .mask {
  position: absolute;
  left: 15px;
  bottom: 15px;
  right: 0;
  padding: 10px 0 10px 15px;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  @include ellipsis();
}
.dialog-bd img {
  width: 100%;
  height: 100%;
  border: 15px solid #fff;
}
// .mask,
// .opacity {
//   background: url(../../assets/images/mask-5.png) repeat;
// }
.dialog-ft a {
  background: rgba(255, 255, 255, 0.2) url("../../assets/images/pic-row.png")
    no-repeat;
}
.dialog-ft a:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.dialog-ft .next,
.dialog-ft .prev {
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
