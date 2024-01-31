<template>
    <div class="content">
        <h1>品牌介绍</h1>
        <h3>BRAND PROFILE</h3>
        <div class="logo">
            <div class="left">
                <img src="../static/img/ad_logo2.png" alt="">
                <h2>喜茶<em>&nbsp;&nbsp;</em>更受年轻人追捧的中国茶</h2>
            </div>
            <div class="right">
                <img src="../static/img/about_logo2.png" alt="">
            </div>
        </div>
        <div class="text">
            <h1>喜茶中国茶<em>&nbsp;&nbsp;</em></h1>
            <h4>Fruit Tea</h4>
            <p>2012年，喜茶 HEYTEA 起源于一条名叫江边里的小巷，原名皇茶ROYALTEA， 由于无法注册商标， 故全面升级为注册品牌喜茶 HEYTEA 。</p>
            <p>喜茶为芝士现泡茶的原创者。自创立以来，喜茶专注于呈现来自世界各地的优质茶香， 让这茶饮这一古老文化焕发出新的生命力。</p>
            <p>清甜饱满的鲜茶水果系列的推出旨在让顾客可以享受水果与好茶产生的美妙口感。精选优质茶叶为茶底，以天然糖分温润中和，诠释出清爽丰富的效果，是夏日消暑的优选。</p>
            <p>四季轮替，每个季节都其独特的气质及产物，为了呈现当季最新鲜的风味，喜茶推出当季水果限定系列。时令鲜果制作，不添加任何果汁果酱，过季即下架。已推出的「芝士莓莓」，「芝士芒芒」、「芝士蜜瓜」、「芝芝莓果」等，深受消费者喜爱。</p>
            <img src="../static/img/about.jpg" alt="">
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
    // 登录页存储过的状态
    if(localStorage.getItem("state")) {
        location.reload()
        localStorage.removeItem("state")
    }
})
</script>

<style lang="scss" scoped>
.content {
    // text-align: center;
    position: relative;

    * {
        box-sizing: border-box;
        // margin: 0 auto;
    }

    h1 {
        letter-spacing: 5px;
        // margin: 0 auto;
        width: 100%;
        text-align: center;
    }

    h3 {
        letter-spacing: 10px;
        margin-left: 3%;
        // margin: 0 auto;
        width: 100%;
        text-align: center;
    }

    .logo {
        margin: 0 auto;
        width: 1000px;
        display: flex;

        .left {
            color: white;
            // border: 1px solid black;
            width: 800px;
            background-color: #383734;
            letter-spacing: 3px;
            text-align: left;
            padding: 80px 0 80px 80px;

            em {
                display: inline-block;
                text-decoration: line-through;
                letter-spacing: 15px;
            }
        }

        .right {
            // border: 1px solid pink;
            flex: 1;
            background-color: #f2f2f4;
            display: flex;
            align-items: center;

            img {
                // box-sizing: none;
                border: 1px solid #383734;
                margin: 0 auto;
                width: 140px;
                padding: 30px 20px 30px 20px
            }
        }
    }

    .text {
        margin-top: 100px;
        text-align: left;
        width: 800px;
        // border: 1px solid black;
        margin-left: calc(50% - 500px);
        background-color: #e9e9e9;
        padding: 80px 180px 60px 60px;
        position: relative;

        em {
            display: inline-block;
            text-decoration: line-through;
            letter-spacing: 20px;
        }

        h1{
            color: #383734;
        }

        h4{
            letter-spacing: 10px;
            color: #b0b0b0;
        }

        p{
            margin-top: 50px;
        }

        img{
            position: absolute;
            width: 300px;
            top: -50px;
            right: -200px;
        }
    }
}
</style>