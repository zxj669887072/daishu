/**
 *  
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/header_new.vue';
import LfSearch from '../../../components/search.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem ,Radio,Message} from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Radio);
 

new Vue({
	el:"#app",
	data:{
		orderinfo:'',
		// storeId:'',
		searchStr:""
	},
	methods:{
		goPay:function(){
			 var param =LF.window.getParams();
			LF.window.openWindow("/app/pages/shopping/shopPayCost.html?order="+param.order+"&&isPayPassword="+param.isPayPassword);
		},
		doSearch(){
		            if (this.searchStr == ''){
		                Message({
							type: 'warning',
							message:"请输入门牌号！"
						});
		                return;
		            }

		            LF.net.getJSON("/store/data/details", { houseNumber:this.searchStr }, res => {
		                if(res.code == "000") {
		                    let storeId = res.data.id;
		                    if (storeId == ''){
		                    	Message({
									type: 'warning',
									message:"未找到对应的实体店，请重新输入！"
								});
		                        return;
		                    }
		                    LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber="+this.searchStr + "&merchantId=" + storeId,"_self");
		                } else {
		                   	Message({
								type: 'warning',
								message:"未找到对应的实体店，请重新输入！"
							});
		                }
		            }, res => {
		        		Message({
							type: 'error',
							message:res.errorMessage
						});
		                console.log("error：" + JSON.stringify(res));
		            });
        		},
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
		}else{console.log(123)
			LF.net.getJSON("/merchant/order/detail", {tokenId:LF.cookie.get("tokenId"),orderId:param.order}, res=>{
	    		if(res.code=="000"){
	    			console.log(1234,res.data);
	    			_this.orderinfo=res.data;
	 				 //_this.orderinfo=res.data;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
		}
	},
		
	components: {
        LfHeader,
        LfSearch,
        LfFooter
    }
})
