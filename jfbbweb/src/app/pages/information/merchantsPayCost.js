/**
 *  
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem ,Radio,Switch,Steps,Step} from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Radio);
Vue.use(Switch);
 Vue.use(Steps)
Vue.use(Step)

new Vue({
	el:"#app",
	data:{
		orderinfo:'',
		payMethod:'',
		useBalance:false,
		balanceAmount:'',
		payPassword:'',
		balance:'',
		amounts:'',
		payType:'',
		payShow:{
			wx:true,
			wxurl:''
		}
	},
	methods:{
		paypay:function(){
			var _this =this ;
			var param={ 
			 	amounts:_this.amounts,
			 	payType:_this.payType,
			}
			LF.net.getJSON("website/seller/pay", param , res=>{
	    		if(res.code=="000"){
	    			if(_this.payMethod==1){
	    				//微信支付
	    				_this.payShow.wx=false;
	    				_this.payShow.wxurl=res.data.imageUrl;
	    			}else if(_this.payMethod==2){
	    				//支付宝
	    				LF.window.openWindow("/app/pages/shopping/zfb.html?ps="+res.data.htmlText);
	    			}
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
		},
		changebalan:function(){
			if(this.balanceAmount>this.balance){
				this.balanceAmount=this.balance;
			}
		}
	},
	/**
	 * 完成之后响应  初始化
	 */
	mounted(){
		 var param =LF.window.getParams();
		 var _this =this;
		 if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
			LF.window.openWindow("/app/login.html","_self");
		}else if(param==null || param.order==null){
			//404		
		}else{
			LF.net.getJSON("/merchant/order/detail", {tokenId:LF.cookie.get("tokenId"),orderId:param.order}, res=>{
	    		if(res.code=="000"){
	    			_this.orderinfo=res.data;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
			LF.net.getJSON("/member/main", {}, res=>{
	    		if(res.code=="000"){
	    			_this.balance=res.data.cashBalance;
	    			console.log(res.data);
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
			
		}
	},
		
	components: {
        LfHeader,
        LfFooter
    }
})
