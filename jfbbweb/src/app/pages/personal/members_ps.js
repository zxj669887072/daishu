//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import { Button, Select, Card, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane} from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
 
new Vue({
	el: '#app',
	data: {
		gradeName:'',
        discount:0,
        curConsumeAmount:0,
        upgradeConsumeAmount:0,
	},
	methods: {
		go(url){
    		LF.window.openWindow(url);
    	},
    	
	},
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	LF.net.getJSON("/member/grade", {},res=>{
    		var res = {
		        "code": '000',
		        "errorMessage": '',
		        "data": {
			          gradeId:1,
			          gradeName:'金钻',
			          discount:7.5,
			          curConsumeAmount:9999,
			          upgradeConsumeAmount:99999
			        }
			    }
    		if(res.code=="000"){   
    			this.gradeName = res.data.gradeName;
		        this.discount = res.data.discount;
		        this.curConsumeAmount = res.data.curConsumeAmount;
		        this.upgradeConsumeAmount = res.data.upgradeConsumeAmount;
			}
		}, res=>{
			console.log("error：" + JSON.stringify(res));
		});
    },
})