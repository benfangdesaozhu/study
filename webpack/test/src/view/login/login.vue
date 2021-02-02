<template>
    <div class="login-bg">
        <img :src='require("@/public/test.jpg")'>
        <div class='m-test'>测试css热更新是否生效</div>
        <el-container>
            <el-header>{{ loginData.text }}</el-header>
            <el-main>Main111222</el-main>
        </el-container>
        
        <el-button type="primary" @click="login">默认按钮</el-button>

        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </template>
        <div id="main1" style="width: 600px;height: 600px"></div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
// import {
//     login,
//     getByImgAction
// } from './../../API/index'
export default {
  name: 'login',
  data () {
      return {
          currentPage4: 4,
          account: '',
          password: '',
          byimg: '', // 必应的背景图片
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄111'
          }]
      }
  },
  computed: {
      ...mapGetters(['loginData']),
      ...mapState({
          mapstateTest(state){
              console.log('mapState', state)
              return `${state.login.loginData.text}`
          }
      })
  },
  created(){
      console.log(this.loginData, this.mapstateTest)
    //   this.getBiYingImg()
    
  },
  mounted(){
    var myChart = echarts.init(document.getElementById('main1'));
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
  },
  methods: {
    
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      ...mapActions([
          'logininfoAction'
      ]),
    //   ...mapMutations(['LOGIN_DATA']), // 两种方式都可以
      ...mapMutations({
          login_data: 'LOGIN_DATA'
      }),
      login () {
        //   this.$store.commit('LOGIN_DATA', {text: 'new text'})
          this.login_data({text: 'new text111'})
        //   console.log(this.$store, this.$store.dispatch('logininfoAction', {text: 'new text'}))
          console.log(this.loginData)
          if(!this.account || !this.password) {return}
        //   login({
        //       username: this.account,
        //       password: this.password
        //   }).then(res => {
        //       if(res.data.resultCode ===200 && res.data.success){
        //           this.$router.push({ path: '/blog'})
        //       }
        //   })
      },
      getBiYingImg() {
        // getByImgAction().then(res => {
        //     this.byimg = res.data.data.byimg.byimg
        // })
      }
  }
}
</script>
<style>
.login-bg {
    position: relative;
    width: 100%;
    height: 100%;
}
.login-by-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.login-port {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color: #fff;
}
.account {
    margin-top: 100px;
    margin-bottom: 20px;
}
.login-btn {
    width: 150px;
    margin-top: 20px;
}
.map-state-test {
    display: flex;
}
.m-test {
    color: #000;
}
</style>