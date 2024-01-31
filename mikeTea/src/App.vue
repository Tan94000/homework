<template>
  <div class="app">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <img src="./static/img/bg.png" alt="">
      <div class="user" @click="login">
        <img src="./static/img/home.png" alt="">
        <p>{{ msg }}</p>
      </div>
      <RouterLink class="router" to="/">主页</RouterLink>
      <!-- <RouterLink class="router" to="/test">测试代码片段</RouterLink> -->
      <RouterLink class="router" to="/shop">商城</RouterLink>
      <RouterLink class="router" to="/shopcar">购物车</RouterLink>
    </div>

    <div style="width: 200px;"></div>

    <!-- 右侧主体 -->
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { getMymsg } from './function/getMymsg'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const msg = ref("")
const router = useRouter()

const myMsg = async () => {
  const res = await getMymsg()
  // console.log(res)
  if (res === "未登录" || !res) msg.value = "未登录"
  else if (res.status == 200) {
    msg.value = res.results[0].name
    // console.log(msg)
  }
}

const login = () => {
  if (msg.value === "未登录") {
    router.push('/login')
  } else {
    router.push('/my')
  }
}

onMounted(() => {
  myMsg()
})


</script>

<style lang="scss" scoped>
.app {
  display: flex;
  height: 100vh;
  padding: 0;
  margin: 0;
  // width: 100vw;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .sidebar {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0px;
    border-right: 1px solid black;
    width: 200px;
    height: 100vh;
    display: flex;
    flex-flow: column;
    background-color: white;

    img {
      width: 100%;
    }

    .router {
      text-align: center;
      text-decoration: none;
      font-size: 18px;
      margin-top: 20px;
      // border: 1px solid black;
      padding: 5px 0;
      margin-right: 5px;
      color: black;
    }

    .router:hover {
      background-color: #e9e9e9;
    }

    .user {
      width: 95%;
      // height: 29px;
      margin: 0 auto;
      // border: 1px solid black;
      display: flex;
      align-items: center;

      img {
        width: 25%;
        // background-color: black;
        border-radius: 100%;
        border: 1px solid black;
      }

      p {
        text-align: center;
        flex: 1;
      }
    }
  }

  .main-content {
    flex: 1;
  }
}
</style>
