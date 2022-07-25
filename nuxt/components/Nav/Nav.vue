<template>
  <nav class="c-main-nav">
    <ul class="c-nav-list">
      <li
        :class="{
          'c-nav-item': true,
          toggle: item.toggle,
          active: judgeActive(item),
        }"
        v-for="(item, index) in navLists"
        :key="`nav_${index}`"
        @click="handleClick(item)"
        @mouseenter="handleMouseRnter(item)"
        @mouseleave="handleMouseLeave(item)">
        <span class="c-nav-title" v-text="item.title"></span>
        <transition name="slide-down">
          <s-dropdown
            v-if="item.child && item.toggle"
            :child="item.child"
            @leave="handleMouseLeave(item)"></s-dropdown>
          <s-dropdowns
            :class="[item.className ? item.className : '']"
            v-if="item.childs && item.toggle"
            :childs="item.childs"
            @leave="handleMouseLeave(item)"></s-dropdowns>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script>
import SDropdown from './Dropdown'
import SDropdowns from './Dropdowns'
import nav from '~/mixins/nav'

export default {
  name: 'SNav',
  components: {
    SDropdown,
    SDropdowns,
  },
  mixins: [nav],
  props: {
    navLists: {
      type: Array,
      default: function () {
        return [
          {
            path: '/',
            title: '首页',
          },
          {
            path: '/product',
            title: '解决方案',
            newAdd: true,
            toggle: false,
            childs: [
              {
                name: '储能系统',
                child: [
                  {
                    subchild: [
                      {
                        path: '/product/app',
                        title: '户用储能',
                      },
                      {
                        path: '/product/qrcode',
                        title: '集装零部件',
                      },
                      {
                        path: '/product/qrcode',
                        title: '集装箱储能',
                      },
                    ],
                  },
                  {
                    subchild: [
                      {
                        path: '/product/app',
                        title: '柜式储能',
                      },
                      {
                        path: '/product/qrcode',
                        title: '便携式储能',
                      },
                      {
                        path: '/product/qrcode',
                        title: '集装云平台',
                      },
                    ],
                  },
                ],
              },
              {
                name: '电池电子',
                child: [
                  {
                    subchild: [
                      {
                        path: '/product/app',
                        title: '电池',
                      },
                      {
                        path: '/product/qrcode',
                        title: '电子',
                      },
                    ],
                  },
                ],
              },
              {
                name: '电驱系统',
                child: [
                  {
                    subchild: [
                      {
                        path: '/product/postPayment',
                        title: '电机',
                      },
                    ],
                  },
                ],
              },
              {
                name: '超充系统',
                child: [
                  {
                    subchild: [
                      {
                        path: '/product/app',
                        title: '车载充电机',
                      },
                      {
                        path: '/product/qrcode',
                        title: '充电桩',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: '/solution',
            title: '技术研发',
            toggle: false,
            className: 'payment-plus', // 下拉多级导航栏,需要重置一下样式的时候加上className属性
          },
          {
            path: '/consult',
            title: '新闻资讯',
          },
          {
            path: '/cooperation',
            title: '关于威睿',
            toggle: false,
          },
          {
            path: '/aboutUs',
            title: '联系我们',
            toggle: false,
            child: [
              {
                path: '/aboutUs/index',
                title: '企业简介',
              },
              {
                path: '/aboutUs/iteration',
                title: '合作伙伴',
              },
            ],
          },
        ]
      },
    },
  },
  methods: {
    /**
     * 处理跳转
     * @param {object} item 对象参数
     */
    handleClick(item) {
      if (item.path && !item.child && !item.childs) {
        this.$router.push(item.path)
      }
    },
    /**
     * 处理鼠标移到导航条，并把其他下拉导航隐藏
     * @param {object} item 当前导航条index
     */
    handleMouseRnter(item) {
      if (item.child || item.childs) {
        item.toggle = true
      }
    },
    /**
     * 处理鼠标移出下拉导航
     * @param {object} item 当前导航条对象
     */
    handleMouseLeave(item) {
      if (item.child || item.childs) {
        item.toggle = false
      }
    },
  },
}
</script>
<style lang="less" scoped>
.c-main-nav {
  display: block;
  height: 64px;
}
.c-nav-list {
  position: relative;
  float: left;
  display: block;
  height: 100%;
  padding: 0 20px;
  list-style-type: none;
}
.c-nav-item {
  position: relative;
  float: left;
  height: 100%;
  padding: 0 20px;
  color: #333;
  font-size: 14px;
  vertical-align: baseline;
  .c-nav-title {
    &.active {
      color: #222;
      font-weight: 600;
    }
    cursor: pointer;
    &:hover {
      color: #222;
      font-weight: 600;
    }
  }
}
</style>
