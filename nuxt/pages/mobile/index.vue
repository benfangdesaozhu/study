<template>
  <div class="c-contain">
    <!-- 顶部部分 -->
    <section class="c-top-port">
      <h3 class="c-top-port-advantage">安全 / 高效 / 智能</h3>
      <h2 class="c-top-port-title">为全球提供卓越的<br />可持续能源解决方案</h2>
      <img :src="topImg" alt="" />
      <img class="c-top-port-shadown-img" :src="shadownImg" alt="" />
    </section>

    <!-- 解决方案 -->
    <section class="c-solution-port">
      <ul class="c-solution-port-ul">
        <li
          class="c-solution-port-ul-container"
          v-for="(solutionItem, index) in solutionList"
          :key="`solutionItem_${index}`">
          <h2 class="c-solution-port-ul-container-title">
            {{ solutionItem.title }}
          </h2>
          <p class="c-solution-port-ul-container-context">
            {{ solutionItem.context }}
          </p>
          <img
            class="c-solution-port-ul-container-img"
            :src="solutionItem.imgSrc"
            alt=""/>
        </li>
      </ul>
    </section>
    <!-- 技术研发 -->
    <section class="c-technology-develop" ref="technologyDevelop">
      <h2 class="c-technology-develop-title">技术研发</h2>
      <img class="c-technology-develop-img" :src="technologyImg" alt="" />
      <div class="c-technology-develop-content">
        <div class="c-content-start c-content-container">
          <div class="c-content-font0" ref="numberAnimaCon">
            <client-only>
              <number-animation
                class="c-content-data"
                ref="numberAnima"
                :duration="0.5"
                :to="1000"></number-animation>
            </client-only>
            <span class="c-content-more">+</span>
          </div>
          <p class="c-content-title">研发团队</p>
        </div>
        <div class="c-content-center c-content-container">
          <div class="c-content-font0">
            <span class="c-content-data">69</span>
            <span class="c-content-percent">%</span>
          </div>
          <p class="c-content-title">汽车顶尖人才占比</p>
        </div>
        <div class="c-content-end c-content-container">
          <div class="c-content-font0">
            <span class="c-content-data">2</span>
            <span class="c-content-money">亿元</span>
          </div>
          <p class="c-content-title">试验中心投资</p>
        </div>
      </div>
      <p class="c-technology-develop-text">
        试验中心涵盖动力电池、电机电控、环境可靠性、充电系统、整车涉水、理化检测等，具备从材料级到新能源汽车零部件级再到系统联调级的试验能力，严格按照ISO/IEC
        17025体系的要求建立和运行，已通过中国合格评定国家认可委员会CNAS认可和吉利集团SQE认可。
      </p>
      <c-checkMoreBtn></c-checkMoreBtn>
    </section>
    <!-- 新闻资讯 -->
    <section class="c-news">
      <h3 class="c-news-title">新闻资讯</h3>
      <ul class="c-news-container">
        <li
          class="c-news-container-item"
          v-for="(newsItem, index) in newsList"
          :key="`newsItem_${index}`">
          <div class="c-news-container-title-port">
            <img
              class="c-news-container-title-port-img"
              :src="newsItem.imgSrc"
              alt=""/>
            <h4 class="c-news-container-title-port-title">
              {{ newsItem.title }}
            </h4>
          </div>
          <h5 class="c-news-container-item-sub-title">
            {{ newsItem.subTitle }}
          </h5>
          <h6 class="c-news-container-item-sub-context">
            {{ newsItem.subContext }}
          </h6>
        </li>
      </ul>
      <c-checkMoreBtn></c-checkMoreBtn>
    </section>
    <!-- 合作伙伴 -->
    <section class="c-partner">
      <h3 class="c-partner-title">合作伙伴</h3>
      <ul class="c-partner-list">
        <li
          class="c-partner-list-item"
          v-for="(partnerItem, index) in 22"
          :key="`newsItem_${index}`">
          <img
            class="c-partner-img"
            :src="require(`~/assets/images/PC/homePage/logo${index + 1}.png`)"
            alt=""/>
        </li>
      </ul>
      <c-checkMoreBtn></c-checkMoreBtn>
    </section>
  </div>
