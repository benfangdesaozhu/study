<template>
  <div
    :class="[
      'c-container',
      'clearfix',
      type === 'phone' ? 'c-container-phone' : '',
    ]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CContainer',
  props: {
    type: {
      type: String,
      default: 'pc',
    },
  },
}
</script>
<style lang="less" scoped>
.c-container {
  min-width: 1200px;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.c-container-phone {
  overflow: hidden;
  width: 100%;
  padding: 0 50px;
}
</style>
