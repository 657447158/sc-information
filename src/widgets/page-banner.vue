<template>
  <div class="page-banner">
    <img v-if="imgName" :src="detail[imgName]" />
    <img v-if="!imgName && detail.navImage" :src="detail.navImage" />
    <p>{{title || detail.name}}</p>
  </div>
</template>
<script>
  import Ajax from '@/service'
  export default {
    props: {
      imgName: String,
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
.page-banner {
  position: relative;
  padding-top: 100px;
  width: 100%;
  height: 560px;
  overflow: hidden;
  img {
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    bottom: 210px;
    left: 0;
    width: 100%;
    font-size: 52px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }
}
</style>