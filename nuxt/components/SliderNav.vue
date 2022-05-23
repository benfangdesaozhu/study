<template>
  <!-- 内容 向下弹出 -->
  <nav class="c-right-nav">
    <div class="c-right-nav-mask" v-if="visible"></div>
    <transition name="slide-down">
      <div class="c-nav-container" v-if="visible">
        <!-- 导航部分 -->
        <transition-group class="s-nav-lists" name="flip-list" tag="ul">
          <li
            :class="{
              'c-nav-list': true,
              toggle: navs.toggle,
              active: judgeActive(navs),
            }"
            v-for="(navs, navsIndex) in navLists"
            :key="`navs_${navsIndex}`"
            @click="handleClick(navs, navsIndex)">
            <!-- 主menu -->
            <p class="c-nav-list-title">
              <span class="c-nav-list-title-text">{{ navs.title }}</span>
              <img :src="navs.toggle ? bottomArrow : rightImg" alt="" />
            </p>
            <!-- 下拉部分 -->
            <transition name="fade-list">
              <ul class="c-subnav-lists" v-show="navs.child && navs.toggle">
                <template v-if="navs.child">
                  <li
                    :class="{
                      'c-subnav-list': nav.path,
                      active: judgeActiveMobile(nav),
                      's-block': navs.child.length === 2,
                      'is-full-width': nav.isFullWidth,
                    }"
                    v-for="(nav, navIndex) in navs.child"
                    :key="`nav_${navIndex}`">
                    <div class="c-subnav-list-content">
                      <img
                        :src="solutionIcon"
                        class="c-subnav-list-content-icon"
                        alt=""/>
                      <span
                        v-text="nav.title"
                        :class="[
                          nav.child
                            ? 's-subnav-list-pre-title'
                            : 's-subnav-list-title',
                        ]"
                        @click.stop="handleClickSubNav(nav)">
                      </span>
                    </div>
                    <img :src="rightImg" alt="" />
                    <ul v-if="nav.child">
                      <li
                        :class="{
                          'c-subnav-list': true,
                          active: judgeActive(child),
                          'list-item': child.className,
                          'hide-menu-item': isHideMenuItem(child),
                          'is-full-width': child.isFullWidth,
                        }"
                        v-for="(child, childIndex) in nav.child"
                        :key="`nav_${childIndex}`"
                        @click.stop="handleRouter(child.path)">
                        <template v-if="!isHideMenuItem(child)">
                          <img :src="solutionIcon" alt="" />
                          <span
                            v-text="child.title"
                            class="s-subnav-list-title"></span>
                        </template>
                      </li>
                    </ul>
                  </li>
                </template>
              </ul>
            </transition>
          </li>
        </transition-group>
      </div>
    </transition>
  </nav>
</template>
<script>
export default {
  name: 'SliderNav',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rightImg: require('~/assets/images/mobile/homePage/rightArrow.png'),
      bottomArrow: require('~/assets/images/mobile/homePage/bottomArrow.png'),
      solutionIcon: require('~/assets/images/mobile/homePage/solutionIcon.png'),
      navLists: [
        {
          path: '/',
          title: '首页',
        },
        {
          path: '/',
          title: '解决方案',
          newAdd: true,
          toggle: false,
          child: [
            {
              title: '储能系统',
              path: '/',
            },
            {
              title: '电池电子',
              path: '/',
            },
            {
              title: '电驱系统',
              path: '/',
            },
            {
              title: '超充系统',
              path: '/',
            },
          ],
        },
        {
          path: '/',
          title: '技术研发',
          toggle: false,
          child: [
            {
              title: '储能系统',
              path: '/',
            },
            {
              title: '电池电子',
              path: '/',
            },
            {
              title: '电驱系统',
              path: '/',
            },
            {
              title: '超充系统',
              path: '/',
            },
          ],
        },
        {
          path: '/',
          title: '新闻资讯',
        },
        {
          path: '/',
          title: '关于威睿',
        },
        {
          path: '/',
          title: '联系我们',
        },
      ],
    }
  },
  methods: {
    /**
     * 手机端判断一层下拉active
     */
    judgeActiveMobile(item) {
      if (item.path) {
        return this.judgeActive(item)
      }
    },
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
    /**
     * 在www.paysaolian.com 域名下，不展示菜单
     */
    isHideMenuItem() {
      return false
    },
    /**
     * 处理鼠标点击导航条，并把其他下拉导航隐藏
     * @param {object} item 当前导航条
     * @param {number} index 当前导航条index
     */
    handleClick(item, index) {
      if (item.child) {
        for (let i = 0, len = this.navLists.length; i < len; i++) {
          if (i === index) {
            this.navLists[i].toggle = !this.navLists[i].toggle
          } else {
            this.navLists[i].toggle = false
          }
        }
      } else {
        this.handleRouter(item.path)
      }
    },
    /**
     * 处理鼠标点击subTitle
     * @param {onject} nav 导航路径
     */
    handleClickSubNav(nav) {
      if (!nav.child) {
        this.handleRouter(nav.path)
      }
    },
    /**
     * 处理鼠标点击导航条
     * @param {string} path 导航路径
     */
    handleRouter(path) {
      if (path) {
        this.handleClose()
        setTimeout(() => {
          this.$router.push({ path })
        }, 500)
      }
    },
    /**
     * 关闭导航
     */
    handleClose() {
      this.$emit('update:visible', false)
    },
  },
}
</script>
<style lang="less" scoped>
.c-right-nav {
  width: 100%;
  height: 100%;
  font-size: 28px;
  .c-right-nav-mask {
    z-index: 198;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
  }
  .c-nav-container {
    z-index: 199;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    padding-top: 108px;
    background: #fff;
    .c-nav-list.toggle {
      .c-nav-list-title {
        background: #000;
        color: #fff;
      }
    }
    .c-nav-list {
      width: 100%;
      background: #fff;
      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 108px;
        padding: 0 40px;
      }

      .c-subnav-lists {
        width: 100%;
        padding: 0 40px 0 80px;

        .c-subnav-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 108px;

          &-content {
            display: flex;
            align-items: center;

            &-icon {
              width: 28px;
              margin-right: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
