<template>
  <header class="c-header">
    <section class="c-header-two">
      <div class="c-header-two-container">
        <img class="c-logo-img" :src="logoImg" alt="" />
        <img
          class="c-open-slide-img"
          :src="!rightNavVisible ? openSlideImg : closeSlideImg"
          @click="onSwitchSlide"
          alt=""/>
      </div>
    </section>
    <slider-nav :visible.sync="rightNavVisible" />
  </header>
</template>

<script>
import SliderNav from '../SliderNav'

export default {
  name: 'VHeader',
  components: {
    SliderNav,
  },
  data() {
    return {
      maxClientWidth: 980,
      rightNavVisible: false,
      logoImg: require('~/assets/images/mobile/homePage/logoMb.png'),
      openSlideImg: require('~/assets/images/mobile/homePage/openSlide.png'),
      closeSlideImg: require('~/assets/images/mobile/homePage/closeSlide.png'),
    }
  },
  methods: {
    onSwitchSlide() {
      this.rightNavVisible = !this.rightNavVisible
    },
  },
}
</script>
<style lang="less" scoped>
@import 'HeaderMobile.less';
</style>
