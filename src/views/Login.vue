<template>
  <div class="Login_Module">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		  <h3 class="title">系统登录</h3>
		  <el-form-item prop="account">
		    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
		  </el-form-item>
		  <el-form-item prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
		  </el-form-item>
		  <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		  <el-form-item style="width:100%;">
		    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
		    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
  import { connetAction,httpUrl,ajaxPost} from '../api/api';
	
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: false
      };
    },
	
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = {vc_username: this.ruleForm2.account,vc_password: this.ruleForm2.checkPass};
           connetAction.ajaxPost(httpUrl['login'],loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { message, status} = data;
              if (status != 1) {
                this.$message({
                  message: message,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user',status);
                this.$router.push({ path: '/userlist' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
	.Login_Module{
		width: 100%;
		height: 100%;
		background: url("../assets/loginbg.jpg") no-repeat;
		background-size:cover;
		background-position: 70% 90%;
	}
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    transform: translateY(160px);
    width: 350px;
		margin: auto;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.8);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>