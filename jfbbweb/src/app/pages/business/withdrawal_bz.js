import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import { Button, Select, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option,Message } from 'element-ui'

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

new Vue({
	el: '#app',
	data: {
		pageSize: 5,
		currentPage: 1,
		totalCount: 0,
		cashRecordList: [],
		pointRecordList: [],
		cashBalance: 0,
		amount: '',
		bankAccount: 0
	},
	methods: {
		//获取积分及余额信息
		getAccountInfo() {
			var url = "/member/wallet/get";
			LF.net.getJSON(url, {}, res => {
				if(res.code == "000") {
					this.integral = res.data.integral;
					this.interTotal = res.data.interTotal;
					this.cashBalance = res.data.cashBalance;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		getBankInfo() {
			var url = "/merchant/bank/info";
			LF.net.getJSON(url, {"merchantId": LF.cookie.get("merchantId")}, res => {
				if(res.code == "000") {
					this.bankAccount = res.data.bankAccount;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		getPointRecordList(){
			var params = { "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/member/inter/income/list";
//			LF.net.getJSON(url, params, res => {
//				if(res.code == "000") {
//					this.totalCount = res.data.totalCount;
//					this.pointReceiveList = res.data.list;
//				}
//			}, function(xhr, type, errorThrown) {
//				console.log("error：" + type);
//				console.log("errorThrown：" + errorThrown);
//			});
		},
		handleCurrentChange:function(val){
	    		this.currentPage=val;
	     		this.getCashRecordList();
	    	},
		getCashRecordList(){
			var params = { "memberId": LF.cookie.get("bussUserId"), "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/merchant/withdraw/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.totalCount = res.data.totalCount;
					this.cashRecordList = res.data.list;console.log(this.cashRecordList)
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		doDrawal(){
			if (this.amount == ''){
                Message({
                    type: 'warning',
                    message:"请输入要提现的金额"
                });
				return false;
			}
			
			if (isNaN(this.amount)){
                Message({
                    type: 'warning',
                    message:"请输入数字"
                });
				return false;
			} else{
				if (this.amount <= 0){
                    Message({
                        type: 'warning',
                        message:"提现金额须大于0"
                    });
					return false;
				}
				if (this.amount > 0){
					if (this.amount > this.cashBalance){
                        Message({
                            type: 'warning',
                            message:"提现金额不能大于余额"
                        });
						return false;
					}
					
					var params = { "memberId": LF.cookie.get("bussUserId"), "bankAccount": this.bankAccount, "amount": this.amount };
					var url = "/merchant/withdraw/apply";
					LF.net.getJSON(url, params, res => {
						if(res.code == "000") {
							this.cashBalance = this.cashBalance - this.amount;
                            Message({
                                type: 'info',
                                message:"提现申请成功"
                            });
							this.getCashRecordList();
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
		var urlParam = LF.window.getParams();
		
		if (urlParam.type == 'point'){
			this.tabName = 'point';
			this.pointRecordShow = true;
			this.getPointRecordList();
		} else if (urlParam.type == 'cash'){
			this.tabName = 'cash';
			this.cashRecordShow = true;
			this.getCashRecordList();
		}
		
		this.getAccountInfo();
		this.getBankInfo();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})