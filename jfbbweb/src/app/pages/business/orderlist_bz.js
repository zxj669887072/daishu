import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from   '../../../components/busleft.vue';
import LfList from 	 '../../../components/orderlist.vue';
import {Form,FormItem,Input, Button, Select, Card,Radio, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane,Option,Dialog,TableColumn,Table,Message} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Table)
//Vue.use(Message)


 
new Vue({
    el: '#app',
    data: { 
    	activeName:'operType-1',
    	 
    	pager:{
        	size:4,
        	curpage:1,
        	total:0
       },
    	orderlist:''
    } ,
    methods:{ 
    	/**
    	 * 切换tab  获取不同订单
    	 * @param {Object} tab
    	 * @param {Object} event
    	 */
    	handleClick:function(tab, event) {
    		this.pager.curpage=1;
     		this.getOrderList();
      	},
      	/***
      	 * 获取订单信息
      	 */
    	getOrderList:function(){
    		var _par =LF.window.getParams();
    		var arr =this.activeName.split("-");
    		var _this =this;
    		if(_par==null ||_par.mid==null||_par.mid==''){
	    		//404    
	    	}else{
	    		var param ={merchantId:LF.cookie.get("merchantId"),pageNo:_this.pager.curpage,pageSize:_this.pager.size};
	    		if(arr.length>1){
	    			param[arr[0]]=arr[1];
	    		}
	    		LF.net.getJSON("/merchant/order/list", param,res=>{
		    		if(res.code=="000"){
						 _this.orderlist=res.data;
						 console.log(res.data);
						 _this.pager.total=res.data.totalCount;
					}
				}, res=>{
					console.log("error：" + JSON.stringify(res));
				});
	    	}
    	},
    
    	/**
    	  * 订单分页
    	  * @param {Object} val
    	  */
    	handleCurrentChange:function(val){
    		this.pager.curpage=val;
     		this.getOrderList();
    	},
    	/**
    	 *监听 
    	 */
    	fulshList:function(){
    		this.pager.curpage=1;
    		this.getOrderList();
    	}
    },
    /*
     *组件挂在完成响应 
     */
    mounted(){ 
    	this.getOrderList();
            // this.goOrderdetails();
    },
      components: {
        LfHeader,
        LfFooter,
        LfLeft,
        LfList
    }
})