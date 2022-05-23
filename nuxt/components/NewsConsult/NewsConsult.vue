<template>
  <div class="container">
    <div class="head">
      <div
        class="news-consult titlesTransformDefault"
        :class="[newsTitleAnima ? 'titlesTransformActive' : '']">
        新闻资讯
      </div>
      <c-checkMoreBtn class="more" :type="'pc'"></c-checkMoreBtn>
    </div>
    <div class="cards">
      <div
        :class="[newsCardsAnima ? 'opacity-show' : '']"
        class="child-card"
        v-for="(item, index) in List"
        :key="`list_${index}`">
        <div class="image">
          <img width="100%" :src="item.officialImg" />
          <div class="headline">{{ item.headLine }}</div>
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CCheckMoreBtn from '~/components/CheckMoreBtn/CheckMoreBtn'

export default {
  name: 'NewsConsult',
  components: {
    CCheckMoreBtn,
  },
  props: {
    newsTitleAnima: {
      type: Boolean,
      default: false,
    },
    newsCardsAnima: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      List: [
        {
          headLine: '德科物联与吉利威睿 签署合作协议',
          title: '共同赋能城市“双碳达标” 四川本地企业与吉利威睿签署合作协议',
          text: '据悉，此次战略合作是基于双方对“双碳达标”领域的深度探索，依托德科物联在本地城市的研发运营能力，结合威睿电动在储能行业的领先技术和领先产品展开落地。',
          officialImg: require('~/assets/images/PC/homePage/官网主kv-1.png'),
        },
        {
          headLine: '德科物联与吉利威睿 签署合作协议',
          title: '共同赋能城市“双碳达标” 四川本地企业与吉利威睿签署合作协议',
          text: '据悉，此次战略合作是基于双方对“双碳达标”领域的深度探索，依托德科物联在本地城市的研发运营能力，结合威睿电动在储能行业的领先技术和领先产品展开落地。',
          officialImg: require('~/assets/images/PC/homePage/官网主kv-2.png'),
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
@import 'NewsConsult.less';
</style>
