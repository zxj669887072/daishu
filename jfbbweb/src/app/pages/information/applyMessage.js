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
	},
	beforeMount() {

	},

	mounted() {
		
		
	},
	components: {
		LfHeader,
		LfFooter
	},
})