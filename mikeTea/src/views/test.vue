<template>
  <div>
    <div>
      <h2>商品列表</h2>
      <el-checkbox-group v-model="selectedProducts">
        <el-checkbox v-for="product in products" :key="product.id" :label="product.id">
          {{ product.name }} - ￥{{ product.price }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div>
      <h2>已选商品</h2>
      <ul>
        <li v-for="productId in selectedProducts" :key="productId">
          {{ getProductById(productId).name }} - ￥{{ getProductById(productId).price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';

const products = ref([
  { id: 1, name: '商品1', price: 100 },
  { id: 2, name: '商品2', price: 150 },
  { id: 3, name: '商品3', price: 80 },
  { id: 4, name: '商品4', price: 200 },
]);

const selectedProducts = ref([]);

const getProductById = (id) => {
  return products.value.find((product) => product.id === id);
};
</script>

<!-- 注册 Element Plus 多选框组件 -->
<script>
import { defineComponent } from 'vue';
import 'element-plus/lib/theme-chalk/base.css';
import 'element-plus/lib/theme-chalk/checkbox.css';
import 'element-plus/lib/theme-chalk/checkbox-group.css';

export default defineComponent({
  components: {
    ElCheckbox,
    ElCheckboxGroup,
  },
});
</script>

<!-- <template>
  <el-row>
    <el-card :body-style="{ padding: '0px', width: '200px' }">
      <div class="image-container">
        <img src="../../static/xicha-list-img/时令上新/水云间.jpg" class="image" />
      </div>
      <div style="padding: 14px">
        <span>水云间</span>
        <div class="bottom">
          <time class="time">蜜香甜醇无香精3.8源牧甄奶，好奶自带清甜</time>
          <el-button text class="button">购买</el-button>
        </div>
      </div>
    </el-card>
  </el-row>
</template>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
  width: 70%;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 文本溢出时显示省略号 */
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
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  background-color: #45a049; /* 鼠标悬停时的背景颜色变化 */
}


.image-container {
  width: 100%;
  height: 200px; /* 设置容器高度 */
  overflow: hidden; /* 隐藏溢出部分 */
}

.image {
  width: 100%; /* 图片宽度填充容器 */
  height: 100%; /* 图片高度填充容器 */
  object-fit: cover; /* 裁剪并填充容器 */
  display: block;
}
</style> -->


<!-- <template>
  <div>
    <Address @test="test" ref="child"/>
    <button @click="test">主页按钮</button>
    <history></history>
  </div>
</template>

<script setup>
import Address from '@/components/address.vue';
import { ref } from 'vue';
import { getMenuList } from '@/assets/cate'
import history from '@/components/history.vue';

const child = ref();
const list = getMenuList()

const test = () => {
    console.log(child.value.formLabelAlign)
    console.log(list)
  }

</script> -->


<!-- <template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="选择地址">
      <el-cascader
        v-model="form.address"  
        :options="options"
        :props="{ value: 'label', label: 'label', children: 'children' }"
        change-on-select
        placeholder="请选择地址"
      ></el-cascader>
    </el-form-item>
  </el-form>
  <button @click="test"></button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElForm, ElFormItem, ElCascader } from 'element-plus';
import { data } from '@/assets/data';

const form = ref({
  address: []
});

const options = data;

const test = () => {
   console.log(form.value);
}
onMounted(() => {
 
});
</script> -->