<template>
  <div class="c-dropdown">
    <div class="c-placeholder"></div>
    <ul @mouseleave="handleMouseLeave">
      <nuxt-link
        v-for="(item, index) in child"
        :key="index"
        tag="li"
        @click.native="handleMouseLeave"
        :to="item.path">
        {{ item.title }}
      </nuxt-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SDropdown', // 单列下拉按钮
  props: {
    child: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  methods: {
    /**
     * 处理点击鼠标移开
     */
    handleMouseLeave() {
      this.$emit('leave')
    },
  },
}
</script>
<style lang="less" scoped>
.c-dropdown {
  z-index: -1;
  position: absolute;
  top: 100%;
  left: -10px;
  overflow: hidden;
  width: calc(100% + 20px);
  .c-placeholder {
    width: 100%;
    height: 11px;
  }
  ul {
    padding: 14px 0;
    background: #fff;
    border: 1px solid #efefef;
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
    // box-shadow: 0px 26px 18px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  li {
    position: relative;
    line-height: 42px;
    color: #222;
    font-size: 14px;
    &.active,
    &:hover {
      font-weight: 600;
    }
  }
}
</style>
