<template>
  <div class="night">
    <div class="main">
      <div class="sec-title">
        <span class="title">{{$t('index.night.title')}}</span>
      </div>
      <div class="night-box">
        <ul>
          <li
            v-for="(item, index) in picList"
            :key="item.id"
            @click="picShowHandle(item, index)"
          >
            <img :src="item.url" />
          </li>
          <li>
            <p class="night-box-title">{{$t('index.night.theme')}}</p>
            <a class="theme-box-more" href="media-list.html?code=video">{{$t('index.more')}}</a>
          </li>
          <li
            v-for="(item, index) in videoList"
            :key="item.id"
          >
            <div class="img-box" @mouseover="videoOverHandle(index)" @mouseleave="videoLeaveHandle(index)">
              <img :src="item.coverpicture" :ref="`pic${index}`" />
              <video :src="item.upload" muted loop :ref="`nightVideo${index}`"></video>
              <span class="daq-icon">&#xe62c;</span>
            </div>
            <p>{{item.title}}</p>
          </li>
        </ul>
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
import Ajax from '@/service'
export default {
  data () {
    return {
      index: 0,
      videoList: [],
      picList: [],
      picShow: false,
      picUrl: '',
      picTitle: '',
      picIndex: 0
    }
  },
  mounted () {
    this.getVideoList()
    this.getPicList()
  },
  methods: {
    chooseTab (index) {
      if (this.index === index) return
      this.index = index
    },
    getVideoList () {
      Ajax.getVideoList({
        limitPage: 4
      }).then(res => {
        if (res.code === 0) {
          this.videoList = res.datas
        }
      })
    },
    picShowHandle (item, index) {
      this.picUrl = item.url
      this.picTitle = item.title
      this.picIndex = index
      this.picShow = true
    },
    closePic () {
      this.picShow = false
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
    getPicList () {
      Ajax.getPicList({
        limitPage: 2,
        datatype: 'sourceType_1'
      }).then(res => {
        if (res.code === 0) {
          this.picList = res.datas
        }
      })
    },
    videoOverHandle (index) {
      this.$refs[`pic${index}`][0].style = 'opacity: 0'
      this.$refs[`nightVideo${index}`][0].nextSibling.style = 'opacity: 0'
      this.$refs[`nightVideo${index}`][0].play()
    },
    videoLeaveHandle (index) {
      this.$refs[`pic${index}`][0].style = 'opacity: 1'
      this.$refs[`nightVideo${index}`][0].nextSibling.style = 'opacity: 1'
      this.$refs[`nightVideo${index}`][0].pause()
    }
  }
}
</script>

<style lang="scss" scoped>
.night {
  position: relative;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 360px;
    background: #f5f5f5;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 46px;
    left: 0;
    display: block;
    width: 100%;
    height: 157px;
    background: url('../../../assets/images/index-night-bg.png') no-repeat center;
    background-size: 100% 157px;
  }
  &-box {
    position: relative;
    z-index: 1;
    display: flex;
    height: 624px;
    &-title {
      font-size: 38px;
      font-weight: bold;
      color: #fff;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      height: 508px;
    }
    li {
      width: 325px;
      height: 244px;
      cursor: pointer;
      overflow: hidden;
      &~li {
        margin-left: 20px;
      }
      &:nth-child(4) {
        margin-left: 0;
      }
      &:nth-child(3) {
        padding: 80px 0 0 40px;
        width: 670px;
        background: $themeColor;
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
    .img-box {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      object-fit: contain;
    }
    img {
      position: relative;
      z-index: 9;
      display: block;
      width: 100%;
      height: 100%;
      transition: all .3s linear;
    }
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
    }
    .daq-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      color: #fff;
      font-size: 42px;
      transform: translate(-50%, -50%);
      transition: all .3s linear;
    }
    .theme-box-more {
      margin-top: 20px;
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
  background: rgba(255, 255, 255, 0.2) url('../../../assets/images/video-close.png')
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
  background: rgba(255, 255, 255, 0.2) url('../../../assets/images/pic-row.png') no-repeat;
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