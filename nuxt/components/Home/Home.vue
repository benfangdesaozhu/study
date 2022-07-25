<template>
  <div class="container">
    <div class="main-page">
      <div class="main-text-container">
        <div
          class="title titlesTransformDefault"
          :class="[anima ? 'titlesTransformActive' : '']">
          安全 / 高效 / 智能
        </div>
        <div
          class="headline titlesTransformDefault"
          :class="[anima ? 'titlesTransformActive' : '']">
          为全球提供卓越的<br />可持续能源解决方案
        </div>
        <img class="c-video-placeh" :src="logoImage" alt="" />
      </div>
      <!-- <div class="c-video-black-placeh"></div> -->
      <div class="cards" :class="[anima ? 'opacity-show' : '']">
        <div
          v-for="(cardItem, cardIndex) in cardContent"
          :key="`cardIndex_${cardIndex}`"
          :class="[cardIndex === 3 ? 'child-card-last' : 'child-card']">
          <div class="card-image">
            <img :src="cardItem.cardImage" />
          </div>
          <div
            class="card-title titlesTransformDefault"
            :class="[animaScroll ? 'titlesTransformActive' : '']">
            {{ cardItem.cardTitle }}
          </div>
          <div
            class="card-text titlesTransformDefault"
            :class="[animaScroll ? 'titlesTransformActive' : '']"
            v-text="cardItem.cardText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    animaScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logoImage: require('~/assets/images/PC/homePage/videoPlaceh.png'),
      navCata: ['解决方案', '技术研发', '新闻资讯', '关于威睿', '联系我们'],
      cardContent: [
        {
          cardImage: require('~/assets/images/PC/homePage/cardImage.png'),
          cardTitle: '储能系统',
          cardText: '国内首创的“预、防、阻、治”四位一体本质安全设计',
          cardNum: 0,
        },
        {
          cardImage: require('~/assets/images/PC/homePage/cardImage.png'),
          cardTitle: '电子电池',
          cardText: '国内首批开发出能量密度>180Wh/kg的电池',
          cardNum: 1,
        },
        {
          cardImage: require('~/assets/images/PC/homePage/cardImage.png'),
          cardTitle: '电驱系统',
          cardText: '国际一流的电驱动系统',
          cardNum: 2,
        },
        {
          cardImage: require('~/assets/images/PC/homePage/cardImage.png'),
          cardTitle: '充电系统',
          cardText: '国内首例20kW集成充电系统',
          cardNum: 3,
        },
      ],
      anima: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.anima = true
    })
  },
}
</script>
<style lang="less" scoped>
@import 'Home.less';
</style>
