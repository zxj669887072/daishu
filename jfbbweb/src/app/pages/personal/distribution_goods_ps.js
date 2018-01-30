//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Pagination,Carousel, CarouselItem } from 'element-ui';
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
		goodsStat:[],
		goodsList:[],
		pager:{
        	size:10,
        	curpage:1,
        	total:50
       },
	},
	methods: {
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	distributionGoods:function(){
    		LF.net.getJSON("/member/dist/goods/stat", {tokenId:LF.cookie.get("tokenId")},res=>{
    		if(res.code=="000"){                      console.log(3.627,res.data)
                this.goodsStat = res.data;
			}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},  
    	goodList:function(searchStr){
    		LF.net.getJSON("/member/dist/goods/list", {searchStr:searchStr,pageSize:this.pager.size,pageNo:this.pager.curpage},res=>{
	    		if(res.code=="000"){            console.log(3.628,res.data)
	                var goodsList = res.data.list;
	                for(var i = 0;i < goodsList.length;i++){
	                    //1:已下单 2:已发货 3:已签收 4:已完成 5:已取消
	                    if(goodsList[i].status == 1){
	                        goodsList[i].status = "已下单";
	                    }else if(goodsList[i].status == 2){
	                        goodsList[i].status = "已发货";
	                    }else if(goodsList[i].status == 3){
	                        goodsList[i].status = "已签收";
	                    }else if(goodsList[i].status == 4){
	                        goodsList[i].status = "已完成";
	                    }else if(goodsList[i].status == 5){
	                        goodsList[i].status = "已取消";
	                    }
	                }
	                this.goodsList = goodsList;
	                this.pager.total=res.data.totalCount;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	search:function(){
    		this.goodList(this.$refs.search.value);
    	},
    	handleCurrentChange:function(val){
    		this.pager.curpage=val;
     		this.focusShop("");
    	},
    	choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 5) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555"; 
        	}
        },
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.distributionGoods();
    	this.goodList("");
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})