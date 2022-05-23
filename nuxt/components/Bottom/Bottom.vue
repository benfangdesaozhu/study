<template>
  <div>
    <div class="container">
      <div class="fir-col">
        <div class="title" v-for="(item, index) in title" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="sec-col">
        <div class="series">储能系列</div>
        <div class="list" v-for="(item, index) in chuNeng" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="thr-col">
        <div class="series">电子电池系列</div>
        <div class="list" v-for="(item, index) in dianZi" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="four-col">
        <div class="series">电驱系列</div>
        <div class="list" v-for="(item, index) in dianQu" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="fif-col">
        <div class="series">超充系列</div>
        <div class="list" v-for="(item, index) in chaoChong" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="cp-rt">
        Copyright © 2020 - 2022 VREMT. All Rights Reserved. 威睿公司 版权所有
      </div>
      <div class="logo"></div>
      <div class="record">浙公网安备 238927398729857238号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  data() {
    return {
      title: ['技术研发', '新闻资讯', '企业简介', '合作伙伴'],
      chuNeng: [
        '用户储能',
        '柜式储能',
        '集装零件部',
        '便携式储能',
        '集装箱储能',
        '集装云平台',
      ],
      dianZi: ['电池', '电子'],
      dianQu: ['电机'],
      chaoChong: ['车载充电机', '充电桩'],
    }
  },
}
</script>
<style lang="less" scoped>
@import 'Bottom.less';
@import 'Share.less';
</style>
