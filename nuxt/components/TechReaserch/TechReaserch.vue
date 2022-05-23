<template>
  <div class="container">
    <div class="head">
      <div
        class="header titlesTransformDefault"
        :class="[techTitleAnima ? 'titlesTransformActive' : '']">
        技术研发
      </div>
      <c-checkMoreBtn class="more" :type="'pc'"></c-checkMoreBtn>
    </div>
    <div class="image" :class="[techImgAnima ? 'opacity-show' : '']">
      <img width="100%" :src="mainImg" />
    </div>
    <div class="data-container">
      <div class="data-left">
        <div
          class="single-data-container titlesTransformDefault"
          :class="[techTextAnima ? 'titlesTransformActive' : '']">
          <div class="data">
            <!-- <div class="number">1000</div> -->
            <number-animation
              class="number"
              ref="numberAnima"
              :duration="0.5"
              :to="1000"></number-animation>
            <div class="unit">+</div>
          </div>
          <div class="text">研发团队</div>
        </div>
        <div
          class="single-data-container titlesTransformDefault"
          :class="[techTextAnima ? 'titlesTransformActive' : '']">
          <div class="data">
            <div class="number">69</div>
            <div class="unit unit-two">%</div>
          </div>
          <div class="text">汽车顶尖人才占比</div>
        </div>
        <div
          class="single-data-container titlesTransformDefault"
          :class="[techTextAnima ? 'titlesTransformActive' : '']">
          <div class="data">
            <div class="number">2</div>
            <div class="unit unit-thr">亿元</div>
          </div>
          <div class="text">试验中心投资</div>
        </div>
      </div>
      <div
        class="comment titlesTransformDefault"
        :class="[techTextAnima ? 'titlesTransformActive' : '']">
        试验中心涵盖动力电池、电机电控、环境可靠性、充电系统、整车涉水、理化检测等，具备从材料级到新能源汽车零部件级再到系统联调级的试验能力，严格按照ISO/IEC
        17025体系的要求建立和运行，已通过中国合格评定国家认可委员会CNAS认可和吉利集团SQE认可。
      </div>
    </div>
  </div>
</template>

<script>
import CCheckMoreBtn from '~/components/CheckMoreBtn/CheckMoreBtn'

export default {
  name: 'TechReaserch',
  components: {
    CCheckMoreBtn,
  },
  props: {
    techTitleAnima: {
      type: Boolean,
      default: false,
    },
    techImgAnima: {
      type: Boolean,
      default: false,
    },
    techTextAnima: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mainImg: require('~/assets/images/PC/homePage/Rectangle 32.png'),
    }
  },
  watch: {
    techTextAnima: function (val) {
      if (val) {
        this.$refs.numberAnima.restart()
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import 'TechReaserch.less';
</style>
