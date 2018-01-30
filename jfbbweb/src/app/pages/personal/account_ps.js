//工程js框架
import LF from 'LF';
import Vue from 'vue';
import * as config from '../../../js/framework/define';

//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import {Button ,RadioGroup,Radio,Card, Loading, Carousel, CarouselItem,Form,FormItem,Input,CheckboxGroup,Checkbox ,TimePicker,DatePicker,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
 Vue.use(Loading);
 Vue.use(Card);
 Vue.use(Carousel);
 Vue.use(CarouselItem);
 Vue.use(Form)
 Vue.use(FormItem)
 Vue.use(Input)

 Vue.use(RadioGroup)
 Vue.use(Radio)

 Vue.use(CheckboxGroup)
 Vue.use(Checkbox)

 Vue.use(TimePicker)
 Vue.use(DatePicker)
 Vue.use(Button)


 var vue =new Vue({
 	el: '#app',
 	data: {
 		src:'',
 		accounts:'',
 		ruleForm2: {
 			account:'',
 			icon:'',
 			nickName:'',
 			realName:'',
 			sex:'',
 			birthday:'',
 			qq:'',
 			weChat:'',
 			email:''
 		},
 		rules2: {
 			realName: [
 				{ required: true, message: '请输入真实姓名', trigger: 'blur' },
 			],
 			nickName:[{
 				validator: function(rule, value, callback){
		                                setTimeout(() => {
		                                    if(value==''){
		                                        callback(new Error('请输入昵称'));
		                                    }else if (!/^.{2,24}$/.test(value)) {
		                                        callback(new Error('不得超过24个字符'));
		                                    }else {
		                                        callback();
		                                    }
		                                }, 100);
		                            }, trigger: 'blur'
 			}],
 			qq:[{
 				validator: function(rule, value, callback){		                                	
	                                    		if(value!=''){						
						if(!(/^[1-9][0-9]{4,11}$/.test(value))){
							callback(new Error('请输入正确的QQ号码'));
						}else {
			          				callback();
			        			}
					}else {
			          			callback();
			        		}		                                	
		                     	}, trigger: 'blur'
 			}],
 			weChat:[{
 				validator: function(rule, value, callback){		                                	
	                                    		if(value!=''){						
						if(!(/^[a-zA-Z\d_]{5,}$/.test(value))){
							callback(new Error('请输入正确的微信号码'));
						}else {
			          				callback();
			        			}
					}else {
			          			callback();
			        		}		                                	
		                     	}, trigger: 'blur'
 			}],
 			email:[{
 				validator: function(rule, value, callback){		                                	
	                                    		if(value!=''){
						var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
						if(!myreg.test(value)){
							callback(new Error('请输入正确的邮箱'));								
							// value="";
						}else {
			          				callback();
			        			}
					}else {
			          			callback();
			        		}		                                	
		                     	}, trigger: 'blur'
 			}],
 			// qq: [
 			// 	{ required: true, message: '请输入QQ号', trigger: 'blur' } 			
 			// ]
 		}
 	},
 	methods: {
 		goLogin:function(){
 			var self = this;
 			if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
 				LF.window.openWindow("/app/login.html","_self");
 			}
 		},
 		getAccount:function(){
 			var self =this;
 			LF.net.getJSON("integral/user/info	", {}, function(res) {
 				if(res.code==='000'){				console.log(res.data)
 					self.accounts=res.data;
 					var _this=vue._data.ruleForm2;
 					self.src = self.accounts.icon;
 					_this.nickName = self.accounts.nickName;
 					_this.account = self.accounts.account;
 					_this.realName = self.accounts.realName;
 					_this.sex = self.accounts.sex;
 					_this.birthday = self.accounts.birthday;
 					_this.qq = self.accounts.qq;
 					_this.weChat = self.accounts.weChat;
 					_this.email = self.accounts.email;
 					console.log( self.accounts.birthday)
 				}else{
 					Message({
 						type: 'error',
 						message:res.errorMessage
 					});
 				}
 			}, function(res) {
 				console.log("error：" + JSON.stringify(res));
 				var res = JSON.parse(res);

 			});
 		},
 		submitForm(formName) {
 			var self = this;
 			this.$refs[formName].validate((valid) => {
 				if (valid) {
 					var formData = JSON.stringify(this.ruleForm2);
 					var obj = JSON.parse(formData);
 					obj["icon"]=self.src
 					if(obj.birthday!=''){
 						obj["birthday"]=LF.util.formatDate(obj.birthday);
 					};
 					self.testajax(obj);
 				} else {
 					console.log('error submit!!');
 					return false;
 				}
 			});
 		},
 		previewFile:function(event) {
 			self =this;
 			var formData = new FormData(this.$el.querySelector('form[id="uploadForm"]'));
 			if(file) {
 				LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=0",formData,function(res){
 					self.src=res.data;
 					console.log(res.data)
 				},function(res){
 					console.log("error",res);
 				});
 			} else {
 				self.backgroundImg = "";
 			}
 		},
 		clickFace:function(){
 			console.log(1)
 			document.getElementById("file").click();
 		},
 		testajax: function(obj) {

			var self = this;//这样在function中用过self调用vue的this对象。
			console.log(obj.type);console.log(obj);
			LF.net.getJSON("member/info/edit", obj, function(res) {
				if(res.code==='000'){
					Message({
						type: 'success',
						message:"保存成功"
					});
					LF.cookie.set("userName",self.ruleForm2.nickName);
				}else{
					console.log(obj);
					Message({
						type: 'error',
						message:res.errorMessage
					});
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
				var res = JSON.parse(res);

			});
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		checkQQ:function () {
			if(this.ruleForm2.qq!=''){
				if(!(/^[1-9][0-9]{4,11}$/.test(this.ruleForm2.qq))){
					Message({
						type: 'error',
						message:"请输入正确的QQ号码"
					});
					this.ruleForm2.qq="";
				}
				// else if(this.ruleForm2.qq.length<5){
				// 	Message({
				// 		type: 'error',
				// 		message:"QQ号码长度不能小于5位"
				// 	});
				// }
			}else{

			}
		},
		checkWx:function () {
			if(this.ruleForm2.weChat!=''){
				if(!(/^[a-zA-Z\d_]{5,}$/.test(this.ruleForm2.weChat))){
					Message({
						type: 'error',
						message:"请输入正确的微信号码"
					});
					this.ruleForm2.weChat="";
				}
			}
		},
		checkEmail:function () {
			if(this.ruleForm2.email!=''){
				var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!myreg.test(this.ruleForm2.email)){
					Message({
						type: 'error',
						message:"请输入正确的邮箱"
					});
					this.ruleForm2.email="";
				}
			}
		}
	},
	/*
     *组件挂在完成响应
     */
     mounted(){
     	this.goLogin();
     	this.getAccount();
     },
     components: {
     	LfHead,
     	LfLeft,
     	LfFooter
     }
 })