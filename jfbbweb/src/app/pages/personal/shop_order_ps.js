//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
 
new Vue({
	el: '#app',
	data: {
		goodsStat:[],
		ordersList:[]
	},
	methods: {
		go(url) {
			LF.window.openWindow(url);
		},
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	shopOrder:function(){
    		LF.net.getJSON("/member/dist/goods/stat", {tokenId:LF.cookie.get("tokenId")},res=>{
	    		if(res.code=="000"){   
	                this.goodsStat = res.data;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	search:function(){
    		this.orderList(this.$refs.search.value,1);
    	},
    	orderList:function(searchStr,storeFlag){
    		LF.net.getJSON("/member/order/list", {tokenId:LF.cookie.get("tokenId"),searchStr:searchStr,storeFlag:'0'},res=>{
	    		if(res.code=="000"){   
	                this.ordersList = res.data.list;
				}
			}, res=>{ 
				console.log("error：" + JSON.stringify(res));
			});
    	}, 
    	delOrder:function(orderId){
    		LF.net.getJSON("/member/order/del", {tokenId:LF.cookie.get("tokenId"),orderId:orderId},res=>{
	    		if(res.code=="000"){    
	             	this.go("/app/pages/personal/shop_order_ps.html");
				}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, res=>{  
				console.log("error：" + JSON.stringify(res));
			});
    	}
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    	this.shopOrder();
    	this.orderList("",1);
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})