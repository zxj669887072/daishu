//工程js框架
import LF from 'LF';
import Vue from 'vue';
import * as config from '../../../js/framework/define';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Select,Option,Carousel, Pagination,Form,FormItem,Input,Button,CarouselItem,Message,MessageBox } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Select)
Vue.use(Option)

Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

Vue.use(Pagination);

var vue = new Vue({
	el: '#app',
	data: {
		pager: {
			size: 5,
			curpage: 1,
			total: 0
		},
		value:'',
		willshow:false,
		selected:"",
		bankList:[],		
		backgroundImg: '',
		banlanceAmount: 0,
		withdrawalRecordList: [],
		idCardA: '',
		idCardB: '',
		bankCard: '',
		withdrawLists: [],
		withdrawListsIsNull: false,
		srcA: '../../../images/upload1.png',
		srcB: '../../../images/upload1.png',
		ruleForm2: {
			amount: '',
			bankAccount: '',
			bankName: '',
			accountName: '',
			bankkey:''
		},
		rules: {
			amount: [{
				validator: function(rule, value, callback) {
					if(value === '') {
						return callback(new Error('请输入提现金额!'));
					};					
					
					setTimeout(() => {
						if(!/^\d+(.\d{1,2})?$/.test(value) || value == 0) {
							callback(new Error('请输入正确的数字(最多2位小数)!'));
						} else {
							if(parseFloat(value) > parseFloat(vue._data.banlanceAmount)) {
								callback(new Error('提现额度不能大于余额!'));
							} else {
								callback();
							}
						}
					}, 100);
				},
				trigger: 'blur'
			}],
			bankAccount: [{
				validator: function(rule, value, callback) {
					if(value === '') {console.log(this);
						return callback(new Error('请输入银行账号!'));
					}					
					setTimeout(() => {
						if(!/^[0-9]+$/.test(value)) {
							callback(new Error('请输入数字值!'));
						} else {
							if((/^([1-9]{1})(\d{15}|\d{18})$/.test(value))) {
								callback();
							} else {
								callback(new Error('请输入正确的银行账号!'));
							}
						}
					}, 100);
				},
				trigger: 'blur'
			}],			
			bankName: [{
				validator: function(rule, value, callback) {
					if(value === '') {
						callback(new Error('请输入开户行!'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],
			accountName: [{
				validator: function(rule, value, callback) {
					if(value === '') {
						callback(new Error('请输入账户姓名!'));
					} else {
						callback();
					}
				},
				trigger: 'blur'
			}],
		}
	},
	methods: {
		goLogin: function() {
			if(LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
				LF.window.openWindow("/app/login.html", "_self");
			}
		},
		withdrawalRecordFun: function() {
			LF.net.getJSON("/member/cash/withdraw/list", {}, res => {
				if(res.code == "000") {
					this.withdrawalRecordList = res.data;
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		
		submitAjax: function(obj) {
			var self = this; //这样在function中用过self调用vue的this对象。
			LF.net.getJSON("/member/cash/apply", obj, function(res) {
				if(res.code === '000') {
					self.go("/app/pages/personal/withdrawSuc_ps.html");
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
			});
		},
		go(url) {
			LF.window.openWindow(url, "_self");
		},
		withdrawList: function() {
			LF.net.getJSON("/member/cash/withdraw/list", { pageSize: this.pager.size, pageNo: this.pager.curpage }, res => {
				if(res.code == "000") {console.log(res.data);
					this.withdrawLists = res.data.list;
					this.pager.total = res.data.totalCount;
					for(var i = 0; i < this.withdrawLists.length; i++) {
						if(this.withdrawLists[i].applyStatus == 1) {
							this.withdrawLists[i].applyStatus = "待审核";
						} else if(this.withdrawLists[i].applyStatus == 2) {
							this.withdrawLists[i].applyStatus = "审核通过";
						} else if(this.withdrawLists[i].applyStatus == 3) {
							this.withdrawLists[i].applyStatus = "未通过";
						} else if(this.withdrawLists[i].applyStatus == 4) {
							this.withdrawLists[i].applyStatus = "已打款";
						}
					}
					if(this.withdrawLists.length > 0) {
						this.withdrawListsIsNull = false;
					} else {
						this.withdrawListsIsNull = true;
					}
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		handleCurrentChange: function(val) {
			this.pager.curpage = val;
			this.withdrawList();
		},
		banlance: function() {
			LF.net.getJSON("/member/main", {tokenId:LF.cookie.get("tokenId")}, res => {
				if(res.code == "000") {
					this.banlanceAmount = res.data.cashBalance;
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		withdrawalBank:function(){
			var _self = this;
			LF.net.getJSON("/member/bank/list", {tokenId:LF.cookie.get("tokenId")}, res => {
				if(res.code == "000") {
					this.bankList= res.data.list;							console.log(this.bankList ,this.bankList.length);
					if (this.bankList.length == 0) {
						return this.ruleForm2.bankAccount = '' ;
					} else {
						this.bankList.forEach(function(item){					console.log(item);							
							if(item.defaultFlag == 1){
								_self.ruleForm2.bankAccount = item.bankAccount;	console.log(_self.ruleForm2.bankAccount)
							}
						})
						
					}					
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		replaceBank:function(){
			console.log(this.bankList,this.bankList.length);
			if(this.bankList.length == 1 || this.bankList.length == 0){				
				MessageBox.confirm('没有可更换的银行卡,您现在要去绑定吗?', '提示', {
			                	confirmButtonText: '确定',
			                	cancelButtonText: '取消',
			                	type: 'warning'
				}).then(() => {
					LF.window.openWindow("/app/pages/personal/bdyhzh_ps.html","_self");
				});
				return;
			};			
			if (this.willshow == false) {
				this.willshow = true;
			} else {
				this.willshow = false;
			};			
		},
		selectcard:function(){		
			console.log(this.value);
			this.ruleForm2.bankAccount = this.value;
			return this.willshow = false;
		},
		applpWidthdraw:function(formName){
			if(this.banlanceAmount == 0){console.log(1)
	          			alert('您当前没有可提现余额');
	          			return;
	          		};
			var self = this;
      			console.log(this.$refs);
      			var _this =vue._data.ruleForm2;
	        		this.$refs[formName].validate((valid) => {
	        		console.log(valid,123);
		          	if (valid) {		          		
		          		if(this.bankList.length == 0){console.log(1)
		          			alert('您的银行卡还未绑定');
		          			return;
		          		};			            
			            if(this.ruleForm2.amount=='' || this.ruleForm2.bankAccount=='' ){
			            		alert("请输入正确的值");
			            		return;
			            }else{
			            		LF.net.getJSON("/member/cash/apply",{amount:Number(this.ruleForm2.amount).toFixed(2),bankAccount:this.ruleForm2.bankAccount},res=>{
						if(res.code== "000"){
							console.log(159);alert('申请提现成功');							
							// location.reload();	
						}
					},res=>{
						console.log("error:  "+JSON.stringify(res),'error',123);
					});
			            		
			            }		            
		          	} else {	          	
	            			console.log('error submit!!');
	            			return false;
	          		}
	        	});
			
			
				
		},
		
	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.goLogin();
		this.withdrawList();
		this.banlance();
		this.withdrawalBank();
	},
	components: {
		LfHead,
		LfLeft,
		LfFooter
	}
});
