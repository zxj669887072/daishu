//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
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
    components: {
        LfHead,
        LfFooter
    }
})