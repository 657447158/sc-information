<template>
  <div>
    <Header />
    <!-- 栏目banner -->
    <PageBanner channelCode="zs" />
    <div class="daq-list-wrap">
      <div class="main">
        <scroll-load requestName="getHotelList" :limit="9" :params="params" @list="getList">
          <ul class="list-wrapper" slot="list">
            <li
              v-for="item in list"
              :key="item.id"
            >
              <span class="img-box">
                <img v-if="item.pictureFourToThree" :src="item.pictureFourToThree" />
              </span>
              <h3 :title="item.title">{{item.name}}</h3>
              <div class="info">
                <p><span class="daq-icon">&#xe66d;</span><span class="txt">{{$t('hotel.phone')}}：{{item.phone}}</span></p>
                <p :title="item.address"><span class="daq-icon">&#xe667;</span><span class="txt">{{$t('hotel.address')}}：{{item.address}}</span></p>
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
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import PageBanner from "@/widgets/page-banner.vue";
import ScrollLoad from "@/components/scrollLoad";
export default {
  components: {
    Header,
    Footer,
    PageBanner,
    ScrollLoad
  },
  data() {
    return {
      list: [],
      params: {
        region: 510000
      }
    };
  },
  methods: {
    getList(val) {
      this.list = this.list.concat(val);
    }
  }
};
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
.list-wrapper {
  width: 1360px;
  display: flex;
  flex-wrap: wrap;
  li {
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
    .info {
      color: #666;
      font-size: 18px;
      .daq-icon {
        font-size: 18px;
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
  li:nth-child(2n) {
    margin-left: 40px;
  }
}
// .daq-list-item {
//   width: 426px;
//   margin-top: 60px;
//   margin-left: 41px;

//   &~&:not(:nth-child(3n+1)) {
//     margin-left: 41px;
//   }
//   .name {
//     padding: 0 10px 20px;
//     font-size: 18px;
//     font-weight: bold;
//     border-bottom: 1px solid #ececec;
//     @include ellipsis();
//   }
//   .info {
//     padding: 20px 10px 0;
//     color: #666;
//     .daq-icon {
//       margin-right: 6px;
//     }
//     p {
//       display: flex;
//       align-items: center;
//       margin-bottom: 10px;

//     }
//     .txt {
//       flex: 1;
//       @include ellipsis();
//     }
//   }
// }
</style>
