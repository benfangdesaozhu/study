<template>
  <!-- <Tutorial/> -->
  <div class="main-container">
    <!-- 首页 -->
    <section class="background-grey">
      <c-container>
        <home :anima-scroll="animaScroll"></home>
      </c-container>
    </section>
    <!-- 技术研发 -->
    <section class="background-white">
      <c-container>
        <tech-reaserch
          :tech-title-anima="techTitleAnima"
          :tech-img-anima="techImgAnima"
          :tech-text-anima="techTextAnima"></tech-reaserch>
      </c-container>
    </section>
    <!-- 新闻资讯 -->
    <section class="background-grey">
      <c-container>
        <news-consult
          :news-title-anima="newsTitleAnima"
          :news-cards-anima="newsCardsAnima"></news-consult>
      </c-container>
    </section>
    <!-- 合作伙伴 -->
    <section class="background-white">
      <c-container>
        <coor-partner
          :coor-title-anima="coorTitleAnima"
          :coor-cards-anima="coorCardsAnima"
          :scroll-top="scrollTop"></coor-partner>
      </c-container>
    </section>
  </div>
</template>

<script>
import TechReaserch from '~/components/TechReaserch/TechReaserch.vue'
import Home from '~/components/Home/Home.vue'
import CoorPartner from '~/components/CoorPartner/CoorPartner.vue'
import NewsConsult from '~/components/NewsConsult/NewsConsult.vue'

export default {
  name: 'HomePage',
  layout: 'pc',
  components: {
    Home,
    TechReaserch,
    CoorPartner,
    NewsConsult,
  },
  data() {
    return {
      animaScroll: false,
      techTitleAnima: false,
      techImgAnima: false,
      techTextAnima: false,

      newsTitleAnima: false,
      newsCardsAnima: false,

      coorTitleAnima: false,
      coorCardsAnima: false,
      scrollTop: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.move()
      window.addEventListener('scroll', this.move)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', this.move)
      })
    })
  },
  methods: {
    move() {
      // 滚动距离
      const scroll = document.documentElement.scrollTop
      this.scrollTop = scroll
      if (!this.animaScroll && scroll > 145) {
        this.animaScroll = true
      }
      if (!this.techTitleAnima && scroll > 415) {
        this.techTitleAnima = true
      }
      if (!this.techImgAnima && scroll > 500) {
        this.techImgAnima = true
      }
      if (!this.techTextAnima && scroll > 1100) {
        this.techTextAnima = true
      }
      if (!this.newsTitleAnima && scroll > 1300) {
        this.newsTitleAnima = true
      }
      if (!this.newsCardsAnima && scroll > 1500) {
        this.newsCardsAnima = true
      }
      if (!this.coorTitleAnima && scroll > 2230) {
        this.coorTitleAnima = true
      }
      if (!this.coorCardsAnima && scroll > 2300) {
        this.coorCardsAnima = true
      }
    },
  },
}
</script>
<style lang="less" scoped>
.main-container {
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  overflow-x: hidden;
  .background-white {
    background-color: #fff;
  }
  .background-grey {
    background-color: #f5f5f5;
  }
}
</style>
