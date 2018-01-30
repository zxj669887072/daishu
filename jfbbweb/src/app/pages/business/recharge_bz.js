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
		type: '1',
		account: '',
		amount: '',
		payShow:{
			wx:true,
			wxurl:''
		}
	},
	methods: {
		recharge(){
			var reg = /^\+?(:?(:?\d{1,10}\.\d{1,2})|(:?\d{1,10}))$/;
			if (this.amount == ''){
		                	Message({
		                    		type: 'warning',
		                    		message:"请输入要充值的金额"
		                	});
				return false;
			};			
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
                        					message:"充值金额须大于0"
                    				});
					return false;
				}else if (!reg.test(this.amount)){
                    				Message({
                        					type: 'error',
                        					message:"金额不合法!(不得超过2位小数)"
                    				});
					return false;
				};
				if(parseInt(this.amount) >= 1000000){
					Message({
	                    				type: 'warning',
	                    				message:"你输入的金额超过上限，请重新输入"
	                			});
					return false;
				};
				if (this.amount > 0){
					var params = { "amounts": this.amount, "payType": this.type };
					var url = "/website/seller/pay";
					LF.net.getJSON(url, params, res => {
						if(res.code == "000") {
							if(this.type==1){
			    				//微信支付
			    				this.payShow.wx=false;
			    				this.payShow.wxurl=res.data.imageUrl;
			    				this.getPayResult(res.data.recordNo,1);
			    			
			    			}else if(this.type==2){
			    				//支付宝
			    				var myWindow = window.open();
			    				if(myWindow==null){
                                    						Message({
                                        						type: 'warning',
                                        						message:"请允许浏览器弹窗，刷新页面重试"
                                    						});
			    				}else{
			    					myWindow.document.write(res.data.htmlText);
									this.getPayResult(res.data.recordNo,2);	
			    				}
			    			}
						}
					}, function(xhr, type, errorThrown) {
						console.log("error：" + type);
						console.log("errorThrown：" + errorThrown);
					});
				}
			}
		},
		/**
		 * 获取支付  状态
		 * @param {Object} record
		 * @param {Object} type
		 */
		getPayResult:function(record,type){
			var param =LF.window.getParams();
			var t=setInterval(function(){
				LF.net.getJSON("/integral/paymentStatus", {recordNo:record,payMethod:type}, res=>{
		    		if(res.code=="000"){
		    			 if(res.data.payStatus){
		    			 	clearInterval(t);
							 Message({
								 type: 'success',
								 message: "支付成功,页面跳转中...",
								 onClose: function() {
									 LF.window.openWindow("/app/pages/business/account_bz.html","_self");
								 }
							 });

							// console.log("支付成功");
		    			 	// if(param['confirmCollection']){
		    			 	// 	LF.window.openWindow("/app/pages/business/orderlist_bz.html?m=1&mid=0","_self");
		    			 	// }else{
							// 	LF.window.openWindow("/app/pages/business/account_bz.html","_self");
		    			 	// }
		    			 }
					}
				}, res=>{
					console.log("error：" + JSON.stringify(res));
				});
				
			},2000);
		}
	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.account = LF.cookie.get("bussAccount");
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})