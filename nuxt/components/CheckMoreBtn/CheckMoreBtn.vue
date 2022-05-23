<template>
  <div
    class="horizontal-center"
    :class="[
      'c-container',
      'clearfix',
      type === 'phone'
        ? 'c-check-more-btn-port'
        : 'c-container-more-btn-port-pc',
    ]"
    :style="styles"
    @click.stop="onCheckMore">
    <div
      class="c-check-more-btn-port-container horizontal-center vertical-center">
      <span class="c-check-more-btn-port-container-text">更多</span>
      <img
        class="c-check-more-btn-port-container-img"
        :src="checkMoreImg"
        alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckMoreBtn',
  data() {
    return {
      checkMoreImg: require('~/assets/images/mobile/homePage/checkMoreImg.png'),
    }
  },
  props: {
    type: {
      type: String,
      default: 'phone',
    },
    styles: {
      type: Object,
      default: function () {
        return {}
      },
    },
    link: {
      type: String,
      default: '',
    },
  },
  methods: {
    onCheckMore() {
      if (this.link) {
        this.$router.push({ path: this.link })
      } else {
        this.$emit('checkMore')
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import 'CheckMoreBtn.less';
</style>
