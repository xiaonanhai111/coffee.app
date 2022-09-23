<template>
  <div class="login">
    <div class="login-box">
      <h2>欢迎登录！</h2>
      <van-form validate-first @failed="onFailed" @submit="sendLogin">
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="phone"
          name="validatorPhone"
          placeholder="请输入手机号"
          :rules="[
            { validator: validatorPhone, message: '你的手机号码不符合格式' },
          ]"
        />

        <van-field
          v-model="password"
          name="validatorPass"
          placeholder="请输入密码"
          :rules="[
            { validator: validatorPass, message: '你的密码号码不符合格式' },
          ]"
        />

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
      <div style="margin: 16px">
          <van-button round block type="info" @click="show=!show">注册</van-button>
        </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <h2>欢迎注册！</h2>
      <van-form validate-first @failed="onFailed" @submit="sendRegister">
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="regNickname"
          name="validatorName"
          placeholder="请输入昵称"
          :rules="[
            { validator: validatorName, message: '你的昵称不符合格式' },
          ]"
        />
        <van-field
          v-model="regPhone"
          name="validatorPhone"
          placeholder="请输入手机号"
          :rules="[
            { validator: validatorPhone, message: '你的手机号码不符合格式' },
          ]"
        />
        <van-field
          v-model="regPassword"
          name="validatorPass"
          placeholder="请输入密码"
          :rules="[
            { validator: validatorPass, message: '你的密码号码不符合格式' },
          ]"
        />

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
   </van-popup>
  </div>
</template>
<script>
import Vant from 'vant';
import 'vant/lib/index.css';
import {login,register,getUserInfo} from '@/network/login'
import { Field, Button, Form, Toast, Popup} from "vant";
export default {
  name: 'Login',
   data() {
      return {
         phone: "",
         password: "",
         show:false,
         regNickname:"",
         regPhone:"",
         regPassword:""
      }
   },
   created(){
   },
   components:{
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-popup":Popup
   },
   computed:{
   },
   methods:{
          // 校验函数返回 true 表示校验通过，false 表示不通过
    validatorPhone(val) {
      console.log(val);
      return /^1[3-9]\d{9}$/.test(val);
    },
    validatorPass(val) {
      console.log("触发pass验证");
      return /^[A-Za-z]\w{5,15}$/.test(val);
    },
    validatorName(val) {
      console.log("触发pass验证");
      return /^[\w\u4e00-\u9fa5]{1,10}$/.test(val);
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    sendLogin() {
      let params = {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        password: this.password,
        phone: this.phone,
      };
      login(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
            this.$store.commit('getToken',res.token) //将token保存到vuex中
            // console.log(this.$store.state.token);
          // 将token保存到cookie中
          var exp = new Date().getTime() + 60 * 60 * 1000  //设置过期时间
          // document.cookie = `token=${res.token};expires=${exp}` 
          this.$cookies.set("token",res.token,exp)
          getUserInfo('U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',res.token).then(res=>{
            console.log(res)
            this.$store.commit('getUserInfo',res.result[0])
            console.log(this.$store.state.userInfo);
            this.$store.commit('changeUsername',res.result[0].nickName)
          })
          Toast.success({
            message: res.msg,
          });
          this.$router.push('/')
        }else{
          Toast.fail({
            message: res.msg,
          });
        }
      });
    },
    sendRegister(){
      console.log(this.regNickname);
      let params = {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        nickName: this.regNickname,
        password: this.regPassword,
        phone: this.regPhone,
      };
      register(params).then(res => {
         console.log(res)
         if (res.code == 100) {
            Toast.success({
              message: res.msg,
            });
          }else{
            Toast.fail({
              message: res.msg,
            });
          }

      })
    }
   },
}
</script>
<style lang="css" scoped>

</style>
