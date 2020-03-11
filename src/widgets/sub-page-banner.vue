<template>
  <div class="sub-page-banner">
    <img v-if="detail.navImage" :src="detail.navImage" />
    <p>{{title || detail.name}}</p>
  </div>
</template>
<script>
  import Ajax from '@/service'
  export default {
    props: {
      channelCode: String,
      title: String
    },
    data () {
      return {
        detail: {}
      }
    },
    mounted () {
      Ajax.getChannelDetail({
        channelCode: this.channelCode
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
.sub-page-banner {
  position: relative;
  padding-top: 170px;
  width: 100%;
  height: 460px;
  box-sizing: content-box;
  overflow: hidden;
  img {
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    font-size: 46px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
}
</style>