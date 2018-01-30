/**
 *  
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading,Row,Col, Carousel, CarouselItem ,Radio,Switch,Steps,Step} from 'element-ui';
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
Vue.use(Row);
Vue.use(Col);
new Vue({
	el:"#app",
	data:{
		applyStatus:2,
		applyObj:'',
		account:'',
		apply:'',
		aplyAccont:'',
		bizLicUrl:'',
		idCardUrlsA:'',
		idCardUrlsB:'',
	},
	methods:{
		
	},
	/**
	 * 完成之后响应  初始化
	 */
	mounted(){
		 var param =LF.window.getParams();
		 var _this =this;
		 this.account=LF.cookie.get("account");
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
		LF.net.getJSON("website/seller/status", { adType: 1, pageSize: 100, merchantId: "",applyAccount:this.account,type:"manage_type"}, res => {
				if(res.code == "000") {
					_this.applyStatus=res.data.applyStatus;
					_this.applyObj=res.data.merchantProperty;
					_this.aplyAccont=res.data;
					_this.bizLicUrl=res.data.bizLicUrl;
					var obj = res.data.idCardUrls;
					obj =obj.split(";");
					_this.idCardUrlsA=obj[0];
					_this.idCardUrlsB=obj[1];
					console.log(obj);
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
	},
		
	components: {
        LfHeader,
        LfFooter
    }
})
