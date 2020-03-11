<template>
  <div class="daq-loading" v-if="!noMore && !noData">
    <span class="daq-icon">&#xe679;</span>
    <span>Loading...</span>
  </div>
</template>
<script>
  export default {
    props: {
      noMore: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss" scoped>
.daq-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: #ababab;
  .daq-icon {
    font-size: 40px;
    animation: rotate 2s linear infinite;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
