<template>
  <header class="c-header">
    <section class="c-header-two">
      <c-container>
        <div class="c-header-two-container">
          <div class="c-nav-logo">
            <nuxt-link to="/">
              <img
                class="logo"
                src="~/assets/images/PC/homePage/威睿电logo.png"
                alt="威睿logo"/>
            </nuxt-link>
          </div>
          <div class="ftl">
            <s-nav></s-nav>
          </div>
        </div>
      </c-container>
    </section>
  </header>
</template>
<script>
import SNav from './../Nav/Nav'
export default {
  name: 'HeaderPc',
  components: {
    SNav,
  },
}
</script>
<style lang="less" scoped>
@import 'HeaderPc1.less';
</style>
