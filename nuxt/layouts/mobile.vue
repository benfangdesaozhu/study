<template>
  <div class="c-body">
    <c-header />
    <div class="c-main-box">
      <main class="c-main">
        <nuxt />
      </main>
    </div>
    <!-- 联系我们 -->
    <c-footer />
  </div>
</template>

<script>
import CHeader from '~/components/Header/Header'
import CFooter from '~/components/Footer/FooterMobile'
export default {
  components: {
    CHeader,
    CFooter,
  },
  data() {
    return {}
  },
  created() {
    console.log('moile create client', process.client)
  },
  computed: {
    footLinks() {
      return this.$store.state.footLinks
    },
  },
}
</script>

<style lang="less" scoped>
@import '~assets/styles/variables';

.c-main {
  margin-top: 108px;
  background-color: #f9f9f9;
  .c-main-box {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
