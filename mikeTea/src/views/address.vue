<template>
    <div class="main">
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
        <div>
            <button @click="test">确定</button>
            <button @click="back">取消</button>
        </div>
    </div>
</template>
  
<script setup>
import Address from '@/components/address.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { getToken } from '@/function/getToken';
import { ElMessageBox } from 'element-plus'
import { data } from '@/assets/data';

const child = ref();
const router = useRouter()
const sid = useRoute().query.sid
const token = getToken()
const options = data;

const formLabelAlign = ref({
    name: '',
    tel: '',
    type: '',
    address: "请选择地址"
});

const form = ref({
    address: []
});

const cascaderProps = {
    value: 'label',
    label: 'label',
    children: 'children'
};

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}



const test = () => {
    if (sid == -1) {
        let params = {
            token: token,
            name: formLabelAlign.value.name,
            tel: formLabelAlign.value.tel,
            province: form.value.address[0],
            city: form.value.address[1],
            county: form.value.address[2],
            minute: formLabelAlign.value.type,
            df: null
        }
        axios.post("http://47.113.145.226:3000/addressadd", params, config).then((res) => {
            if (res.data.status == 200) {
                ElMessageBox.alert(res.data.msg, "添加地址").then(() => {
                    router.push({ path: "/my" })
                });
            }
        }).catch((err) => {
            console.error(err)
        })
    }
    else {
        let params = {
            token: token,
            name: formLabelAlign.value.name,
            tel: formLabelAlign.value.tel,
            province: form.value.address[0],
            city: form.value.address[1],
            county: form.value.address[2],
            minute: formLabelAlign.value.type,
            df: 0,
            sid: sid
        }

        axios.post("http://47.113.145.226:3000/addressreword", params, config).then((res) => {
            // console.log(res.data)
            router.push({ path: "/my" })
        }).catch((err) => {
            console.error(err)
        })
    }
}

const back = () => {
    router.push({ path: "/my" })
}

onMounted(() => {
    if (sid != -1) {
        axios.get("http://47.113.145.226:3000/addressfind", {
            params: {
                appkey: "sbhyz",
                token: token,
                sid: sid
            }
        }).then((res) => {
            // console.log(res.data.results[0])
            var ressData = res.data.results[0]
            if (res.data.status == 200) {
                formLabelAlign.value.name = ressData.name
                formLabelAlign.value.tel = ressData.tel
                formLabelAlign.value.type = ressData.minute
                formLabelAlign.value.address = `${ressData.province}/${ressData.city}/${ressData.county}`
                // console.log(city.value)
            }
        }).catch((err) => {
            console.error(err)
        })
    }
})
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    text-align: center;
    margin-top: 200px;

    button {
        width: 80px;
        height: 30px;
        border-radius: 30px;
        margin: 0 30px;
        border: none;
        cursor: pointer;
    }
}
</style>