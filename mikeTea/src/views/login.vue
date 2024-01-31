<template>
  <div class="content">
    <img src="../static/img/top_logo.png" alt="">
    <div class="loginBox">
      <p>账号：<img src="../static/img/logo.png" alt=""></p>
      <input type="text" v-model="username">
      <p>密码：</p>
      <input type="password" v-model="password">
      <div class="buttonBox">
        <button @click="login">登录</button>
        <button @click="navigateToAbout">注册</button>
        <!-- <RouterLink to="/about">注册</RouterLink> -->
      </div>
    </div>
    <div class="bottom">
      <img src="../static/img/ad_logo2.png" alt="">
      <div>
        <h1>喜茶总部地址</h1>
        <p>地址：南山区航天科技广场B座602C</p>
        <p>公司类型：有限责任公司(自然人投资或控股)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const data = ref({})
const username = ref("")
const password = ref("")
const router = useRouter()

const navigateToAbout = () => {
  router.push({ path: '/reg' })
}

const login = () => {
  if (username.value === "" || password.value === "") return

  axios.get("http://47.113.145.226:3000/login", {
    params: {
      username: username.value,
      password: password.value
    }
  })
    .then(res => {
      data.value = res.data
      if (data.value.status == 200) {
        localStorage.setItem("token", data.value.token)
        // 存储状态用于检查是否刷新页面
        localStorage.setItem('state', true)
        localStorage.setItem('username', username.value)
        router.push({ path: '/' })
      }
    })
    .catch(err => {
      console.error(err)
    })
}
</script>

<style lang="scss" scoped>
.content {
  * {
    box-sizing: border-box;
  }

  img {
    margin-left: 20px;
  }

  .loginBox {
    width: 500px;
    border: 3px solid black;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: auto auto;
    padding: 50px 10px;
    grid-gap: 10px;
    align-items: center;
    border-radius: 30px;
    margin-top: 100px;
    position: relative;

    p {
      text-align: center;
      position: relative;

      img {
        width: 60px;
        position: absolute;
        left: 20px;
        top: 100px;
      }
    }

    input {
      height: 30px;
    }

    .buttonBox {
      display: flex;
      align-items: center;
      width: 500px;
      justify-content: center;
      // border: 1px solid black;

      button {
        width: 90px;
        height: 35px;
        border-radius: 20px;
        font-size: 15px;
        margin: 0 20px;
        border: none;
      }
    }

  }

  .bottom {
    width: 100%;
    // border: 1px solid black;
    height: 200px;
    position: relative;
    bottom: -100px;
    background-color: #383734;
    color: white;
    // position: relative;

    img {
      position: absolute;
      bottom: 20px;
      right: 0;
    }

    div {
      position: absolute;
      bottom: 10px;
      left: 20px;
    }
  }
}
</style>