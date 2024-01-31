<template>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign"
        style="max-width: 460px; margin: 0 auto;">
        <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="formLabelAlign.tel" />
        </el-form-item>
        <el-form-item label="选择地址">
            <el-cascader v-model="form.address" :options="options" :props="cascaderProps" change-on-select
                :placeholder="formLabelAlign.address"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input v-model="formLabelAlign.type" />
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { ref, toRefs } from 'vue';
import { data } from '@/assets/data';

const labelPosition = ref('left')

// const { formLabelAlign } = toRefs(props)

const formLabelAlign = defineProps({
    name: {
        type: String,
        default: ""
    },
    tel: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: "请选择地址"
    }
})


const form = ref({
    address: []
});

const options = data;

const cascaderProps = {
    value: 'label',
    label: 'label',
    children: 'children'
};

defineExpose({
    form,
    formLabelAlign
})
</script>