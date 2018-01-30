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
		isDistribution:false,
        isApplay:false,
        distributonUp:{
            totalCount:0,
            monthBkge:0,
            accBkge:0
        },
        distributonDown:[],
	},
	methods: {
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	distributionShop:function(){
    		LF.net.getJSON("/member/dist/shop/list", {tokenId:LF.cookie.get("tokenId")},res=>{
    		if(res.code=="000"){   
                this.distributonUp.accBkge = res.data.accBkge;
                this.distributonUp.totalCount = res.data.totalCount;
                this.distributonUp.monthBkge = res.data.monthBkge;
    			if(res.data.list.length > 0){//有数据代表是分销商
                    this.isDistribution = true;
                    this.isApplay = false;

                    this.distributonDown = res.data.list;
                    this.distributonDown.forEach(function(item){
                            if(item.distQty == ''){
                                item.distQty = 0;
                            }
                    });
    			}else{
    				this.isApplay = true;
                    this.isDistribution = false;
    			}
    			
			}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 4) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555"; 
        	}
        },
        goPerson:function(){
        	LF.window.openWindow("/app/pages/information/applyForAccount.html");
        },
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.distributionShop();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})