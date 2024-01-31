<template>
    <div class="contain">
        <div class="item">
            <div class="left">
                <div class="img"><img :src="list.cover" alt=""></div>
            </div>
            <div class="right">
                <h3>{{ list.name }}</h3>
                <p class="sale">{{ list.sale }}</p>
                <p class="suger">甜度：
                    <el-radio-group v-model="suger" fill="#cca483">
                        <el-radio-button label="全糖" />
                        <el-radio-button label="正常糖" />
                        <el-radio-button label="半糖" />
                        <el-radio-button label="不额外加糖" />
                    </el-radio-group>
                </p>
                <p class="ice">温度：
                    <el-radio-group v-model="ice" fill="#cca483">
                        <el-radio-button label="常温" />
                        <el-radio-button label="去冰" />
                        <el-radio-button label="正常冰" />
                        <el-radio-button label="多冰" />
                    </el-radio-group>
                </p>
                <div class="money">
                    <el-input-number v-model="num" :min="1" :max="999" @change="handleChange" size="small" class="number" />
                    <p>￥{{ price }}</p>
                </div>
                <div class="button"><button>立即购买</button><button @click="change">加入购物车</button></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getMenuList } from '@/assets/cate';
import { addshopCar } from '@/function/addshopCar';
import { ElMessageBox } from 'element-plus'

const { indexOne, indexTwo } = useRoute().query
const list = getMenuList()[indexOne].list[indexTwo]
const suger = ref("正常糖")
const ice = ref("正常冰")
const num = ref(1)
const router = useRouter()
let price = ref(list.price)

const handleChange = (value) => {
    price.value = parseInt(list.price) * value
}

const change = async () => {
    const res = await addshopCar(list.name, list.cover, indexOne, indexTwo, suger.value, ice.value, num.value);
    if (res.message === '请携带 token 请求') router.push({ path: "/login" })
    else {
        ElMessageBox.alert(res.msg, "购物车")
    }
}

</script>

<style lang="scss" scoped>
.contain {

    * {
        box-sizing: border-box;
    }

    .item {
        border: 1px solid rgba(0, 0, 0, 0.6);
        width: 80%;
        min-width: 750px;
        margin: 0 auto;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        margin-top: 100px;
        align-items: center;

        .left {
            .img {
                width: 25vw;
                height: 25vw;
                min-width: 290px;
                min-height: 290px;
                // border: 1px solid red;
                overflow: hidden;
                border-radius: 10px;
            }

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

        .right {
            padding-left: 20px;
            flex: 1;

            .sale {
                font-size: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-indent: 2ch;
            }

            .suger {
                font-size: 13px;
                margin-top: 40px;
                display: flex;
                align-items: center;

                & {
                    --el-color-primary: none;
                }
            }

            .ice {
                font-size: 13px;
                display: flex;
                align-items: center;

                & {
                    --el-color-primary: none;
                }
            }

            .money {
                display: flex;
                align-items: center;
                width: 40%;
                justify-content: space-between;

                .number {
                    width: 100px;
                    // margin-top: 10px;
                }

                p {
                    font-size: 20px;
                    font-weight: 600;
                }
            }

            .button {
                button {
                    width: 100px;
                    height: 30px;
                    margin-top: 20px;
                    background-color: #f7e6d4;
                    border: none;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #f8e2cb;
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
}
</style>