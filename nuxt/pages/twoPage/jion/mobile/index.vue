<template>
  <!-- <Tutorial/> -->
  <div class="s-join-mobile">二级页面/加入我们 移动端</div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'mobile',
  asyncData({ app, store }) {
    console.log(app.$axios, store)
  },
}
</script>
<style lang="less" scoped>
@import 'indexMobile.less';
</style>
