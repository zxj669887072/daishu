import Vue from 'vue'
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
		activeName:'store-car'
	} 
})