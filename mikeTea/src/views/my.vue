<template>
  <div class="about">
    <div class="top">
      <img src="../static/img/home.png" alt="">
      <div class="main">
        <div class="left">
          <p>昵称：{{ name }}</p>
          <p>电话：{{ tel }}</p>
          <p>个性签名：{{ msg }}</p>
        </div>
        <div class="right">
          <p @click="open('个人信息')">个人信息</p>
          <p @click="open('修改密码')">修改密码</p>
          <p @click="address">个人地址</p>
          <p @click="logout">注销账号</p>
        </div>
      </div>
    </div>
    <history style="margin: 0 auto; margin-top: 30px;"></history>
  </div>
  <div class="mask" v-if="mask">
    <div class="msg">
      <div class="top">{{ title }}<div @click="close" style="cursor: pointer;">X</div>
      </div>
      <div style="margin: 20px" />
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item v-for="(item, index) in list" :label="item" v-if="mask_msg">
          <el-input v-model="formData[item]" />
        </el-form-item>
      </el-form>
      <div class="address" v-for="(item, index) in addressData" v-if="mask_address">
        <div>
          <div>{{ item.name }} {{ item.tel }}</div>
          <div>{{ item.city }} {{ item.county }} {{ item.province }} {{ item.minute }}</div>
        </div>
        <div>
          <img src="../static/img/收货地址页／编辑40.png" @click="reAddress(item.addressSid)" alt="">
        </div>
      </div>
      <div class="button">
        <button @click="ok(title)">{{ buttonName }}</button>
        <button @click="close">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getMymsg } from '../function/getMymsg';
import { rework } from '../function/rework';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus'
import { reMymsg } from '@/function/reMymsg';
import { getaddress } from "@/function/getaddress";
import history from '@/components/history.vue';


const labelPosition = ref('top')
const name = ref("");
const tel = ref("");
const msg = ref("");
const mask = ref(false);
const mask_msg = ref(true);
const mask_address = ref(false)
const router = useRouter()
const addressData = ref({})
const buttonName = ref("确定")

const myMsg = async () => {
  let res = await getMymsg()
  res = res.results[0]
  // console.log(res)
  name.value = res.name
  tel.value = res.tel
  msg.value = res.introduce
}

const myAddress = async () => {
  const res = await getaddress();
  addressData.value = res.results
}

const close = () => {
  mask.value = false
  mask_msg.value = true
  mask_address.value = false
  buttonName.value = "确定"
}

const list = ref([]);
const title = ref("");
const formData = ref({})
// 修改个人信息 修改密码
const open = (e) => {
  mask.value = true
  if (e == "个人信息") {
    title.value = "个人信息"
    list.value = ["昵称", "电话", "个性签名"]
    formData.value = {
      昵称: "",
      电话: "",
      个性签名: ""
    }
  }
  else if (e == "修改密码") {
    title.value = "修改密码"
    list.value = ["用户名", "旧密码", "新密码"]
    formData.value = {
      用户名: "",
      新密码: "",
      确认密码: ""
    }
  }
  // console.log(list.value)
}


// 查询地址
const address = () => {
  myAddress();
  mask_msg.value = false
  mask.value = true
  title.value = "个人地址"
  mask_address.value = true
  buttonName.value = "添加"
  // console.log(addressData.value)
}
// 注销
const logout = () => {
  localStorage.removeItem("token")
  localStorage.setItem('state', true)
  router.push({ path: '/' })
}

const reAddress = (sid) => {
  router.push({path: "/address", query: {sid: sid}})
}

// 对象字面量
const actions = {
  "修改密码": async () => {
    const res = await rework(formData.value["用户名"], formData.value["旧密码"], formData.value["新密码"]);
    if (res.data.status === 200) {
      ElMessageBox.alert(res.data.msg, title.value).then(() => {
        localStorage.removeItem("token");
        localStorage.setItem('state', true);
        router.push({ path: '/' });
      });
    } else {
      ElMessageBox.alert(res.data.msg, title.value);
    }
  },
  "个人信息": async () => {
    const res = await reMymsg(formData.value["昵称"], formData.value["个性签名"], formData.value["电话"]);
    if (res.status === 200) {
      ElMessageBox.alert(res.msg, title.value).then(() => {
        myMsg();
      });
    } else {
      ElMessageBox.alert(res.msg, title.value);
    }
  }
};

const ok = async (e) => {
  mask.value = false;
  const action = actions[e];
  if (action) {
    await action();
  } else {
    router.push({ path: '/address', query:{ sid:-1 } });
  }
}

onMounted(() => {
  myMsg();
})

</script>

<style lang="scss" scoped>
.about {
  * {
    box-sizing: border-box;
  }

  .top {
    display: flex;
    justify-content: center;

    img {
      width: 200px;
      border-radius: 100%;
      border: 1px solid black;
    }

    .main {
      // background-color: rgb(224, 224, 224);
      margin-left: 20px;
      border-radius: 30px;
      width: 800px;
      border: 1px solid rgb(205, 205, 205);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      display: flex;

      .left {
        // border: 1px solid black;
        width: 80%;
        padding: 20px 5px;
      }

      .right {
        flex: 1;
        border-left: solid 1px rgb(205, 205, 205);
        padding: 20px 0;
        text-align: center;

        p {
          cursor: pointer;
        }

        p:hover {
          color: rgb(121, 116, 116);
        }
      }
    }
  }
}

.mask {
  * {
    box-sizing: border-box;
  }

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;

  .msg {
    width: 450px;
    // height: 300px;
    // border: 1px solid black;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 30vh;
    padding: 10px 20px;

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    .button {
      width: 100%;
      text-align: center;
      margin-top: 20px;

      button {
        width: 100px;
        height: 30px;
        margin: 0 10px;
        border-radius: 20px;
        border: none;
      }
    }

    .address {
      font-size: 15px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      img {
        cursor: pointer;
        width: 20px;
      }
    }
  }
}
</style>
