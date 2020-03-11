<template>
  <div></div>
</template>
<script>
  export default {
    data () {
      return {
        winH: window.innerHeight,
        animateDOMArray: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.animateDOMArray = document.querySelectorAll('.animate-box')
        window.addEventListener('scroll', this.onScroll, false)
      })
    },
    methods: {
      onScroll () {
        if(!this.ticking) {
          requestAnimationFrame(this.scrollHandle)
          this.ticking = true
        }
      },
      scrollHandle () {
        const scrollTop = document.documentElement.scrollTop
        for (let i = 0; i < this.animateDOMArray.length; i++) {
          const item = this.animateDOMArray[i]
          const top = item.offsetTop
          let classnames = item.className
          if (scrollTop + this.winH > top) {
            if (!classnames.includes('active')) {
              item.setAttribute('class', `${classnames} active`)
            }
          }
        }
        this.ticking = false
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
