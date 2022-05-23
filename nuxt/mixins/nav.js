/**
 * 导航相关方法
 */

export default {
  methods: {
    /**
     * 处理跳转常亮问题, 需要兼容pc和移动端
     * @param {object} item 导航对象参数
     */
    judgeActive(item) {
      let url = this.$route.path
      // 判断当前url内含有目标path
      if (url.includes(item.path)) {
        // 手机端, 非首页去除 '/mobile'
        // url格式范围 ['/', '/mobile', '/product/pos']
        // item.path 格式范围 ['/', '/mobile', '/product', '/product/pos']
        if (url.indexOf('/mobile') > 0) {
          url = url.slice(0, url.indexOf('/mobile'))
        }
        if (url !== '/' && item.path !== '/') {
          return url === item.path || item.path.split('/').length === 2
        } else if (url === '/' || url === '/mobile') {
          return true
        }
      }
      return false
    },
  },
}
