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
		distributionList:[],//分销商集合
		pagerOne:{
        	size:8,
        	curpage:1,
        	total:0
      }
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
    	handleCurrentChange:function(){
    		this.pagerOne.curpage=val;
     		this.getDistributionList();
    	},
    	getDistributionList:function(){
    		var param = {"pageSize": this.pagerOne.size, "pageNo": this.pagerOne.curpage};
    		LF.net.getJSON("/member/dist/merchant/list", param, res=>{
	    		if(res.code=="000"){
	    			this.distributionList = res.data.list;
	    			this.pagerOne.total = res.data.totalCount;
	    		}
			}, res=>{ 
				console.log("error：" + JSON.stringify(res));
			});
    	},
        choose:function(){
        	for(var i = 1;i <= 12;i++){
        		if(i == 12) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555"; 
        	}
        }
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	LF.window.checkLogin();
    	// this.choose();
    	this.getDistributionList();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})