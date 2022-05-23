<template>
  <!-- <Tutorial/> -->
  <div>二级页面/打开</div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData({ app, store }) {
    console.log(app.$axios, store)
  },
}
</script>
