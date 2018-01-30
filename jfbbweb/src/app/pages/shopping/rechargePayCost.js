/**
 *
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import hex_md5 from './../../../js/framework/md5.js';
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import {
	Card,
	Loading,
	Carousel,
	CarouselItem,
	Switch,
	Dialog,
	Form,
	FormItem,
	Input,
	Select,
	Option,
	RadioGroup,
	Radio,
	CheckboxGroup,
	Checkbox,
	Button,
	Message
} from 'element-ui';
/*
 * 使用element-ui组件
 */
 Vue.use(Loading);
 Vue.use(Card);
 Vue.use(Carousel);
 Vue.use(CarouselItem);
 Vue.use(Switch);
 Vue.use(Dialog);
 Vue.use(Form)
 Vue.use(FormItem)
 Vue.use(Input)
 Vue.use(Option)
 Vue.use(RadioGroup)
 Vue.use(Radio)
 Vue.use(CheckboxGroup)
 Vue.use(Checkbox)
 Vue.use(Select)
 Vue.use(Button)
var finalBlanceCurr = 0;
var finalKangCurr = 0;
var vue = new Vue({
 	el: "#app",
 	data: {
 		orderinfo: '',
 		payMethod: '',
 		useBalance: false,
 		useKangarooCurrency: false,
 		balanceAmount: 0,
 		rooCur: 0,
 		payPassword: '',
 		isPayPassword : 1,
 		needPayAmount : 0,
 		payDialog : false,
 		dialogTitle:"确认支付",
 		balance: '',
 		kangarooCurrency: '',
 		setPassword: {
 			account:'',
 			passwordConfirm: '',
 			password: '',
 			securityCode:'',
 		},
 		phone:'',
 		codeDesc:"发送验证码",
		isLogin:1,
 		rulesPassword: {
 			password: [
 			{
 				validator: function(rule, value, callback){
 					if (value === '') {
 						callback(new Error('请输入支付密码'));
 					} else {
 						callback();
 					}
 				}, trigger: 'blur' }
 				],
 				passwordConfirm: [
 				{ validator: function(rule, value, callback){
 					var _this = vue._data.setPassword ;
 					if (value === '') {
 						callback(new Error('请再次输入支付密码'));
 					} else if (value !== _this.password) {
 						callback(new Error('两次输入支付密码不一致!'));
 					} else {
 						callback();
 					}
 				}, trigger: 'blur' }
 				],
 				account: [
 				{
 					validator: function(rule, value, callback){
 						if (!value) {
 							return callback(new Error('手机号码不能为空'));
 						}
 						setTimeout(() => {
 							if (!/^[0-9]+$/.test(value)) {
 								callback(new Error('请输入数字值'));
 							} else {
 								if ((/^1[34578]\d{9}$/.test(value))) {
 									callback();

 								} else {
 									callback(new Error('请输入正确的手机号码'));
 								}
 							}
 						}, 100);
 					}, trigger: 'blur' }
 					],
 					securityCode:[
 					{
 						validator: function(rule, value, callback){
 							var _this= vue._data.setPassword ;
 							if (value === '') {
 								callback(new Error('请输入验证码'));
 							} else if(/^[0-9]{4,6}$/.test(value)){
 								callback();
 							}else{
 								callback(new Error('格式不正确'));
 							}
 						}, trigger: 'blur' }
 						]
 					},
 					payShow: {
 						wx: true,
 						wxurl: ''
 					},
 					load: false
 				},
 				methods: {
 					go(url, target = "_self") {
 						LF.window.openWindow(url, target);
 					},
 					getUserInfo:function(){
 			//integral/user/info
 			var _this = this;
 			LF.net.getJSON("integral/user/info", {}, res => {
 				if (res.code == "000") {
 					_this.isPayPassword = res.data.isPayPassword;
 					_this.dialogTitle = (_this.isPayPassword == 1 ? "确认支付":"设置支付密码");
 				}
 			},res=>{
 				Message({
 					type: 'error',
 					message: "请求失败！"
 				});
 			});
 		},
 		setPayVal: function(type){
 			var _this = this;
 			//type:1 余额支付
 			//type:2 袋鼠币支付
 			var totAmount = Number(_this.orderinfo.totalAmount) - (Number(_this.balanceAmount) + Number(_this.rooCur));
 			var _amount = 0;
 			if(type == 1){
 				if(_this.useBalance){
 					if(_this.balance > totAmount){
 						_this.balanceAmount = totAmount;
 						_this.balance = _this.balance - _this.balanceAmount;
 					}else{
 						_this.balanceAmount = _this.balance;
 						_this.balance = 0;
 					}
 				}else{
 					_this.balanceAmount = 0;
 					_this.balance = finalBlanceCurr;
 				}
 			}
 			//if(_this.useBalance){}
 			if(type == 2){
 				if(_this.useKangarooCurrency){
 					if(_this.kangarooCurrency > totAmount){
 						_this.rooCur = totAmount;
 						_this.kangarooCurrency = _this.kangarooCurrency - _this.rooCur;
 					}else{
 						_this.rooCur = _this.kangarooCurrency;
 						_this.kangarooCurrency = 0;
 					}
 				}else{
 					_this.rooCur = 0;
 					_this.kangarooCurrency = finalKangCurr;
 				}
 			}
 			_this.needPayAmount = Number(_this.orderinfo.totalAmount) - (Number(_this.balanceAmount) + Number(_this.rooCur));
 		},
 		confirmPay:function(type){
 			var _this = this;
 			//type : 1   页面上的支付
 			//type: 2    弹层上的支付
 			//var payAmount = Number(_this.orderinfo.totalAmount) - (Number(_this.balanceAmount) + Number(_this.rooCur));
 			if(_this.payMethod == "" && _this.needPayAmount>0){
 				Message({
 					type:"info",
 					message:"应付金额不足，请选择微信或者支付宝支付"
 				});
 				return;
 			}
 			if(type == 1){
	 			if( (!_this.useBalance && !_this.useKangarooCurrency) || ( (Number(_this.balanceAmount) + Number(_this.rooCur)))==0 ){
	 				_this.paypay();
	 			}else{
	 				_this.payDialog = true;
	 			}
 			}else if(type == 2){
 				var _this = this;
				LF.net.getJSON("integral/pay/password/verify", {tokenId:LF.cookie.get("tokenId"),"payPassword":hex_md5(_this.payPassword)}, res => {
					if(res.code === "000"){
						_this.payDialog = false;
						_this.paypay();
					}else{
						Message({
							type: 'warning',
							message: "密码校验不通过"
						});
					}
				},res=>{
					Message({
							type: 'warning',
							message: "请求失败"
						});
				});
 			}
 		},
		/**
		 * 支付方式
		 */
		 paypay: function() {
		 	var _this = this;
		 	var param = {
		 		recordNo: _this.orderinfo.recordNo,
		 		payMethod: _this.payMethod,
				payAmount: _this.orderinfo.payAmount,
				balanceAmount: 0,
				rooCur: 0,
				payPassword: hex_md5(_this.payPassword)
			}
			if (_this.useBalance) {
				//使用余额支付  必须要填写余额 和密码
				//param['useBalance'] = 0;
				if (_this.balanceAmount == "") {
					param['balanceAmount'] = 0;
				} else {
					param['balanceAmount'] = Number(_this.balanceAmount);
				}
				if (_this.payPassword == '' &&  param['balanceAmount'] >0) {
					Message({
						type: 'warning',
						message: "请输入支付密码"
					});
					return;
				} else {
					param['payPassword'] = hex_md5(_this.payPassword);
				}
			}
			if (_this.useKangarooCurrency) {
				param['useBalance'] = 0;
				if (_this.rooCur == "") {
					param['rooCur'] = 0;
				} else {
					param['rooCur'] = Number(_this.rooCur);
				}
				if (_this.payPassword == '' && param['rooCur']>0 ) {
					Message({
						type: 'warning',
						message: "请输入支付密码"
					});
					return;
				} else {
					param['payPassword'] = hex_md5(_this.payPassword);
				}
			}
			if( (_this.useBalance && param['balanceAmount']>0) ){
				param['useBalance'] = 0;
			}else{
				param['useBalance'] = 1;
			}
			if (_this.payMethod == '' && !_this.useBalance && !_this.useKangarooCurrency) {
				Message({
					type: 'warning',
					message: "请选择支付方式"
				});
			} else if (_this.payMethod == '' && param.payAmount > _this.rooCur && _this.useKangarooCurrency && !_this.useBalance) {
				Message({
					type: 'warning',
					message: "袋鼠币不足"
				});
			} else if (_this.payMethod == '' && param.payAmount > _this.balanceAmount && _this.useBalance && !_this.useKangarooCurrency) {
				Message({
					type: 'warning',
					message: "余额不足"
				});
			} else if (_this.payMethod == '' && param.payAmount > (_this.balanceAmount + _this.rooCur) && _this.useBalance && _this.useKangarooCurrency) {
				Message({
					type: 'warning',
					message: "支付金额不足"
				});
			} else {
				if (_this.payMethod == '') {
					_this.payMethod = 3;
					param['payMethod'] = 3;
				}
				param['payAmount'] = Number(_this.orderinfo.totalAmount) - (Number(_this.balanceAmount) + Number(_this.rooCur));
				// param['payAmount'] = Number( (param['payAmount']).toFixed(2) );
				// if (param['payAmount'] > 0) {
				// 	param['payAmount'] = 0.01;
				// }

				LF.net.getJSON("/integral/pay", param, res => {
					if (res.code == "000") {
						if (_this.payMethod == 1) {
							if (param['payAmount'] > 0) {
								//微信支付
								_this.payShow.wx = false;
								_this.payShow.wxurl = res.data.imageUrl;
								_this.getPayResult(res.data.recordNo, 1);
							} else {
								Message({
									type: 'success',
									message: "支付成功,页面跳转中...",
									onClose: function() {
										//LF.window.openWindow();
										document.getElementById("goOrderInfo").click();
									}
								});
							}

						} else if (_this.payMethod == 2) {
							//支付宝
							_this.load = true;
							var myWindow = window.open();
							if (myWindow == null) {
								Message({
									type: 'warning',
									message: "请允许浏览器弹窗，刷新页面重试"
								});
							} else {
								myWindow.document.write(res.data.htmlText);
								_this.getPayResult(res.data.recordNo, 2);
							}

							//							document.write(res.data.htmlText);
							///window.document.body=res.data.htmlText;
							//		    				LF.window.openWindow("/app/pages/shopping/zfb.html?ps='"++"'");
						} else if (_this.payMethod == 3) {
							Message({
								type: 'success',
								message: "支付成功,页面跳转中...",
								onClose: function() {
									//_this.go("/app/pages/personal/my_orderdetails_ps.html?orderId="+_this.orderinfo.id,"goOrderInfo");
									//LF.window.openWindow("/app/pages/personal/my_orderdetails_ps.html?orderId="+_this.orderinfo.id);
                                    LF.window.openWindow("/app/pages/personal/payRechargeSuccess.html", "_self");
								}
							});
						}
					} else {
						Message({
							type: "info",
							message: res.errorMessage
						});
					}
				}, res => {
					console.log("error：" + JSON.stringify(res));
					Message({
						type: 'error',
						message: JSON.stringify(res)
					});
				});
			}
		},
		/**
		 * 是否使用余额支付
		 */
		 changebalan: function() {
		 	var _this = this;
		 	if(_this.balanceAmount>0){
		 		_this.useBalance = true;
		 		_this.balance = finalBlanceCurr;
		 		if(_this.balance < _this.balanceAmount){
		 			_this.balanceAmount = _this.balance;
		 		}else{
		 			_this.balance = finalBlanceCurr - _this.balanceAmount;
		 		}
		 		if((Number(_this.balanceAmount) + Number(_this.rooCur)) > Number(_this.orderinfo.totalAmount)){
		 			_this.balanceAmount = Number(_this.orderinfo.totalAmount) - Number(_this.rooCur);
		 		}
		 	}else{
		 		_this.useBalance = false;
		 	}
		 	_this.needPayAmount = Number(_this.orderinfo.totalAmount) - (Number(_this.balanceAmount) + Number(_this.rooCur));
		 	_this.needPayAmount = Number( (_this.needPayAmount).toFixed(2) );
		 },
		 changeKangarooCurrency: function() {
		 	var _this = this;
		 	if(_this.rooCur>0){
		 		_this.useKangarooCurrency = true;
		 		_this.kangarooCurrency = finalKangCurr;
		 		if(_this.kangarooCurrency < _this.rooCur){
		 			_this.rooCur = _this.kangarooCurrency;
		 		}else{
		 			_this.kangarooCurrency = finalKangCurr - _this.rooCur;
		 		}
		 		if((Number(_this.balanceAmount) + Number(_this.rooCur)) > Number(_this.orderinfo.totalAmount)){
		 			_this.rooCur = Number(_this.orderinfo.totalAmount) - Number(_this.balanceAmount);
		 		}
		 	}else{
		 		_this.useKangarooCurrency = false;
		 	}
		 	_this.needPayAmount = Number(_this.orderinfo.totalAmount) - (Number(_this.balanceAmount) + Number(_this.rooCur));
		 	_this.needPayAmount = Number( (_this.needPayAmount).toFixed(2) );
		 },
		 selectBalanPay: function() {
		 	if (!this.useBalance) {
		 		this.balanceAmount = 0;
		 		if (!this.useKangarooCurrency) {
		 			this.rooCur = 0;
		 			this.payPassword = '';

		 		}
		 	}
		 },
		 selectRooCurPay: function() {
		 	if (!this.useKangarooCurrency) {
		 		this.rooCur = 0;
		 		if (!this.useBalance) {
		 			this.balanceAmount = 0;
		 			this.payPassword = '';
		 		}
		 	}
		 },
		 prefixPhone:function () {
		 	var ph=LF.cookie.get("account");
		 	this.phone=ph.substr(0,3)+"****"+ph.substr(7);
		 },
		 getyzm:function(){
		 	var _this= this;
		 	LF.net.getJSON("/integral/sms/send", {tokenId:LF.cookie.get("tokenId"),type:4,phone:LF.cookie.get("account")}, function(res) {
		 		if(res.code==='000'){
		 			_this.codeDesc= 60;
		 			_this.sou=false;
		 			var my_interval = setInterval(function () {
		 				if (_this.codeDesc>=1) {
		 					_this.codeDesc-=1;
		 				} else {
		 					_this.sou=true;
		 					_this.codeDesc="验证码";
		 					clearInterval(my_interval);
		 				}
		 			}, 1000);
		 			Message({
		 				type: 'info',
		 				message:"已发送验证码"
		 			});
		 		}else{
		 			_this.sou=true;
		 			Message({
		 				type: 'error',
		 				message:res.errorMessage
		 			});
		 		}
		 	})
		 },
		//支付密码设置提交
		submitForm(formName) {
			var self = this;;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var formData = JSON.stringify(this.setPassword);
					var obj = JSON.parse(formData);
					obj["password"]=hex_md5(obj.password);
					obj["passwordConfirm"]=hex_md5(obj.passwordConfirm);
					obj["account"]=LF.cookie.get("account");
					obj["securityCode"]=obj.securityCode;
					self.submitAjax(obj);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		submitAjax: function(obj) {
            var self = this;//这样在function中用过self调用vue的this对象。
            LF.net.getJSON("/integral/user/pay/password/edit", obj, function(res) {
            	if(res.code==='000'){
            		//self.go("/app/pages/personal/payPasswordSuc_ps.html");
            		//window.location.reload();
            		self.getUserInfo();
            	}else{
            		Message({
            			type: 'warning',
            			message:res.errorMessage
            		});
            	}
            }, function(res) {
            	console.log("error：" + JSON.stringify(res));
            });
        },
		/**
		 * 获取支付  状态
		 * @param {Object} record
		 * @param {Object} type
		 */
		 getPayResult: function(record, type) {
		 	var _this = this;
		 	var param = LF.window.getParams();
		 	var t = setInterval(function() {
		 		LF.net.getJSON("/integral/paymentStatus", {
		 			recordNo: record,
		 			payMethod: type
		 		}, res => {
		 			if (res.code == "000") {
		 				if (res.data.payStatus) {
		 					clearInterval(t);
		 					Message({
		 						type: 'success',
		 						message: "支付成功"
		 					});
		 					LF.window.openWindow("/app/pages/personal/payRechargeSuccess.html", "_self");
		 				}
		 			} else {
		 				clearInterval(t);
		 				Message({
		 					type: 'error',
		 					message: "支付失败"
		 				});
		 			}
		 		}, res => {
		 			clearInterval(t);
		 			console.log("error：" + JSON.stringify(res));
		 			Message({
		 				type: 'error',
		 				message: JSON.stringify(res)
		 			});
		 		});

		 	}, 2000);
		 }
		},
	/**
	 * 完成之后响应  初始化
	 */
	 mounted() {
	 	var param = LF.window.getParams();
	 	var _this = this;
	 	if (param == null) {
			//404
		} else {
			var orderinfo = {};
			orderinfo.payAmount = param.amount;
			orderinfo.totalAmount = param.amount;
			orderinfo.needPayAmount = param.amount;
			orderinfo.recordNo = param.recordNo;
			_this.orderinfo = orderinfo;
			console.log(_this.orderinfo);
			_this.needPayAmount = param.amount;
			if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
				//未登陆
				_this.isLogin = 1;
			}else{
				_this.isLogin = 2;
				LF.net.getJSON("/member/main", {}, res => {
					if (res.code == "000") {
						_this.balance = res.data.cashBalance;
						finalBlanceCurr = res.data.cashBalance;
						_this.kangarooCurrency = res.data.rooCur;
						finalKangCurr = res.data.rooCur;
						console.log(res.data);
					}
				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		}
		_this.prefixPhone();
		_this.getUserInfo();
	},

	components: {
		LfHeader,
		LfFooter
	}
})