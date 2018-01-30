import LF from 'LF';
import Vue from 'vue';
import LfHeader from './../../../components/header_new.vue';
import LfFooter from './../../../components/footer.vue';
import { Card, Loading, Carousel, CarouselItem } from 'element-ui';
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
new Vue({
	el: '#app',
	data: {
		
		
	},

	methods: {
		go(url) {
			LF.window.openWindow(url);
		},
		/*
		 * 根据分类structureNo跳转到具体路分类页面，暂时先跳百度
		 */
		gotoByStructureNo(structureNo) {
			LF.window.openWindow("list.html?structureNo="+structureNo);
		},
		goByGoodId(id) {
			LF.window.openWindow("store/storedetails.html?goodsId="+id);
//			LF.window.openWindow("http://www.baidu.com");
		}
		
	},
	beforeMount() {
		console.log("beforeMount");
	},

	mounted() {
		
		
	},
	components: {
		LfHeader,
		LfFooter
	},
})