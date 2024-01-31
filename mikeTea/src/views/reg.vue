<template>
    <div class="content">
        <img src="../static/img/top_logo.png" alt="">
        <div class="loginBox">
            <p>账号：<img src="../static/img/logo.png" alt=""></p>
            <input type="text" v-model="username">
            <p>密码：</p>
            <input type="text" v-model="password">
            <p>电话：</p>
            <input type="text" v-model="tel">
            <div class="buttonBox">
                <button @click="reg">确定</button>
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

const username = ref("")
const password = ref("")
const tel = ref("")
const router = useRouter()

let telPattern = /^(1)[0-9]{10}$/;

const reg = () => {
    if (!tel.value.match(telPattern)) {
        alert("电话号码有误")
        return
    }
    else if (!username.value || !password.value) {
        alert("请正确输入账号密码")
        return
    }

    else {
        const params = {
            username: username.value,
            password: password.value,
            tel: tel.value
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post("http://47.113.145.226:3000/reg", params, config).then((res) => {
            console.log(res)
            if(res.data.status == 200) router.push({ path: '/login' })
        }).catch((err) => {
            // console.error(err.response.data.message)
            alert(err.response.data.message)
        })
    }
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
        grid-template-rows: auto auto auto;
        padding: 50px 10px;
        grid-gap: 10px;
        align-items: center;
        border-radius: 30px;
        margin-top: 80px;
        position: relative;

        p {
            text-align: center;
            position: relative;

            img {
                width: 60px;
                position: absolute;
                left: 20px;
                top: 170px;
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