<template>
    <div class="main">
        <div class="top">
            <img src="../static/img/ad_logo2.png" alt="">
        </div>
        <div class="text" v-if="list.length == 0">购物车暂无商品快去添加吧</div>
        <div class="item" v-if="list.length > 0">
            <div class="all">
                <el-checkbox v-model="checked1" label="选择全部" @change="handleCheckAll" size="large" />
            </div>
            <div class="item_box" v-for="item in list">
                <el-checkbox v-model="item.checked" label="" size="large" @change="handleCheck()" />
                <div class="img"><img :src="item.img" alt=""></div>
                <div class="txt">
                    <p>{{ item.name }}</p>
                    <p>{{ item.ice }}/{{ item.suger }}</p>
                </div>
                <div class="button">
                    <p>￥19 *{{ item.number }}</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="pirce">总计:￥<div class="num">{{ sum }}</div>
            </div>
            <div class="button"><button @click="buy">立即购买</button><button @click="del(true)">删除商品</button></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getToken } from '@/function/getToken';
import { ElMessageBox } from 'element-plus'

let list = ref([]);
const checked1 = ref(false)
const sum = ref(0)

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const getlist = () => {
    const token = getToken()
    axios.get("http://47.113.145.226:3000/lookshopCar", {
        params: {
            token: token
        }
    }).then((res) => {
        console.log(res.data)
        list.value = res.data.results
        list.value.forEach(item => {
            item.checked = false
        });
        // console.log(list.value)
    }).catch((err) => {
        console.error(err)
    })
}

const handleCheckAll = (value) => {
    let all = 0;
    list.value.forEach((item) => {
        item.checked = value;
        if (value) all += parseInt(item.number) * 19
    });
    sum.value = all
};

const handleCheck = () => {
    let all = 0
    let b = true
    list.value.forEach(item => {
        if (item.checked) {
            all += parseInt(item.number) * 19
        }
        else {
            b = false
        }
    })
    sum.value = all
    checked1.value = b
}

const del = async (blo) => {
    try {
        for (const item of list.value) {
            if (item.checked) {
                const pam = {
                    token: getToken(),
                    name: item.name,
                    ice: item.ice,
                    suger: item.suger
                }
                await axios.post("http://47.113.145.226:3000/reshopCar", pam, config);
            }
        }
        if (blo) {
            ElMessageBox.alert("删除成功", "删除").then(() => {
                location.reload();

            })
        }
        else {
            location.reload();
        }
    } catch (err) {
        console.error(err);
    }
}

const buy = () => {
    let indexOne = [];
    let indexTwo = [];
    list.value.forEach(item => {
        if (item.checked) {
            indexOne.push(item.indexOne);
            indexTwo.push(item.indexTwo);
        }
    });

    const newIndexOne = ref("");
    const newIndexTwo = ref("");

    for (let i = 0; i < indexOne.length; i++) {
        if (i === 0) {  // 使用 === 进行相等比较
            newIndexOne.value += indexOne[i];
            newIndexTwo.value += indexTwo[i];
        } else {
            newIndexOne.value += `/${indexOne[i]}`;
            newIndexTwo.value += `/${indexTwo[i]}`;
        }
    }

    // console.log(newIndexTwo.value);
    const pam = {
        token: getToken(),
        indexOne: newIndexOne.value,
        indexTwo: newIndexTwo.value
    }

    axios.post("http://47.113.145.226:3000/addhistory", pam, config).then((res) => {
        ElMessageBox.alert("购买成功", "购买").then(() => {
            del(false)
        })
    })
}

onMounted(() => {
    getlist();
})
</script>

<style lang="scss" scoped>
.main {
    .top {
        // height: 100px;
        // line-height: 100px;
        background-color: rgba($color: #000000, $alpha: 0.8);
        // position: relative;
        padding: 20px 0;
        text-align: right;
    }

    .text {
        font-size: 30px;
        color: rgba($color: #000000, $alpha: 0.5);
        text-align: center;
        margin-top: 20%;
    }

    .item {
        box-sizing: border-box;
        padding: 0 30px;
        padding-bottom: 120px;

        .all {
            border-bottom: 1px solid black;
            padding: 15px 0;
        }

        .item_box {
            display: flex;
            align-items: center;
            margin-top: 20px;
        }

        .img {
            width: 150px;
            height: 150px;

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

        .txt {
            margin-left: 30px;

            p:nth-child(1) {
                font-size: 20px;
                font-weight: 600;
            }
        }

        .button {
            flex: 1;
            text-align: right;
            font-size: 18px;
        }

    }

    .bottom {
        box-sizing: border-box;
        position: fixed;
        height: 100px;
        width: calc(100% - 200px);
        background-color: #e5e5e5;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;

        .pirce {
            display: flex;
            align-items: flex-end;
            ;

            .num {
                font-size: 40px;
            }
        }

        .button {
            button {
                width: 100px;
                height: 30px;
                margin-top: 20px;
                background-color: #333333;
                border: none;
                color: white;
                cursor: pointer;
            }

            button:hover {
                background-color: #434342;
            }

            button:first-child {
                border-radius: 20px 0 0 20px;
                border-right: 1px solid #0000005f;
                // padding: 3px 0;
            }

            button:last-child {
                border-radius: 0 20px 20px 0;
            }
        }
    }
}
</style>