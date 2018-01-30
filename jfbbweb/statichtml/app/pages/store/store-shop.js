import Vue from 'vue'
import { Button, Select, Card, Loading,Col,Row,Rate,Progress,Carousel,CarouselItem,Pagination,Tag} from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Rate)
Vue.use(Progress)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tag)
 
new Vue({
	el: '#app',
	data: {
		fullscreenLoading: false,
		loading2: true
	},
	methods: {
		openFullScreen() {
			this.fullscreenLoading = true;
			setTimeout(() => {
				this.fullscreenLoading = false;
			}, 3000);
		}
	}
})