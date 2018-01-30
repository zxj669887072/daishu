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
    	LF.net.getJSON("/member/dist/shop/list", {},res=>{
    		if(res.code=="000"){   
    			console.log(JSON.stringify(res));
			}
		}, res=>{
			console.log("error：" + JSON.stringify(res));
		});
    },
})