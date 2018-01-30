//工程js框架
// import LF from 'LF';
import LF from 'LF';
import Vue from 'vue';
import * as config from '../../../js/framework/define';
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';

//引入公共的header和footer
/*import LfHeader from './../components/header_new.vue';
import LfFooter from './../components/footer.vue';*/

/*import Vue from 'vue'*/
import { RadioGroup, Radio, Button, Select, Option, Cascader, Card, Loading, Upload, Carousel, CarouselItem, Steps, Step, Tabs, TabPane, Table, TableColumn, Pagination, Row, Col, Form, FormItem, Input, CheckboxGroup, Checkbox, TimePicker, DatePicker,Message } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(Row)
Vue.use(Col)

Vue.use(Upload)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(RadioGroup)
Vue.use(Radio)

Vue.use(CheckboxGroup)
Vue.use(Checkbox)

Vue.use(TimePicker)
Vue.use(DatePicker)

var vue = new Vue({
	el: '#app',
	data: {
		backgroundImg: '',
		active: 0,
		imageUrl: '',
		phone: '',
		tokenId: '',
		doorNumber: '',
		doorName: '',
		srcA: '../../../images/upload1.png',
		srcB: '../../../images/upload1.png',
		idCardA: '',
		idCardB: '',
		bizLicUrl: '',
		manageTypeList: [], //经营类型
		shopNames: '', //商铺名称
		operatorName: '',
		bizLicNo: '',
		manageLocation: '',
		bizLicRange: '',
		cascaderOptions: [],
		selectedOptions: [],
		areaList:[],
		flag: false,
		isSend: false,
		isOk: false,
		countdown:60,
		sendSmsTxt:'获取验证码',
		isDisabled:false,
		ruleForm2: {
			phone: '',
			securityCode: '',
			shopName: '',
			province: '',
			city: '',
			district: '',
			street: '',
			manageType: [],
			//phyShopName:'',
			//bizLicNo: '',
			//selfEmployedName: '',
			//applyIdCard: '',
		},
		rules2: { //rules2下面的都是用来做表单校验
			phone: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error('手机号码不能为空'));
					}
					if((/^1[34578]\d{9}$/.test(value))) {
						callback();

					} else {
						callback(new Error('请输入正确的手机号码'));
					}
				},
				trigger: 'blur'
			}],
			securityCode: [{
				validator: function(rule, value, callback) {
					var _this = vue._data.ruleForm2;
					var self = vue._data;
					if(!value) {
						callback(new Error('请输入验证码'));
					} else {
						if(!this.isOk) {
							if(_this.phone == '') {
								callback(new Error("请输入手机号码"));
								return;
							}
							else{
                                						callback();
							}
						} else {
							callback();
						}
					}
				},
				trigger: 'blur'
			}],
			shopName: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error('店铺名称不能为空'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],
			street: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error('街道不能为空'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}]
			/*phyShopName: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error("公司名称不能为空"));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],
			bizLicNo: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error('营业执照注册号不能为空'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],
			selfEmployedName: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error('法人姓名不能为空'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],
			applyIdCard: [{
				validator: function(rule, value, callback) {
					if(!value) {
						return callback(new Error('法人证件号码不能为空'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],*/
		}

	},
	methods: {
		onclickIdCardA: function() {
			var fileEl = this.$el.querySelector('input[id="cardfileA"]');
			console.log(this.$el.querySelector('input[id="cardfileA"]'));
			var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
			if(ie) {
				fileEl.click();
			} else {
				var a = document.createEvent("MouseEvents"); //FF的处理 
				a.initEvent("click", true, true);
				fileEl.dispatchEvent(a);
			}
		},
		onclickIdCardB: function() {
			var fileEl = this.$el.querySelector('input[id="cardfileB"]');
			console.log(this.$el.querySelector('input[id="cardfileB"]'));
			var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
			if(ie) {
				fileEl.click();
			} else {
				var a = document.createEvent("MouseEvents"); //FF的处理 
				a.initEvent("click", true, true);
				fileEl.dispatchEvent(a);
			}
		},
		onclickBizLic: function() {
			document.getElementById("bizLicFile").click();
		},
		uploadBizLic: function(event) {
			var self = this;
			var files = event.target.files || e.dataTransfer.files;
			var file = files[0];
            //文件路径，可以用于判断文件类型
            var filepath = event.target.value;
            var filetype = filepath.substring(filepath.lastIndexOf(".")+1).toLowerCase();
			console.log(filetype);
			const isJPG = filetype === 'jpeg' || filetype === 'jpg';
			const isPNG = filetype === 'png';
			const isBMP = filetype === 'bmp';
			const isLt2M = file.size / 1024 /1024 < 2;

			if(!isJPG && !isPNG && !isBMP) {
                Message({
                    type: 'warning',
                    message:"上传图片只能是 jpg/png/bmp 格式"
                });
				return false;
			}
			if(!isLt2M) {
                Message({
                    type: 'warning',
                    message:"上传图片大小不能超过 2MB"
                });
				return false;
			}
			
			var params=[
	            {
	           		"file_name":"filename",
	           		"file":file
	            }
            ];
			if(file) {
				LF.net.upload("/integral/image/upload?imageType=6", params, function(res) {
					self.bizLicUrl = res.data;
					console.log(res.data)
				}, function(res) {
					console.log("error", res);
				});
			} else {
				self.backgroundImg = "";
			}
		},
		uploadIdCardA: function(event) {
			var self = this;
			var files = event.target.files || e.dataTransfer.files;
			var file = files[0];
            //文件路径，可以用于判断文件类型
            var filepath = event.target.value;
            var filetype = filepath.substring(filepath.lastIndexOf(".")+1).toLowerCase();
			console.log(filetype);
			const isJPG = filetype === 'jpeg' || filetype === 'jpg';
			const isPNG = filetype === 'png';
			const isBMP = filetype === 'bmp';
			const isLt2M = file.size / 1024 /1024 < 2;

			if(!isJPG && !isPNG && !isBMP) {
                Message({
                    type: 'warning',
                    message:"上传图片只能是 jpg/png/bmp 格式"
                });
				return false;
			}
			if(!isLt2M) {
                Message({
                    type: 'warning',
                    message:"上传图片大小不能超过 2MB"
                });
				return false;
			}
			
			var params=[
	            {
	           		"file_name":"filename",
	           		"file":file
	            }
            ];
			if(file) {
				LF.net.upload("/integral/image/upload?imageType=6", params, function(res) {
					self.idCardA = res.data;
					console.log(res.data)
				}, function(res) {
					console.log("error", res);
				});
			} else {
				self.backgroundImg = "";
			}
		},
		uploadIdCardB: function(event) {
			var self = this;
			var files = event.target.files || e.dataTransfer.files;
			var file = files[0];
            //文件路径，可以用于判断文件类型
            var filepath = event.target.value;
            var filetype = filepath.substring(filepath.lastIndexOf(".")+1).toLowerCase();
			console.log(filetype);
			const isJPG = filetype === 'jpeg' || filetype === 'jpg';
			const isPNG = filetype === 'png';
			const isBMP = filetype === 'bmp';
			const isLt2M = file.size / 1024 /1024 < 2;

			if(!isJPG && !isPNG && !isBMP) {
                Message({
                    type: 'warning',
                    message:"上传图片只能是 jpg/png/bmp 格式"
                });
				return false;
			}
			if(!isLt2M) {
                Message({
                    type: 'warning',
                    message:"上传图片大小不能超过 2MB"
                });
				return false;
			}
			
			var params=[
	            {
	           		"file_name":"filename",
	           		"file":file
	            }
            ];
			if(file) {
				LF.net.upload("/integral/image/upload?imageType=6", params, function(res) {
					self.idCardB = res.data;
					console.log(res.data)
				}, function(res) {
					console.log("error", res);
				});
			} else {
				self.backgroundImg = "";
			}
		},
		handleChange(value) {
			console.log(value[0]);
			var _this = vue._data.ruleForm2;
			_this.province = value[0];
			_this.city = value[1];
			_this.district = value[2];
		},
		sendSms() {
			if(this.ruleForm2.phone == '') {
				return;
			}
			self = this;
			LF.net.getJSON("/integral/sms/send", {type:7,phone:this.ruleForm2.phone}, function(res) {
				if(res.code === '000') {
					self.settime();
				} else {
					self.isSend = false;
				}
			})
		},
		getProvince(){
			let params = {
				parentId:""
	    	};
	    	LF.net.getJSON("/sys/area/list",params,res=>{
	  			if(res.code==='000'){
	  				this.areaList = res.data;
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					this.ruleForm2.province = this.selectedOptions[0];
					this.ruleForm2.city = this.selectedOptions[1];
					this.ruleForm2.district = this.selectedOptions[2];
					
					var formData = JSON.stringify(this.ruleForm2);
					var obj = JSON.parse(formData);

					if(!obj["district"]) {
                        Message({
                            type: 'error',
                            message:"请选择地址"
                        });
						return;
					}
					if(obj["manageType"].length == 0) {
                        Message({
                            type: 'error',
                            message:"请选择经营类型"
                        });
						return;
					}
					
					/*if(!this.idCardA || !this.idCardB) {
                        Message({
                            type: 'error',
                            message:"请上传身份证附件"
                        });
						return;
					}*/
				/*	if(!this.bizLicUrl) {
                        Message({
                            type: 'error',
                            message:"请上传营业执照附件"
                        });
						return;
					}*/
					
					if(!this.flag) {
                        Message({
                            type: 'error',
                            message:"请阅读袋鼠集市合作协议"
                        });
						return;
					}
					
					obj["applyAccount"] = obj["phone"];
					obj["bizLicUrl"] = this.bizLicUrl;
					obj["idCardUrls"] = this.idCardA;
					obj["idCardUrls"] += ";";
					obj["idCardUrls"] += this.idCardB;
					if(obj["manageType"].length > 0) {
						var manan = "";
						obj["manageType"].forEach(function(value, index, array) {
							if(array[index] != null) {
								manan += array[index] + "|";
							}
						});
						if(manan != undefined) {
							var newstr = manan.substring(0, manan.length - 1);
							console.log(manan)
							obj["manageType"] = newstr;
						}

					} else {
						obj["manageType"] = '';
					}
					this.submitAjax(obj);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		submitAjax: function(obj) {

			var self = this; //这样在function中用过self调用vue的this对象。
			console.log(obj.type)
			LF.net.getJSON("website/seller/apply", obj, function(res) {
				if(res.code === '000') {
					LF.window.openWindow("/app/pages/information/applyMessage.html", "_self");
				} else {
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
		settime() {
			self = this;
			if(this.countdown == 0) {
				this.isDisabled = false;
				this.sendSmsTxt = "获取验证码";
				this.countdown = 60;
				return;
			} else {
				this.isDisabled = true;
				this.sendSmsTxt = "重新发送(" + this.countdown + ")";
				this.countdown--;
			}
			setTimeout(function() {
				self.settime();
			}, 1000);
		},
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
		getMT(){
			let params = {
				type:"manage_type"
	    	};
	    	LF.net.getJSON("/sys/dict/get",params,res=>{
	  			if(res.code==='000'){
	  				this.manageTypeList = res.data;
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
	},

	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		var self = this; //这样在function中用过self调用vue的this对象。
		self.getMT();
		self.getProvince();
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
	components: {
		LfFooter
	},

})

/*new Vue({
  el :'#phone',
  data
})*/