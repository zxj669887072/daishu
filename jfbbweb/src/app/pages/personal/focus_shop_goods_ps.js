//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem } from 'element-ui';
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
		focusShopGoods:[],
                            
	},
	methods: {
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	focusShopGood:function(shopName){
    		LF.net.getJSON("/follow/store/goods/list", {shopName:shopName,pageSize:this.pager.size,pageNo:this.pager.curpage},res=>{
	    		if(res.code=="000"){ 
	    			this.focusShopGoods = res.data;
	    			this.pager.total=res.data.totalCount;
	    		}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	search:function(){
    		this.focusShopGood(this.$refs.search.value,'0');
    	},
    	handleCurrentChange:function(val){
    		this.pager.curpage=val;
     		this.focusShopGood("");
    	},
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    	this.focusShopGood("");
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})