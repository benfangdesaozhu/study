<template>
    <div class="login-bg">
        <img class="login-by-icon" :src="byimg" alt="">
        <div class="login-port">
            <div class="account">
                <span>账号：</span>
                <input class="input-style" type="text" v-model="account" placeholder="请输入账号">
            </div>

            <div>
                <span>密码：</span>
                <input type="text" v-model="password" placeholder="请输入密码">
            </div>
            <button class="login-btn" @click="login">登录</button>
        </div>
    </div>
</template>

<script>
// import {
//     login,
//     getByImgAction
// } from './../../API/index'
export default {
  name: 'login',
  data () {
      return {
          account: '',
          password: '',
          byimg: '', // 必应的背景图片
      }
  },
  created(){
    //   this.getBiYingImg()
  },
  methods: {
      login () {
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
</style>