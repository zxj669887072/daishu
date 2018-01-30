import LF from 'LF';
import hex_md5  from './../../../js/framework/md5.js';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';

import { Message,Cascader,Loading,Form,FormItem,Input, Button} from 'element-ui';
Vue.use(Loading)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Cascader);
var vm = new Vue({
	el: '#app',
	data: {
		merchantId:"",
		ruleForm:{
			merchantId:"",
			realName:"",
			sex:"",
			phone:"",
			servicePhone:"",
			qq:1,
			email:"",
			weChat:"",
			province:"",
			city:"",
			district:"",
			street:"",
		},
		rules: {
 			realName: [
 				{ required: true, message: '请输入真实姓名', trigger: 'blur' },
 			],
 			phone:[{
 				validator: function(rule, value, callback){
		                                 	if(!value) {
			                              	return callback(new Error('手机号码不能为空'));
			                       	}
			             	if((/^1[34578]\d{9}$/.test(value))) {
			                              	callback();
					} else {
			                              	callback(new Error('请输入正确的手机号码'));
			                        	}
		             	}, trigger: 'blur'
 			}],
 			servicePhone: [{ 
 				validator: function(rule, value, callback){
		                                 	if(!value) {
			                              	return callback(new Error('客服电话不能为空'));
			                       	}
			             	if((/^((0\d{2,3}-\d{7,8})|1[34578]\d{9})$/.test(value))) {
			                              	callback();
					} else {
			                              	callback(new Error('请输入正确的客服电话(11位电话号码或"区号-固话号码")'));
			                        	}
		             	}, trigger: 'blur' 
 			}],
 			province: [
 				{ required: true, message: '请选择地址', trigger: 'blur' },
 			],
 			city: [
 				{ required: true, message: '请选择地址', trigger: 'blur' },
 			],
 			district: [
 				{ required: true, message: '请选择地址', trigger: 'blur' },
 			],
 		},
		selectedOptions:[],
		areaList:[],
		loading:true
	},
	computed:{
		options:function(){
			var rs = [];
			if(this.areaList.length > 0){
				rs = this.doData(this.areaList,0);
			}
			return rs;
		}
	},
	methods: {
		doData(data,parentId){
			var self = this;
			var rs = [];
			var temp = null;
			data.forEach(function(v,i){
				if(parentId == v.parentId){
					temp = new Object();
					temp.value=v.id;
					temp.label=v.name;
					if(v.type != '4'){
						temp.children = self.doData(data,v.id)	
					}
					rs.push(temp);
				}
			})
			return rs;
		},
		getInfo(){
			let params = {
				merchantId:this.merchantId
	    	};
	    	LF.net.getJSON("/merchant/contact/info",params,res=>{
	  			if(res.code==='000'){
                    this.loading = false;
	  				this.ruleForm =res.data;				console.log(res.data,888)
	  				this.selectedOptions.push(this.ruleForm.province);
	  				this.selectedOptions.push(this.ruleForm.city);
	  				this.selectedOptions.push(this.ruleForm.district);
//	  				this.getCity(this.ruleForm.province);	
//	  				this.getDistrict(this.ruleForm.city)
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
                this.loading = false;
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		getProvince(){
			let params = {
				parentId:""
	    	};
	    	LF.net.getJSON("/sys/area/list",params,res=>{
	  			if(res.code==='000'){
	  				this.areaList = res.data;
	  				this.getInfo();
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		getCity(id){
			let params = {
				parentId:id
	    	};
	    	LF.net.getJSON("/sys/area/list",params,res=>{
	  			if(res.code==='000'){
	  				this.cityList = res.data;
	  				this.city = this.ruleForm.city;
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		getDistrict(id){
			let params = {
				parentId:id
	    	};
	    	LF.net.getJSON("/sys/area/list",params,res=>{
	  			if(res.code==='000'){
	  				this.districtList = res.data;
	  				this.district = this.ruleForm.district;
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		chage(type){
			switch (type){
				case "province":
					
					break;
				case "city":
					break;
				default:
					
					break;
			}
		},
		submitForm(formName){
//			ruleForm:{
//			merchantId:"",
//			realName:"",
//			sex:"",
//			phone:"",
//			servicePhone:"",
//			qq:1,
//			email:"",
//			weChat:"",
//			province:"",
//			city:"",
//			district:"",
//			street:"",
//		},  
			
					// if(this.ruleForm.phone&&(!(/^1[34578]\d{9}$/.test(this.ruleForm.phone)))){
					// 	Message({
					// 		type: 'warning',
					// 		message:"请填写正确的手机号码"
					// 	});
					// 	return;
					// }
					// let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					// if(this.ruleForm.email&&(!myreg.test(this.ruleForm.email))){
					// 	Message({
					// 		type: 'warning',
					// 		message:"请填写正确的邮箱"
					// 	});
					// 	return;
					// }			
			var self = this;
 			this.$refs[formName].validate((valid) => {
 				if (valid) {
 													console.log(123);
 					self.loading = true;
					self.ruleForm.province = self.selectedOptions[0];
					self.ruleForm.city = self.selectedOptions[1];
					self.ruleForm.district = self.selectedOptions[2];		console.log(self.ruleForm);
			    	LF.net.getJSON("/merchant/contact/save",self.ruleForm,res=>{
			    		self.loading = false;
			  			if(res.code==='000'){
			  				self.districtList = res.data;
			  				self.district = self.ruleForm.district;
			  				Message({
								type: 'info',
								message:'保存成功'
							});
			  			}else{
			  				Message({
								type: 'warning',
								message:res.errorMessage
							});
						}
			  		},res=>{
			  			self.loading = false;
			  			Message({
							type: 'error',
							message:res.errorMessage
						});
			  		});
 				} else {
 					console.log('error submit!!');
 					return false;
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
		this.merchantId = LF.cookie.get("merchantId");
    	this.getProvince();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})