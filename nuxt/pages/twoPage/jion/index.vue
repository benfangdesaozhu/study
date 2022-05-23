<template>
  <!-- <Tutorial/> -->
  <div class="s-join-pc">二级页面/加入我们 pc</div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData({ app, store }) {
    console.log(app.$axios, store)
  },
}
</script>
<style lang="less" scoped>
@import 'indexPC.less';
</style>
