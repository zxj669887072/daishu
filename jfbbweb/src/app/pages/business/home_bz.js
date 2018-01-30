import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import LfList from 	 '../../../components/orderlist.vue';
import { Button, Select,Form,FormItem,Input, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option, Dialog,Table,TableColumn,Message } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
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
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Table)

new Vue({
	el: '#app',
	data: {
		merchantId: '',
		allOrdersNum: 0,
		noSendOutNum: 0,
		noEvalNum: 0,
		cashBalance: 0,
		currentPage: 1,
		pageSize: 3,
		totalCount: 0,
    		orderlist:'',
        		operType:1
	},
	methods: {
		/***
		 * 获取订单信息
		 */
		getStatistisCount() {
			LF.net.getJSON("/merchant/index", {}, res => {
				if(res.code == "000") {
					this.allOrdersNum = res.data.allOrdersNum;
					this.noSendOutNum = res.data.noSendOutNum;
					this.noEvalNum = res.data.noEvalNum;
					this.cashBalance = res.data.cashBalance;
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		//获取积分及余额信息
		getAccountInfo() {
			var url = "/member/wallet/get";
			LF.net.getJSON(url, {}, res => {
				if(res.code == "000") {
					this.cashBalance = res.data.cashBalance;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
      	/***
      	 * 获取订单信息
      	 */
    	getOrderList:function(){
    		var param ={merchantId:LF.cookie.get("merchantId"),pageNo:this.currentPage,pageSize:this.pageSize, operType: this.operType};
    		LF.net.getJSON("/merchant/order/list", param,res=>{
	    		if(res.code=="000"){
					 this.orderlist=res.data;			console.log(res.data,444)
					 this.totalCount=res.data.totalCount;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	chooseType:function (operType) {
            this.operType=operType;
            this.getOrderList();
        },
    	/**
    	 *监听 
    	 */
    	fulshList:function(){
    		this.currentPage=1;
    		this.getOrderList();
    	},
		sizeChange(value) {
			this.pageSize = value;
			this.currentPage = 1;
			this.getOrderList();
		},
		currentChange(value) {
			if(this.currentPage != value) {
				this.currentPage = value;
				this.getOrderList();
			}
		},
		goWithdrawal(type){
			LF.window.openWindow("withdrawal_bz.html?type=" + type, "_self");
		}
	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.getStatistisCount();
		this.getOrderList();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft,
		LfList
	}
})