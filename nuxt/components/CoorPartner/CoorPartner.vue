<template>
  <div class="container">
    <div class="head">
      <div
        class="title titlesTransformDefault"
        :class="[coorTitleAnima ? 'titlesTransformActive' : '']">
        合作伙伴
      </div>
      <c-checkMoreBtn class="more" :type="'pc'"></c-checkMoreBtn>
    </div>
    <div class="brand">
      <div
        ref="imgRef"
        v-for="(logoItem, index) in logoList"
        :key="`logoItem_${index}`"
        class="child-brand">
        <img :src="logoItem.imgSrc" />
      </div>
    </div>
  </div>
</template>

<script>
import CCheckMoreBtn from '~/components/CheckMoreBtn/CheckMoreBtn'

export default {
  name: 'CoorPartner',
  components: {
    CCheckMoreBtn,
  },
  props: {
    coorTitleAnima: {
      type: Boolean,
      default: false,
    },
    coorCardsAnima: {
      type: Boolean,
      default: false,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      logoList: [
        {
          imgSrc: require('~/assets/images/PC/homePage/logo1.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo2.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo3.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo4.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo5.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo6.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo7.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo8.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo9.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo10.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo11.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo12.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo13.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo14.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo15.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo16.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo17.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo18.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo19.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo20.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo21.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo22.png'),
        },
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.imgRef)
    })
  },
  watch: {
    scrollTop(val) {
      if (val < 2256) {
        return false
      }
      for (let name in this.$refs.imgRef) {
        // 滚动距离+一瓶距离 - 当前元素距离顶部的距离
        if (
          window.scrollY
          + window.innerHeight
          - this.$refs.imgRef[name].offsetTop
          > 50
        ) {
          if (!this.$refs.imgRef[name].className.includes('opacity-show')) {
            this.$refs.imgRef[name].className += ' opacity-show'
          }
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import 'CoorPartner.less';
</style>
