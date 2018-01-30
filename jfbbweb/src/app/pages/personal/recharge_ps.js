//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, Radio,CarouselItem,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Radio);
 
new Vue({
	el: '#app',
	data: {
		wx:true,
        wxurl:'',
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
                    				type: 'error',
                    				message:"请输入要充值的金额!"
                			});
				return false;
			}
			
			if (isNaN(this.amount)){
                			Message({
                    				type: 'error',
                    				message:"请输入数字!"
                			});
				return false;
			} else{
				if (this.amount <= 0){
                    				Message({
                        					type: 'error',
                        					message:"充值金额须大于0!"
                    				});
					return false;
				}else if (!reg.test(this.amount)){
                    				Message({
                        					type: 'error',
                        					message:"金额不合法!(不得超过2位小数)"
                    				});
					return false;
				};
				if (parseInt(this.amount)>=1000000){
                    				Message({
                        					type: 'error',
                        					message:"您的充值金额过大，请重新输入!"
                    				});
					return false;
				};
				if (this.amount > 0){
					var params = { "amounts": this.amount, "payType": this.type };
					var url = "/website/seller/pay";
					LF.net.getJSON(url, params, res => {
						if(res.code == "000") {console.log(res.data);
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
					                        				type: 'error',
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
		    			 	console.log("支付成功");
		    			 	LF.window.openWindow("/app/pages/personal/wallet_ps.html","_self");
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
		this.account = LF.cookie.get("account");
	},
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})