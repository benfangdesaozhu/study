<template>
  <div class="c-footer">
    <!-- 联系我们 -->
    <div class="c-connect-us">
      <div class="c-connect-us-top flex-space-between">
        <span class="c-connect-us-top-text">联系我们</span>
        <img class="wr-logo-icon" :src="logoImg" alt="威睿logo" />
      </div>
      <p>电话：0574-23867100</p>
      <p>邮箱：317021716@qQ.COM</p>
      <p>工作时间：周一至周五 10:00-18:00</p>
    </div>
    <!-- 法律声明和隐私 -->
    <div class="c-privacy">
      Copyright © 2020 - 2022 VREMT. All Rights Reserved.
      <span class="text-decoration">法律声明</span> 及
      <span class="text-decoration">隐私权政策</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMobile',
  data() {
    return {
      logoImg: require('~/assets/images/mobile/homePage/logoWhite.png'),
    }
  },
  props: {},
  methods: {},
}
</script>
<style lang="less" scoped>
@import 'FooterMobile.less';
</style>
