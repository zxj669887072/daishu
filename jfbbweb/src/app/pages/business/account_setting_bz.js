import LF from 'LF';
import hex_md5  from './../../../js/framework/md5.js';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';

import { Form, FormItem, Input, Message } from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
var vm = new Vue({
	el: '#app',
	data: {
		user_id:"",
		tokenId:"",
		yzmdesc:"请输入验证码",
		yzminterval:null,
		yzmdis:false,
		
		ruleForm: {
			oldpass:'',
			pass: '',
			checkPass: '',
			phone: '',
			yzm:''
		},
		rules: {
			oldpass:[
				{ validator: (rule, value, callback)=>{
					if (value === '') {
			          callback(new Error('请输入旧密码'));
			        } else {
			          callback();
			        }
				}, trigger: 'blur' }
			],
			pass: [
				{ validator: (rule, value, callback)=>{
					if (value === '') {
			          callback(new Error('请输入密码'));
			        } else {
			          if (vm.ruleForm.checkPass !== '') {
			            vm.$refs.ruleForm.validateField('checkPass');
			          }
			          callback();
			        }
				}, trigger: 'blur' }
			],
			checkPass: [
				{ validator: (rule, value, callback)=>{
					if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== vm.ruleForm.pass) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
				}, trigger: 'blur' }
			],
			yzm: [
				{ validator: (rule, value, callback)=>{
					if (!value) {
			          return callback(new Error('验证码不能为空'));
			        }
				}, trigger: 'blur' }
			]
		}
	},
	methods: {
		getyzm(formName){
			let params={
	          			phone:LF.cookie.get("bussAccount"),
                        tokenId:LF.cookie.get("bussTokenId"),
						type:4
	        };
	         var _this = this;
	         LF.net.getJSON("/integral/sms/send",params,res=>{
	          			 if(res.code==='000'){
	          				_this.yzmdesc= 60;
	          				_this.yzmdis = true;
		          			_this.yzminterval = setInterval(function () {
					            if (_this.yzmdesc>=1) {
					               _this.yzmdesc-=1;
					               
					            } else {
					            	_this.yzmdesc="请输入验证码";
					            	_this.yzmdis = false;
					                clearInterval(_this.my_interval);
					                _this.my_interval = null;
					            }
					        }, 1000);
						}else{
							Message({
								type: 'warning',
								message:res.errorMessage
							});
						}
	          });
		},
		submitForm(formName){
			var self=this;
            let params = {
                oldPassword:hex_md5(this.ruleForm.oldpass),
                password:hex_md5(this.ruleForm.pass),
                passwordConfirm:hex_md5(self.ruleForm.checkPass),
                securityCode:this.ruleForm.yzm
            };
            LF.net.getJSON("/merchant/account/password/edit",params,res=>{
                if(res.code=='000'){
                    LF.cookie.del("bussAccount");
                    LF.cookie.del("bussUserId");
                    LF.cookie.del("bussUserName");
                    LF.cookie.del("merchantFlag");
                    LF.cookie.del("bussTokenId");
                    LF.cookie.del("merchantId");
                    LF.window.openWindow("/app/login_bz.html","_self");
                }else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
                }
            });
		}
	},
	beforeMount(){
    	
    },
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.user_id = LF.cookie.get("bussUserId");
    	this.tokenId = LF.cookie.get("bussTokenId");
        var ph=LF.cookie.get("bussAccount");
        this.ruleForm.phone=ph.substr(0,3)+"****"+ph.substr(7);
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})