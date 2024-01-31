<template>
    <div class="main">
        <img class="img" src='../static/img/top_logo.png' alt="">
        <div class="item" v-for="(item, index) in list">
            <div class="title">
                <p>{{ item.name }}<img :src="imgUrl" alt=""></p>
            </div>
            <div class="box">
                <el-row v-for="(box_item, box_index) in item.list">
                    <el-card :body-style="{ padding: '0px', width: '200px' }">
                        <div class="image-container">
                            <img :src="box_item.cover" class="image" />
                        </div>
                        <div style="padding: 14px">
                            <span>{{ box_item.name }}</span>
                            <div class="bottom">
                                <time class="time">{{ box_item.sales }}</time>
                                <el-button text class="button" @click = "goDetail(index, box_index)">购买</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getMenuList } from '@/assets/cate'
import { useRouter } from 'vue-router';

const router = useRouter()
const imgUrl = "https://go.cdn.heytea.com/storage/category/2020/05/02/c9d862a735af48d280ab8b21a2315514.jpg"
const list = getMenuList()

const goDetail = (indexOne, indexTwo) => {
    router.push({path: "/detail", query: {indexOne: indexOne, indexTwo: indexTwo}})
}

</script>

<style scoped lang="scss">
.main {
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    width: 100%;

    .img {
        position: fixed;
        top: 20px;
        right: 20px;
        opacity: 0.5;
        z-index: -999;
    }

    .item {
        margin-bottom: 20px;

        .title {
            border-bottom: 2px solid #f7ddad;
            width: 100%;

            p {
                width: 130px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #f7ddad;
                padding: 20px 0;
                background-color: #fff0d4;
                border-radius: 20px 20px 0 0;
            }

            img {
                width: 20px;
                height: 20px;
            }

        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start; // 使每行从最左边开始排列
            gap: 20px; // 设置项目之间的间隔
            width: 95%;
            margin: 0 auto;
            margin-top: 30px;

            .el-row {
                flex: 0 0 calc(20% - 20px); // 让每个项目占据20%的宽度，并考虑到间隔
                margin-bottom: 20px; // 设置下边距，使得每行有间隔
            }

            .time {
                font-size: 12px;
                color: #999;
                width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .bottom {
                margin-top: 13px;
                line-height: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .button {
                padding: 0 5px;
                min-height: auto;
                background-color: #eee8e2 !important;
            }

            .button:hover {
                box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                background-color: #45a049;
                /* 鼠标悬停时的背景颜色变化 */
            }


            .image-container {
                width: 100%;
                height: 200px;
                /* 设置容器高度 */
                overflow: hidden;
                /* 隐藏溢出部分 */
            }

            .image {
                width: 100%;
                /* 图片宽度填充容器 */
                height: 100%;
                /* 图片高度填充容器 */
                object-fit: cover;
                /* 裁剪并填充容器 */
                display: block;
            }
        }
    }
}
</style>