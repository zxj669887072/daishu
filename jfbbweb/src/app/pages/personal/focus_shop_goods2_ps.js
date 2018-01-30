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
		focusShopGoods:[],
		pager:{
                	size:10,
                	curpage:1,
                	total:0                         
               },
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
            	    			this.focusShopGoods = res.data;                     console.log(res.data,123);
                                                   this.pager.total=res.data.totalCount;            	    			
            	    		}
            			}, res=>{
            				console.log("error：" + JSON.stringify(res));
            			});
                	},
                	search:function(){
                		this.focusShopGood(this.$refs.search.value,'1');
                	},
                	deleteShop:function(id){
                		LF.net.getJSON("/follow/store/goods/del", {goodsId:id},res=>{
            	    		if(res.code=="000"){
                                Message({
                                    type: 'info',
                                    message:"取消关注成功"
                                });
            	    			this.focusShopGood("");
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
                 		this.focusShopGood("");
                	},
                	choose:function(){
                    	             for(var i = 1;i <= 10;i++){
                            		if(i == 11) document.getElementById("item"+i).style.color = "#ff3e03";
                            		else document.getElementById("item"+i).style.color = "#555"; 
                            	}
                         },
                         goGoodsView:function (goodsId) {
                                      LF.window.openWindow("/app/pages/store/storedetails.html?goodsId="+goodsId,"_blank");
                          },
                          getStoreView(merchantId,shopName) {console.log(shopName)
                                      if(shopName != "袋鼠集市平台"){
                                                   LF.window.openWindow("/app/pages/store/storeshop.html?merchantId="+merchantId,"_blank");
                                      }else{
                                                   LF.window.openWindow("/app/pages/goods.html");
                                      }
                                        
                          }
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.focusShopGood("");
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})