</template>

<script>
import CCheckMoreBtn from '~/components/CheckMoreBtn/CheckMoreBtn'
import NumberAnimation from '~/components/NumberAnimation'
export default {
  components: {
    CCheckMoreBtn,
    NumberAnimation,
  },
  layout: 'mobile',
  data() {
    return {
      topImg: require('~/assets/images/mobile/homePage/top.png'),
      shadownImg: require('~/assets/images/mobile/homePage/shadown.png'),
      technologyImg: require('~/assets/images/mobile/homePage/technology.png'),
      partnerList: [
        {
          imgSrc: require('~/assets/images/PC/homePage/logo1.png'),
        },
        {
          imgSrc: require('~/assets/images/PC/homePage/logo2.png'),
        },
        {
          imgSrc: require('~/assets/images/mobile/homePage/volvo.png'),
        },
        {
          imgSrc: require('~/assets/images/mobile/homePage/volvo.png'),
        },
        {
          imgSrc: require('~/assets/images/mobile/homePage/volvo.png'),
        },
        {
          imgSrc: require('~/assets/images/mobile/homePage/volvo.png'),
        },
        {
          imgSrc: require('~/assets/images/mobile/homePage/volvo.png'),
        },
      ],
      solutionList: [
        {
          title: '储能系统',
          context: '国内首创的“预、防、阻、治”四位一体本质安全设计',
          imgSrc: require('~/assets/images/mobile/homePage/solution.png'),
        },
        {
          title: '电子电池',
          context: '国内首批开发出能量密度>180Wh/kg的电池',
          imgSrc: require('~/assets/images/mobile/homePage/solution.png'),
        },
        {
          title: '电驱系统',
          context: '国际一流的电驱动系统',
          imgSrc: require('~/assets/images/mobile/homePage/solution.png'),
        },
        {
          title: '充电系统',
          context: '国内首例20kW集成充电系统',
          imgSrc: require('~/assets/images/mobile/homePage/solution.png'),
        },
      ],
      newsList: [
        {
          imgSrc: require('~/assets/images/mobile/homePage/news.png'),
          title: '德科物联与吉利威睿签署合作协议',
          subTitle: '共同赋能城市“双碳达标” 四川本地企业与吉利威睿签署合作协议',
          subContext:
            '据悉，此次战略合作是基于双方对“双碳达标”领域的深度探索，依托德科物联在本地城市的研发运营能力，结合威睿电动在储能行业的领先技术和领先产品展开落地。',
        },
        {
          imgSrc: require('~/assets/images/mobile/homePage/news.png'),
          title: '德科物联与吉利威睿签署合作协议',
          subTitle: '共同赋能城市“双碳达标” 四川本地企业与吉利威睿签署合作协议',
          subContext:
            '据悉，此次战略合作是基于双方对“双碳达标”领域的深度探索，依托德科物联在本地城市的研发运营能力，结合威睿电动在储能行业的领先技术和领先产品展开落地。',
        },
      ],
      animaState: false,
    }
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      title: '威睿官网移动端首页',
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code)
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.onscroll = () => {
        // 滚动距离
        const scroll = document.documentElement.scrollTop
        // 目标数字的dom距离顶部的距离
        const DevelopOffsetTop = this.$refs.numberAnimaCon.offsetTop
        // 一屏的高度
        const pageHeight = window.screen.height
        if (scroll + pageHeight > DevelopOffsetTop && !this.animaState) {
          this.$refs.numberAnima.restart()
          this.animaState = true
        } else if (scroll + pageHeight <= DevelopOffsetTop) {
          this.animaState = false
        }
      }
    })
  },
  methods: {
    // 切换语言
    changeLang(locale) {
      console.log(this.$i18n.locales.filter((i) => i.code))
      console.log(locale, this.$i18n, 'this.$i18nthis.$i18n')
      this.$i18n.setLocale(locale.code)
    },
  },
}
</script>
<style lang="less" scoped>
@import './indexMobile.less';
</style>
