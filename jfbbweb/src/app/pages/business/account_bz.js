import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import { Button, Select, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option,DatePicker,Dialog,TableColumn,Table,Message } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Table)

new Vue({
	el: '#app',
	data: {
		merchantId: '',
		pageSize: 10,
		currentPage: 1,
		totalCount: 0,
		integral: 0,
		interTotal: 0,
		integralBal: 0,
		cashBalance: 0,
		tabName: 'point',
		tabName2: 'receive',
		pointReceiveList: [],
		pointPaymentList: [],
		returnIntegralRecordValue:[],
		bandicootExpendRecordValue:[],
		balanceReceiveList: [],
		balancePaymentList: [],
		month: '',
		monthMoney: 0,
		totalMoney: 0,
		tipsShow: false,
		showExchange: false,
		exchangeNum: '',
		dialogShow:false,
		orderdetail:''
	},
	methods: {
		categoryChange(tab, event) {
			if (tab.name == 'point'){
				this.tabName = 'point';
				this.tabName2 = 'receive';
				this.getPointReceiveList();
			} else if (tab.name == 'balance'){
				this.tabName = 'balance';
				this.tabName2 = 'receive';
				this.getBalanceReceiveList();
			}
		},
		typeChange(tab, event) {
			if (this.tabName == 'point'){
				if (tab.name == 'receive'){
					this.tabName2 = 'receive';
					this.getPointReceiveList();
				} else if (tab.name == 'payment'){
					this.tabName2 = 'payment';
					this.getPointPaymentList();
				}else if (tab.name == 'returnment'){
					this.tabName2 = 'returnment';
					this.getReturnIntegralList();
				}else if (tab.name == 'bandicootExpend'){
					this.tabName2 = 'bandicootExpend';
					this.getBandicootExpendList();
				}
			} else if (this.tabName == 'balance'){
				if (tab.name == 'receive'){
					this.tabName2 = 'receive';
					this.getBalanceReceiveList();
				} else if (tab.name == 'payment'){
					this.tabName2 = 'payment';
					this.getBalancePaymentList();
				}
				// else if (tab.name == 'returnment'){
				// 	this.tabName2 = 'returnment';
				// 	this.getReturnIntegralList();
				// }
			}
		},
        getYearMonth:function(dateStr){
			var year= dateStr.getFullYear(); 
			var month=dateStr.getMonth()+1;
			month =(month<10 ? "0"+month:month);
			
			return year+"-"+month;
        },
		//获取积分及余额信息
		getAccountInfo() {
			var url = "/member/wallet/get";
			LF.net.getJSON(url, {}, res => {
				if(res.code == "000") {
					this.integral = res.data.integral;
					this.interTotal = res.data.interTotal;
					this.cashBalance = res.data.cashBalance;
					this.integralBal = res.data.integralBal;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		//积分收入记录
		getPointReceiveList(){
			var params = { "month": this.month, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/inter/income/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.totalCount = res.data.totalCount;
					this.pointReceiveList = res.data.list;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		//积分支出记录
		getPointPaymentList(){
			var params = { "month": this.month, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/inter/outlay/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.totalCount = res.data.totalCount;
					this.monthMoney = res.data.totalMonthAmount;
					this.totalMoney = res.data.totalAmount;
					this.pointPaymentList = res.data.list;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},


		//积分返还记录
		getReturnIntegralList(){
			var params = { "month": this.month, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/inter/return/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.returnIntegralRecordValue = res.data.list;console.log(this.returnIntegralRecordValue,123)
					this.totalCount = res.data.totalCount;					
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		//袋鼠币支出记录
		getBandicootExpendList(){
			var params = { "month": this.month, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/roo/outlay/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.bandicootExpendRecordValue = res.data.list;console.log(this.bandicootExpendRecordValue,1234)
					this.totalCount = res.data.totalCount;					
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},



		//余额收入记录
		getBalanceReceiveList(){
			var params = { "month": this.month, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/cash/income/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.totalCount = res.data.totalCount;
					this.monthMoney = res.data.totalMonthAmount;
					this.totalMoney = res.data.totalAmount;
					this.balanceReceiveList = res.data.list;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		//余额支出记录
		getBalancePaymentList(){
			var params = { "month": this.month, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/cash/outlay/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.totalCount = res.data.totalCount;
					this.balancePaymentList = res.data.list;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		showRoderinfo:function(id){
			var _this =this ;
			LF.window.openWindow(encodeURI("/app/pages/business/my_orderdetails_bz.html?orderId="+id));
			/*LF.net.getJSON("/merchant/order/detail", {orderId:id},res=>{
				if(res.code=="000"){
					_this.dialogShow=true;
					_this.orderdetail=res.data;
					console.log(res.data);
				}else{
                         Message({
                            type: 'error',
                            message:res.errorMessage
                        });
                        alert(res.errorMessage);
                    }
                }, res=>{
                	console.log("error：" + JSON.stringify(res));
                });*/
		},
		sizeChange(value) {
			this.pageSize = value;
			this.currentPage = 1;
			this.search();
		},
		currentChange(value) {
			if(this.currentPage != value) {
				this.currentPage = value;
				this.search();
			}
		},
		goWithdrawal(type){
			LF.window.openWindow("withdrawal_bz.html?type=" + type, "_self");
		},
		showPointExchange(){
			this.exchangeNum = 0;
			this.showExchange = true;
		},
		hidePointExchange(){
			this.showExchange = false;
		},
        search:function(){
        	if (this.month.length <= 10) {
        	}else {
        		this.month = this.getYearMonth(this.month);
        	}
			if (this.tabName == 'point'){
				if (this.tabName2 == 'receive'){
					this.getPointReceiveList();
				} else if (this.tabName2 == 'payment'){
					this.getPointPaymentList();
				}else if (this.tabName2 == 'returnment'){					
					this.getReturnIntegralList();
				}else if(this.tabName2 == 'bandicootExpend'){
					this.getBandicootExpendList();
				}
			} else if (this.tabName == 'balance'){
				if (this.tabName2 == 'receive'){
					this.getBalanceReceiveList();
				} else if (this.tabName2 == 'payment'){
					this.getBalancePaymentList();
				}
			}
       },
       showTips(){
       		this.tipsShow = true;
       },
       hideTips(){
       		this.tipsShow = false;
       },
       doExchange(){
			if (this.exchangeNum == ''){
                Message({
                    type: 'warning',
                    message:"请输入要兑换的积分数量"
                });
				return false;
			}
			
			if (isNaN(this.exchangeNum)){
                Message({
                    type: 'warning',
                    message:"请输入数字"
                });
				return false;
			} else{
				if (this.exchangeNum <= 0){
                    Message({
                        type: 'warning',
                        message:"兑换的积分数量须大于0"
                    });
					return false;
				}
				if (this.exchangeNum > 0){
					if (this.exchangeNum > this.integral){
                        Message({
                            type: 'warning',
                            message:"兑换的积分数量不能大于剩余积分"
                        });
						return false;
					}
					
					var params = { "roo": this.exchangeNum };
					var url = "/member/roo2cash/exchange";
					LF.net.getJSON(url, params, res => {
						if(res.code == "000") {
							this.integral = this.integral - this.exchangeNum;
                            Message({
                                type: 'warning',
                                message:"积分兑换成功"
                            });
							this.hidePointExchange();
							this.getAccountInfo();
						}
					}, function(xhr, type, errorThrown) {
						console.log("error：" + type);
						console.log("errorThrown：" + errorThrown);
					});
				}
			}
       }

	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.merchantId = LF.cookie.get("merchantId");
		this.month = this.getYearMonth(new Date());
		this.getAccountInfo();
		this.getPointReceiveList();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})