//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, Pagination,CarouselItem,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Pagination);
 
new Vue({
	el: '#app',
	data: {
		focusShops:[],
		pager:{
        	size:10,
        	curpage:1,
        	total:0
       },
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
    	focusShop:function(shopName){
    		LF.net.getJSON("/follow/store/list", {shopName:shopName,pageSize:this.pager.size,pageNo:this.pager.curpage},res=>{
	    		if(res.code=="000"){ 
	    			this.focusShops = res.data;
	    			this.pager.total=res.data.totalCount;
	    		}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	search:function(){
    		this.focusShop(this.$refs.search.value);
    	},
    	deleteStore:function(id){
    		console.log("商店"+id); 
    		LF.net.getJSON("/follow/store/del", {id:id},res=>{
	    		if(res.code=="000"){
                    Message({
                        type: 'info',
                        message:"已取消关注"
                    });
	    			this.focusShop("");
	    		}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	handleCurrentChange:function(val){
    		this.pager.curpage=val;
     		this.focusShop("");
    	},
    	choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 10) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555"; 
        	}
        },  
            go(url){
                    LF.window.openWindow(url,"_self");
            },
                goStoreShop(houseNumber, merchantId){
                            console.log("storeshop.html?houseNumber="+houseNumber+"&merchantId="+merchantId)
                            this.go("/app/pages/store/storeshop.html?houseNumber="+houseNumber+"&merchantId="+merchantId);
                },        
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.focusShop("");
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})