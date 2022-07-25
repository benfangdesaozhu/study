<template>
  <footer class="c-footer">
    <div class="container">
      <c-container>
        <div class="c-container-link flex-space-between">
          <div class="c-container-link-list">
            <div class="fir-col col">
              <div class="title" v-for="(item, index) in title" :key="index">
                {{ item }}
              </div>
            </div>
            <div class="sec-col col">
              <div class="series">储能系列</div>
              <div class="list" v-for="(item, index) in chuNeng" :key="index">
                {{ item }}
              </div>
            </div>
            <div class="thr-col col">
              <div class="series">电子电池系列</div>
              <div class="list" v-for="(item, index) in dianZi" :key="index">
                {{ item }}
              </div>
            </div>
            <div class="four-col col">
              <div class="series">电驱系列</div>
              <div class="list" v-for="(item, index) in dianQu" :key="index">
                {{ item }}
              </div>
            </div>
            <div class="fif-col col">
              <div class="series">超充系列</div>
              <div class="list" v-for="(item, index) in chaoChong" :key="index">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="c-container-link-privacy">
            <p>联系我们</p>
            <p>电话：0574-23867100</p>
            <p>邮箱：317021716@qQ.COM</p>
            <p>工作时间：周一至周五 10:00-18:00</p>
            <img class="wr-logo-icon" :src="logoImg" alt="威睿logo" />
          </div>
        </div>
      </c-container>
    </div>
    <div class="copyright">
      <c-container>
        <div class="copyright-content flex-space-between">
          <div class="cp-rt">
            <span>Copyright © 2020 - 2022 VREMT. All Rights Reserved.</span>
            <span class="text-decoration">法律声明</span>及<span
              class="text-decoration">隐私权政策</span>
          </div>
          <div class="vertical-center">
            <img class="logo" :src="filingImg" alt="备案号" />
            <div class="record">浙公网安备 238927398729857238号</div>
          </div>
        </div>
      </c-container>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Bottom',
  data() {
    return {
      logoImg: require('~/assets/images/mobile/homePage/logoWhite.png'),
      filingImg: require('~/assets/images/mobile/homePage/filing.png'),
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
@import 'FooterPc';
</style>
