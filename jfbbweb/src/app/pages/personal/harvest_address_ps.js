//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem,Select,Option,Cascader,Form ,FormItem,Input,CheckboxGroup,Checkbox,Button,Message} from 'element-ui';
/*
 * 使用element-ui组件
 */
 Vue.use(Loading);
 Vue.use(Card);
 Vue.use(Carousel);
 Vue.use(CarouselItem);
 Vue.use(Select)
 Vue.use(Option)
 Vue.use(Cascader)
 Vue.use(Form)
 Vue.use(FormItem)
 Vue.use(Input)
 Vue.use(CheckboxGroup)
 Vue.use(Checkbox)
 Vue.use(Button)
 var vue= new Vue({
 	el: '#app',
 	data: {
 		isDefault:false,
 		tokenId:'',
 		parentId:'',
 		cascaderOptions: [],
 		selectedOptions:[],
 		id:'',
 		list:[],
 		totalCount:"",
 		totalCountOne:20,
 		listInfor:[],
 		ruleForm2: {
 			consigneeName:'',
 			mobilePhone:'',
 			telephone: '',
 			province: '',
 			city: '',
 			district:'',
 			detailAddr:'',
 			addrs:'',
 			defaultFlag:'',
 			id:'',
 		},
 		rules2: {
 			consigneeName:[
 			{ validator: function(rule, value, callback){

 				var _this= vue._data.ruleForm2 ;
					//console.log(_this.age.split(""))
					if (value === '') {
						callback(new Error('请输入名字'));
					} else{
						callback();
					}
				}, trigger: 'blur' }
				],
			mobilePhone:[
				{ validator: function(rule, value, callback){
					var _this= vue._data.ruleForm2 ;
					if (!value) {
						if(_this.telephone===''){
							return callback(new Error('手机号码和电话号码至少填写一个'));
						}else{
							callback();
						}
					}else{
						if (!/^[0-9]+$/.test(value)) {
							callback(new Error('请输入数字值'));
						} else {
							if ((/^1[34578]\d{9}$/.test(value))) {
								callback();
							} else {
								callback(new Error('请输入正确的手机号码'));
							}
						}
					}
				}, trigger: 'blur' }
				],
	        		telephone:[
	        			{ validator: function(rule, value, callback){
	        			var _this= vue._data.ruleForm2 ;
					if (!value) {
                        				if (_this.mobilePhone === '') {
                            					return callback(new Error('手机号码和电话号码至少填写一个'));
                        				} else {
                            					callback();
                        				}
                    				} else {
                        				if (!/^[0-9]+$/.test(value)) {
                            					callback(new Error('请输入数字值'));
                        				} else {
                            					if ( (/^[1-9]\d{6,7}$/.test(value)) || (/^1[34578]\d{9}$/.test(value))  ) {
                                					callback();
                            					} else {
                                					callback(new Error('请输入正确的手机号码'));
                            					}
                        				}
                    				}
				}, trigger: 'blur' }
			],
			detailAddr:[
				{ validator: function(rule, value, callback){
					var _this= vue._data.ruleForm2 ;
					//console.log(_this.age.split(""))
					if (value.length <6) {
						callback(new Error('请输入正确的街道地址'));
					} else{
						callback();
					}
				}, trigger: 'blur' }
				],
			}
		},
		methods: {
			goLogin:function(){
				if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
					LF.window.openWindow("/app/login.html","_self");
				}
			},
			handleChange(value) {
				console.log(value);
				var _this= vue._data.ruleForm2 ;
				_this.province=value[0];
				_this.city=value[1];
				_this.district=value[2];
			},
      /**
       * 加载三级数据
       */
       cascaderSetdateList:function(pid){
       	var self =this;
       	LF.net.getJSON("sys/area/list", {}, function(res) {
       		if(res.code==='000'){
       			var list=[];
       			for(var i=0;i<res.data.length;i++){
       				if(res.data[i].type==2){
       					list.push({value:res.data[i].id,label:res.data[i].name,children:[]});
							//cascaderOptions.push({value:res.data.id,label:res.data.name,children:[]});
						}
					}
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].type==3){
							for(var j=0;j<list.length;j++){
								if(res.data[i].parentId==list[j].value){
									list[j].children.push({value:res.data[i].id,label:res.data[i].name,children:[]})
								}
							}
						}
					}
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].type==4){
							for(var j=0;j<list.length;j++){
								for(var k=0;k<list[j].children.length;k++){
									if(res.data[i].parentId==list[j].children[k].value){
										list[j].children[k].children.push({value:res.data[i].id,label:res.data[i].name})
									}
								}

							}
						}
					}
					self.cascaderOptions=list;
				}else{
					Message({
						type: 'error',
						message:res.errorMessage
					});
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
			});
       },
       submitForm(formName) {
       	var self = this;
       	console.log(this.$refs);
       	var _this =vue._data.ruleForm2;
       	this.$refs[formName].validate((valid) => {
       		console.log(valid);
       		if (valid) {
       			var formData = JSON.stringify(this.ruleForm2);
       			var obj = JSON.parse(formData);
       			/*_this.telephone=_this.telPhoneOne;
       			_this.telephone+=_this.telPhoneTwo;
       			_this.telephone+=_this.telPhoneThree;*/
       			//obj["telephone"]=_this.telephone;
       			if(obj.defaultFlag){
       				obj["defaultFlag"]=1;
       			}else{
       				obj["defaultFlag"]=0;
       			}
       			if(vue._data.ruleForm2.id!==''&&vue._data.ruleForm2.id!==null&&vue._data.ruleForm2.id!==undefined ){
       				self.eitorAddress(obj);
       			}else{
       				self.testajax(obj);
       			}

       		} else {
       			console.log('error submit!!');
       			return false;
       		}
       	});
       },
       testajax: function(obj) {

			var self = this;//这样在function中用过self调用vue的this对象。
			console.log(obj.type)
			LF.net.getJSON("member/consignee/addr/add", obj, function(res) {
				if(res.code==='000'){
					self.onAddress();
					Message({
		 				type: 'info',
		 				message:"保存收货地址成功",
		 				onClose:function(){
							LF.window.openWindow("/app/pages/personal/harvest_address_ps.html","_self");
		 				}
		 			});

					/*//LF.window.openWindow("/app/pages/personal/harvest_address.html","_self");*/
				}else{
					Message({
						type: 'error',
						message:res.errorMessage
					});
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
			});
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解

		},
		/*
		 * 获取地址列表
		 */
		 onAddress: function() {
		 	var self = this;
		 	self.totalCountOne=20;
		 	LF.net.getJSON("member/consignee/addr/list", null, function(res) {
		 		if(res.code==='000'){
		 			self.list= res.data.list;
		 			self.totalCount= res.data.totalCount;
		 			self.totalCountOne=self.totalCountOne-self.totalCount;
		 			console.log(self.list.totalCount)
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
		/*
		 * 删除地址
		 */
		 removeAddress: function(Id) {
		 	var self = this;
		 	self.totalCountOne=20;
		 	LF.net.getJSON("member/consignee/addr/del", {id:Id}, function(res) {
		 		if(res.code==='000'){
		 			self.onAddress();
		 			Message({
		 				type: 'info',
		 				message:"删除成功"
		 			});
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
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解

		},
		/*
		 * 修改地址
		 */
		 eitorAddress:function(obj) {
		 	var self = this;
		 	self.totalCountOne=20;
		 	LF.net.getJSON("member/consignee/addr/update", obj, function(res) {
		 		if(res.code==='000'){
		 			Message({
		 				type: 'info',
		 				message:"修改收货地址成功"
		 			});
		 			LF.window.openWindow("/app/pages/personal/harvest_address_ps.html","_self");
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
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解

		},
		edtorAddress:function(Id){
			var self =this;
			this.list.forEach(function(value, index, array) {
				if(array[index].id==Id){
					self.listInfor=array[index];
					var _this= vue._data.ruleForm2;
					_this.consigneeName=self.listInfor.consigneeName;
					_this.id=self.listInfor.id;
					var mobilePhone= self.listInfor.mobilePhone;
					var telephone= self.listInfor.telephone;
					_this.province=self.listInfor.province;
					_this.city=self.listInfor.city;
					_this.district=self.listInfor.district;
					self.selectedOptions=[self.listInfor.province,self.listInfor.city,self.listInfor.district];
					_this.mobilePhone=mobilePhone;
					_this.telephone=telephone;
					  /*	 province
					  	 city
					  	 district*/
					  	 _this.detailAddr=self.listInfor.detailAddr;
					  	 _this.defaultFlag=self.listInfor.defaultFlag;
					  	 if(_this.defaultFlag=='1'){
					  	 	_this.isDefalut=true;
					  	 }
					  	}
					  });
			if(window.scrollTo){
				window.scrollTo(0,100);
			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	},
	/*
     *组件挂在完成响应
     */
     mounted(){
     	this.goLogin();
     	this.onAddress();
     	this.cascaderSetdateList(null);
     	self= this;
     	/*this.cascaderSetdate(self.cascaderOptions,"0");*/
     },
     components: {
     	LfHead,
     	LfLeft,
     	LfFooter
     }
 })