<template>
    <div class="main">
        <div class="box">
            <div style="font-weight: 600;">历史下单</div>
            <div class="more">more>></div>
        </div>
        <div class="item" v-if="aa">没有下单记录</div>
        <div style="max-height: 270px; overflow: auto;">
            <div class="history" v-if="menu.length > 0" v-for="item in menu" @click="goDetail(item.indexOne, item.indexTwo)">
                <div class="img">
                    <img :src="item.item.cover" alt="">
                </div>
                <div class="text">
                    <div>
                        <p>{{ item.item.name }}</p>
                        <p>{{ item.item.sales }}</p>
                    </div>
                    <p>{{ item.time }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getToken } from '@/function/getToken';
import { getMenuList } from '@/assets/cate';
import { useRouter } from 'vue-router';

const list = ref([])
const aa = ref(true)
let menu = []
const router = useRouter()
// const list = getMenuList()[indexOne].list[indexTwo]
const goDetail = (indexOne, indexTwo) => {
    router.push({path: "/detail", query: {indexOne: indexOne, indexTwo: indexTwo}})
}

const newlist = (list) => {
    list.forEach(item => {
        item.indexOne = item.indexOne.split("/")
        item.indexTwo = item.indexTwo.split("/")
        for (var i = 0; i < item.indexOne.length; i++) {
            menu.push({
                time: item.time,
                item: getMenuList()[parseInt(item.indexOne[i])].list[parseInt(item.indexTwo[i])],
                indexOne: parseInt(item.indexOne[i]),
                indexTwo: parseInt(item.indexTwo[i])
            })
        }
    });
}

const gethistory = () => {
    const token = getToken();
    axios.get("http://47.113.145.226:3000/lookhistory", {
        params: {
            token: token
        }
    }).then((res) => {
        // console.log(res)
        list.value = res.data.results
        newlist(list.value)
        if (list.value.length != 0) aa.value = false
        console.log(list.value)
        console.log(menu)
    }).catch((err) => {
        console.error(err)
    })
}

onMounted(() => {
    gethistory()
})

</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.main {
    width: 1020px;
    min-height: 350px;
    // border: 1px solid black;
    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    .box {
        padding: 20px 0;
        // padding-right: 30px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        // text-align: right;
        justify-content: space-between;
        
    }

    .more{
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }

    .more:hover {
        color: rgba(0, 0, 0, 0.9);
    }

    .item {
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
        height: 290px;
        line-height: 230px;
    }

    .history {
        // border: 1px solid black;
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .img {
            width: 100px;
            height: 100px;
            overflow: hidden;

            img {
                width: 100%;
                /* 图片宽度填充容器 */
                height: 100%;
                /* 图片高度填充容器 */
                object-fit: cover;
                /* 裁剪并填充容器 */
                display: block;
            }
        }

        .text {
            flex: 1;
            margin-left: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            p:nth-child(1) {
                font-size: 18px;
                font-weight: 600;
            }
        }
    }
}
</style>