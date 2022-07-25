<template>
  <div class="c-dropdowns" @mouseleave="handleMouseLeave">
    <div class="c-dropdowns-flex">
      <div class="c-placeholder"></div>
      <div class="c-container-flex">
        <div class="c-dropdowns-container clearfix">
          <div
            class="c-dropdowns-item clearfix"
            v-for="(list, index) in childs"
            :key="index">
            <div class="c-dropdowns-item-content">
              <h2 class="c-dropdowns-item-content-title">
                <img src="~/assets/images/PC/homePage/menu.png" alt="" />
                <span class="c-dropdowns-item-content-title-content">{{
                  list.name
                }}</span>
              </h2>
              <ul class="c-dropdowns-item-content-list">
                <template v-for="(item, childindex) in list.child">
                  <template v-if="typeof item.subchild !== 'undefined'">
                    <div
                      class="c-dropdowns-item-content-list-subchild clearfix"
                      :key="`child_${childindex}`">
                      <template
                        v-for="(subchild, subchildindex) in item.subchild">
                        <nuxt-link
                          v-if="!isHideMenuItem(subchild)"
                          tag="li"
                          :key="`subchild_${subchildindex}`"
                          :to="subchild.path"
                          @click.native="handleMouseLeave">
                          {{ subchild.title }}
                        </nuxt-link>
                      </template>
                    </div>
                  </template>
                  <template v-else>
                    <nuxt-link
                      tag="li"
                      :key="`child_${childindex}`"
                      :to="item.path"
                      @click.native="handleMouseLeave">
                      {{ item.title }}
                    </nuxt-link>
                  </template>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SDropdowns', // 三列下拉按钮
  props: {
    childs: {
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
    handleOpenPlatform() {
      window.open('http://docs.51fubei.com/agent-api')
    },
    /**
     * 在www.paysaolian.com 域名下，不展示菜单
     */
    isHideMenuItem(subTime) {
      let host = window.location.host
      return host === 'www.paysaolian.com' && subTime.paySaolianHide
    },
  },
}
</script>
<style lang="less" scoped>
.c-dropdowns {
  z-index: -1;
  position: absolute;
  top: 100%;
  left: -230px;
  width: 1082px;
  .c-dropdowns-flex {
    display: flex;
    flex-direction: column;
  }
  .c-dropdowns-container {
    display: flex;
    padding: 0 50px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 26px 18px rgba(0, 0, 0, 0.1);
  }
  .c-dropdowns-item {
    position: relative;
    padding: 40px 60px 45px 0px;
  }
  .c-placeholder {
    width: 100%;
    height: 11px;
  }
  .c-container-flex {
    display: flex;
  }
  .c-dropdowns-item-content {
    box-sizing: border-box;
    text-align: left;
  }
  .c-dropdowns-item:last-child {
    .c-dropdowns-item-content {
      border-right: none;
    }
  }
  .c-dropdowns-item-content-title {
    display: flex;
    align-items: center;
    padding-bottom: 18px;
    line-height: 12px;
    color: #999;
    font-size: 12px;
    cursor: default;
    border-bottom: 1px solid #eee;
  }
  .c-dropdowns-item-content-title-content {
    margin-left: 6px;
    font-size: 16px;
    color: #222;
    font-weight: 600;
  }
  .c-dropdowns-item-content-list {
    li {
      position: relative;
      width: 120px;
      margin-bottom: 18px;
      line-height: 22px;
      color: #222;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
    li:nth-of-type(1) {
      margin-top: 25px;
    }
    li:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
  .c-dropdowns-item-content-list > .c-dropdowns-item-content-list-subchild {
    float: left;
    &:nth-child(2) {
      padding-left: 10px;
    }
  }
}
</style>
